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
    libsqlite3-dev \
    && rm -rf /var/lib/apt/lists/*

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

# Create startup script
RUN echo '#!/bin/bash\n\
echo "Setting up database..."\n\
touch database/database.sqlite\n\
chmod 666 database/database.sqlite\n\
echo "Running migrations..."\n\
php artisan migrate --force\n\
echo "Starting server..."\n\
php artisan serve --host=0.0.0.0 --port=${PORT:-8000}' > /start.sh && \
chmod +x /start.sh

# Set permissions
RUN chmod -R 777 storage bootstrap/cache database

# Expose port
EXPOSE 8000

# Use startup script
CMD ["/start.sh"]