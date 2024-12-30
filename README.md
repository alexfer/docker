[![Stand With Ukraine](https://raw.githubusercontent.com/vshymanskyy/StandWithUkraine/main/banner2-direct.svg)](https://vshymanskyy.github.io/StandWithUkraine)

Creating and deploying postgres database
============
> [!IMPORTANT]
>  In the docker directory go over:
### Deploy source code

```shell
$ cd dev/project/
$ git clone git@github.com:alexfer/inno.git
$ cd rgfly
$ cp .env.dist .env # symfony configuration
$ composer install
$ npm install
$ npm run dev --watch
````
### Build docker
#### Run following commands and fill .env file:
````shell
$ cd docker
````
#### Fill out .env file:
````shell
$ cp .env.dist .env
$ docker-compose up -d --build
````
### Clear logs
````shell
./clear-logs.sh
````
### Create database & grant privileges to database
Login to postgres container:
````shell
$ docker exec -it postgres sh
psql -U postgres
````
Next step:
````sql
DROP ROLE IF EXISTS inno; -- optional
CREATE USER inno WITH password 'inno';
ALTER USER inno WITH SUPERUSER;
ALTER USER inno CREATEDB;
CREATE DATABASE inno OWNER inno;
GRANT ALL PRIVILEGES ON DATABASE inno TO inno;
````
Deploy database:
````shell
$ docker exec -it php bash
$ cd rgfly
$ rm -rfv src/Migrations/* # optional
$ php bin/console doctrine:database:drop --if-exists --force # optional
$ php bin/console doctrine:database:create # optional
$ php bin/console make:migration --no-interaction # optional
$ php bin/console doctrine:migrations:migrate --no-interaction
$ php bin/console doctrine:fixtures:load --no-interaction
$ php bin/console app:functions:import --no-interaction
````
Clear database Redis:
````shell
docker exec -it redis redis-cli FLUSHALL
````
