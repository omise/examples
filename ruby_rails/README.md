# Omise Rails

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

This example project use this Ruby and Rails version

- Ruby 3.1.3
- Rails 7.0.7.2
- mysql 8.1

# Instration
The first step is to clone the repo:

```
git clone git@github.com:omise/examples.git
```

Change to the `ruby_rails` directory. 

```
cd examples/ruby_rails
```

Run this command to install libraries

```
bundle install
```

Run a migration command after setting up database;

```
bin/rails db:migrate
```

## Configuration

Environment variables are a good way to prevent secret keys from leaking into your code (see The Twelve-Factor App). Use the `development.sample.rb` template to create your `development.rb`.

https://dashboard.omise.co/v2/settings/keys

Your `development.rb` should now look like this:

```
require "active_support/core_ext/integer/time"


Rails.application.configure do
  # Settings specified here will take precedence over those in config/application.rb.

  # In the development environment your application's code is reloaded any time
  # it changes. This slows down response time but is perfect for development
  # since you don't have to restart the web server when you make code changes.
  config.cache_classes = false

  # Do not eager load code on boot.
  config.eager_load = false

  # Show full error reports.
  config.consider_all_requests_local = true

  # Enable server timing
  config.server_timing = true

  # Enable/disable caching. By default caching is disabled.
  # Run rails dev:cache to toggle caching.
  if Rails.root.join("tmp/caching-dev.txt").exist?
    config.action_controller.perform_caching = true
    config.action_controller.enable_fragment_cache_logging = true

    config.cache_store = :memory_store
    config.public_file_server.headers = {
      "Cache-Control" => "public, max-age=#{2.days.to_i}"
    }
  else
    config.action_controller.perform_caching = false

    config.cache_store = :null_store
  end

  # Store uploaded files on the local file system (see config/storage.yml for options).
  config.active_storage.service = :local

  # Don't care if the mailer can't send.
  config.action_mailer.raise_delivery_errors = false

  config.action_mailer.perform_caching = false

  # Print deprecation notices to the Rails logger.
  config.active_support.deprecation = :log

  # Raise exceptions for disallowed deprecations.
  config.active_support.disallowed_deprecation = :raise

  # Tell Active Support which deprecation messages to disallow.
  config.active_support.disallowed_deprecation_warnings = []

  # Raise an error on page load if there are pending migrations.
  config.active_record.migration_error = :page_load

  # Highlight code that triggered database queries in logs.
  config.active_record.verbose_query_logs = true

  # Suppress logger output for asset requests.
  config.assets.quiet = true

  config.host = "http://localhost:3000"

  config.omise_pub_key = "pkey_test_xxxxxx"
  config.omise_secret_key = "skey_test_xxxxx"

  # Raises error for missing translations.
  # config.i18n.raise_on_missing_translations = true

  # Annotate rendered view with file names.
  # config.action_view.annotate_rendered_view_with_filenames = true

  # Uncomment if you wish to allow Action Cable access from any origin.
  # config.action_cable.disable_request_forgery_protection = true
end

```

Replace the values for config.omise_pub_key and config.omise_secret_key with your keys. They can be found on your Omise Dashboard. After logging in, click "Keys" in the lower-left corner. Copy and paste them into this file.

At this point, you should be able to run the app by typing the following and hitting ENTER:

```
bin/rails s
```

You can see example app via this URL.
http://localhost:3000/

# Test Credit Card

You can use test credit card on test mode.

You can find them at the following page.

https://www.omise.co/api-testing



