FROM php:8.3-fpm-alpine

RUN set -ex \
  && apk --no-cache add \
    busybox-extras \
    freetype-dev \
    libjpeg-turbo-dev \
    libpng-dev \
    libwebp-dev \
    libxpm-dev \
    postgresql-dev \
    libzip-dev \
    graphicsmagick \
    imagemagick \
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

RUN docker-php-ext-install tidy \
    && docker-php-ext-enable tidy

RUN docker-php-ext-configure gd --with-jpeg=/usr/include/ --with-freetype=/usr/include/ \
    && docker-php-ext-install gd \
    && docker-php-ext-enable gd

RUN docker-php-ext-configure pgsql -with-pgsql=/usr/local/pgsql \
    && docker-php-ext-install pgsql pdo_pgsql

RUN docker-php-ext-configure gd --enable-gd --with-webp --with-freetype --with-jpeg --with-xpm \
    && docker-php-ext-install gd

RUN docker-php-ext-configure intl && docker-php-ext-install intl

RUN docker-php-ext-enable intl

RUN set -eux; \
	apk add --no-cache imagemagick-dev; \
	curl -fL -o imagick.tgz 'https://pecl.php.net/get/imagick-3.7.0.tgz'; \
	echo '5a364354109029d224bcbb2e82e15b248be9b641227f45e63425c06531792d3e *imagick.tgz' | sha256sum -c -; \
	tar --extract --directory /tmp --file imagick.tgz imagick-3.7.0; \
	grep '^//#endif$' /tmp/imagick-3.7.0/Imagick.stub.php; \
	test "$(grep -c '^//#endif$' /tmp/imagick-3.7.0/Imagick.stub.php)" = '1'; \
	sed -i -e 's!^//#endif$!#endif!' /tmp/imagick-3.7.0/Imagick.stub.php; \
	grep '^//#endif$' /tmp/imagick-3.7.0/Imagick.stub.php && exit 1 || :; \
	docker-php-ext-install /tmp/imagick-3.7.0; \
	rm -rf imagick.tgz /tmp/imagick-3.7.0

RUN apk add --update --no-cache --virtual .build-dependencies $PHPIZE_DEPS \
        && pecl install apcu \
        && docker-php-ext-enable apcu \
        && pecl install memcached \
        && docker-php-ext-enable memcached \
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
