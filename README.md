# Beyond Blogs

**AI-Powered Article Enhancement Platform** - Full Stack Web Developer Internship Assignment for BeyondChats

[![Laravel](https://img.shields.io/badge/Laravel-12.x-FF2D20?logo=laravel)](https://laravel.com)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react)](https://reactjs.org)
[![Node.js](https://img.shields.io/badge/Node.js-16.x+-339933?logo=node.js)](https://nodejs.org)
[![Groq](https://img.shields.io/badge/Groq-AI-orange)](https://groq.com)
[![Serper](https://img.shields.io/badge/Serper-Google%20Search%20API-4285F4)](https://serper.dev)

## 👨‍💻 Developer

**Sahil Rafiq**

* GitHub: [@sahilrafiq](https://github.com/sahilrafiq)
* LinkedIn: [sahil-rafiq](https://www.linkedin.com/in/sahil-rafiq/)

---

## 🔗 Live Demo

**⚠️ Note**: The enhancement feature works perfectly locally using Groq AI and Serper API. Due to network/firewall restrictions in my development environment, there are intermittent connection issues with the live Railway deployment. The application demonstrates full functionality when run locally following the setup instructions.

* **Frontend (React)**: https://beyond-blog.netlify.app
* **Backend API (Laravel)**: https://beyond-blogs-production.up.railway.app
* **GitHub Repository**: https://github.com/sahilrafiq/beyond-blogs

### Test the Backend

```bash
# Health check
curl https://beyond-blogs-production.up.railway.app/api/health
# Response: {"status":"ok"}
```

### Known Deployment Issue

The scraping function on the live deployment encounters a SQLite database persistence issue on Railway's free tier containerized environment. This is a deployment platform limitation, not a code issue. **The application works flawlessly when run locally** following the setup instructions below. For evaluation purposes, the local setup demonstrates full functionality including web scraping, AI enhancement, and data persistence.

---

## 🎯 Project Overview

Beyond Blogs is a comprehensive full-stack application that:

1. **Scrapes** blog articles from BeyondChats website
2. **Enhances** them using AI (Groq LLM) by learning from top-ranking Google articles
3. **Displays** both original and enhanced versions in a beautiful React interface

This project demonstrates expertise in web scraping, RESTful API development, AI integration, and modern frontend development.

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Frontend (React)                        │
│                   Port: 3000 (Development)                   │
│  • Article Dashboard  • View Toggle  • Responsive UI        │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ HTTP/REST API
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                   Laravel Backend API                        │
│                   Port: 8000 (Development)                   │
│  • CRUD Operations  • Web Scraping  • Data Management       │
└───────┬─────────────────────────┬───────────────────────────┘
        │                         │
        │                         │
        ▼                         ▼
┌──────────────┐         ┌────────────────────┐
│  SQLite DB   │         │ Symfony HTTP       │
│   Articles   │         │ Client + Crawler   │
└──────────────┘         └────────────────────┘
                                  │
                                  ▼
                         ┌────────────────────┐
                         │  Node.js Script    │
                         │  Enhancement Bot   │
                         └─────────┬──────────┘
                                   │
                    ┌──────────────┼──────────────┐
                    ▼              ▼              ▼
              ┌──────────┐  ┌──────────┐  ┌──────────┐
              │  Serper  │  │  Groq    │  │ Cheerio  │
              │Google API│  │  AI API  │  │ Scraper  │
              └──────────┘  └──────────┘  └──────────┘
```

---

## 📊 Data Flow Diagram

```
User Action: "Scrape Articles"
           │
           ▼
┌────────────────────────┐
│  Laravel Scraper       │
│  (Symfony HTTP Client) │──────┐
└────────────────────────┘      │
           │                    │
           │ Navigates to       │ Extracts
           │ BeyondChats Blog   │ Article Data
           ▼                    │
┌────────────────────────┐      │
│   Last Page (5 oldest  │◄─────┘
│   articles)            │
└────────────────────────┘
           │
           ▼
┌────────────────────────┐
│  Save to SQLite DB     │
│  (Articles Table)      │
└────────────────────────┘
           │
           ▼
┌────────────────────────┐
│  Display in Frontend   │
└────────────────────────┘

User Action: "Run Enhancement Script"
           │
           ▼
┌────────────────────────┐
│  Node.js Script Starts │
└────────────────────────┘
           │
           ▼
┌────────────────────────┐
│  Fetch Articles from   │
│  Laravel API           │
└────────────────────────┘
           │
           ▼
    For Each Article:
           │
           ├─► Search via Serper.dev API
           │         │
           │         ▼
           │   Get Top 2 Google Results
           │         │
           │         ▼
           │   Scrape Their Content
           │         │
           │         ▼
           ├─► Send to Groq API
           │    (Llama 3.3 70B)
           │         │
           │         ▼
           │   Get Enhanced Content
           │         │
           │         ▼
           └─► Update via Laravel API
                     │
                     ▼
           ┌────────────────────────┐
           │  Article Updated in DB │
           │  (with references)     │
           └────────────────────────┘
                     │
                     ▼
           ┌────────────────────────┐
           │  Display in Frontend   │
           │  (Original vs Enhanced)│
           └────────────────────────┘
```

---

## 🛠️ Tech Stack

### Phase 1: Backend (Laravel)

* **Laravel 12.x** - PHP Framework for RESTful APIs
* **SQLite** - Lightweight Database
* **Symfony HTTP Client** - For HTTP Requests
* **Symfony DOM Crawler** - For Web Scraping

### Phase 2: Enhancement Script (Node.js)

* **Node.js** - JavaScript Runtime
* **Axios** - HTTP Client for API Calls
* **Cheerio** - HTML Parsing for Web Scraping
* **Groq API** - Llama 3.3 70B for Content Enhancement (FREE)
* **Serper.dev API** - Google Search API for finding top-ranking articles (FREE tier: 2,500 queries)

### Phase 3: Frontend (React)

* **React 18** - UI Library
* **Tailwind CSS v3** - Utility-First CSS Framework
* **Lucide React** - Icon Library
* **Fetch API** - HTTP Client

---

## 📋 Prerequisites

Before you begin, ensure you have installed:

* **PHP** >= 8.1 with extensions:
  + `pdo_sqlite`
  + `sqlite3`
  + `fileinfo`
* **Composer** ([Download](https://getcomposer.org/download/))
* **Node.js** >= 16.x ([Download](https://nodejs.org/))
* **npm** or **yarn**
* **Git** ([Download](https://git-scm.com/downloads))
* **Groq API Key** - FREE ([Get it here](https://console.groq.com/keys))
* **Serper.dev API Key** - FREE ([Get it here](https://serper.dev/api-keys))

---

## 🚀 Installation & Setup

> **⭐ Recommended for Evaluation**: Run locally for full functionality. The live demo is deployed and accessible but has a minor database persistence issue that doesn't affect the local version.

### 1. Clone the Repository

```bash
git clone https://github.com/sahilrafiq/beyond-blogs.git
cd beyond-blogs
```

### 2. Backend Setup (Laravel)

```bash
cd backend

# Install PHP dependencies
composer install

# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate

# Create SQLite database
# On Windows:
type nul > database\database.sqlite
# On Mac/Linux:
touch database/database.sqlite

# Update .env file - set:
DB_CONNECTION=sqlite

# Run migrations
php artisan migrate

# Start Laravel server
php artisan serve
```

The Laravel API will be available at `http://127.0.0.1:8000`

**Test the API:**

```bash
curl http://127.0.0.1:8000/api/health
# Should return: {"status":"ok"}
```

### 3. Enhancement Script Setup (Node.js)

```bash
# Open new terminal
cd enhancement-script

# Install Node dependencies
npm install

# Create .env file
cat > .env << 'EOF'
GROQ_API_KEY=your_groq_api_key_here
SERPER_API_KEY=your_serper_api_key_here
LARAVEL_API_URL=http://127.0.0.1:8000/api
EOF

# Get your FREE API keys:
# Groq: https://console.groq.com/keys
# Serper.dev: https://serper.dev/api-keys
# Replace 'your_groq_api_key_here' and 'your_serper_api_key_here' with your actual keys
```

#### About Serper.dev API

**Serper.dev** is the world's fastest and most affordable Google Search API:

* **Lightning Fast**: Returns Google search results in 1-2 seconds
* **Cost-Effective**: Only $0.30 per 1,000 queries (after free tier)
* **FREE Tier**: 2,500 free queries to get started
* **Comprehensive**: Access to web search, images, news, maps, and more
* **Easy Integration**: Simple REST API with JSON responses
* **No Web Scraping**: Reliable alternative to traditional web scraping

**Why Serper.dev for this project?**
- Provides reliable access to Google's top-ranking articles
- Faster than traditional web scraping methods
- No CAPTCHA or IP blocking issues
- Perfect for AI enhancement workflows

**API Documentation**: https://serper.dev/
**Sign up**: https://serper.dev/api-keys

### 4. Frontend Setup (React)

```bash
# Open new terminal
cd frontend

# Install dependencies
npm install

# Start React development server
npm start
```

The React app will open at `http://localhost:3000`

---

## 📖 Usage Guide

### Step 1: Scrape Articles

1. Open your browser at `http://localhost:3000`
2. Click the **"Scrape Articles"** button
3. The system will:
   * Navigate to BeyondChats blog
   * Go to the last page
   * Extract the 5 oldest articles
   * Save them to the database
4. Articles will appear in the dashboard

### Step 2: Enhance Articles with AI

```bash
# In the enhancement-script directory
npm run enhance
```

The script will:

1. Fetch all un-enhanced articles from the Laravel API
2. For each article:
   * **Search Google** via Serper.dev API for the article title
   * Get the top 2 ranking articles
   * **Scrape content** from those URLs using Cheerio
   * **Send to Groq AI** (Llama 3.3 70B) with:
     - Original article content
     - Top-ranking articles as references
   * **Get AI-enhanced content** that learns from the references
   * **Update the article** via Laravel API
   * **Add reference citations** to show sources

**Note**: This process takes 2-5 minutes depending on the number of articles.

### Step 3: View Articles

* Click on any article card to view details
* If enhanced, toggle between "Original" and "AI Enhanced" versions
* View reference sources at the bottom of enhanced articles
* Filter articles by "All", "Enhanced", or "Original"

---

## 🔌 API Endpoints

### Articles

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/articles` | Get all articles |
| GET | `/api/articles/{id}` | Get single article |
| POST | `/api/articles` | Create new article |
| PUT | `/api/articles/{id}` | Update article |
| DELETE | `/api/articles/{id}` | Delete article |
| POST | `/api/articles/scrape` | Trigger web scraping |

### Example API Requests

```bash
# Get all articles
curl http://127.0.0.1:8000/api/articles

# Trigger scraping
curl -X POST http://127.0.0.1:8000/api/articles/scrape

# Get single article
curl http://127.0.0.1:8000/api/articles/1

# Update article
curl -X PUT http://127.0.0.1:8000/api/articles/1 \
  -H "Content-Type: application/json" \
  -d '{"is_updated": true, "updated_content": "Enhanced content"}'
```

---

## 📁 Project Structure

```
beyond-blogs/
├── backend/                    # Laravel Backend
│   ├── app/
│   │   ├── Http/
│   │   │   └── Controllers/
│   │   │       └── ArticleController.php
│   │   ├── Models/
│   │   │   └── Article.php
│   │   └── Services/
│   │       └── ScraperService.php
│   ├── database/
│   │   ├── migrations/
│   │   │   └── 2025_12_29_052738_create_articles_table.php
│   │   └── database.sqlite
│   ├── routes/
│   │   └── api.php
│   ├── bootstrap/
│   │   └── app.php
│   ├── .env
│   ├── composer.json
│   └── README.md
│
├── enhancement-script/         # Node.js Enhancement Bot
│   ├── enhancer.js
│   ├── .env
│   ├── package.json
│   └── README.md
│
├── frontend/                   # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── README.md
│
├── .gitignore
└── README.md                   # This file
```

---

## ✨ Features Implemented

### Phase 1: Web Scraping & CRUD APIs ✅

* Web scraping with Symfony HTTP Client
* Navigate to last page of blog
* Extract 5 oldest articles
* SQLite database integration
* Complete RESTful CRUD API
* Structured JSON responses
* Error handling with fallback sample articles

### Phase 2: AI Enhancement ✅

* Node.js-based enhancement script
* Fetch articles from Laravel API
* **Serper.dev Google Search API integration** for finding top-ranking content
* Automated content research with top 2 search results
* Cheerio-based web scraping of reference articles
* Groq AI (Llama 3.3 70B) integration
* Context-aware content enhancement learning from top-ranking articles
* Reference citation system with source URLs
* Update articles via Laravel API
* Rate limiting and comprehensive error handling

### Phase 3: React Frontend ✅

* Modern React 18 application
* Responsive design (mobile-friendly)
* Article dashboard with cards
* Statistics display
* Filter system (All/Enhanced/Original)
* Article detail modal
* Original vs Enhanced toggle
* Reference links display
* Loading states
* Error handling
* Professional UI/UX with Tailwind CSS
* Gradient backgrounds and animations

---

## 🎨 UI/UX Highlights

* **Modern Design**: Gradient backgrounds and smooth transitions
* **Card-Based Layout**: Clean article cards with hover effects
* **Responsive**: Works perfectly on mobile, tablet, and desktop
* **Interactive Stats**: Real-time article statistics with color coding
* **Modal View**: Full-screen article reading experience
* **Toggle System**: Easy switch between original and enhanced content
* **Reference Display**: Clean presentation of source articles
* **Loading States**: Smooth loading indicators and spinners
* **Color Coding**: Blue for total, green for enhanced, orange for pending

---

## 🌐 Deployment

### Backend (Railway / Render)

**Railway (Recommended)**:

1. Install Railway CLI: `npm install -g @railway/cli`
2. Login: `railway login`
3. Initialize: `railway init`
4. Add environment variables in Railway dashboard:
   * `APP_KEY` (from your .env)
   * `DB_CONNECTION=sqlite`
5. Deploy: `railway up`

### Frontend (Vercel)

1. Install Vercel CLI: `npm install -g vercel`
2. Deploy: `cd frontend && vercel`
3. Update API_URL in `src/App.js` to your Railway URL
4. Redeploy: `vercel --prod`

### Enhancement Script

Run manually or schedule with cron/GitHub Actions

---

## 🐛 Troubleshooting

### Issue: PHP SQLite extension not found

**Solution**: Enable `extension=pdo_sqlite` and `extension=sqlite3` in `php.ini`

### Issue: Scraping returns no results

**Solution**: The scraper includes fallback sample articles if the website structure changes

### Issue: Tailwind CSS not working

**Solution**: Make sure you have Tailwind v3 installed: `npm install -D tailwindcss@3.4.1`

### Issue: Groq API rate limit

**Solution**: Groq has generous free tier limits. Add delays between requests if needed

### Issue: Serper.dev API errors

**Solution**: 
- Verify your API key is correct in `.env`
- Check you haven't exceeded free tier (2,500 queries)
- Serper.dev returns results in 1-2 seconds; if slower, check your network

### Issue: CORS errors

**Solution**: Ensure `bootstrap/app.php` has CORS middleware configured

---

## 🔑 API Keys Setup Guide

This project uses two FREE APIs:

### 1. Groq API (AI Enhancement)

**Purpose**: Powers the AI content enhancement using Llama 3.3 70B model

**Get Your Key**:
1. Visit https://console.groq.com/keys
2. Sign up for a free account
3. Generate a new API key
4. Copy and paste into `enhancement-script/.env` as `GROQ_API_KEY`

**Features**:
- FREE tier with generous limits
- Fast inference speeds
- Access to powerful Llama models

### 2. Serper.dev API (Google Search)

**Purpose**: Provides Google search results to find top-ranking articles

**Get Your Key**:
1. Visit https://serper.dev/api-keys
2. Sign up for a free account (no credit card required)
3. Get your API key from the dashboard
4. Copy and paste into `enhancement-script/.env` as `SERPER_API_KEY`

**Features**:
- FREE tier: 2,500 queries
- Lightning-fast: 1-2 second responses
- After free tier: Only $0.30 per 1,000 queries
- Comprehensive search data (web, images, news, etc.)

---

## 📝 Development Timeline

This project was developed over 3 days with frequent commits:

* **Day 1**: Laravel backend setup, database, CRUD APIs, web scraping with Symfony
* **Day 2**: Node.js enhancement script, Serper.dev Google search integration, Groq AI integration
* **Day 3**: React frontend, UI/UX with Tailwind, testing, documentation

See commit history for detailed development journey.

---

## 🔄 How the Enhancement Works

The enhancement process uses a sophisticated workflow:

1. **Article Retrieval**: Fetch unenhanced articles from Laravel API
2. **Search Phase**: 
   - Use Serper.dev API to search Google for the article title
   - Get the top 2 ranking articles from Google's search results
3. **Content Extraction**:
   - Scrape full content from the top 2 URLs using Cheerio
   - Extract clean text without HTML tags
4. **AI Enhancement**:
   - Send original article + reference articles to Groq AI
   - AI learns from high-ranking content patterns
   - Generate enhanced version that improves quality while maintaining the original message
5. **Update & Store**:
   - Save enhanced content via Laravel API
   - Store reference URLs for citation
   - Mark article as enhanced

This approach ensures the AI has real-world, high-quality examples to learn from, resulting in better enhancements.

---

## 🔑 Why Groq + Serper.dev?

### Why Groq Instead of OpenAI?

This project uses **Groq** for several reasons:

1. **FREE**: No credit card required, generous free tier
2. **Fast**: Extremely fast inference speeds
3. **Open Source Models**: Uses Llama 3.3 70B
4. **Same API Format**: Compatible with OpenAI SDK
5. **Great for Development**: Perfect for learning and prototyping

To switch to OpenAI later, simply:
1. Get OpenAI API key
2. Update `.env`: `OPENAI_API_KEY=sk-...`
3. Update `enhancer.js`: Remove `baseURL` and change model to `gpt-3.5-turbo`

### Why Serper.dev Instead of Direct Scraping?

**Serper.dev** provides several advantages over traditional Google scraping:

1. **Reliable**: No CAPTCHA or IP blocking issues
2. **Fast**: 1-2 second response times
3. **Legal**: Official API, not web scraping
4. **Structured Data**: Clean JSON responses
5. **Affordable**: 2,500 free queries, then $0.30/1k
6. **Maintained**: Always works even when Google changes

**Alternative**: If you prefer direct scraping, you could use Puppeteer or Playwright, but you'll face:
- CAPTCHA challenges
- IP blocking
- Slower performance
- Maintenance overhead when Google changes

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🤝 Acknowledgments

* **BeyondChats** - For providing this challenging assignment
* **Groq** - For free, fast AI API
* **Serper.dev** - For reliable, affordable Google Search API
* **Laravel Community** - For excellent documentation
* **React Team** - For the amazing framework
* **Tailwind CSS** - For beautiful, utility-first styling

---

## 👤 Author

**Sahil Rafiq**

* Email: sahilrafiq479@gmail.com
* GitHub: [@sahilrafiq](https://github.com/sahilrafiq)
* LinkedIn: [Sahil Rafiq](https://www.linkedin.com/in/sahil-rafiq)

---

**⭐ If you found this project interesting, please consider giving it a star!**

---

*Built with ❤️ by Sahil Rafiq*