# Omise Source Code Examples

Examples for implementing Omise Payment Gateway using various libraries

### [/PHP](examples/blob/master/PHP)

> example using [omise-php](https://github.com/omise/omise-php) libraries

This contains a front end form with the credit card which generates the token. The token is sent to the checkout.php (server side) for creating a charge with Omise using the Secret Key.

### [/PHP-step-by-step](examples/blob/master/PHP-step-by-step)

> example from [step-by-step](https://www.omise.co/th/step-by-step-guide) document guide

This contains only 2 files

* [index.html](examples/blob/master/PHP-step-by-step/index.html) for payment form
* [checkout.php](examples/blob/master/PHP-step-by-step/checkout.php) to request charge API


Be sure to change all `PUBLIC_KEY` and `SECRET_KEY` found in the [dashboard](https://dashboard.omise.co/test/api-keys) in both index.html and checkout.php file

### [/Spree_Rails](examples/blob/master/spree_rails)

> example using [ActiveMerchant](https://github.com/Shopify/active_merchant/)

A demo store using Spree and Omise-ActiveMerchant plugin
