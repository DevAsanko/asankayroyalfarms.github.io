$('document').ready(function()
{
    /* validation */
    $("#regForm").validate({
        rules:
            {
                firstName: {
                    required: true,
                    minlength: 2,
                    maxlength: 20
                },
                surname: {
                    required: true,
                    minlength: 2,
                    maxlength: 20
                },
                otherName: {
                    required: false,
                    minlength: 2,
                    maxlength: 20
                },
                gender:{
                    required : true
                },

                password:{
                    required: true,
                    minlength: 8
                },
                c_password: {
                    required: true,
                    equalTo: '#password'
                },
                email: {
                    required: true,
                    email: true
                },
                phone: {
                    required: true,
                    minlength: 9,
                    maxlength: 15,
                    number: true
                }
            },
        messages:
            {
                firstName: {
                    required: "enter first name",
                    minlength: "should be more than 2 characters",
                    maxlength: "should be less than 20 characters"
                },
                surname: {
                    required: "enter surname",
                    minlength: "should be more than 2 characters",
                    maxlength: "should be less than 20 characters"
                },
                otherName: {                    
                    minlength: "should be more than 2 characters",
                    maxlength: "should be less than 20 characters"
                },
                gender: "select gender",
                password:{
                    required: "provide a password",
                    minlength: "should be more than 7 characters"
                },
                c_password:{
                    required: "retype your password",
                    equalTo: "passwords don't match!"
                },
                email:"enter a valid email",
                phone:{
                    required: "enter your phone number",
                    minlength: "should be at least 9 numbers",
                    maxlength: "should be at most 15 numbers",
                    number: "should contain only numbers"
                }
            },
        submitHandler: submitForm
    });
    /* validation */

    /* form submit */
    function submitForm()
    {
        var data = $("#regForm").serialize();
        var btnHtml = 'Submit';

        $.ajax({

            type : 'POST',
            url  : 'submit-sign-up.php',
            data : data,
            beforeSend: function()
            {
                $("#error").fadeOut();
                $("#btn-submit").html('<span class="glyphicon glyphicon-transfer"></span> &nbsp; validating ...').attr('disabled','disabled');
            },
            success :  function(data) {
                $('#error').html('');
                if(data=='invalid'){

                    $("#error").fadeIn(1000, function(){

                        $("#error").html('<div class="alert alert-danger"> <span class="fa fa-exclamation-triangle"></span> &nbsp; Enter a valid email!</div>');

                        $("#btn-submit").html(btnHtml).removeAttrs('disabled');

                    });

                }
                else if(data=="registered") {


                    $("#btn-submit").html('<span class="fa fa-spin fa-spinner"></span> &nbsp; Signing Up ...');

                    window.setTimeout(function(){
                        window.location.href = 'dashboard.php';
                    },2000);
                }
                else if(data=='match'){

                    $("#error").fadeIn(1000, function(){

                        $("#error").html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp; Passwords do not match!</div>');

                        $("#btn-submit").html(btnHtml).removeAttrs('disabled');

                    });

                }

                else if(data=='error'){

                    $("#error").fadeIn(1000, function(){

                        $("#error").html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp; Sign up failed! Try again later</div>');

                        $("#btn-submit").html(btnHtml).removeAttrs('disabled');

                    });

                }

                else if(data=='noData'){

                    $("#error").fadeIn(1000, function(){

                        $("#error").html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp; Input all form fields!</div>');

                        $("#btn-submit").html(btnHtml).removeAttrs('disabled');

                    });

                }

                else if(data=='exist'){

                    $("#error").fadeIn(1000, function(){

                        $("#error").html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp; Email already linked to an account!</div>');

                        $("#btn-submit").html(btnHtml).removeAttrs('disabled');

                    });

                }

                else{
                    $("#error").fadeIn(1000, function(){

                        $("#error").html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp; ERROR! Try again later</div>');

                        $("#btn-submit").html(btnHtml).removeAttrs('disabled');

                    });

                }
            }
        });
        return false;
    }
    /* form submit */

    /* validation */
    $("#logForm").validate({
        rules:
            {
                loginEmail: {
                    required: true,
                    email: true
                },
                loginPassword: {
                    required: true,
                    minlength: 8

                }

            },
        messages:
            {
                loginEmail:"enter a valid email",
                loginPassword:{
                    required: "please provide a password",
                    minlength: "should be at least have 8 characters"
                }

            },
        submitHandler: submitLoginForm
    });
    /* validation */

    /* form submit */
    function submitLoginForm()
    {
        var data = $("#logForm").serialize();
        var btnHtml = 'Submit';
        $.ajax({

            type : 'Post',
            url  : 'submit-login.php',
            data : data,
            beforeSend: function()
            {
                $("#error").fadeOut();
                $("#btn-submit").html('<span class="glyphicon glyphicon-transfer"></span> &nbsp; authenticating ...').attr('disabled','disabled');
            },
            success :  function(data)
            {
                $('#error').html('');

                if(data=="logged")
                {
                    $("#btn-submit").html('<span class="fa fa-spin fa-spinner"></span> &nbsp; Logging In ...');
                    window.setTimeout(function(){
                        window.location.href = 'dashboard.php';
                    },2000);

                }
                else if(data=='noMatch'){
                    $("#error").fadeIn(1000, function(){

                        $("#error").html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp; Email and password combination not recognised, please try again!</div>');

                        $("#btn-submit").html(btnHtml).removeAttrs('disabled');

                    });

                }

                else if(data=='invalid') {
                    $("#error").fadeIn(1000, function () {

                        $("#error").html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp; Please enter a valid email </div>');

                        $("#btn-submit").html(btnHtml).removeAttrs('disabled');

                    });
                }

                else if(data=='noData'){
                    $("#error").fadeIn(1000, function(){

                        $("#error").html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp; Please enter all form fields!</div>');

                        $("#btn-submit").html(btnHtml).removeAttrs('disabled');

                    });

                }

                else if(data=='error'){
                    $("#error").fadeIn(1000, function(){

                        $("#error").html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp; Login unavailable at the moment! Try again later</div>');

                        $("#btn-submit").html(btnHtml).removeAttrs('disabled');

                    });

                }

                else{

                    $("#error").fadeIn(1000, function(){

                        $("#error").html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp; ERROR! Try again later</div>');

                        $("#btn-submit").html('<span class="glyphicon glyphicon-log-in"></span> &nbsp; Log In').removeAttrs('disabled');

                    });

                }
            }
        });
        return false;
    }
    /* form submit */

    /* validation */
    $("#validation-form").validate({
        rules:
            {
                code: {
                    required: true,
                    minlength: 4,
                    maxlength: 4
                }

            },
        messages:
            {
                password:{
                    required: "enter code",
                    minlength: "should be  4 numbers",
                    maxlength: "should be  4 numbers"
                }

            },
        submitHandler: submitValidationForm
    });
    /* validation */

    /* form submit */
    function submitValidationForm()
    {
        var data = $("#validation-form").serialize();
        $.ajax({

            type : 'Post',
            url  : 'submit-validation.php',
            data : data,
            beforeSend: function()
            {
                $("#error").fadeOut();
                $("#btn-submit").html('<span class="glyphicon glyphicon-transfer"></span> &nbsp; authenticating ...').attr('disabled','disabled');
            },
            success :  function(data)
            {
                $('#error').html('');

                if(data=="activated")
                {

                    $("#btn-submit").html('<span class="fa fa-spin fa-spinner"></span> &nbsp; Activating ...');
                    window.setTimeout(function(){
                        window.location.href = 'index.php';
                    },2000);

                }
                else if(data=='noMatch'){
                    $("#error").fadeIn(1000, function(){

                        $("#error").html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp; Code incorrect</div>');

                        $("#btn-submit").html('<span class="glyphicon glyphicon-log-in"></span> &nbsp; Validate').removeAttrs('disabled');

                    });

                }

                else if(data=='noData'){
                    $("#error").fadeIn(1000, function(){

                        $("#error").html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp; Please enter all form fields!</div>');

                        $("#btn-submit").html('<span class="glyphicon glyphicon-log-in"></span> &nbsp; Validate').removeAttrs('disabled');

                    });

                }

                else if(data=='error'){
                    $("#error").fadeIn(1000, function(){

                        $("#error").html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp; Activation failed! Please try again later</div>');

                        $("#btn-submit").html('<span class="glyphicon glyphicon-log-in"></span> &nbsp; Validate').removeAttrs('disabled');

                    });

                }

                else{

                    $("#error").fadeIn(1000, function(){

                        $("#error").html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp; ERROR! Try again later</div>');

                        $("#btn-submit").html('<span class="glyphicon glyphicon-log-in"></span> &nbsp; Validate').removeAttrs('disabled');

                    });

                }
            }
        });
        return false;
    }
    /* form submit */
});