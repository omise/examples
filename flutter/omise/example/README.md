# Omise Flutter examples

This is a example project by using Omise for Flutter.

# Requirements

See README at parent directory.

# Configuration

Environment variables are a good way to prevent secret keys from leaking into your code (see The Twelve-Factor App). Use the `.env.example` template to create your `.env`.

https://dashboard.omise.co/v2/settings/keys

Your `.env` should now look like this:

```
OMISE_PUB_KEY="pkey_test_xxxxxx"
API_HOST="http://localhost:3000"
API_HOST_ANDROID="http://10.0.2.2:3000"
```

Replace the values for OMISE_PUB_KEY with your key. They can be found on your Omise Dashboard. After logging in, click "Keys" in the lower-left corner. Copy and paste them into this file.

# API

This example needs a backend API.
This use this backend API.

https://github.com/opn-ooo/omise_example_prroject/tree/master/nextjs

# Install library.

You can run all of libraries by this command.

```
flutter pub get
```

But you can install libraries by IDE function without running above command.
