$(function() {
   $("#checkoutPaymentMethodSection").delegate("input[name='payment_type']","click", function() {
       var val = $(this).val();
       var customer_id = $(this).data("customer-id");
       var order_total = $(this).data("order-total");
       
       if(val == 'creditguard') {
           customer_id = (customer_id > 0) ? customer_id : 0;
           $.ajax({
                url: site_url + '/creditguard/payment-html/'+customer_id,
                type: "GET",
                cache: false,
                data: {order_total: order_total},
                beforeSend: function () {
                    $("#preloader").fadeIn();
                },
                success: function (json) {
                    if (json.html) {
                        $("#checkoutPaymentMethodSection").find(".custom_payment_block").html(json.html);
                        $("#checkoutPaymentMethodSection").find(".custom_payment_block").find("#installment_row").fadeIn("fast");
                    }
                    
                    if(json.card_count == 0) {
                        $("#checkoutPaymentMethodSection").find(".custom_payment_block").find("#cg_new_card_section").hide();
                        
                        if($("#checkoutPaymentMethodSection").find("#exist_payment_section").length) {
                            $("#checkoutPaymentMethodSection").find("#exist_payment_section").fadeOut("fast",function() {
                                $("#checkoutPaymentMethodSection").find(".custom_payment_block").find("input[name='cg_card']").prop("checked",true);
                                $("#checkoutPaymentMethodSection").find("#cc-form").fadeIn("fast");
                            });
                        } else {
                            $("#checkoutPaymentMethodSection").find(".custom_payment_block").find("input[name='cg_card']").prop("checked",true);
                            $("#checkoutPaymentMethodSection").find("#cc-form").fadeIn("fast");
                        }
                        
                        if($('.CSpayment-form').length) {
                            new Card({
                                form: document.querySelector('.CSpayment-form'),
                                container: '.card-wrapper'
                            });
                        }
                    }
                    
                    $("#preloader").fadeOut();
                },
                error: function (jqXHR, exception) {
                    $("#preloader").fadeOut();
                    console.log(jqXHR.status + '-' + jqXHR.responseText);
                }
            });
       } else {
           $("#checkoutPaymentMethodSection").find(".custom_payment_block").html('');
           $("#checkoutPaymentMethodSection").find("#cc-form").fadeOut("fast");
           $("#checkoutPaymentMethodSection").find(".custom_payment_block").find("#installment_row").fadeOut("fast");
       }
       
   });
   
   $("#checkoutPaymentMethodSection").delegate("input[name='cg_card']","click",function() {
       var val = $(this).val();
       
       if(val == 'cc_card') {
           /*$("#checkoutPaymentMethodSection").find("#cc-form").fadeIn("fast", function() {
               $("#checkoutPaymentMethodSection").find("#exist_payment_section").fadeOut("fast");
           });*/
           
            if($("#checkoutPaymentMethodSection").find("#exist_payment_section").length) {
                $("#checkoutPaymentMethodSection").find("#exist_payment_section").fadeOut("fast",function() {
                    $("#checkoutPaymentMethodSection").find("#cc-form").fadeIn("fast");
                });
            } else {
                $("#checkoutPaymentMethodSection").find("#cc-form").fadeIn("fast");
            }
           
           $("#checkoutPaymentMethodSection").delegate(".CSP-method-list li label","click", function () {
                $("#checkoutPaymentMethodSection").find(".CSP-method-list li").removeClass('selected');
                $(this).parent().addClass('selected');
            });

            if($('.CSpayment-form').length) {
                new Card({
                    form: document.querySelector('.CSpayment-form'),
                    container: '.card-wrapper'
                });
            }

       } else if(val == 'other_card') {
           $("#checkoutPaymentMethodSection").find("#cc-form").fadeOut("fast");
           $("#checkoutPaymentMethodSection").find("#exist_payment_section").fadeIn("fast");
       } else {
           $("#checkoutPaymentMethodSection").find("#cc-form").fadeOut("fast");
           $("#checkoutPaymentMethodSection").find("#exist_payment_section").fadeIn("fast");
       }
   });
   
    var payment_val = $("#checkoutPaymentMethodSection").find("input[name='payment_type']:checked").val();
    var customer_id = $("#checkoutPaymentMethodSection").find("input[name='payment_type']:checked").data("customer-id");
    var order_total = $("#checkoutPaymentMethodSection").find("input[name='payment_type']:checked").data("order-total");

    if(payment_val == 'creditguard') {
        customer_id = (customer_id > 0) ? customer_id : 0;
        
        var credit_val = $("#checkoutPaymentMethodSection").find("#credit_pay_section").find("input[name='credit_apply']:checked").val();

        var show_cg = true;
        var all_credit = $("#all_credit").val();
        if(credit_val == 1 && all_credit == 1) {
            show_cg = false;
        }
         
        if(show_cg) {
            $.ajax({
                url: site_url + '/creditguard/payment-html/'+customer_id,
                type: "GET",
                cache: false,
                data: {order_total: order_total},
                beforeSend: function () {
                    $("#preloader").fadeIn();
                },
                success: function (json) {
                    if (json.html) {
                        $("#checkoutPaymentMethodSection").find(".custom_payment_block").html(json.html);
                        $("#checkoutPaymentMethodSection").find(".custom_payment_block").find("#installment_row").fadeIn("fast");
                    }

                    $("#preloader").fadeOut();
                },
                error: function (jqXHR, exception) {
                    $("#preloader").fadeOut();
                    console.log(jqXHR.status + '-' + jqXHR.responseText);
                }
            });
        }
        
    } else {
        $("#checkoutPaymentMethodSection").find(".custom_payment_block").html('');
        $("#checkoutPaymentMethodSection").find("#cc-form").fadeOut("fast");
        $("#checkoutPaymentMethodSection").find(".custom_payment_block").find("#installment_row").fadeOut("fast");
    }
    
    $("#checkoutPaymentMethodSection").delegate("select[name='payment_method_type']","change", function() {
        var val = $(this).val();
        var customer_id = $(this).data("customer-id");
        var order_total = $(this).data("order-total");
       
        if(val == 'creditguard') {
            customer_id = (customer_id > 0) ? customer_id : 0;
            $.ajax({
                 url: site_url + '/creditguard/payment-html/'+customer_id,
                 type: "GET",
                 cache: false,
                 data: {order_total: order_total},
                 beforeSend: function () {
                     $("#preloader").fadeIn();
                 },
                 success: function (json) {
                     if (json.html) {
                         $("#checkoutPaymentMethodSection").find(".custom_payment_block").html(json.html);
                         $("#checkoutPaymentMethodSection").find(".custom_payment_block").find("#installment_row").fadeIn("fast");
                     }
                     
                     if(json.card_count == 0) {
                        $("#checkoutPaymentMethodSection").find(".custom_payment_block").find("#cg_new_card_section").hide();
                        $("#checkoutPaymentMethodSection").find(".custom_payment_block").find("input[name='cg_card']").prop("checked",true);
                    }

                     $("#preloader").fadeOut();
                 },
                 error: function (jqXHR, exception) {
                     $("#preloader").fadeOut();
                     console.log(jqXHR.status + '-' + jqXHR.responseText);
                 }
             });
        } else {
            $("#checkoutPaymentMethodSection").find(".custom_payment_block").html('');
            $("#checkoutPaymentMethodSection").find(".custom_payment_block").find("#installment_row").fadeOut("fast");
        }
       
   });
});