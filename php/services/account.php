<?php include_once '../views/header.php'; ?>

<?php
// Include config file.
require_once '../config.php';

try {    
    $account = OmiseAccount::retrieve();  

    // Output check.
    echo '<a href="../" style="display:block; margin-top: 20px;">back</a>';
    echo "<h3>Account Object Status.</h3>";
    echo "Object - ".$account['object'].'<br/>';
    echo "<h3>print_r function.</h3>";
    echo "<pre>";
    print_r($account);
    echo "</pre>";
} catch (Exception $e) {
    echo '<a href="../" style="display:block; margin-top: 20px;">back</a>';
    echo "<h3>Account Object Status.</h3>";
    echo '<div class="alert alert-danger">Error <strong>'.$e->getMessage().'</strong><br/>Please try again.</div>';
}
?>

<?php include_once '../views/footer.php'; ?>