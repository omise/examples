<?php include_once '../views/header.php'; ?>

<?php
// Include config file.
require_once '../config.php';

try {    
    $balance = OmiseBalance::retrieve();  

    // Output check.
    echo '<a href="../" style="display:block; margin-top: 20px;">back</a>';
    echo "<h3>Balance Object Status.</h3>";
    echo "Object - ".$balance['object'].'<br/>';
    echo "<h3>print_r function.</h3>";
    echo "<pre>";
    print_r($balance);
    echo "</pre>";
} catch (Exception $e) {
    echo 'Error <strong>'.$e->getMessage().'</strong><br/>Please try again.';
}
?>

<?php include_once '../views/footer.php'; ?>