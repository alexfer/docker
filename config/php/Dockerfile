FROM php:8.4-fpm-alpine

RUN set -ex \
  && apk --no-cache add \
    busybox-extras \
    git \
    freetype-dev \
    libjpeg-turbo-dev \
    libpng-dev \
    libwebp-dev \
    libxpm-dev \
    postgresql-dev \
    libzip-dev \
    imagemagick \
    imagemagick-dev \
    libtool \
    curl \
    tidyhtml-dev \
    libmemcached-dev \
    wget \
    weasyprint \
    fontconfig \
    ttf-dejavu \
    bash \
    supervisor

RUN docker-php-ext-install mysqli pdo pdo_mysql opcache zip \
    && docker-php-ext-enable pdo_mysql

RUN docker-php-ext-install calendar \
    && docker-php-ext-enable calendar

RUN docker-php-ext-install tidy \
    && docker-php-ext-enable tidy

RUN docker-php-ext-configure gd --with-jpeg=/usr/include/ --with-freetype=/usr/include/ \
    && docker-php-ext-install gd \
    && docker-php-ext-enable gd

RUN docker-php-ext-configure pgsql -with-pgsql=/usr/local/pgsql \
    && docker-php-ext-install pgsql pdo_pgsql

RUN docker-php-ext-configure gd --enable-gd --with-webp --with-freetype --with-jpeg --with-xpm \
    && docker-php-ext-install gd

RUN docker-php-ext-configure intl \
    && docker-php-ext-install intl \
    && docker-php-ext-enable intl

RUN apk add --update --no-cache --virtual .build-dependencies $PHPIZE_DEPS \
    && cd /tmp && git clone --depth 1 https://github.com/Imagick/imagick.git && cd imagick \
    && sed -i 's/php_strtolower/zend_str_tolower/g' imagick.c \
    && phpize && ./configure && make && make install && ldconfig /usr/local/lib \
    && docker-php-ext-enable imagick \
    && pecl install apcu \
    && docker-php-ext-enable apcu \
    && pecl install memcache \
    && docker-php-ext-enable memcache \
    && pecl install redis \
    && docker-php-ext-enable redis \
    && pecl clear-cache \
    && apk del .build-dependencies

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN mkdir -p /var/log/supervisor

COPY crontab.txt /var/www/crontab.txt
RUN crontab /var/www/crontab.txt

# COPY supervisord.conf /etc/supervisord.conf
# COPY messenger-worker.ini /etc/supervisor/conf.d/messenger-worker.ini

WORKDIR /var/www/project

CMD ["php-fpm"]
