$(function() {
   $(".btnDomainWishList").click(function(e) {
       e.preventDefault();
       var el = $(this);
       var domain = $(this).data('domain');
       var price = $(this).data('price');
       var currency = $(this).data('currency');
       var id = $(this).attr('data-id');
       
       $.ajax({
           url: wishListURL,
           type: 'GET',
           data: {domain: domain, price: price, currency_id:currency, id:id},
           dataType: 'json',
           beforeSend: function() {
               
           },
           success: function(json) {
               if(json.added && json.id) {
                   el.addClass('add-wish');
                   el.attr('data-id',json.id);
               }
               
               if(json.deleted) {
                   el.removeClass('add-wish');
                   el.attr('data-id','');
               }
           },
           error: function (jqXHR, exception) {
               console.log(jqXHR.status + '-'+ jqXHR.responseText);
           }
       })
   });
   
   var showTldData = function(data) {
        $.ajax({
            url: tldUrl,
            type: 'GET',
            data: data,
            dataType: 'json',
            beforeSend: function() {
                $("#preloader").fadeIn();
            },
            success: function(json) {
                $("#preloader").fadeOut();
                if(json.html) {
                    $("#tldDataSection").html(json.html);
                }
            },
            error: function (jqXHR, exception) {
                $("#preloader").fadeOut();
                console.log(jqXHR.status + '-'+ jqXHR.responseText);
            }
        });
    }
    
    var d = {
        page: 1
    }
    showTldData(d); 
    
    $("#tldDataSection").delegate(".page_link","click",function() {
        var page_no = $(this).attr("rel");
        var tag = $("input[name='tag_id']:checked").val();
        var keyword = $("input[name='tld_keyword']").val();
        
        var data = {
            page: page_no,
            tag:tag,
            keyword:keyword
        };
        showTldData(data);
    });
    
    $("#tldDataSection").delegate(".page_next","click",function() {
        if($(this).hasClass("disabled") == false) {
            var page_no = $("#tldDataSection").find("li.active").attr("rel");
           
            var tag = $("input[name='tag_id']:checked").val();
            var keyword = $("input[name='tld_keyword']").val();
            
            var data = {
                page: eval(parseInt(page_no) + 1),
                tag:tag,
                keyword:keyword
            };
            showTldData(data);
        }
    });
    
    $("#tldDataSection").delegate(".page_prev","click",function() {
        if($(this).hasClass("disabled") == false) {
            var page_no = $("#tldDataSection").find("li.active").attr("rel");
            
            var tag = $("input[name='tag_id']:checked").val();
            var keyword = $("input[name='tld_keyword']").val();
            
            var data = {
                page: eval(parseInt(page_no) - 1),
                tag:tag,
                keyword:keyword
            };
            
            showTldData(data);
        }
    });
    
    $("input[name='tag_id']").change(function() {
        var tag = $(this).val();
        var keyword = $("input[name='tld_keyword']").val();
        
        var data = {
            page: 1,
            tag:tag,
            keyword:keyword
        };
        showTldData(data);
    });
    
    $("input[name='tld_keyword']").on('input',function(e) {
        var tag = $("input[name='tag_id']:checked").val();
        var keyword = $(this).val();
        
        var data = {
            page: 1,
            tag:tag,
            keyword:keyword
        };
        showTldData(data);
    });
    
    var domainAddToCart = function(domain = null, el = null, buy = null) {
        $.ajax({
            url: domainCart,
            type: "GET",
            cache: false,
            data: {domain:domain,type:'add',buy:buy},
            beforeSend: function() {
                $("#preloader").fadeIn();
            },
            success: function(json){
                
                if(json.buy && json.buy_redirect != '') {
                    window.location.href = json.buy_redirect;
                    return;
                }
                
                if(json.added && el) {
                    /*var btn_html = '<div class="added-btn"><span>'+transJs.added+'</span><i class="la la-cart-plus"></i>';
                    btn_html += '<button type="button" class="added-close-btn btnRemoveDomainToCart" rel="'+json.domain+'"><i class="la la-times-circle"></i></button></div>';
                    el.parent("li").html(btn_html);*/
                   
                    el.addClass("dominAdded");
                }
               
                $("#preloader").fadeOut();
                if(json.status) {
                    $("#domainCartDiv").html(json.html);
                    if(json.count > 0) {
                        $(".cart_count").html(json.count);
                        $(".cart_count").removeClass("d-none");
                    }
                    $("body").addClass("dominCart_show");
                }
            },
            error: function (jqXHR, exception) {
                $("#preloader").fadeOut();
                console.log(jqXHR.status + '-'+ jqXHR.responseText);
            }
        });
    }
    
    domainAddToCart();
    
    $("#domainAvailListSection").delegate(".btnAddDomainToCart","click",function(e) {
        e.preventDefault();
        var element = $(this);
        
        var domain = $(this).attr("rel");
        domainAddToCart(domain,element);
    });
    
    $("#domainAvailListSection").delegate(".btnRemoveDomainToCart","click",function(e) {
        e.preventDefault();
        var el = $(this);
        var domain = $(this).attr("rel");
        
        $.ajax({
            url: domainCart,
            type: "GET",
            cache: false,
            data: {domain:domain,type:'remove'},
            beforeSend: function() {
                $("#preloader").fadeIn();
            },
            success: function(json){
               
                if(json.deleted) {
                    var btn_html = '<button type="button" class="cus-btn border-btn cus-blu-btn btnAddDomainToCart" rel="'+json.domain+'">';
                    btn_html += '<i class="la la-cart-plus"></i> <span>'+transJs.add_to_cart+'</span></button>';
                    el.closest("li").html(btn_html);
                }
               
                $("#preloader").fadeOut();
                if(json.status) {
                    $("#domainCartDiv").html(json.html);
                }
            },
            error: function (jqXHR, exception) {
                $("#preloader").fadeOut();
                console.log(jqXHR.status + '-'+ jqXHR.responseText);
            }
        });
        
    });
    
    $("#domainAvailListSection").delegate(".btnDomainBuy","click",function(e) {
        e.preventDefault();
        var element = $(this);
        
        var domain = $(this).attr("rel");
        domainAddToCart(domain,element,'yes');
    });
});