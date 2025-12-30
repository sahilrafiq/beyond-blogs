# Backend API (Laravel)

## Setup
```bash
composer install
cp .env.example .env
php artisan key:generate
touch database/database.sqlite  # Windows: type nul > database\database.sqlite
php artisan migrate
php artisan serve
```

## API Endpoints

- GET `/api/articles` - List all articles
- POST `/api/articles` - Create article
- GET `/api/articles/{id}` - Show article
- PUT `/api/articles/{id}` - Update article
- DELETE `/api/articles/{id}` - Delete article
- POST `/api/articles/scrape` - Scrape articles

## Test
```bash
curl http://127.0.0.1:8000/api/articles
```