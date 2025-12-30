# Enhancement Script (Node.js)

## Setup
```bash
npm install
```

Create `.env`:
```
GROQ_API_KEY=your_key
LARAVEL_API_URL=http://127.0.0.1:8000/api
```

## Usage
```bash
npm run enhance
```

## Process

1. Fetches articles from Laravel API
2. Searches Google for titles
3. Scrapes top 2 results
4. Uses Groq AI to enhance
5. Updates via API