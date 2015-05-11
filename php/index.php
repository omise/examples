<html>
    <head>
        <!-- Include Jquery and Omise libraries (necessary files, it must be include) -->
        <script src="./assets/vendor/jquery/jquery-1.11.2.min.js"></script>
        <script src="https://cdn.omise.co/omise.js"></script>
        <script>
            // Set Omise Public Key (from omise.co > log in > Keys tab)
            Omise.setPublicKey("pkey_test");
        </script>
    </head>
    
    <body>
        <!--
            Create checkout form for collect a customer card and send it into Omise server for tokenize a card data (via omise.js)
        -->
        <form action="checkout.php" method="post" id="checkout">

            <h1>Checkout Form</h1>
            <!-- Error will pop here if it has -->
            <div id="token_errors" class="">please input a card detail</div>

            <!-- Keep token from tokenize step here and resend the form again (see more below in javascript section) -->
            <input type="hidden" name="omise_token">

            <!-- Collect a card holder name -->
            <div>
                Card Holder Name
                <input type="text" data-omise="holder_name" value="Omise Team">
            </div>
            
            <!-- Collect a card number -->
            <div>
                Card Number
                <input type="text" data-omise="number" value="4242424242424242">
            </div>
            
            <!-- Collect a card expire -->
            <div>
                Card Date Experiment
                <input type="text" data-omise="expiration_month" size="4" value="11"> /
                <input type="text" data-omise="expiration_year" size="8" value="2020">
            </div>
            
            <!-- Collect a card security code -->
            <div>
                Security Code
                <input type="text" data-omise="security_code" size="8" value="123">
            </div>

            <input type="submit" id="create_token">
        </form>

        <!-- Tokenize a card -->
        <script>
            $("#checkout").submit(function () {
                
                $("#token_errors").html('submitting...');
                
                var form = $(this);

                // Disable the submit button to avoid repeated click.
                form.find("input[type=submit]").prop("disabled", true);

                // Serialize the form fields into a valid card object.
                var card = {
                    "name": form.find("[data-omise=holder_name]").val(),
                    "number": form.find("[data-omise=number]").val(),
                    "expiration_month": form.find("[data-omise=expiration_month]").val(),
                    "expiration_year": form.find("[data-omise=expiration_year]").val(),
                    "security_code": form.find("[data-omise=security_code]").val()
                };

                // Send a request to create a token then trigger the callback function once
                // a response is received from Omise.
                //
                // Note that the response could be an error and this needs to be handled within
                // the callback.
                Omise.createToken("card", card, function (statusCode, response) {
                    if (response.object == "error") {
                        // Display an error message.
                        $("#token_errors").html(response.message);

                        // Re-enable the submit button.
                        form.find("input[type=submit]").prop("disabled", false);
                    } else {
                        // Then fill the omise_token.
                        form.find("[name=omise_token]").val(response.id);
                        
                        $("#token_errors").addClass('success').html('Tokenize succeed... It will redirect to checkout page in 3 second.');

                        setTimeout(function(){
                            form.get(0).submit();
                        }, 3000);
                        // And submit the form.
                    };
                });

                // Prevent the form from being submitted;
                return false;
            });
        </script>

        <style type="text/css">
            body { font: 13px/1.4 Helvetica, arial, nimbussansl, liberationsans, freesans, clean, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol"; }
            form { background: #f5f5f5; padding: 10px; font-size: 14px; }
            form > div { padding: 10px 0; }
            form input { margin-left: 8px; padding: 4px; border: 1px solid #eee; font-size: 13px; }
            form input[type=submit] { margin-left: 0px; margin-top: 20px; padding: 10px; color: #fff; border-radius: 3px; background: #3d3d3d; }

            #token_errors { background: #fff; color: #3d3d3d; border-radius: 4px; padding: 10px; font-size: 15px; }
            .success { background: #80D700 !important; color: #fff !important;  }
        </style>
    </body>
</html>
