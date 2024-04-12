<?php session_start();
require_once 'includes/dbconfig.php';
include_once 'includes/functions.php';
define("SITE_KEY", 'asanko@farm');

if(isset($_POST['loginEmail']) && isset($_POST['loginPassword'])){
    $email = checkValues($_POST['loginEmail']);
    $password = checkValues($_POST['loginPassword']);
    if(checkEmail($email) == true){
        $password = hash('sha256',$password);
        $select = mysqli_query($con, "SELECT user_id FROM as_users WHERE email = '$email' AND password = '$password'");
        if($select){
            $total = mysqli_num_rows($select);
            if($total === 1){
                $row = mysqli_fetch_array($select);
                $id = $row['user_id'];
                $key=md5(SITE_KEY.$id); 
                $_SESSION['asanko_user_token'] = hash('sha256', $key);
                $_SESSION['asanko_user'] = base64_encode($id);
                echo 'logged';
            }
            else{
                echo 'noMatch';
            }
        }
        else{
            echo 'error';
        }
    }
    else{
        echo 'invalid';
    }
}
else{
    echo 'noData';
}