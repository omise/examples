# Omise golang example

This is a example project about using Opn Payment.

It has some examples.
- Credit Card Payment
- PayPay

## Requirements
To follow along, you will need:

An Omise account (and your $OMISE_PUBLIC_KEY and $OMISE_SECRET_KEY)

- golang 1.16

# Instration
The first step is to clone the repo:

```
git clone git@github.com:omise/examples.git
```

Change to the `go` directory. 

```
cd examples/go
```

Run this command to install libraries

```
go get
```

Run a migration command after setting up database;

```
migrate -path db -database "mysql://[database_user]:[database_password]@tcp([database_host]:[database_port])/[database_name]" up
```

## Configuration

Environment variables are a good way to prevent secret keys from leaking into your code (see The Twelve-Factor App). Use the `.env.example` template to create your `.env`.

https://dashboard.omise.co/v2/settings/keys

Your `.env` should now look like this:

```
DB_USER=root
DB_PASS=
DB_NAME=go_db
DB_HOST=localhost
DB_PORT=3306
OMISE_PUB_KEY=pkey_test_sssss
OMISE_SEC_KEY=skey_test_xxxxxx
PORT=8888
SSL=false
API_VERSION=1
```

Replace the values for OMISE_PUBLIC_KEY and OMISE_SECRET_KEY with your keys. They can be found on your Omise Dashboard. After logging in, click "Keys" in the lower-left corner. Copy and paste them into this file.

At this point, you should be able to run the app by typing the following and hitting ENTER:

```
go run main.go
```

Then, you can run charge API and retrieve charge API.
These are curl examples.

Retrieve Charge.

```
curl http://localhost:8888/charge/[PaymentId]
```

Create PayPay Charge.(It is just sample.)

```
curl --location 'http://localhost:8888/charge/paypay' \
--header 'Content-Type: application/json' \
--data '{
    "payment_id":"aaabbbccc",
    "payment_type":"paypay",
    "return_url":"http://localhost:3000/paypay-return?payment_id=aaabbbccc",
    "currency":"jpy",
    "amount":100
    
}'
```

## About migrate command

For mysql, it need to specify tcp@(host:port)

https://github.com/golang-migrate/migrate/tree/master/database/mysql#mysql

