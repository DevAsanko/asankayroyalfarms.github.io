$(document).ready(function () {

    $('#email').on('keyup',function () {
       var email = $(this).val();
       if(email.length > 3){
           $('#load-email').html('<span class="fa fa-spin fa-circle-o-notch"></span> checking..');
           setTimeout(function () {
               $('#load-email').load('check-email.php?email='+email);
           }, 1500);
       }
    });

    $('#username').on('keyup',function () {
        var username = $(this).val();
        if(username.length > 3){
            $('#load_username').html('<span class="fa fa-spin fa-circle-o-notch"></span> checking..');
            setTimeout(function () {
                $('#load_username').load('check-username.php?username='+username);
            }, 1500);
        }
    });

    var form = $('#register-form'), errorDiv = $('.error-div');
    form.validate({
        rules:{
            fullname:{
                required: true,
                minlength: 4,
                maxlength: 50
            },
            username:{
                required: true,
                minlength: 3,
                maxlength: 15
            },
            email:{
              required:true,
                email:true
            },
            phone:{
                required:true,
                number:true,
                minlength: 10,
                maxlength: 10
            },
            momo_number:{
              required: false,
                number: true,
                minlength: 10,
                maxlength: 10
            },
            bitcoin_number:{
                required: false,
                minlength: 15,
                maxlength: 60
            },
            password:{
                required: true,
                minlength: 8
            },
            cpassword:{
                required: true,
                equalTo: '#password'
            },
            question:{
                required: true
            },
            answer:{
                required: true,
                maxlength: 20
            },
            terms:{
                required: true
            }
        },
        messages:{
            fullname:{
                required:"provide your full name",
                minlength:"should be more than 4 characters",
                maxlength:"should be less than 50 characters"
            },
            username:{
                required:"provide a  username",
                minlength:"should be more than 3 characters",
                maxlength:"should be less than 15 characters"
            },
            type: "select payment type",
            email: "provide a valid email",
            phone:{
              required: "provide your phone number",
                number: "only numbers allowed",
                minlength: "should be 10 numbers",
                maxlength: "should be 10 numbers"
            },
            momo_number:{
                number: "should be a number",
                minlength: "should be 10 numbers",
                maxlength: "should be 10 numbers"
            },
            bitcoin_number:{
                minlength: "should be more than 15 characters",
                maxlength: "should be less than 60 characters"
            },
            password:{
                required:"provide your password",
                minlength:"should be more than 8 characters"
            },
            cpassword:{
                required: "confirm your password",
                equalTo: "passwords do not match"
            },
            question: "select a question",
            answer: {
                required: "provide an answer to the question selected",
                maxlength: "should be less than 20 characters"
            },
            terms: "you must accept our terms and conditions"
        },
        submitHandler: submitForm
    });

    function submitForm() {

        var data = form.serialize();
        var btn = $('#submit-sign-up');
        var btnHtml = 'SIGN UP';

        $.ajax({
            url  : 'submit-user-registration.php',
            type : 'post',
            data : data,
            beforeSend: function()
            {
                errorDiv.fadeOut();
                btn.html('<span class="fa fa-spin fa-circle-o-notch"></span> &nbsp;sending info...');
            },
            success :  function(data)
            {
                if(data=="registered")
                {
                    errorDiv.fadeIn(1000, function(){
                        errorDiv.html('<div class="alert alert-success"><span class="glyphicon glyphicon-ok"></span> Account creation successful! Kindly check your email and verify your account. If you can\'t find it in your inbox, kindly check your spam</div>');
                        btn.html(btnHtml);
                        form.trigger('reset');
                    });
                }

                else if(data=='noMatch'){
                    errorDiv.fadeIn(1000, function(){

                        errorDiv.html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp; Passwords do not match</div>');

                        btn.html(btnHtml);

                    });

                }
                else if(data=='noData'){
                    errorDiv.fadeIn(1000, function(){

                        errorDiv.html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp; Enter all form fields</div>');

                        btn.html(btnHtml);

                    });

                }

                else if(data=='noAccount'){
                    errorDiv.fadeIn(1000, function(){

                        errorDiv.html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp; Provide either your mobile money number or bitcoin wallet ID or both</div>');

                        btn.html(btnHtml);

                    });

                }
                else if(data=='invalidEmail'){
                    errorDiv.fadeIn(1000, function(){

                        errorDiv.html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp; Your email is invalid</div>');

                        btn.html(btnHtml);

                    });

                }

                else if(data=='exist'){
                    errorDiv.fadeIn(1000, function(){

                        errorDiv.html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp; Username Exist</div>');

                        btn.html(btnHtml);

                    });

                }

                else if(data=='emailExist'){
                    errorDiv.fadeIn(1000, function(){

                        errorDiv.html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp; Your email is already associated with an account</div>');

                        btn.html(btnHtml);

                    });

                }

                else if(data=='failed'){
                    errorDiv.fadeIn(1000, function(){

                        errorDiv.html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp; Registration failed! Try again later</div>');

                        btn.html(btnHtml);

                    });

                }

                else if(data=='notSent'){
                    errorDiv.fadeIn(1000, function(){

                        errorDiv.html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp; Email not sent! Contact us for your account verification</div>');

                        btn.html(btnHtml);

                    });

                }

                else{

                    errorDiv.fadeIn(1000, function(){

                        errorDiv.html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp; Error! Please try again later</div>');

                        btn.html(btnHtml);

                    });

                }
            },
            error: function(e, xhr){
                alert(xhr.toString()+"<br>check internet settings");
                btn.html(btnHtml);
            }
        });
        return false;
    }

    var loginForm = $('#login-form'), loginError = $('.login-error-div');
    loginForm.validate({
        rules:{
            username:{
                required: true,
                minlength: 3,
                maxlength: 50
            },
            password:{
                required: true,
                minlength: 8
            }
        },
        messages:{
            username:{
                required:"provide your username",
                minlength:"should be more than 3 characters",
                maxlength:"should be less than 50 characters"
            },
            password:{
                required:"provide your password",
                minlength:"should be more than 8 characters"
            }
        },
        submitHandler: submitLogin
    });

    function submitLogin(){
        var data = loginForm.serialize();
        var btn = $('#submit-login');
        var btnHtml = 'LOG IN';
        
        $.ajax({
            url  : 'submit-user-login.php',
            type : 'POST',
            data : data,
            beforeSend: function () {
                loginError.fadeOut();
                btn.html('<span class="fa fa-spin fa-circle-o-notch"></span> &nbsp;validating...');
            },
            success:function (data) {
                if(data=='noData'){
                    loginError.fadeIn(1000, function(){

                        loginError.html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp; Enter all form fields</div>');

                        btn.html(btnHtml);

                    });

                }

                else  if(data=='noMatch'){
                    loginError.fadeIn(1000, function(){

                        loginError.html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp; Username or password is incorrect</div>');

                        btn.html(btnHtml);

                    });

                }

               else if(data=='logged'){
                    loginError.fadeIn(1000, function(){

                        loginError.html('<div class="alert alert-success"><span class="glyphicon glyphicon-ok"></span> &nbsp; Login successful! Redirecting...</div>');

                        btn.html(btnHtml);

                        setTimeout(function () {
                          window.location.href='dashboard.php'
                        },1800);

                    });

                }
                else if(data=='inactive'){
                    loginError.fadeIn(1000, function(){

                        loginError.html('<div class="alert alert-danger"><span class="glyphicon glyphicon-ok"></span> &nbsp; Account not verified! Kindly check your email for link to activate your account! Check spam if not in inbox</div>');

                        btn.html(btnHtml);

                    });

                }
                else if(data=='noReCaptcha'){
                    loginError.fadeIn(1000, function(){

                        loginError.html('<div class="alert alert-danger"><span class="glyphicon glyphicon-ok"></span> &nbsp; Kindly verify that you are not a robot</div>');

                        btn.html(btnHtml);

                    });

                }
                else{
                    loginError.fadeIn(1000, function(){

                        loginError.html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp; Error! Try again later</div>');

                        btn.html(btnHtml);

                    });

                }
            },
            error:function (e, xhr) {
                alert(xhr.toString()+" check internet settings");
                btn.html(btnHtml);
            }
        });
        
        return false;
    }

    var resetForm = $('#reset-form');
    resetForm.validate({
        rules:{
            reset_username:{
                required: true,
                minlength: 2,
                maxlength: 50
            },
            reset_question:{
                required: true
            },
            reset_answer:{
                required: true,
                maxlength: 20
            }
        },
        messages:{
            reset_username:{
                required:"provide your username",
                minlength: "should be more than 2 characters",
                maxlength: "should be less than 50 characters"
            },
            reset_question: "select a question",
            reset_answer: {
                required: "provide your answer",
                maxlength: "should be less than 20 characters"
            }
        },
        submitHandler: submitReset
    });

    function submitReset() {
        var resetError = $('.reset-error-div');
        var data = resetForm.serialize();
        var btn = $('#submit-reset');
        var btnHtml = 'RESET';

        $.ajax({
            url: 'submit-reset.php',
            type: 'get',
            data: data,
            beforeSend: function () {
                resetError.html('').fadeOut();
                btn.html('<span class="fa fa-spin fa-circle-o-notch"></span> &nbsp;resetting...');
            },
            success:function (data) {
                if (data == 'noUser') {
                    resetError.fadeIn(1000, function () {

                        resetError.html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp; No User found</div>');

                        btn.html(btnHtml);

                    });

                }
                else if (data == 'noData') {
                    resetError.fadeIn(1000, function () {

                        resetError.html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp; Enter all form fields</div>');

                        btn.html(btnHtml);

                    });

                }
                else if (data == 'invalidAnswer') {
                    resetError.fadeIn(1000, function () {

                        resetError.html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp; Invalid answer! Kindly provide the question and answer used in signing up</div>');

                        btn.html(btnHtml);

                    });

                }
                else if (data == 'mailFailed') {
                    resetError.fadeIn(1000, function () {

                        resetError.html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp; Email can\'t be sent at the moment. Kindly try again later</div>');

                        btn.html(btnHtml);

                    });

                }
                else if (data == 'error') {
                    resetError.fadeIn(1000, function () {

                        resetError.html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp; Password reset unsuccessful! Kindly ignore the email set to you and try again later</div>');

                        btn.html(btnHtml);

                    });

                }
                else if (data == 'updated') {
                    resetError.fadeIn(1000, function () {

                        resetError.html('<div class="alert alert-success"><span class="fa fa-check"></span> &nbsp; Password reset successful! Kindly check your email for your new password</div>');

                        btn.html(btnHtml);

                        resetForm.trigger('reset');

                    });

                }
                else{
                    resetError.fadeIn(1000, function () {

                        resetError.html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp; Error! Kindly try again later</div>');

                        btn.html(btnHtml);

                    });
                }
            },
            error:function (e, xhr) {
                alert(xhr.toString()+". Check your connection")
            }
        });

        return false;
    }
});