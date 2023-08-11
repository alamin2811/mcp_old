$(function () {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    $('.CSP-method-list input[type="radio"]').click(function () {
        var inputValue = $(this).attr("value");
        var targetBox = $("." + inputValue);
        $(".CSPM-box").not(targetBox).hide();
        $(targetBox).show();
    });

    $(".CSP-method-list li label").click(function () {
        $(".CSP-method-list li").removeClass('selected');
        $(this).parent().addClass('selected');
    });

    new Card({
        form: document.querySelector('.CSpayment-form'),
        container: '.card-wrapper'
    });

    var checkoutCartShow = function (data = null) {
        $.ajax({
            url: cartUpdate,
            type: "GET",
            cache: false,
            data: data,
            beforeSend: function () {
                $("#preloader").fadeIn();
            },
            success: function (json) {
                if (json.html) {
                    $("#checkoutCartSection").html(json.html);
                    $("#checkoutPaymentMethodSection").html(json.payment_method_html);
                    
                    if(json.credit_html != '') {
                        $("#checkoutPaymentMethodSection").find("#credit_pay_section").html(json.credit_html);

                        var credit_val = $("#checkoutPaymentMethodSection").find("#credit_pay_section").find("input[name='credit_apply']:checked").val();

                        if(credit_val == 1 && json.all_credit == 1) {
                            $(".other_payment_section").fadeOut("fast");
                            $("#checkoutPaymentMethodSection").find("#cc-form").fadeOut("fast");
                            $("#checkoutPaymentMethodSection").find(".custom_payment_block").find("#installment_row").fadeOut("fast");
                        } else {
                            $(".other_payment_section").fadeIn("fast");
                            $("#checkoutPaymentMethodSection").find(".other_payment_section li:first-child").find("input[name='payment_type']").trigger("click");
                        }
                    } else {
                        $("#checkoutPaymentMethodSection").find(".other_payment_section li:first-child").find("input[name='payment_type']").trigger("click");
                    }
                    $("#checkoutPaymentMethodSection").find("#all_credit").val(json.all_credit);
                    $("#checkoutPaymentMethodSection").find("select").wSelect();
                    $("#checkoutCartSection").find("select").wSelect();
                    
                }
                
                if(json.cart_empty) {
                    window.location.href = json.redirect;
                    return;
                }

                if (json.domain_count) {
                    $("#fld_cart_total").html(json.domain_total);
                    $("#fld_cart_count").html(json.domain_count);
                }
                
                $("#preloader").fadeOut();
            },
            error: function (jqXHR, exception) {
                $("#preloader").fadeOut();
                console.log(jqXHR.status + '-' + jqXHR.responseText);
                //checkoutCartShow()
            }
        });
    }

    checkoutCartShow();

    $("#checkoutCartSection").delegate(".domainYears", "change", function () {
        var year = $(this).val();
        var domain = $(this).attr("rel");
        var promocode = $("#promocode").val();
        var action = $(this).data("action");

        var obj = {
            year: year,
            domain: domain,
            type: 'update',
            promocode: promocode,
            action: action
        }

        checkoutCartShow(obj);

    });

    $("#checkoutCartSection").delegate(".removeDomain", "click", function () {
        var domain = $(this).attr("rel");
        var promocode = $("#promocode").val();

        var obj = {
            domain: domain,
            type: 'delete',
            promocode: promocode
        }

        checkoutCartShow(obj);

    });
    
    $("#checkoutCartSection").delegate(".updateProductQty", "change", function () {
        var qty = $(this).val();
        var productId = $(this).attr("rel");
        var promocode = $("#promocode").val();
        var action = $(this).data("action");

        var obj = {
            qty: qty,
            productId: productId,
            type: 'update',
            promocode: promocode,
            action: action
        }

        checkoutCartShow(obj);

    });
    
    $("#checkoutCartSection").delegate(".removeProduct", "click", function () {
        var productId = $(this).attr("rel");
        var promocode = $("#promocode").val();

        var obj = {
            productId: productId,
            type: 'delete',
            promocode: promocode
        }

        checkoutCartShow(obj);

    });
    
    $("#checkoutCartSection").delegate("#btnPromoApply", "click", function () {
        var promocode = $("#promocode").val();

        var obj = {
            type: 'promo',
            promocode: promocode
        }

        checkoutCartShow(obj);

    });

    $("#checkoutPaymentMethodSection").delegate("#btnBuyNow","click", function () {
        var buyBtn = $(this);
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
        
        buyBtn.prop("disabled",true);
        buyBtn.html('<i class="fa fa-spinner fa-spin"></i> Processing...');
        
        var credit_val = $("#checkoutPaymentMethodSection").find("#credit_pay_section").find("input[name='credit_apply']:checked").val();

        if(credit_val == 1 && $("#checkoutPaymentMethodSection").find("#all_credit").val() == 1) {
            //do nothing
        } else if(!$("#checkoutPaymentMethodSection").find("input[name='payment_type']:checked").length) {
            Lobibox.notify('error', {
                rounded: false,
                delay: 5000,
                delayIndicator: true,
                position: "top right",
                sound: false,
                icon: true,
                msg: transJs.no_payment_selected
            });
            buyBtn.prop("disabled",false);
            buyBtn.html(buyBtn.data("html"));
            return false;
        } else if($("#checkoutPaymentMethodSection").find("input[name='payment_type']:checked").val() == 'creditguard' &&
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
            buyBtn.prop("disabled",false);
            buyBtn.html(buyBtn.data("html"));
            return false;
        }
        
        if($("#checkoutPaymentMethodSection").find("#tcagree").prop("checked") == false) {
            Lobibox.notify('error', {
                rounded: false,
                delay: 5000,
                delayIndicator: true,
                position: "top right",
                sound: false,
                icon: true,
                msg: transJs.t_c_msg
            });
            buyBtn.prop("disabled",false);
            buyBtn.html(buyBtn.data("html"));
            return false;
        }
        
        var formData = $('#contactFormSection').serializeArray();
        
        if (typeof contactIti !== 'undefined') {
            var country_code = contactIti.getSelectedCountryData()["dialCode"];
            formData.push({name: 'contact[phone_code]', value: '+'+country_code});
        }
        
        if (typeof userIti !== 'undefined') {
            var country_code = userIti.getSelectedCountryData()["dialCode"];
            formData.push({name: 'user[phone_code]', value: '+'+country_code});
        }
        
        if (typeof userContactIti !== 'undefined') {
            var country_code = userContactIti.getSelectedCountryData()["dialCode"];
            formData.push({name: 'user_contact[phone_code]', value: '+'+country_code});
        }
        
        if ($("#promocode").val() != '') {
            var promo_code = $("#promocode").val();
            formData.push({name: 'promocode', value: promo_code});
        }

        var action = $("#contactFormSection").attr("action");
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
                    buyBtn.prop("disabled",false);
                    buyBtn.html(buyBtn.data("html"));
                } else if(!json.status && json.contact_user) {
                    Lobibox.notify('error', {
                        rounded: false,
                        delay: 5000,
                        delayIndicator: true,
                        position: "top right",
                        sound: false,
                        icon: true,
                        msg: json.message
                    });
                    buyBtn.prop("disabled",false);
                    buyBtn.html(buyBtn.data("html"));
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
                    buyBtn.prop("disabled",false);
                    buyBtn.html(buyBtn.data("html"));
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
                    buyBtn.prop("disabled",false);
                    buyBtn.html(buyBtn.data("html"));
                } else if(!json.status && (json.ns_error || json.incorrect_payment_method || json.invoice_error || json.order_error || json.payment_error)) {
                    Lobibox.notify('error', {
                        rounded: false,
                        delay: 5000,
                        delayIndicator: true,
                        position: "top right",
                        sound: false,
                        icon: true,
                        msg: json.message
                    });
                    buyBtn.prop("disabled",false);
                    buyBtn.html(buyBtn.data("html"));
                } else if(json.status && json.redirect) {
                    $("#preloader").fadeIn();
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
                        buyBtn.prop("disabled",false);
                        buyBtn.html(buyBtn.data("html"));
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
                    buyBtn.prop("disabled",false);
                    buyBtn.html(buyBtn.data("html"));
                }
            },
            error: function (jqXHR, exception) {
                buyBtn.prop("disabled",false);
                buyBtn.html(buyBtn.data("html"));
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
    
    $(".contacts").change(function() {
        var contact_id = $(this).val();
        if(contact_id == '') {
            $("#existContactSection").fadeOut('fast',function() {
                $("#newContactSection").fadeIn('fast');
                $("#existContactSection").html('');
            });
        }
        $.ajax({
            url: getContactUrl,
            type: "GET",
            cache: false,
            data: {contact_id: contact_id},
            beforeSend: function() {
                $("#preloader").fadeIn();
            },
            success: function(json){
                $("#preloader").fadeOut();
                if(json.html) {
                    $("#newContactSection").fadeOut('fast',function() {
                        $("#existContactSection").html(json.html);
                        

                        $("#existContactSection").fadeIn('fast');
                    });
                }
            },
            error: function (jqXHR, exception) {
                $("#preloader").fadeOut();
                console.log(jqXHR.status + '-'+ jqXHR.responseText);
            }
        });
    });
    
    var dns_int = 4;
    var dns_count = 5;
    $("#btnAddDNS").click(function() {
       
        if(dns_count <= 10) {
            var html = '';
            html = '<div class="row"><div class="col-sm-12">';
            html += '<div class="form-group cus-protext">';
            html += '<span class="text-heading">'+transJs.nameserver+' '+dns_count+'</span>';
            html += '<input placeholder="'+transJs.enter_nameserver+' '+dns_count+'" class="form-control" name="ns['+dns_int+']" type="text">';
            html += '</div></div></div>';

            $("#dnsBlock").append(html);
            dns_int++;
            dns_count++;
        }
    });
    
    $("#checkoutPaymentMethodSection").delegate("input[name='credit_apply']","click",function() {
        var val = $(this).val();
        var all_credit = $("#all_credit").val();
        
        if(val == 1 && all_credit == 1) {
            $(".other_payment_section").fadeOut("fast", function() {
                $("#checkoutPaymentMethodSection").find(".custom_payment_block").html('');
                $("#checkoutPaymentMethodSection").find("#cc-form").fadeOut("fast");
                $("#checkoutPaymentMethodSection").find(".custom_payment_block").find("#installment_row").fadeOut("fast");
            });
        } else {
            $(".other_payment_section").fadeIn("fast");
            $("#checkoutPaymentMethodSection").find(".other_payment_section li:first-child").find("input[name='payment_type']").trigger("click");
            
        }
    });
    
    

});