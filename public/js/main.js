(function($) { 


    //add class to header if it is on scroll or not on top of the window//
    jQuery(window).scroll(function() {
        checkHeaderScroll();
    });
    function checkHeaderScroll(){
        if (jQuery(this).scrollTop() > 50) {
            jQuery('header.site-header').addClass('scrolling');
        }else{
            jQuery('header.site-header').removeClass('scrolling');
        }  
    }

    checkHeaderScroll();

    //menu toggle//
	$('.parent-menu > a').on('click' , function(e){
		e.preventDefault();
		if($(this).hasClass('active')) {
			$(this).next('.sub-menu').slideUp('500');
			$(this).removeClass('active');
		}else {
			$('.sub-menu').slideUp('500');
			$('.parent-menu a').removeClass('active');
			$(this).next('.sub-menu').slideDown('500');
			$(this).addClass('active');
		}
	});

  //menu sub menu toggle//
	$('.column-title').on('click' , function(e){
		e.preventDefault();
		if($(this).hasClass('active')) {
			$(this).next('ul').slideUp('500');
			$(this).removeClass('active');
		}else {
			$('.sub-menu ul').slideUp('500');
			$('.column-title').removeClass('active');
			$(this).next('ul').slideDown('500');
			$(this).addClass('active');
		}
	});

  //mobile btn toggle//
  $('.mobile-btn').on('click' , function(e) {
      e.preventDefault();
      $('.site-header').toggleClass('color');
      $('.site-header nav').toggleClass('open');
      // menuLevel.removeClass('open');
      $(this).find('.bar').toggleClass('animate');
  });


  //home page computer slider
  var hp_slider = new Swiper ('.home-slider .swiper-container', {
    loop: true,
    slidesPerView:1,
    pagination: {
      el: '.hp-slider-pagination',
      clickable:true
    },
    navigation: {
      nextEl: '.hp-nav-next',
      prevEl: '.hp-nav-prev',
    },
  });


  //the ticker component that shows on different pages//
   var ticker = new Swiper ('.ticker .swiper-container', {
    loop: true,
    slidesPerView:1,
    // If we need pagination
    pagination: {
      el: '.ticker-pagination',
      clickable:true
    },
  });


   //plans ticker//
   var plans_ticker = new Swiper ('.plans-ticker .swiper-container', {
    loop: true,
    slidesPerView:4,
    centeredSlides:true,
    navigation: {
      nextEl: '.plans-ticker .swiper-button-next',
      prevEl: '.plans-ticker .swiper-button-prev',
    },
    on: {
      slideChangeTransitionEnd: function (swiper, current, total) {
        $('.plans-ticker .swiper-slide').find('.plan').removeClass('normal');
        $('.plans-ticker .swiper-slide.swiper-slide-active').find('.plan').addClass('normal');
      },
    },
    breakpoints: {
      1024: {
        slidesPerView: 1,
      }
    }
  });


   //flags ticker//
   var flags = new Swiper ('.flags-wraper', {
    loop: true,
    slidesPerView:5,
    centeredSlides:true,
    slideToClickedSlide:true,
    breakpoints: {
      1024: {
        slidesPerView: 3,
        centeredSlides:true,
        loop: true,
        initialSlide: 0,
      }
    }
  });

   //faq open and close//
  $('.faq ul li').on('click' , function(){

      $(this).toggleClass('open');
      $(this).find('.faq-text').slideToggle(500);
  });


    //slider on plugin-article page - with thumbs//
    if($('.slider-with-thumbs').length > 0){



      var galleryTopPopup = new Swiper('.cloned-slider', {
        slidesPerView: 1,
        loop:false,
        observer: true,
        loop:true,
        navigation: {
          nextEl: '.slider-popup-next',
          prevEl: '.slider-popup-prev',
        },
      });


      var galleryTop = new Swiper('.slider-with-thumbs .gallery-top', {
        slidesPerView: 1,
        loop:true,
      });

      var galleryThumbs = new Swiper('.slider-with-thumbs .gallery-thumbs', {
        spaceBetween: 20,
        centeredSlides: false,
        slidesPerView: 4,
        loop:true,
        touchRatio: 0.2,
        slideToClickedSlide: true,
      });
      galleryTop.controller.control = galleryThumbs;
      galleryThumbs.controller.control = galleryTop;

      $('.slider-with-thumbs').on('click' , '.gallery-top .swiper-slide' , function(){

          var slideIndex = $(this).index()-1;
          
          var currentSlides = $(this).parents('.gallery-top').find('.swiper-slide').clone();


          preparePopupSlider(currentSlides , slideIndex);


      });

      function preparePopupSlider(slidesArr , currentSlide) {
            var popupSlides = [];

            for ( var i = 0; i < slidesArr.length; i++ ) {
              popupSlides.push( slidesArr[ i ] );
            }

            galleryTopPopup.appendSlide(popupSlides);

            galleryTopPopup.update();


            galleryTopPopup.slideTo(currentSlide , 0 , false);

            console.log(galleryTopPopup);

            $('.popup#slider-popup').fadeIn(500);
        }

    }

    //tabs//
    $('.tabs').each(function(){
      $(this).on('click' , '.tabs-navi li' , function(){
          $tab = $(this).attr('data-tab');
          $(this).parents('.tabs').find('.tabs-navi li').removeClass('active');
          $(this).addClass('active');

          $(this).parents('.tabs').find('.tabs-body .tab').removeClass('active');
          $('.tabs-body .tab#'+$tab).addClass('active');
      });
    });

    //accordion feature - open the text under the title//
    $('.accordion').each(function(){
        $(this).on('click' , '.accordion-title' , function(){
            $(this).toggleClass('active');
            // $(this).next('.accordion-text').slideToggle(500);
        });
    });


    //open popup based on data-popup attribute//
    $('.open-popup').on('click' , function(){
        popup_id = $(this).attr('data-popup');

      $('.popup#'+popup_id).fadeIn(500);
    });

    //close popup on the black overlay click//
    $('.popup').on('click' , '.popup-overlay , .inner-popup , .close-popup' , function(e){
        if(e.target !== e.currentTarget) return;
        $(this).parents('.popup').fadeOut(500);
    });


})(jQuery);		