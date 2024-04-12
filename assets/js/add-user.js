$(document).ready(function () {
    $('#user_name').on('keyup',function () {
        var username = $(this).val();
        var nameDiv = $('#show-username');
        if(username.length >= 3){
            $.ajax({
                url: 'get-username.php?name='+username,
                type: 'get',
                beforeSend:function () {
                    nameDiv.html('<p class="err"><span class="fa fa-spin fa-spinner"></span> checking...</p> ');
                },
                success: function (data) {
                    nameDiv.html(data).fadeIn(1000);
                },
                error: function () {
                    nameDiv.html('<p class="err text-danger">A fatal error occurred</p>')
                }
            })
        }
    });

    var form = $('#register-form'), errorDiv = $('#error');
   form.validate({
        rules:{
            full_name:{
                required: true,
                minlength: 4,
                maxlength: 50
            },
            user_name:{
                required: true,
                minlength: 4,
                maxlength: 20
            },
            password:{
                required: true,
                minlength: 8
            },
            r_password:{
                required: true,
                equalTo: '#password'
            },
            role:{
                required: true
            }
        },
       messages:{
            full_name:{
                required:"input full name",
                minlength:"should be more than 4 characters",
                maxlength:"should be less than 50 characters"
            },
           user_name:{
                required:"input user name",
               minlength:"should be more than 3 characters",
               maxlength:"should be less than 20 characters"
           },
           password:{
                required:"input your password",
               minlength:"should be more than 8 characters"
           },
           r_password:{
                required:"confirm password",
               equalTo:"password should match"
           },
           role:"select role"
       },
       submitHandler: submitForm
   });

    function submitForm() {
        var data = form.serialize();

        $.ajax({
            url  : 'submit-user.php',
            type : 'post',
            data : data,
            beforeSend: function()
            {
                errorDiv.fadeOut();
                $("#btn-submit").html('<span class="fa fa-spin fa-spinner"></span> &nbsp;sending...');
            },
            success :  function(data)
            {

                if(data=="inserted")
                {
                    $("#error").fadeIn(1000, function(){
                        $("#btn-submit").html('<span class="fa fa-plus"></span> &nbsp;ADD');
                        $("#error").html('<div class="alert alert-success"><span class="fa fa-check"></span> &nbsp; User added successfully!</div>');
                        form.trigger('reset');
                        $('#show-username').html('');
                    });
                }

                else if(data=='error'){
                    $("#error").fadeIn(1000, function(){

                        $("#error").html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp; Failed! please try again!</div>');

                        $("#btn-submit").html('<span class="fa fa-plus"></span> &nbsp; ADD');

                    });

                }

                else if(data=='unequal'){
                    $("#error").fadeIn(1000, function(){

                        $("#error").html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp; Passwords do not match!</div>');

                        $("#btn-submit").html('<span class="fa fa-plus"></span> &nbsp; ADD');

                    });

                }

                else if(data=='0'){
                    $("#error").fadeIn(1000, function(){

                        $("#error").html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp; Username already exist</div>');

                        $("#btn-submit").html('<span class="fa fa-plus"></span> &nbsp; ADD');

                    });

                }



                else{

                    $("#error").fadeIn(1000, function(){

                        $("#error").html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp; Sorry an error occurred</div>');

                        $("#btn-submit").html('<span class="fa fa-plus"></span> &nbsp; ADD');

                    });

                }
            },
            error: function(e){
                alert(e+"<br>check internet settings");
                $("#btn-submit").html('<span class="fa fa-plus"></span> &nbsp; ADD');
            }
        });
        return false;
    }
});