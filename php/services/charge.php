<?php
include_once '../views/header.php';

// Include config file.
require_once '../config.php';

try {    
    $charge = OmiseCharge::retrieve('?limit=5');  

    // Output check.
    echo '<a href="../" style="display:block; margin-top: 20px;">back</a>';
    echo "<h3>Charge Object Status.</h3>";
    echo "Object - ".$charge['object'].'<br/>';
    echo "Total - ".$charge['total'].'<br/>';
    echo "Limit - ".$charge['limit'].'<br/>';
    echo "Offset - ".$charge['offset'].'<br/>';
    echo "<h3>print_r function.</h3>";
    echo "<pre>";
    print_r($charge);
    echo "</pre>";
} catch (Exception $e) {
    echo '<a href="../" style="display:block; margin-top: 20px;">back</a>';
    echo "<h3>Charge Object Status.</h3>";
    echo '<div class="alert alert-danger">Error <strong>'.$e->getMessage().'</strong><br/>Please try again.</div>';
}
?>

<?php include_once '../views/footer.php'; ?>