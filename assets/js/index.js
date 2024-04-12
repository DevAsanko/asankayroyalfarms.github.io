$(document).ready(function(){

    $('[data-toggle="tooltip"]').tooltip();


    $('.content').on( "click", ".history-pagination a", function (e){
        e.preventDefault();
        var page = $(this).attr("data-page"); //get page number from link

        window.location.href = "history.php?page="+page;
    });

    var form = $('#update-form');
    form.validate({
        rules:{
            full_name:{
                required: true,
                minlength: 4,
                maxlength: 50
            },
            momo_number:{
                number: true,
                minlength: 10,
                maxlength: 10
            },
            bitcoin_number:{
                minlength: 15,
                maxlength: 60
            },
            phone:{
                required:true,
                number:true,
                minlength: 10,
                maxlength: 10
            }
        },
        messages:{
            full_name:{
                required:"provide your full name",
                minlength:"should be more than 4 characters",
                maxlength:"should be less than 50 characters"
            },
            momo_number:{
                number: "should be a number",
                minlength: "should be more than 15 characters",
                maxlength: "should be less than 60 characters"
            },
            bitcoin_number:{
                minlength: "should be more than 15 characters",
                maxlength: "should be less than 60 characters"
            },
            phone:{
                required: "provide your phone number",
                number: "only numbers allowed",
                minlength: "should be 10 numbers",
                maxlength: "should be 10 numbers"
            }
        },
        submitHandler: submitForm
    });

    function submitForm() {

        var data = form.serialize();
        var btn = $('#submit-update');
        var btnHtml = 'Update Profile', errorDiv = $('.update-error');

        $.ajax({
            url  : 'submit-profile-update.php',
            type : 'get',
            data : data,
            beforeSend: function()
            {
                errorDiv.fadeOut();
                btn.html('<span class="fa fa-spin fa-circle-o-notch"></span> &nbsp;updating...');
            },
            success :  function(data)
            {
                if(data=="update")
                {
                    errorDiv.fadeIn(1000, function(){
                        errorDiv.html('<div class="alert alert-success"><span class="glyphicon glyphicon-ok"></span> Update successful! Kindly wait as page reloads</div>');
                        btn.html(btnHtml);
                        window.setTimeout(function () {
                            window.location.href="profile.php";
                        }, 1800);
                    });
                }

                else if(data=='error'){
                    errorDiv.fadeIn(1000, function(){

                        errorDiv.html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp; Update unsuccessful</div>');

                        btn.html(btnHtml);

                    });

                }
                else if(data=='noData'){
                    errorDiv.fadeIn(1000, function(){

                        errorDiv.html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp; Enter all form fields</div>');

                        btn.html(btnHtml);

                    });

                }

                else if(data=='noSession'){
                    errorDiv.fadeIn(1000, function(){

                        errorDiv.html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp; Session expired! Kindly reload page</div>');

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

    var profileForm = $('#profile-form');
    profileForm.on('submit',function (e) {
        var formData = new FormData(this);
        var btn = $('#submit-profile');
        var errorDiv = $('#profile-error');

        var btnHtml = 'Update Profile Picture';

        e.preventDefault();
        $.ajax({
            url: 'submit-update-picture.php',
            type: 'POST',
            data: formData,
            contentType: false,
            cache: false,
            processData: false,
            beforeSend: function(){
                // change submit button value text and disabled it
                errorDiv.html('');
                btn.html('<span class="fa fa-spin fa-spinner"></span> submitting...').attr('disabled', 'disabled');
            },
            success: function(data) {
                if (data == 'inserted') {
                    errorDiv.fadeIn(1500, function () {
                        errorDiv.html('<div class="alert alert-success">Profile Picture set. Kindly wait while we activate your account</div>');
                        btn.html(btnHtml).removeAttr('disabled');
                        window.setTimeout(function () {
                            window.location.href="profile.php";
                        }, 1500);
                    });
                }
                else if (data == 'empty') {
                    errorDiv.fadeIn(1500, function () {
                        errorDiv.html('<div class="alert alert-danger">Kindly select an image</div>');
                        btn.html(btnHtml).removeAttr('disabled');
                    });
                }
                else if (data == 'large') {
                    errorDiv.fadeIn(1500, function () {
                        errorDiv.html('<div class="alert alert-danger">File too large</div>');
                        btn.html(btnHtml).removeAttr('disabled');
                    });
                }
                else if (data == 'error') {
                    errorDiv.fadeIn(1500, function () {
                        errorDiv.html('<div class="alert alert-danger">Error with file. Select a different one</div>');
                        btn.html(btnHtml).removeAttr('disabled');
                    });
                }
                else if (data == 'moveError') {
                    errorDiv.fadeIn(1500, function () {
                        errorDiv.html('<div class="alert alert-danger">Error with file.</div>');
                        btn.html(btnHtml).removeAttr('disabled');
                    });
                }
                else if (data == 'notInsert') {
                    errorDiv.fadeIn(1500, function () {
                        errorDiv.html('<div class="alert alert-danger">File not uploaded.</div>');
                        btn.html(btnHtml).removeAttr('disabled');
                    });
                }
                else if (data == 'noSession') {
                    errorDiv.fadeIn(1500, function () {
                        errorDiv.html('<div class="alert alert-danger">Session expired! Reload page</div>');
                        btn.html(btnHtml).removeAttr('disabled');
                    });
                }
                else{
                    errorDiv.fadeIn(1500, function () {
                        errorDiv.html('<div class="alert alert-danger">Error. File uploaded</div>');
                        btn.html(btnHtml).removeAttr('disabled');
                    });
                }
            },
            error: function (e, xhr) {
                alert(xhr.toString()+' check internet connection');
                btn.html(btnHtml).removeAttr('disabled');
            }
        })
    });

    var passwordForm = $('#password-form');
    passwordForm.validate({
        rules:{
            password:{
                required: true,
                minlength: 8
            },
            n_password:{
                required: true,
                minlength: 8
            },
            c_n_password:{
                required: true,
                equalTo: '#n_password'
            }
        },
        messages:{
            password:{
                required:"provide your old password",
                minlength:"should be more than 8 characters"
            },
            n_password:{
                required:"provide your new password",
                minlength:"should be more than 8 characters"
            },
            c_n_password:{
                required:"re-enter your new password",
                equalTo:"password do not match"
            }
        },
        submitHandler: submitPassword
    });

    function submitPassword() {

        var data = passwordForm.serialize();
        var btn = $('#submit-password');
        var btnHtml = 'Change Password', errorDiv = $('#password-error');

        $.ajax({
            url  : 'submit-change-password.php',
            type : 'get',
            data : data,
            beforeSend: function()
            {
                errorDiv.html('').fadeOut();
                btn.html('<span class="fa fa-spin fa-circle-o-notch"></span> &nbsp;changing...');
            },
            success :  function(data)
            {
                if(data=="update")
                {
                    errorDiv.fadeIn(1000, function(){
                        errorDiv.html('<div class="alert alert-success"><span class="glyphicon glyphicon-ok"></span> Password change successful!</div>');
                        passwordForm.trigger('reset');
                        btn.html(btnHtml);
                    });
                }

                else if(data=='error'){
                    errorDiv.fadeIn(1000, function(){

                        errorDiv.html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp; Password change unsuccessful</div>');

                        btn.html(btnHtml);

                    });

                }
                else if(data=='exist'){
                    errorDiv.fadeIn(1000, function(){

                        errorDiv.html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp; Old password incorrect</div>');

                        btn.html(btnHtml);

                    });

                }
                else if(data=='unequal'){
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

                else if(data=='noSession'){
                    errorDiv.fadeIn(1000, function(){

                        errorDiv.html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp; Session expired! Kindly reload page</div>');

                        btn.html(btnHtml);

                    });

                }

                else{

                    errorDiv.fadeIn(1000, function(){

                        errorDiv.html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp; '+data+'</div>');

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

    $('#monthly_package').on('change keyup', function () {
       var numOfPackage = $(this).val();
       numOfPackage = parseInt(numOfPackage);
       var amt = numOfPackage * 1000;
       var amtPayable = (0.01 * amt) + amt;
       $('#monthly_amount').val(amtPayable);
    });

    $('#crypto_monthly_package').on('change keyup', function () {
        var numOfPackage = $(this).val();
        numOfPackage = parseInt(numOfPackage);
        var amt = numOfPackage * 200;
        $('#crypto_monthly_amount').val(amt);
    });

    $('#weekly_package').on('change keyup', function () {
        var numOfPackage = $(this).val();
        numOfPackage = parseInt(numOfPackage);
        var amt = numOfPackage * 250;
        var amtPayable = (0.02 * amt) + amt;
        $('#weekly_amount').val(amtPayable);
    });


    $('#crypto_weekly_package').on('change keyup', function () {
        var numOfPackage = $(this).val();
        numOfPackage = parseInt(numOfPackage);
        var amt = numOfPackage * 50;
        $('#crypto_amount').val(amt);
    });

    $('#btn-weekly').on('click', function () {
        var amount = $('#weekly_amount').val();
        var errorDiv = $('.weekly-error');
        var mode = $('#weekly_type').val();
        var num = $('#weekly_package').val();
        var plan = 'daily';

        var amt = num * 250;
        var amtPayable = (0.02 * amt) + amt;

        if(amount != amtPayable){
            errorDiv.html('<div class="alert alert-danger">Amount incorrect</div>')
        }
        else if(num.length == 0){
            errorDiv.html('<div class="alert alert-danger">Enter the number of packages you want to buy</div>')
        }
        else if(parseInt(amount) < 255){
            errorDiv.html('<div class="alert alert-danger">Minimum Amount is GH&cent; 255</div>')
        }
        else{
            errorDiv.html('<div class="alert alert-info"><span class="fa fa-spin fa-spinner"></span> please wait...</div>');
            errorDiv.load('submit-investment.php?amount='+amount+'&plan='+plan+'&mode='+mode+'&pNum='+num);
            $('#btn-weekly').attr('disabled','disabled').addClass('hidden');
        }
    });

    $('#btn-monthly').on('click', function () {
        var amount = $('#monthly_amount').val();
        var errorDiv = $('.monthly-error');
        var mode = $('#monthly_type').val();
        var plan = 'monthly';
        var num = $('#monthly_package').val();

        var amt = num * 1000;
        var amtPayable = (0.01 * amt) + amt;

        if(amount != amtPayable){
            errorDiv.html('<div class="alert alert-danger">Amount incorrect</div>')
        }
        else if(num.length == 0){
            errorDiv.html('<div class="alert alert-danger">Enter the number of packages you want to buy</div>')
        }
        else if(parseInt(amount) < 1010){
            errorDiv.html('<div class="alert alert-danger">Minimum Amount is GH&cent; 1010</div>')
        }
        else{
            errorDiv.html('<div class="alert alert-info"><span class="fa fa-spin fa-spinner"></span> please wait...</div>');
            errorDiv.load('submit-investment.php?amount='+amount+'&plan='+plan+'&mode='+mode+'&pNum='+num);
            $('#btn-monthly').attr('disabled','disabled').addClass('hidden');
        }
    });

    $('#btn-crypto').on('click', function () {
        var amount = $('#crypto_amount').val();
        var errorDiv = $('.crypto-error');
        var mode = $('#crypto_weekly_type').val();
        var plan = 'daily';
        var num = $('#crypto_weekly_package').val();
        var amt = num * 50;

        if(amount != amt){
            errorDiv.html('<div class="alert alert-danger">Amount incorrect</div>')
        }
        else if(num.length == 0){
            errorDiv.html('<div class="alert alert-danger">Enter the number of packages you want to buy</div>')
        }
        else if(parseInt(amount) < 50){
            errorDiv.html('<div class="alert alert-danger">Minimum Amount is USD $ 50</div>')
        }
        else{
            errorDiv.html('<div class="alert alert-info"><span class="fa fa-spin fa-spinner"></span> please wait...</div>');
            errorDiv.load('submit-crypto-investment.php?amount='+amount+'&plan='+plan+'&mode='+mode+'&pNum='+num);
            $('#btn-crypto').attr('disabled','disabled').addClass('hidden');
        }
    });

    $('#btn-crypto-monthly').on('click', function () {
       var amount = $('#crypto_monthly_amount').val();
       var errorDiv = $('.crypto-monthly-error');
        var mode = $('#crypto_monthly_type').val();
        var num = $('#crypto_monthly_package').val();

        var amt = num * 200;



        if(amount != amt){
            errorDiv.html('<div class="alert alert-danger">Amount incorrect</div>')
        }
        else if(num.length == 0){
            errorDiv.html('<div class="alert alert-danger">Enter the number of packages you want to buy</div>')
        }
        else if(parseInt(amount) < 200){
            errorDiv.html('<div class="alert alert-danger">Minimum Amount is USD $ 200</div>')
        }
        else{
            errorDiv.html('<div class="alert alert-info"><span class="fa fa-spin fa-spinner"></span> please wait...</div>');
            errorDiv.load('submit-crypto-investment.php?amount='+amount+'&plan=monthly&mode='+mode+'&pNum='+num);
            $('#btn-crypto-monthly').attr('disabled','disabled').addClass('hidden');

        }
    });

    $('input[type=number]').keydown(function (e) {
       if($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) !== -1 ||
           (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
           (e.keyCode >= 35 && e.keyCode <= 40)){

           return;
       }

       if((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57 )) && (e.keyCode > 105)){
           e.preventDefault();
       }
    });

    var withdrawalForm = $('#withdraw-form');

    withdrawalForm.validate({
       rules:{
           type:{
               required: true
           },
           amount:{
               required: true,
               minlength: 2
           }
       },
        messages:{
           type: "select account",
            amount:{
               required: "enter amount",
                minlength: "should be more than 2"
            }
        },
        submitHandler: submitWithdrawal
    });

    function submitWithdrawal() {
        var errorDiv = $('.withdrawal-error');
        var data = withdrawalForm.serialize();
        var btn = $('#submit-withdrawal'), btnHtml = 'Request Withdrawal';

        $.ajax({
            type: 'get',
            data: data,
            url: 'submit-withdrawal-request.php',
            beforeSend: function () {
                errorDiv.html('').fadeOut();
                btn.html('<span class="fa fa-spin fa-spinner"></span> Requesting...')
            },
            success: function (data) {
                if(data == 'noSession'){
                    errorDiv.fadeIn(1000, function () {
                       errorDiv.html('<div class="alert alert-danger">Session Expired! Kindly reload page</div>');
                        btn.html(btnHtml);
                    });
                }
                else if(data == 'noData'){
                    errorDiv.fadeIn(1000, function () {
                        errorDiv.html('<div class="alert alert-danger">Enter all form fields</div>');
                        btn.html(btnHtml);
                    });
                }
                else if(data == 'exist'){
                    errorDiv.fadeIn(1000, function () {
                        errorDiv.html('<div class="alert alert-danger">Account type invalid</div>');
                        btn.html(btnHtml);
                    });
                }
                else if(data == 'amountLow'){
                    errorDiv.fadeIn(1000, function () {
                        errorDiv.html('<div class="alert alert-danger">Minimum withdrawal amount is GH&cent; 50</div>');
                        btn.html(btnHtml);
                    });
                }
                else if(data == 'cryptLow'){
                    errorDiv.fadeIn(1000, function () {
                        errorDiv.html('<div class="alert alert-danger">Minimum withdrawal amount is $10</div>');
                        btn.html(btnHtml);
                    });
                }
                else if(data == 'insufficient'){
                    errorDiv.fadeIn(1000, function () {
                        errorDiv.html('<div class="alert alert-danger">Insufficient funds</div>');
                        btn.html(btnHtml);
                    });
                }
                else if(data == 'failed'){
                    errorDiv.fadeIn(1000, function () {
                        errorDiv.html('<div class="alert alert-danger">Request Failed</div>');
                        btn.html(btnHtml);
                    });
                }
                else if(data == 'noMomo'){
                    errorDiv.fadeIn(1000, function () {
                        errorDiv.html('<div class="alert alert-danger">Kindly update your Mobile Money Number at your profile</div>');
                        btn.html(btnHtml);
                    });
                }
                else if(data == 'noCryptoAcc'){
                    errorDiv.fadeIn(1000, function () {
                        errorDiv.html('<div class="alert alert-danger">Kindly update your BitCoin Wallet at your profile</div>');
                        btn.html(btnHtml);
                    });
                }
                else if(data == 'success'){
                    errorDiv.fadeIn(1000, function () {
                        errorDiv.html('<div class="alert alert-success">Request successfully. We will transfer the money to your account within 3 days</div>');
                        btn.html(btnHtml);
                        setTimeout(function () {
                            window.location.href='withdraw.php';
                        },1500);
                    });
                }
                else{
                    errorDiv.fadeIn(1000, function () {
                        errorDiv.html('<div class="alert alert-danger">Error! Try again later</div>');
                        btn.html(btnHtml);
                    });
                }
            },
            error: function (e, xhr, qrt) {
                alert(xhr.toString()+' check connectivity');
                btn.html(btnHtml);
            }
        })
    }

    $('#type').on('change', function () {
       var type = $(this).val();
       if(type == 'momo'){
           $('#amount-addon').html('<span>GH&cent; </span>');
       }
       else{
           $('#amount-addon').html('<span>$ </span>');
       }
    });

    $('.closeModal').on('click',function () {
       window.location.href='deposit.php';
    });

    $('.modal').modal("hide", function () {
        alert('here');
        window.location.href='deposit.php';
    })
});

function copyToClipboard(element) {
    var $temp = $('<input>');
    $("body").append($temp);
    $temp.val($(element).text()).select();
    document.execCommand("copy");
    $temp.remove();
    $('#copy-link').html('<span class="fa fa-check"></span> Copied')
}

$(window).on('load',function () {
    $('#load-history').load('load-history.php');

});


