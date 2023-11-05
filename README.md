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
docker exec -it firebnb-laravel php artisan key:generate
```
4. Your app should be running at `localhost:80` 

