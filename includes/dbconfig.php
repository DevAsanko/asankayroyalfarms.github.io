<?php
$host = "localhost";
$user = "root";
$password = "";

$con = mysqli_connect($host,$user,$password);
mysqli_select_db($con,"asanko") OR DIE('could not connect to database');
