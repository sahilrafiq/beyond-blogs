# Beyond Blogs

**AI-Powered Article Enhancement Platform** - Full Stack Web Developer Internship Assignment for BeyondChats

[![Laravel](https://img.shields.io/badge/Laravel-12.x-FF2D20?logo=laravel)](https://laravel.com)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react)](https://reactjs.org)
[![Node.js](https://img.shields.io/badge/Node.js-16.x+-339933?logo=node.js)](https://nodejs.org)
[![Groq](https://img.shields.io/badge/Groq-AI-orange)](https://groq.com)

## 👨‍💻 Developer

**Sahil Rafiq**
- GitHub: [@sahilrafiq](https://github.com/sahilrafiq)
- LinkedIn: [sahil-rafiq](https://www.linkedin.com/in/sahil-rafiq/)

---

## 🔗 Live Demo

**⚠️ Note**: The enhancement feature works perfectly locally using Groq AI and Serper API. Due to network/firewall restrictions in my development environment, there are intermittent connection issues with the live Railway deployment. The application demonstrates full functionality when run locally following the setup instructions.

- **Frontend (React)**: https://beyond-blog.netlify.app
- **Backend API (Laravel)**: https://beyond-blogs-production.up.railway.app
- **GitHub Repository**: https://github.com/sahilrafiq/beyond-blogs

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
              │  Google  │  │  Groq    │  │ Cheerio  │
              │  Search  │  │  AI API  │  │ Scraper  │
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
           ├─► Search Google for Title
           │         │
           │         ▼
           │   Get Top 2 Results
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
- **Laravel 12.x** - PHP Framework for RESTful APIs
- **SQLite** - Lightweight Database
- **Symfony HTTP Client** - For HTTP Requests
- **Symfony DOM Crawler** - For Web Scraping

### Phase 2: Enhancement Script (Node.js)
- **Node.js** - JavaScript Runtime
- **Axios** - HTTP Client for API Calls
- **Cheerio** - HTML Parsing for Web Scraping
- **Groq API** - Llama 3.3 70B for Content Enhancement (FREE)

### Phase 3: Frontend (React)
- **React 18** - UI Library
- **Tailwind CSS v3** - Utility-First CSS Framework
- **Lucide React** - Icon Library
- **Fetch API** - HTTP Client

---

## 📋 Prerequisites

Before you begin, ensure you have installed:

- **PHP** >= 8.1 with extensions:
  - `pdo_sqlite`
  - `sqlite3`
  - `fileinfo`
- **Composer** ([Download](https://getcomposer.org/download/))
- **Node.js** >= 16.x ([Download](https://nodejs.org/))
- **npm** or **yarn**
- **Git** ([Download](https://git-scm.com/downloads))
- **Groq API Key** - FREE ([Get it here](https://console.groq.com/keys))

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
LARAVEL_API_URL=http://127.0.0.1:8000/api
EOF

# Get your FREE Groq API key from: https://console.groq.com/keys
# Replace 'your_groq_api_key_here' with your actual key
```

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
   - Navigate to BeyondChats blog
   - Go to the last page
   - Extract the 5 oldest articles
   - Save them to the database
4. Articles will appear in the dashboard

### Step 2: Enhance Articles with AI

```bash
# In the enhancement-script directory
npm run enhance
```

The script will:
1. Fetch all un-enhanced articles from the Laravel API
2. For each article:
   - Search the article title on Google
   - Scrape content from the top 2 ranking articles
   - Send original + references to Groq AI (Llama 3.3 70B)
   - Get AI-enhanced content
   - Update the article via Laravel API
   - Add reference citations

**Note**: This process takes 2-5 minutes depending on the number of articles.

### Step 3: View Articles

- Click on any article card to view details
- If enhanced, toggle between "Original" and "AI Enhanced" versions
- View reference sources at the bottom of enhanced articles
- Filter articles by "All", "Enhanced", or "Original"

---

## 🔌 API Endpoints

### Articles

| Method | Endpoint | Description |
|--------|----------|-------------|
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
- [x] Web scraping with Symfony HTTP Client
- [x] Navigate to last page of blog
- [x] Extract 5 oldest articles
- [x] SQLite database integration
- [x] Complete RESTful CRUD API
- [x] Structured JSON responses
- [x] Error handling with fallback sample articles

### Phase 2: AI Enhancement ✅
- [x] Node.js-based enhancement script
- [x] Fetch articles from Laravel API
- [x] Google search automation
- [x] Scrape top 2 ranking articles
- [x] Groq AI (Llama 3.3 70B) integration
- [x] Content enhancement with context
- [x] Reference citation system
- [x] Update articles via API
- [x] Rate limiting and error handling

### Phase 3: React Frontend ✅
- [x] Modern React 18 application
- [x] Responsive design (mobile-friendly)
- [x] Article dashboard with cards
- [x] Statistics display
- [x] Filter system (All/Enhanced/Original)
- [x] Article detail modal
- [x] Original vs Enhanced toggle
- [x] Reference links display
- [x] Loading states
- [x] Error handling
- [x] Professional UI/UX with Tailwind CSS
- [x] Gradient backgrounds and animations

---

## 🎨 UI/UX Highlights

- **Modern Design**: Gradient backgrounds and smooth transitions
- **Card-Based Layout**: Clean article cards with hover effects
- **Responsive**: Works perfectly on mobile, tablet, and desktop
- **Interactive Stats**: Real-time article statistics with color coding
- **Modal View**: Full-screen article reading experience
- **Toggle System**: Easy switch between original and enhanced content
- **Reference Display**: Clean presentation of source articles
- **Loading States**: Smooth loading indicators and spinners
- **Color Coding**: Blue for total, green for enhanced, orange for pending

---

## 🌐 Deployment

### Backend (Railway / Render)

**Railway (Recommended)**:

1. Install Railway CLI: `npm install -g @railway/cli`
2. Login: `railway login`
3. Initialize: `railway init`
4. Add environment variables in Railway dashboard:
   - `APP_KEY` (from your .env)
   - `DB_CONNECTION=sqlite`
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

### Issue: CORS errors
**Solution**: Ensure `bootstrap/app.php` has CORS middleware configured

---

## 📝 Development Timeline

This project was developed over 3 days with frequent commits:

- **Day 1**: Laravel backend setup, database, CRUD APIs, web scraping with Symfony
- **Day 2**: Node.js enhancement script, Google search, Groq AI integration
- **Day 3**: React frontend, UI/UX with Tailwind, testing, documentation

See commit history for detailed development journey.

---

## 🔑 Why Groq Instead of OpenAI?

This project uses **Groq** instead of OpenAI for several reasons:

1. **FREE**: No credit card required, generous free tier
2. **Fast**: Extremely fast inference speeds
3. **Open Source Models**: Uses Llama 3.3 70B
4. **Same API Format**: Compatible with OpenAI SDK
5. **Great for Development**: Perfect for learning and prototyping

To switch to OpenAI later, simply:
1. Get OpenAI API key
2. Update `.env`: `OPENAI_API_KEY=sk-...`
3. Update `enhancer.js`: Remove `baseURL` and change model to `gpt-3.5-turbo`

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🤝 Acknowledgments

- **BeyondChats** - For providing this challenging assignment
- **Groq** - For free, fast AI API
- **Laravel Community** - For excellent documentation
- **React Team** - For the amazing framework
- **Tailwind CSS** - For beautiful, utility-first styling

---

## 👤 Author

**Sahil Rafiq**
- Email: sahilrafiq479@gmail.com
- GitHub: [@sahilrafiq](https://github.com/sahilrafiq)
- LinkedIn: [Sahil Rafiq](https://www.linkedin.com/in/sahil-rafiq)


---

**⭐ If you found this project interesting, please consider giving it a star!**

---

*Built with ❤️ by Sahil Rafiq*