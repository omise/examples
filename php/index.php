<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.css" />
        <link rel="stylesheet" type="text/css" href="assets/css/app.css" />
    </head>
    
    <body>
        <div class="container">
            <h1>OMISE-PHP Sample Code</h1>
            <div class="row">
                <div class="col-xs-12">
                    <p>
                        <a href="https://github.com/omise/omise-php" target="_blank"><strong>OMISE-PHP</strong></a> is a library for connect with Omise Payment Gateway services (see more <a href="https://docs.omise.co/" target="_blank">https://docs.omise.co/</a>).
                        <br/>So, All of files in this directory will show you about the best pratice that you should do when try to implement **omise-php** into your project.
                    </p>
                </div> <!-- /END .col-xs-12 -->
            </div> <!-- /END .row -->

            <!--
                ...
                ...
                CHECKOUT FORM START HERE!
                ...
                ...
            -->
            <!-- Include Jquery and Omise libraries (necessary files, must be include) -->
            <script src="./assets/vendor/jquery/jquery-1.11.2.min.js"></script>
            <script src="https://cdn.omise.co/omise.js"></script>
            <script>
                // Set Omise Public Key (from omise.co > log in > Keys tab)
                Omise.setPublicKey("pkey_test");
            </script>

            <!--
            Create checkout form for collect a customer's card.
            Then, send it to Omise server for tokenize a card data (via omise.js)
            -->
            <form action="services/checkout.php" method="post" id="checkout">

                <h3>Checkout Form</h3>
                
                <!-- Error will append here if it has -->
                <div id="token_errors" class="">please input a card detail</div>

                <!-- Keep token from tokenize step here and resend the form again (see more below in javascript section) -->
                <input type="hidden" name="omise_token">

                <div class="row">
                    <div class="col-xs-12">
                        <!-- Collect a card holder name -->
                        <div>Card Holder Name <input type="text" data-omise="holder_name" value="Omise Team"></div>
                        
                        <!-- Collect a card number -->
                        <div>Card Number <input type="text" data-omise="number" value="4242424242424242"></div>
                        
                        <!-- Collect a card expire -->
                        <div>Card Date Experiment
                            <input type="text" data-omise="expiration_month" size="4" value="11"> /
                            <input type="text" data-omise="expiration_year" size="8" value="2020">
                        </div>
                        
                        <!-- Collect a card security code -->
                        <div>Security Code <input type="text" data-omise="security_code" size="8" value="123"></div>
                        
                        <span class="omise-circle" style=""></span>
                    </div> <!-- /END .col-xs-12 -->
                </div> <!-- /END .row -->

                <!-- Submit button -->
                <input type="submit" id="create_token" value="CHECKOUT">
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
            <!--
                ...
                ...
                CHECKOUT FORM END HERE!
                ...
                ...
            -->
            
            <h2 style="margin-top: 40px;">More practice...</h2>
            <ul>
                <li><a href="services/account.php">Retrieve Account</a></li>
                <li><a href="services/balance.php">Retrieve Balance</a></li>
            </ul>
            
            <!-- Footer Credit -->
            <footer>
                <div class="row">
                    <div class="col-xs-2">
                        <a title="Omise Gateway" href="https://www.omise.co/"><img alt="Omise Payment" src="assets/img/logo.png"></a>
                    </div>

                    <div class="col-xs-10 text-right">
                        <ul class="list-inline">
                            <li><a href="https://www.omise.co/about.html">About</a></li>
                            <li><a href="https://www.omise.co/blog">Blog</a></li>
                            <li><a href="https://www.omise.co/terms.html">Terms &amp; conditions</a></li>
                            <li><a href="https://www.omise.co/privacy.html">Privacy policy</a></li>
                            <li><a target="_blank" href="https://www.facebook.com/Omiseco">Facebook</a></li>
                            <li><a target="_blank" href="https://twitter.com/omise">Twitter</a></li>
                            <li><a target="_blank" href="https://www.linkedin.com/company/omise-co-ltd-">Linkedin</a></li>
                        </ul>
                    </div>
                </div>
            </footer>
        </div> <!-- /END .container -->
    </body>
</html>
