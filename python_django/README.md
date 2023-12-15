# Omise Django

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

https://docs.opn.ooo/ja/omise-js/japan


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

This example project use Python, Django and virtualenv.
- Python 3.7.1
- Django 3.2.21
- mysql 8.1
- virtualenv 20.20.0


# Instration
The first step is to clone the repo:

```
git clone git@github.com:omise/examples.git
```

Change to the `python_django` directory. 

```
cd examples/python_django
```

Run this command to make your virtual env.

```
virtualenv your_like_name
```

Enter your virtualenv

```
source your_like_name/bin/activate
```


Run this command to install libraries

```
pip install -r requirements.txt
```

Run a migration command after setting up database;

```
python manage.py migrate
```

## Configuration

Environment variables are a good way to prevent secret keys from leaking into your code (see The Twelve-Factor App). Use the `.env.example` template to create your `.env`.

https://dashboard.omise.co/v2/settings/keys

Your `.env` should now look like this:

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=django_db
DB_USERNAME=xxxx
DB_PASSWORD=xxxxxxx

SERVICE_HOST="http://localhost:8000"

OMISE_PUBLIC_KEY="pkey_test_xxxxxxxx"
OMISE_SECRET_KEY="skey_test_xxxxxxxx"
```

Replace the values for OMISE_PUBLIC_KEY and OMISE_SECRET_KEY with your keys. They can be found on your Omise Dashboard. After logging in, click "Keys" in the lower-left corner. Copy and paste them into this file.

At this point, you should be able to run the app by typing the following and hitting ENTER:

```
python manage.py runserver
```

You can see example app via this URL.
http://localhost:8000/omise/

# Test Credit Card

You can use test credit card on test mode.

You can find them at the following page.

https://www.omise.co/api-testing



