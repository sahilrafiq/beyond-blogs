FROM php:8.4-cli

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    sqlite3 \
    libsqlite3-dev

# Install PHP extensions
RUN docker-php-ext-install pdo pdo_sqlite mbstring exif pcntl bcmath gd

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /app

# Copy application files
COPY . .

# Install dependencies
RUN composer install --no-dev --optimize-autoloader

# Create data directory for persistent storage
RUN mkdir -p /data

# Set permissions
RUN chmod -R 777 storage bootstrap/cache database /data

# Expose port
EXPOSE 8000

# Create startup script that initializes database
RUN echo '#!/bin/sh\n\
if [ ! -f /data/database.sqlite ]; then\n\
    echo "Creating new database..."\n\
    touch /data/database.sqlite\n\
    php artisan migrate --force\n\
fi\n\
ln -sf /data/database.sqlite database/database.sqlite\n\
php artisan serve --host=0.0.0.0 --port=${PORT:-8000}' > /start.sh && \
chmod +x /start.sh

CMD ["/start.sh"]