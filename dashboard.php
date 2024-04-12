<?php session_start();
require_once 'includes/dbconfig.php';
include_once 'includes/functions.php';
define("SITE_KEY", 'asanko@farm');

if(isset($_SESSION['asanko_user_token']) && isset($_SESSION['asanko_user'])){
    $user_id = base64_decode($_SESSION['asanko_user']);
    $key=md5(SITE_KEY.$user_id); 
    $token = hash('sha256', $key);
    if($token == $_SESSION['asanko_user_token']){

    $select_user = mysqli_query($con, "SELECT user_id, first_name, surname, other_name, gender, email, phone FROM as_users WHERE user_id = '$user_id'");
    $user_row = mysqli_fetch_array($select_user);

    $firstname = $user_row['first_name'];

    // $select_account = mysqli_query($con, "SELECT * FROM tbl_fx_account_details WHERE fx_username = '$username'");
    // $account_row = mysqli_fetch_array($select_account);

    // $select_crypto_account = mysqli_query($con, "SELECT * FROM tbl_fx_crypto_details WHERE fx_username = '$username'");
    // $crypto_row = mysqli_fetch_array($select_crypto_account);

    // $select_package = mysqli_query($con, "SELECT * FROM tbl_fx_investment WHERE fx_user_id = '$user_id' AND fx_type = 'cash'");

    // $select_crypto_package = mysqli_query($con, "SELECT * FROM tbl_fx_investment WHERE fx_user_id = '$user_id' AND fx_type = 'crypto'");

    // //select and add all active packages
    // $cash_package = 0;
    // while($package_row = mysqli_fetch_array($select_package)){
    //     if($package_row['fx_confirmed'] == 1){
    //         $cash_package = $cash_package + (int)$package_row['fx_package'];
    //     }
    // }

    // $crypto_package = 0;
    // while($crypto_package_row = mysqli_fetch_array($select_crypto_package)){
    //     if($package_row['fx_confirmed'] == 1) {
    //         $crypto_package = $crypto_package + (int)$crypto_package_row['fx_package'];
    //     }
    // }
    ?>
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="utf-8" />
        <link rel="apple-touch-icon" sizes="76x76" href="assets/img/apple-icon.png">
        <link rel="icon" type="image/png" href="assets/img/apple-icon.png">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta name="author" content="Pesewa Websoft">
        <title>Dashboard | Asanko Farms</title>
        <meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, shrink-to-fit=no' name='viewport' />
        <!--     Fonts and icons     -->
        <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700,200" rel="stylesheet" />
        <link rel="stylesheet" href="fontawesome/css/font-awesome.css" />
        <!-- CSS Files -->
        <link href="assets/css/bootstrap.min.css" rel="stylesheet" />
        <link href="assets/css/light-bootstrap-dashboard.css?v=2.0.1" rel="stylesheet" />
        <!-- CSS Just for demo purpose, don't include it in your project -->
        <link href="assets/css/demo.css" rel="stylesheet" />
        <!--   Core JS Files   -->
        <script src="assets/js/core/jquery.3.2.1.min.js" type="text/javascript"></script>
        <script src="assets/js/jquery-ui.js" type="text/javascript"></script>
        <script src="assets/js/core/popper.min.js" type="text/javascript"></script>
        <script src="assets/js/core/bootstrap.min.js" type="text/javascript"></script>
        <script src="assets/js/validation.min.js" type="text/javascript"></script>
        <script src="assets/js/index.js"></script>
    </head>

    <body style="background-color: whitesmoke">
    <div class="wrapper">
        <div class="sidebar" data-image="assets/img/sidebar-3.jpg" data-color="orange">
            <!--
        Tip 1: You can change the color of the sidebar using: data-color="purple | blue | green | orange | red"

        Tip 2: you can also add an image using data-image tag
    -->
            <div class="sidebar-wrapper">
                <div class="logo">
                    <a href="index.php" class="simple-text">
                    <img src="img/asanko.png" height="50" alt="asanko logo">
                    </a>
                </div>
                <ul class="nav">
                    <li class="nav-item active" >
                        <a class="nav-link" href="dashboard.php">
                            <i class="nc-icon nc-chart-pie-35"></i>
                            <p>Dashboard</p>
                        </a>
                    </li>
                    <li title="Select plan and make a deposit">
                        <a class="nav-link" href="deposit.php">
                            <i class="nc-icon nc-money-coins"></i>
                            <p>Investments</p>
                        </a>
                    </li>
                    <li title="View your past transactions">
                        <a class="nav-link" href="history.php">
                            <i class="nc-icon nc-app"></i>
                            <p>Booking</p>
                        </a>
                    </li>
                    <li title="View and edit your profile">
                        <a class="nav-link" href="profile.php">
                            <i class="nc-icon nc-single-02"></i>
                            <p>Profile</p>
                        </a>
                    </li>

                </ul>
            </div>
        </div>
        <div class="main-panel">
            <!-- Navbar -->
            <nav class="navbar navbar-expand-lg " color-on-scroll="500">
                <div class=" container-fluid  ">
                    <a class="navbar-brand" href="#"> <?php echo $firstname ?> </a>
                    <button href="" class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-bar burger-lines"></span>
                        <span class="navbar-toggler-bar burger-lines"></span>
                        <span class="navbar-toggler-bar burger-lines"></span>
                    </button>
                    <div class="collapse navbar-collapse justify-content-end" id="navigation">
                        <ul class="nav navbar-nav mr-auto">
                            <li class="nav-item">
                                <a href="#" class="nav-link" data-toggle="dropdown">
                                    <i class="nc-icon nc-single-02"></i>
                                    <span class="d-lg-none"> <?php echo $firstname ?></span>
                                </a>
                            </li>
                        </ul>
                        <ul class="navbar-nav ml-auto">
                            <li class="nav-item">
                                <a class="nav-link" href="profile.php">
                                    <span class="no-icon">Account</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="logout.php">
                                    <span class="no-icon">Log out</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <!-- End Navbar -->
            <div class="content">
                <div class="container-fluid">
                    <h6>Investment Packages</h6>
                    <br>
                    <div class="row">
                        <div class="col-sm-4">
                            <div class="card shadow" style="border-top: 4px solid #17a2b8">
                                <div class="card-header">
                                    <h3>Basic</h3>
                                </div>
                                <div class="card-body">
                                    <ul>
                                        <li>Mininimum GH&cent; 100</li>
                                        <li>Mininimum monthly contribution GH&cent; 20</li>
                                        <li>ROI 9%</li>
                                        <li>Mininimum time 2 years</li>
                                    </ul>
                                    
                                </div>
                                <div class="card-footer text-center">
                                    <button class="btn btn-primary">Proceed</button>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="card shadow" style="border-top: 4px solid #fd7e14">
                                <div class="card-header">
                                    <h3>Gold</h3>
                                </div>
                                <div class="card-body">
                                    <ul>
                                        <li>Mininimum GH&cent; 500</li>
                                        <li>Mininimum monthly contribution GH&cent; 100</li>
                                        <li>ROI 11%</li>
                                        <li>Mininimum time 4 years</li>
                                    </ul>
                                    
                                </div>
                                <div class="card-footer text-center">
                                    <button class="btn btn-warning">Proceed</button>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="card shadow" style="border-top: 4px solid #6c757d">
                                <div class="card-header">
                                    <h3>Platinum</h3>
                                </div>
                                <div class="card-body">
                                    <ul>
                                        <li>Mininimum GH&cent; 2000</li>
                                        <li>Mininimum monthly contribution GH&cent; 500</li>
                                        <li>ROI 20%</li>
                                        <li>Mininimum time 7 years</li>
                                    </ul>
                                    
                                </div>
                                <div class="card-footer text-center">
                                    <button class="btn btn-default">Proceed</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <footer class="footer">
                <div class="container">
                    <nav>
                        <ul class="footer-menu">
                            <li>
                                <a href="index.php">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="https://pesewawebsoft.com" target="_blank">
                                    Powered by Pesewa Websoft
                                </a>
                            </li>

                        </ul>
                        <p class="copyright text-center">
                            ©
                            <script>
                                document.write(new Date().getFullYear())
                            </script>
                            <a href="index.html">ASANKO FARMS</a>
                        </p>
                    </nav>
                </div>
            </footer>
        </div>
    </div>

    </body>

    <!--  Plugin for Switches, full documentation here: http://www.jque.re/plugins/version3/bootstrap.switch/ -->
    <script src="assets/js/plugins/bootstrap-switch.js"></script>

    <!--  Chartist Plugin  -->
    <script src="assets/js/plugins/chartist.min.js"></script>
    <!--  Notifications Plugin    -->
    <script src="assets/js/plugins/bootstrap-notify.js"></script>
    <!-- Control Center for Light Bootstrap Dashboard: scripts for the example pages etc -->
    <script src="assets/js/light-bootstrap-dashboard.js?v=2.0.1" type="text/javascript"></script>
    <!-- Light Bootstrap Dashboard DEMO methods, don't include it in your project! -->
    <script src="assets/js/demo.js"></script>
    <!-- <script type="text/javascript">
        $(document).ready(function() {

            demo.showNotification();

        });
    </script> -->


    </html>
<?php

    }
    else{
        ?>
            <script>
                $(document).ready(function(){
                    alert("Access denied! Invalid token");
                })
            </script>
        <?php
        redirect_to('login.html');
    }
    
}
else{
    redirect_to('login.html');
}

mysqli_close($con);