# FireBnb

1. Verify .env in main directory

## Laravel

1. Install dependencies for laravel project 
```bash
cd Laravel
```
```bash
docker run --rm \
    -u "$(id -u):$(id -g)" \
    -v "$(pwd):/var/www/html" \
    -w /var/www/html \
    laravelsail/php82-composer:latest \
    composer install --ignore-platform-reqs
```
2. start container
``` bash
docker compose up laravel
```
3. Copy .env.example into .env
```bash
cd ..
```
```bash
cp .env.example .env
```
4. Generate app key 
```bash 
docker exec -it firebnb-laravel-1 php artisan key:generate
```
5. Generate JWT secret
```bash
docker exec -it firebnb-laravel-1 php artisan jwt:secret
```

## Express.js

1. Copy .env.example into .env

## Django 

1. Copy .env.example into .env

# Starting app

each app can be run using:
```bash
docker compose up app_name
```

you can start all apps at once using:
```bash
docker compose up
```
