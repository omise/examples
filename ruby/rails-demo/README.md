![Omise](https://omise-cdn.s3.amazonaws.com/artwork/powered_by_omise_bordered.png)

## Rails demo using Omise Payment Gateway

Simple rails application that implements credit card checkout with Omise Payment Gateway.
Use this example application as a base for your rails web applications.

## Flow

In the front end it sends card via omise.js, and on the backend it makes the charge.
The charge is stored on charges model.

## Features

- Tokenize card via Omise.js
- Create charges from token

## TODO

- Customer (Save card to a customer profile)
- Add Refunds (Full or Partial)
- Add transfer (Withdrawing funds)
- Disputes
