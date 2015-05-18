# Omise secret key used server side for making a charge
# KEEP IT SECRET
Omise.api_key = ENV["OMISE_SECRET"] || "skey_test_xxxxxxxxxxxxxxxxx"

# Omise Public key used for Tokenization in javascript
Omise.vault_key = "pkey_test_xxxxxxxxxxxxxxxxx"