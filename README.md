# Omise Source Code Examples

Examples for implementing Omise Gateway using various libraries

### PHP [omise-php](https://github.com/omise/omise-php)

The PHP example contains a front end form with the credit card which generates the token. The token is send to the checkout.php (server side) for creating a charge with Omise using the Secret Key.

### Ruby on Rails - [ActiveMerchant](https://github.com/Shopify/active_merchant/)

A demo store using Spree and Omise-ActiveMerchant plugin

### Java

Example Java server receiving token generated using
[Card.js](https://www.omise.co/card-js-api) and then creating a
[`Customer`](https://www.omise.co/customers-api) object and charging it.

### ASP.NET Web Forms

Example ASP.NET Web Forms integration, with two pages. One using
[Card.js](https://www.omise.co/card-js-api) for customer to enter credit card, another to
receive the form and charging the token.
