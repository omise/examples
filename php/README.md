# OMISE-PHP Sample Code
**[OMISE-PHP](https://github.com/omise/omise-php)** is a library for connect with Omise Payment Gateway services (see more https://docs.omise.co/).

So, All of files in this directory will show you about the best pratice that you should do when try to implement **omise-php** into your project.

## Requirements
- PHP 5.3 and above.
- Built-in libcurl support.

## Configuration
First thing that you need to concentrate after you downloaded this repository and unzip it to your local machine is **configuration** the Omise Keys.  
So, We have 2 files that you need to config it.
- `examples/php`/index.php
- `examples/php`/config.php 

### index.php
If you want to try to collect a customer's card for tokenize a card data to `token`, you need to config your `Omise Key Public` in this file.  
On line 32 in this file, you will see something like below
```javascript
30:   <script>
31:     // Set Omise Public Key (from omise.co > log in > Keys tab)
32:     Omise.setPublicKey("pkey_test");
33:   </script>
```
change `pkey_test` to your [`Omise Public Key for Test`](https://docs.omise.co/api/authentication/)

### config.php
If you want to try to use any Omise' services, you need to config your `Omise Key Public` and `Omise Key Secret` in this file.  
On line 6 - 7 in this file, you will see something like below
```php
5: /* Defined OMISE KEYS */
6: define('OMISE_PUBLIC_KEY', 'pkey_test');
7: define('OMISE_SECRET_KEY', 'skey_test');
```
change `pkey_test` to your [`Omise Public Key for Test`](https://docs.omise.co/api/authentication/),  
change `skey_test` to your [`Omise Secret Key for Test`](https://docs.omise.co/api/authentication/)


## Folder Structure
In this example, we have some files and folders that you need to concentrate about it, as follows
- `examples/php`/index.php
- `examples/php`/services/*

### index.php
This file will contain some `html` and `javascript` code for **[collect a customer's card and send it to Omise Server for tokenize a card data](https://docs.omise.co/collecting-card-information/) to [`token`](https://docs.omise.co/api/tokens/)** for use it to deal with **Omise Service**.

### services/*
This folder will contain sample php files that include `omise-php` library. It will show you how to integrate `omise-php` library into your php file and use it.

## Usage
Run an `index.php` in your browser