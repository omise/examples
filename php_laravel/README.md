# Omise Laravel

This is a example project about using Opn Payment.

It has some examples.
- Credit Card Payment
- PayPay
- Google Payment

## How to implement Credit Card Payment

In order to run a charge, you need to implement
- Create a token for credit card
- Call Charge API using this token.

Please refer this page.

https://docs.opn.ooo/tokens-api/japan

https://docs.opn.ooo/charges-api/japan


## How to implement PayPay

There are two ways.
- Create Source, then create charge using this source.
- Create Source and Charge at the same time.

Please refer this page.

https://docs.opn.ooo/paypay/japan


## How to implement Google Payment

- Add Google payment button.
- Get Google Payment token.
- Call Omise Token by using Google Payment Token
- Call Omise Charge API.

Please refer this page.

https://developers.google.com/pay/api/web/guides/resources/demos?hl=ja

https://docs.opn.ooo/ja/googlepay/japan#part-49380a7c4a55a530


# Requirements
To follow along, you will need:

An Omise account (and your $OMISE_PUBLIC_KEY and $OMISE_SECRET_KEY)

This example project use this PHP and Laravel version

- PHP 8.1
- Laravel 10.10
- mysql 8.1

# Instration
The first step is to clone the repo:

```
git clone git@github.com:omise/examples.git
```

Change to the `php_laravel` directory. 

```
cd examples/php
```

Run this command to install libraries

```
composer install/update
```

Run a migration command after setting up database;

```
php artisan migrate
```

## Configuration

Environment variables are a good way to prevent secret keys from leaking into your code (see The Twelve-Factor App). Use the `.env.example` template to create your `.env`.

https://dashboard.omise.co/v2/settings/keys

Your `.env` should now look like this:

```
APP_NAME=Laravel
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://localhost

LOG_CHANNEL=stack
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=debug

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=root
DB_PASSWORD=

BROADCAST_DRIVER=log
CACHE_DRIVER=file
FILESYSTEM_DISK=local
QUEUE_CONNECTION=sync
SESSION_DRIVER=file
SESSION_LIFETIME=120

MEMCACHED_HOST=127.0.0.1

REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

MAIL_MAILER=smtp
MAIL_HOST=mailpit
MAIL_PORT=1025
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS="hello@example.com"
MAIL_FROM_NAME="${APP_NAME}"

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=
AWS_USE_PATH_STYLE_ENDPOINT=false

PUSHER_APP_ID=
PUSHER_APP_KEY=
PUSHER_APP_SECRET=
PUSHER_HOST=
PUSHER_PORT=443
PUSHER_SCHEME=https
PUSHER_APP_CLUSTER=mt1

VITE_APP_NAME="${APP_NAME}"
VITE_PUSHER_APP_KEY="${PUSHER_APP_KEY}"
VITE_PUSHER_HOST="${PUSHER_HOST}"
VITE_PUSHER_PORT="${PUSHER_PORT}"
VITE_PUSHER_SCHEME="${PUSHER_SCHEME}"
VITE_PUSHER_APP_CLUSTER="${PUSHER_APP_CLUSTER}"
OMISE_PUBLIC_KEY="pkey_test_xxxxx"
OMISE_SECRET_KEY="skey_test_xxxxx"


```

Replace the values for OMISE_PUBLIC_KEY and OMISE_SECRET_KEY with your keys. They can be found on your Omise Dashboard. After logging in, click "Keys" in the lower-left corner. Copy and paste them into this file.

At this point, you should be able to run the app by typing the following and hitting ENTER:

```
php artisan serve
```

You can see example app via this URL.
http://localhost:8000/

# Test Credit Card

You can use test credit card on test mode.

You can find them at the following page.

https://www.omise.co/api-testing



