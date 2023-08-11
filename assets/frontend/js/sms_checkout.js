$(function () {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    $("#btnRegister").click(function () {
        
        var formData = $('#smsFormSection').serializeArray();
        
        if (typeof userIti !== 'undefined') {
            var country_code = userIti.getSelectedCountryData()["dialCode"];
            formData.push({name: 'user[phone_code]', value: '+'+country_code});
        }
        
        var action = $("#smsFormSection").attr("action");
        $.ajax({
            url: action,
            type: "POST",
            cache: false,
            data: formData,
            beforeSend: function () {
                $("#preloader").fadeIn();
            },
            success: function (json) {
                $("#preloader").fadeOut();
                if(!json.status && json.new_user) {
                    Lobibox.notify('error', {
                        rounded: false,
                        delay: 5000,
                        delayIndicator: true,
                        position: "top right",
                        sound: false,
                        icon: true,
                        msg: json.message
                    });
                } else if(!json.status && json.domain_error) {
                    var errorString = '';
                    $.each( json.errors, function( key, value) {
                        errorString += key + ' error - ' +value + '<br />';
                    });
                    Lobibox.notify('error', {
                        rounded: false,
                        delay: 5000,
                        delayIndicator: true,
                        position: "top right",
                        sound: false,
                        icon: true,
                        msg: errorString
                    });
                } else if(!json.status && json.domain_not_available) {
                    var errorString = transJs.domain_unavailable_msg + ' <br />';
                    $.each( json.domain, function( key, value) {
                        errorString += value + '<br />';
                    });
                    Lobibox.notify('error', {
                        rounded: false,
                        delay: 5000,
                        delayIndicator: true,
                        position: "top right",
                        sound: false,
                        icon: true,
                        msg: errorString
                    });
                } else if(json.status && json.redirect) {
                    $("#preloader").fadeIn();
                    window.location.href = json.redirect_url;
                    return;
                } else if(!json.status && json.payment_error) {
                    if(json.redirect) {
                        $("#preloader").fadeIn();
                        window.location.href = json.redirect_url;
                        return;
                    } else {
                        Lobibox.notify('error', {
                            rounded: false,
                            delay: 5000,
                            delayIndicator: true,
                            position: "top right",
                            sound: false,
                            icon: true,
                            msg: json.message
                        });
                    }
                } else {
                    var msg = (json.message) ? json.message : transJs.went_wrong
                    Lobibox.notify('error', {
                        rounded: false,
                        delay: 5000,
                        delayIndicator: true,
                        position: "top right",
                        sound: false,
                        icon: true,
                        msg: msg
                    });
                }
            },
            error: function (jqXHR, exception) {
                $("#preloader").fadeOut();
                               
                var response = JSON.parse(jqXHR.responseText);
                //console.log(response.message);
                var errorString = '';
                
                if(response.message) {
                    errorString = response.message + "<br />";
                }
                
                if(response.errors) {
                    $.each( response.errors, function( key, value) {
                        errorString += value + '<br />';
                    });
                }
                
                if(errorString != '') {
                    Lobibox.notify('error', {
                        rounded: false,
                        delay: 5000,
                        delayIndicator: true,
                        position: "top right",
                        sound: false,
                        icon: true,
                        msg: errorString,
                    });
                }
            }
        });
    });
    
    $("#checkoutPaymentMethodSection").delegate("#btnProceed","click", function () {
        var btnProceed = $(this);
        if(!$("#checkoutPaymentMethodSection").find("input[name='payment_type']:checked").val()) {
            Lobibox.notify('error', {
                rounded: false,
                delay: 5000,
                delayIndicator: true,
                position: "top right",
                sound: false,
                icon: true,
                msg: transJs.select_payment
            });
            return false;
        }
        
        if($("#checkoutPaymentMethodSection").find("input[name='payment_type']:checked").val() == 'creditguard' &&
                !$("#checkoutPaymentMethodSection").find("input[name='cg_card']:checked").val()) {
            Lobibox.notify('error', {
                rounded: false,
                delay: 5000,
                delayIndicator: true,
                position: "top right",
                sound: false,
                icon: true,
                msg: transJs.no_card_option
            });
            return false;
        }
        
        var form = $("#checkoutPaymentMethodSection").find('#smsFormSection');
        var formData = form.serializeArray();
        
        var action = site_url + '/sms/process-order';
        
        $.ajax({
            url: action,
            type: "POST",
            cache: false,
            data: formData,
            beforeSend: function () {
                $("#preloader").fadeIn();
                $("#btnProceed").prop("disabled",true);
                btnProceed.html('<i class="fa fa-spinner fa-spin"></i> Processing...');
            },
            success: function (json) {
                $("#preloader").fadeOut();
                if(json.status && json.redirect) {
                    if(json.message) {
                        Lobibox.alert('success',{
                            msg: json.message
                        });
                    }
                    setTimeout(function() {
                        window.location.href = json.redirect_url;
                    },2000);
                    return;
                } else if(!json.status && json.payment_error) {
                    Lobibox.notify('error', {
                        rounded: false,
                        delay: 5000,
                        delayIndicator: true,
                        position: "top right",
                        sound: false,
                        icon: true,
                        msg: json.message
                    });
                    $("#btnProceed").prop("disabled",false);
                    btnProceed.html(btnProceed.data("html"));
                } else {
                    var msg = (json.message) ? json.message : transJs.went_wrong
                    Lobibox.notify('error', {
                        rounded: false,
                        delay: 5000,
                        delayIndicator: true,
                        position: "top right",
                        sound: false,
                        icon: true,
                        msg: msg
                    });
                    $("#btnProceed").prop("disabled",false);
                    btnProceed.html(btnProceed.data("html"));
                }
            },
            error: function (jqXHR, exception) {
                $("#preloader").fadeOut();
                               
                var response = JSON.parse(jqXHR.responseText);
                //console.log(response.message);
                var errorString = '';
                
                if(response.message) {
                    errorString = response.message + "<br />";
                }
                
                if(response.errors) {
                    $.each( response.errors, function( key, value) {
                        errorString += value + '<br />';
                    });
                }
                
                if(errorString != '') {
                    Lobibox.notify('error', {
                        rounded: false,
                        delay: 5000,
                        delayIndicator: true,
                        position: "top right",
                        sound: false,
                        icon: true,
                        msg: errorString,
                    });
                }
                $("#btnProceed").prop("disabled",false);
                btnProceed.html(btnProceed.data("html"));
            }
        });
    });
    
    var credit_val = $("#checkoutPaymentMethodSection").find("#credit_pay_section").find("input[name='credit_apply']:checked").val();

    var all_credit = $("#all_credit").val();
    if(credit_val == 1 && all_credit == 1) {
        $(".other_payment_section").fadeOut("fast");
    } else {
        $(".other_payment_section").fadeIn("fast");
    }
    
    $("#checkoutPaymentMethodSection").delegate("input[name='credit_apply']","click",function() {
        var val = $(this).val();
        var all_credit = $("#all_credit").val();
        
        if(val == 1 && all_credit == 1) {
            $(".other_payment_section").fadeOut("fast",function() {
                $(".custom_payment_block").fadeOut("fast");
            });
            
        } else {
            $(".other_payment_section").fadeIn("fast",function() {
                $(".custom_payment_block").fadeIn("fast");
                $("#checkoutPaymentMethodSection").find(".other_payment_section li:first-child").find("input[name='payment_type']").trigger("click");
            });
        }
    });
    
    $("#checkoutPaymentMethodSection").delegate("#paymentBackLink","click",function(e) {
        e.preventDefault();
        
        $("#checkoutPaymentMethodSection").find("#cc-form").fadeOut("fast");
        $("#checkoutPaymentMethodSection").find("#exist_payment_section").fadeIn("fast");
        
    });
});