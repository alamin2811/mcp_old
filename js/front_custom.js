/*header fixed start*/
$(window).scroll(function () {
    $(window).scrollTop() >= 100 ? $(".sticky-header").addClass("fixed") : $(".sticky-header").removeClass("fixed")
  })
/*header fixed end*/

/*country select dropi start*/
$('select').wSelect();

//$('#country_select_dropi').val('CA').change();
/*country select dropi start*/


$("#client_scroll").owlCarousel({
    items : 1,
      navigation: false,
      pagination: true,
    margin: 10,
        itemsCustom : false,
        itemsDesktop : [1199, 1],
        itemsDesktopSmall : [979, 1],
        itemsTablet : [768, 1],
        itemsTabletSmall : [640, 1],
        itemsMobile : [480, 1],
        lazyLoad : true,
    autoPlay : 2000,
    stopOnHover : true
      });

$("#HDS_scroll").owlCarousel({
    items : 4,
    navigation : true,
    pagination : false,
    margin: 10,
    itemsCustom : false,
    itemsDesktop : [1199, 4],
    itemsDesktopSmall : [980, 2],
    itemsTablet : [768, 2],
    itemsTabletSmall : [640, 2],
    itemsMobile : [480, 1],
    lazyLoad : true,
    autoPlay : 2000,
    stopOnHover : true
  });


$("#TLDS_scroll").owlCarousel({
    items : 6,
    navigation : false,
    pagination : true,  
    margin: 10,
    itemsCustom : false,
    itemsDesktop : [1199, 6],
    itemsDesktopSmall : [979, 4],
    itemsTablet : [768, 3],
    itemsTabletSmall : [640, 3],
    itemsMobile : [480, 2],
    lazyLoad : true,
    autoPlay : 4000,
    stopOnHover : true,
 });

$("#help_DF").owlCarousel({
    items : 1,
    navigation : false,
    pagination : true,  
    margin: 10,
    itemsCustom : false,
    itemsDesktop : [1199, 1],
    itemsDesktopSmall : [979, 1],
    itemsTablet : [768, 1],
    itemsTabletSmall : [640, 1],
    itemsMobile : [480, 1],
    lazyLoad : true,
    autoPlay : 4000,
    stopOnHover : true,
 });


$(document).ready(function(){
$("#yourbadge_scroll").owlCarousel({
        autoPlay: true,
        items : 6,
        navigation:true,
        navText: ["<img src='myprevimage.png'>","<img src='mynextimage.png'>"],
        pagination : false,
        margin: 10,
        itemsCustom : false,
        itemsDesktop : [1199, 4],
        itemsDesktopSmall : [979, 3],
        itemsTablet : [768, 2],
        itemsTabletSmall : [640, 2],
        itemsMobile : [480, 1],
        lazyLoad : true,
        autoPlay : 2000,
        stopOnHover : true
      });
 $( ".owl-prev").html('<i class="la la-angle-left"></i>');
 $( ".owl-next").html('<i class="la la-angle-right"></i>');
}); 

$(document).ready(function(){
$("#autherbadge_scroll").owlCarousel({
        autoPlay: true,
    items : 4,
      navigation:true,
        navText: ["<img src='myprevimage.png'>","<img src='mynextimage.png'>"],
      pagination : false,
    margin: 10,
        itemsCustom : false,
        itemsDesktop : [1199, 3],
        itemsDesktopSmall : [979, 3],
        itemsTablet : [768, 2],
        itemsTabletSmall : [640, 2],
        itemsMobile : [480, 1],
        lazyLoad : true,
    autoPlay : 2000,
    stopOnHover : true
      });
 $( ".owl-prev").html('<i class="la la-angle-left"></i>');
 $( ".owl-next").html('<i class="la la-angle-right"></i>');
}); 



$(document).ready(function(){
  $(".banner-scroll-btn a").on('click', function(event) {
    if (this.hash !== "") {
      event.preventDefault();
      // Store hash
      var hash = this.hash;
      $('html, body').animate({
        scrollTop: $(hash).offset().top 
      }, 800, function(){
        window.location.hash = hash;
      });
    } // End if
  });
});



/* $("#ps_enerate").ionRangeSlider({
        grid: true,
        from: new Date().getMonth(),
        values: [
            "1", "20", "40", "60", "80", "100", "120"
        ]
    }); */


/*Select box*/
var config = {
  '.chosen-select'           : {},
  '.chosen-select-deselect'  : { allow_single_deselect: true },
  '.chosen-select-no-single' : { disable_search_threshold: 10 },
  '.chosen-select-no-results': { no_results_text: 'Oops, nothing found!' },
  '.chosen-select-rtl'       : { rtl: true },
  '.chosen-select-width'     : { width: '100%' }
}
for (var selector in config) {
  $(selector).chosen(config[selector]);
}
/*Select box*/


/*accordion pluse minus goes here */      
   jQuery('.accordion-toggle').click(function(){
      
      var has = jQuery(this);
      if(has.hasClass('collapsed')){
         jQuery(this).find('i').removeClass('fa-minus');
         jQuery(this).find('i').addClass('fa-plus');
      }
      else{
        jQuery(this).find('i').removeClass('fa-plus');
        jQuery(this).find('i').addClass('fa-minus');
      }
  });
/*accordion pluse minus goes here */


/* progressbar start*/
$('.circlechart').circlechart();  
/* progressbar end */


/*(function($){
  $(window).on("load",function(){
    $(".link_scroll").mCustomScrollbar({
      theme:"minimal",  
    });

  });
})(jQuery); 
*/
$('.flat-toggle').on('click', function() {
    $(this).toggleClass('on');
  });

/*home page menu start*/
(function($) {
$.fn.menumaker = function(options) {  
 var cssmenu = $(this), settings = $.extend({
   format: "dropdown",
   sticky: false
 }, options);
 return this.each(function() {
   $(this).find(".button").on('click', function(){
     $(this).toggleClass('menu-opened');
     var mainmenu = $(this).next('ul');
     if (mainmenu.hasClass('open')) { 
       mainmenu.slideToggle().removeClass('open');
     }
     else {
       mainmenu.slideToggle().addClass('open');
       if (settings.format === "dropdown") {
         mainmenu.find('ul').show();
       }
     }
   });
   cssmenu.find('li ul').parent().addClass('has-sub');
multiTg = function() {
     cssmenu.find(".has-sub").prepend('<span class="submenu-button"></span>');
     cssmenu.find('.submenu-button').on('click', function() {
       $(this).toggleClass('submenu-opened');
       if ($(this).siblings('ul').hasClass('open')) {
         $(this).siblings('ul').removeClass('open').slideToggle();
       }
       else {
         $(this).siblings('ul').addClass('open').slideToggle();
       }
     });
   };
   if (settings.format === 'multitoggle') multiTg();
   else cssmenu.addClass('dropdown');
   if (settings.sticky === true) cssmenu.css('position', 'fixed');
resizeFix = function() {
  var mediasize = 1000;
     if ($( window ).width() > mediasize) {
       cssmenu.find('ul').show();
     }
     if ($(window).width() <= mediasize) {
       cssmenu.find('ul').hide().removeClass('open');
     }
   };
   resizeFix();
   return $(window).on('resize', resizeFix);
 });
  };
})(jQuery);

(function($){
$(document).ready(function(){
$("#cssmenu").menumaker({
   format: "multitoggle"
});
});
})(jQuery);
/*home page menu end*/
