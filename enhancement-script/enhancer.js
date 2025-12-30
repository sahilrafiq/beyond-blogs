const axios = require('axios');
const cheerio = require('cheerio');
const OpenAI = require('openai');
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: 'https://api.groq.com/openai/v1'
});

const LARAVEL_API = process.env.LARAVEL_API_URL || 'http://localhost:8000/api';

async function fetchArticles() {
  try {
    const response = await axios.get(`${LARAVEL_API}/articles`);
    return response.data.success ? response.data.data : [];
  } catch (error) {
    console.error('Error fetching articles:', error.message);
    return [];
  }
}

async function searchGoogle(query) {
  try {
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    const response = await axios.get(searchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    const $ = cheerio.load(response.data);
    const results = [];

    $('div.g').each((i, elem) => {
      if (results.length < 2) {
        const link = $(elem).find('a').attr('href');
        const title = $(elem).find('h3').text();
        
        if (link && link.startsWith('http') && !link.includes('google.com')) {
          results.push({ url: link, title });
        }
      }
    });

    console.log(`🔍 Found ${results.length} search results for: "${query}"`);
    return results;
  } catch (error) {
    console.error('Google search error:', error.message);
    return [];
  }
}

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
    $('script, style, nav, header, footer, aside').remove();
    
    let content = '';
    const selectors = ['article', '.article-content', '.post-content', '.entry-content', 'main'];

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
    console.error(`Error scraping ${url}:`, error.message);
    return '';
  }
}

async function enhanceArticle(originalArticle, referenceArticles) {
  try {
    console.log('🤖 Enhancing with AI...');
    
    const refContent = referenceArticles
      .map((ref, i) => `\nReference Article ${i + 1}:\nTitle: ${ref.title}\nContent: ${ref.content.substring(0, 1500)}`)
      .join('\n');

    const prompt = `You are a professional content writer. Rewrite and enhance this article by learning from the reference articles.

ORIGINAL ARTICLE:
Title: ${originalArticle.title}
Content: ${originalArticle.content}

REFERENCE ARTICLES:
${refContent}

Requirements:
1. Keep the core message
2. Improve structure and formatting
3. Enhance readability
4. Make it SEO-friendly
5. Use markdown formatting

Provide ONLY the enhanced article content.`;

    const completion = await openai.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 2500,
      temperature: 0.7
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI API error:', error.message);
    throw error;
  }
}

async function updateArticle(articleId, updatedData) {
  try {
    const response = await axios.put(
      `${LARAVEL_API}/articles/${articleId}`,
      updatedData
    );
    return response.data;
  } catch (error) {
    console.error('Error updating article:', error.message);
    throw error;
  }
}

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

      const searchResults = await searchGoogle(article.title);
      
      if (searchResults.length < 2) {
        console.log('⚠️  Not enough search results, skipping...');
        continue;
      }

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

      const enhancedContent = await enhanceArticle(article, referenceArticles);
      
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