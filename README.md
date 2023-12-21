# Opn Payments Source Code Examples

Examples for implementing the Opn Payments Gateway using various libraries:

### PHP [omise-php](https://github.com/omise/omise-php)

The PHP example contains a front end form with the credit card that generates the token. The token is sent to `checkout.php` (server side) for creating a charge with Opn Payments using the Secret Key.

### Ruby on Rails - [ActiveMerchant](https://github.com/Shopify/active_merchant/)

A demo store using Spree and the Omise-ActiveMerchant plugin.

### Java

Example Java server receiving token generated using
[Omise.js](https://docs.opn.ooo/omise-js) and then creating a
[`Customer`](https://docs.opn.ooo/customers-api) object and charging it.

### ASP.NET Web Forms

Example ASP.NET Web Forms integration, with two pages. One using
[Omise.js](https://docs.opn.ooo/omise-js) for a customer to enter credit card details, another to
receive the form and charge the token.
