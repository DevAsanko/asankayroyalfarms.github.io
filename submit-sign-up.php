<?php session_start();
require_once 'includes/dbconfig.php';
include_once 'includes/functions.php';
define("SITE_KEY", 'asanko@farm');

if(isset($_POST['firstName']) && isset($_POST['surname']) 
&& isset($_POST['gender']) && isset($_POST['password'])
&& isset($_POST['c_password']) && isset($_POST['email'])
&& isset($_POST['phone'])){
    $firstname = checkValues($_POST['firstName']);
    $surname = checkValues($_POST['surname']);
    if(isset($_POST['otherName']) && !empty($_POST['otherName'])){
        $otherName = checkValues($_POST['otherName']);
    }
    else{
        $otherName = null;
    }
    $gender = checkValues($_POST['gender']);
    $password = checkValues($_POST['password']);
    $con_pass = checkValues($_POST['c_password']);
    $email = checkValues($_POST['email']);
    $phone = checkValues($_POST['phone']);

    if(checkEmail($email) == true){
        if($password == $con_pass){
            $password = hash('sha256', $password);
            $check_email = mysqli_query($con, "SELECT user_id FROM as_users WHERE email = '$email'");
            $total_email = mysqli_num_rows($check_email);
            if($total_email === 0){
                $insert = mysqli_query($con, "INSERT INTO as_users (first_name, surname, other_name, gender, password, email, phone)
                                                            VALUES('$firstname','$surname','$otherName','$gender','$password','$email','$phone')");
                if($insert){
                    $id = mysqli_insert_id($con);
                    $key=md5(SITE_KEY.$id); 
                    $_SESSION['asanko_user_token'] = hash('sha256', $key);
                    $_SESSION['asanko_user'] = base64_encode($id);
                    echo 'registered';
                }
                else{
                    echo 'error';
                }
            }
            else{
                echo 'exist';
            }
        }
        else{
            echo 'match';
        }
    }
    else{
        echo 'invalid';
    }
}
else{
    echo 'noData';
}