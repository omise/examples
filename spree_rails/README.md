# Spree Ecommerce Demo with Omise

This a Spree Rails application using Omise ActiveMerchant gateway plugin.

Tested with Spree Stable and ActiveMerchant 1.47.0, which uses our Omise branch: [omise-1.47.0](https://github.com/omise/active_merchant/tree/omise-1.47.0) 

Support in mainstream ActiveMerchant is currently under Pull Request review.

## Instructions

### Features

1. Create a token using Omise.js and charge the card using token.
2. Use token to save customer on database and charge the card anytime (Spree Card Profile)
3. Full Void
4. Partial Refunds

### Setup

If you already have a Spree store, just add the following to Gemfile

```ruby
# For spree version 3.0.0
gem 'activemerchant', github: 'omise/active_merchant', branch: 'omise-1.47.0'
gem 'spree-omise', github: 'omise/spree-omise'
```

To start with a fresh store:

```
git clone git@github.com:omise/spree_demo.git
cd spree_demo
bundle install
cp config/database.yml.sample config/database.yml
bundle exec rake db:create
bin/rake railties:install:migrations
bin/rake db:migrate
bin/rake db:seed
bin/rake spree_sample:load
bin/rake secret
```
copy the output from `bin/rake secret` command
and set it as a value of `secret_key_base` key in config/secrets.yml for a running environment
( more details http://guides.rubyonrails.org/upgrading_ruby_on_rails.html#config-secrets-yml )

### Start Server

```
bin/rails server
```

### Configure

Navigate to admin page and do the following:

1. Set default currency as a Thai Baht in Currency Settings

![Currency Settings](https://omise-cdn.s3.amazonaws.com/assets/spree/currency.png)

2. Add a new Payment Method, go to Configurations > Payment Methods (/admin/payment_methods/new)

![Add New Payment](https://omise-cdn.s3.amazonaws.com/assets/spree/add_new_payment.png)

3. Edit Payment Method and add your API Keys

![Add API Keys](https://omise-cdn.s3.amazonaws.com/assets/spree/set_keys.png)


And your customers can now checkout with Omise Payment Gateway.

![Checkout](https://omise-cdn.s3.amazonaws.com/assets/spree/checkout.png)
![Checkout](https://omise-cdn.s3.amazonaws.com/assets/spree/succeed_order.png)
