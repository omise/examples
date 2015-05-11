<?php
// Include autoload class.
require_once 'vendor/autoload.php';

/* Defined OMISE KEYS */
define('OMISE_PUBLIC_KEY', 'pkey_test');
define('OMISE_SECRET_KEY', 'skey_test');

if (isset($_POST['omise_token'])) {
    try {
        
        $charge = OmiseCharge::create(array('amount'      => '100000',
                                            'currency'    => 'thb',
                                            'card'        => $_POST['omise_token'],
                                            'description' => 'Got it from try-omise-php repository in Github'));  

        // Output check.
        echo "<h3>Charged status.</h3>";
        echo "Object - ".$charge['object'].'<br/>';
        echo "Authorized - ".($charge['authorized'] ? 'true' : 'false').'<br/>';
        echo "Capture - ".($charge['capture'] ? 'true' : 'false').'<br/>';
        echo "Captured - ".($charge['captured'] ? 'true' : 'false').'<br/>';
        echo "<h3>print_r function.</h3>";
        echo "<pre>";
        print_r($charge);
        echo "</pre>";
    } catch (OmiseException $e) {
        echo 'Error <strong>'.$e->getMessage().'</strong><br/>Please try again.';
    }   
} else {
    echo "Not support GET request.";
}
