const axios = require('axios');
const cheerio = require('cheerio');
const OpenAI = require('openai');
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: 'https://api.groq.com/openai/v1'
});

const LARAVEL_API = process.env.LARAVEL_API_URL || 'http://localhost:8000/api';

// Fetch articles from Laravel API
async function fetchArticles() {
  try {
    const response = await axios.get(`${LARAVEL_API}/articles`, {
      timeout: 30000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    return response.data.success ? response.data.data : [];
  } catch (error) {
    console.error('Error fetching articles:', error.message);
    console.error('Full error:', error);
    return [];
  }
}

// Search Google using Serper API
async function searchGoogle(query) {
  try {
    console.log(`🔍 Searching Google for: "${query}"`);
    
    const response = await axios.post(
      'https://google.serper.dev/search',
      {
        q: query,
        num: 5
      },
      {
        headers: {
          'X-API-KEY': process.env.SERPER_API_KEY,
          'Content-Type': 'application/json'
        }
      }
    );

    const results = [];
    
    if (response.data.organic) {
      for (let i = 0; i < Math.min(2, response.data.organic.length); i++) {
        const result = response.data.organic[i];
        results.push({
          url: result.link,
          title: result.title
        });
      }
    }

    console.log(`✅ Found ${results.length} search results`);
    return results;
  } catch (error) {
    console.error('❌ Serper API error:', error.message);
    return [];
  }
}

// Scrape article content from URL
async function scrapeArticleContent(url) {
  try {
    console.log(`📄 Scraping: ${url}`);
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      timeout: 10000
    });

    const $ = cheerio.load(response.data);
    
    $('script, style, nav, header, footer, aside, .ad, .advertisement, .comments').remove();
    
    let content = '';
    const selectors = [
      'article',
      '.article-content',
      '.post-content',
      '.entry-content',
      'main',
      '.content'
    ];

    for (const selector of selectors) {
      if ($(selector).length > 0) {
        content = $(selector).text().trim();
        break;
      }
    }

    if (!content) {
      content = $('body').text().trim();
    }

    return content.substring(0, 3000);
  } catch (error) {
    console.error(`❌ Error scraping ${url}:`, error.message);
    return '';
  }
}

// Enhance article using Groq AI
async function enhanceArticle(originalArticle, referenceArticles) {
  try {
    console.log('🤖 Enhancing with AI...');
    
    const refContent = referenceArticles
      .map((ref, i) => `\nReference Article ${i + 1}:\nTitle: ${ref.title}\nContent: ${ref.content.substring(0, 1500)}`)
      .join('\n');

    const prompt = `You are a professional content writer and SEO expert. You have an original blog article and two reference articles that rank well on Google.

ORIGINAL ARTICLE:
Title: ${originalArticle.title}
Content: ${originalArticle.content}

REFERENCE ARTICLES THAT RANK WELL:
${refContent}

TASK:
Rewrite and enhance the original article by learning from the reference articles' structure, formatting, and style. 

Requirements:
1. Keep the core message and topic of the original article
2. Improve structure with clear headings and sections
3. Enhance readability with better paragraphs and flow
4. Add professional formatting (use markdown)
5. Make it SEO-friendly
6. Improve the writing quality and tone
7. Expand the content where needed for better depth
8. Use bullet points or numbered lists where appropriate

Provide ONLY the enhanced article content in markdown format. Do not include any preamble or explanation.`;

    const completion = await openai.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 2500,
      temperature: 0.7
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('❌ Groq AI error:', error.message);
    throw error;
  }
}

// Update article via Laravel API
async function updateArticle(articleId, updatedData) {
  try {
    const response = await axios.put(
      `${LARAVEL_API}/articles/${articleId}`,
      updatedData,
      {
        timeout: 30000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('❌ Error updating article:', error.message);
    throw error;
  }
}

// Main process
async function processArticles() {
  console.log('🚀 Starting article enhancement process...\n');

  try {
    const articles = await fetchArticles();
    console.log(`📚 Found ${articles.length} articles\n`);

    if (articles.length === 0) {
      console.log('❌ No articles found. Please scrape articles first.');
      return;
    }

    const unprocessedArticles = articles.filter(a => !a.is_updated);
    console.log(`📝 Processing ${unprocessedArticles.length} unprocessed articles\n`);

    for (const article of unprocessedArticles) {
      console.log(`\n${'='.repeat(60)}`);
      console.log(`Processing: "${article.title}"`);
      console.log('='.repeat(60));

      // Search Google using Serper
      const searchResults = await searchGoogle(article.title);
      
      if (searchResults.length < 2) {
        console.log('⚠️  Not enough search results, skipping...');
        continue;
      }

      // Scrape reference articles
      const referenceArticles = [];
      for (const result of searchResults) {
        const content = await scrapeArticleContent(result.url);
        if (content) {
          referenceArticles.push({
            title: result.title,
            url: result.url,
            content
          });
        }
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      if (referenceArticles.length === 0) {
        console.log('⚠️  Could not scrape reference articles, skipping...');
        continue;
      }

      console.log(`✅ Successfully scraped ${referenceArticles.length} reference articles`);

      // Enhance with AI
      const enhancedContent = await enhanceArticle(article, referenceArticles);
      
      // Update article
      const updateData = {
        updated_content: enhancedContent,
        is_updated: true,
        references: referenceArticles.map(ref => ({
          title: ref.title,
          url: ref.url
        }))
      };

      await updateArticle(article.id, updateData);
      console.log('✅ Article enhanced and updated successfully!');

      // Rate limiting
      await new Promise(resolve => setTimeout(resolve, 3000));
    }

    console.log('\n' + '='.repeat(60));
    console.log('🎉 All articles processed successfully!');
    console.log('='.repeat(60));
  } catch (error) {
    console.error('\n❌ Process failed:', error.message);
    process.exit(1);
  }
}

// Run the process
if (require.main === module) {
  processArticles()
    .then(() => {
      console.log('\n✅ Process completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n❌ Process failed:', error);
      process.exit(1);
    });
}

module.exports = { processArticles };