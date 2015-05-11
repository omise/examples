# OMISE-PHP Sample Code
**[OMISE-PHP](https://github.com/omise/omise-php)** is a library for connect with Omise Payment Gateway services (see more https://docs.omise.co/).

So, all of files in this directory will show you about the best pratices that you should do when implementing  **omise-php** into your project.

## Requirements
- PHP 5.3 and above.
- Built-in libcurl support.

## Configuration
First thing that you need to concentrate after you downloaded this repository and unzip it to your local machine is **configuring** your Omise Keys.  
So, we have 2 files that you need to change:
- `examples/php`/index.php
- `examples/php`/config.php 

### index.php
To collect a customer's card data and exchange for a [`token`](https://docs.omise.co/api/tokens/), you need to config your `Omise Key Public` in this file.  
On line 32 in this file, you will see something like below
```javascript
30: <script>
31:   // Set Omise Public Key (from omise.co > log in > Keys tab)
32:   Omise.setPublicKey("pkey_test");
33: </script>
```
change `pkey_test` to your [`Omise Public Key for Test`](https://docs.omise.co/api/authentication/)

### config.php
On line 6 - 7 in this file, you will see something like below.  
To use all features in Omise, you need to configure both your `Omise Key Public` and `Omise Key Secret` in this file. The secret key should be kept safe, it is used to make a full charge from a token or to create a permanent customer to charge later, also every other permanent action on your account.  
```php
5: /* Defined OMISE KEYS */
6: define('OMISE_PUBLIC_KEY', 'pkey_test');
7: define('OMISE_SECRET_KEY', 'skey_test');
```
change `pkey_test` to your [`Omise Public Key for Test`](https://docs.omise.co/api/authentication/),  
change `skey_test` to your [`Omise Secret Key for Test`](https://docs.omise.co/api/authentication/)


## Folder Structure
In this example, we have some files and folder that you need to concentrate about, as follows:
- `examples/php`/index.php
- `examples/php`/services/*

### index.php
This file will contains `html` and `javascript` code for **[collecting a customer's card and send it to Omise Server for tokenizing the card](https://docs.omise.co/collecting-card-information/) into a  [`token`](https://docs.omise.co/api/tokens/)**.

### services/*
This folder contains sample php files that include `omise-php` library. It will show you how to integrate `omise-php` library into your php file and use it.

## Usage
Run `index.php` in your browser.

## Tips
You are not allowed to send the card data to your servers.
