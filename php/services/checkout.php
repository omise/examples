<?php include_once '../views/header.php'; ?>

<?php
// Include config file.
require_once '../config.php';

if (isset($_POST['omise_token'])) {
    try {
        // Charge a card.
        $charge = OmiseCharge::create(array('amount'      => '100000',
                                            'currency'    => 'thb',
                                            'card'        => $_POST['omise_token'],
                                            'description' => 'Got it from try-omise-php repository in Github'));  

        // Output check.
        echo '<a href="../" style="display:block; margin-top: 20px;">back</a>';
        echo '<h3>Charged status.</h3>';
        echo 'Object - '.$charge['object'].'<br/>';
        echo 'Authorized - '.($charge['authorized'] ? 'true' : 'false').'<br/>';
        echo 'Capture - '.($charge['capture'] ? 'true' : 'false').'<br/>';
        echo 'Captured - '.($charge['captured'] ? 'true' : 'false').'<br/>';
        echo '<h3>print_r function.</h3>';
        echo '<pre>';
        print_r($charge);
        echo "</pre>";
    } catch (OmiseException $e) {
        echo '<a href="../" style="display:block; margin-top: 20px;">back</a>';
        echo '<div class="alert alert-danger">Error <strong>'.$e->getMessage().'</strong><br/>Please try again.</div>';
    }   
} else {
    echo '<div class="alert alert-warning">Not support GET request.</div>';
}
?>

<?php include_once '../views/footer.php'; ?>