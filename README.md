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
2. Copy .env.example into .env
3. Generate app key 
```bash 
docker exec -it firebnb-laravel-1 php artisan key:generate
```
4. Generate JWT secret
```bash
docker exec -it firebnb-laravel-1 php artisan jwt:secret
```
5. Your app should be running at `localhost:80` 


## Express.js

1. Copy .env.example into .env

## Django 

1. Copy .env.example into .env
