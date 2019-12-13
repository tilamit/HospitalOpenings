(function() {
  
/*!
 ______ _____   _______ _______ _______ _______ ______ _______ 
|   __ \     |_|    ___|_     _|   |   |       |   __ \   _   |
|    __/       |    ___| |   | |       |   -   |      <       |
|___|  |_______|_______| |___| |___|___|_______|___|__|___|___|

P L E T H O R A T H E M E S . C O M               (c) 2014-2015
                        
Theme Name: Medicus
File Version: 1.1.0
This file contains the necessary Javascript for the theme to function properly.

*/

//========================== PLETHORA HELPER FUNCTIONS ==============================================

(function( window, doc, $ ){

  "use strict";

  /*** GET BRAND COLORS ***/

  var rgb            = getComputedStyle( document.querySelector(".brand-colors") )["color"].match(/\d+/g);

  var r = parseInt(rgb[0]).toString(16); r = ( r.length === 1 ) ? "0" + r : r;
  var g = parseInt(rgb[1]).toString(16); g = ( g.length === 1 ) ? "0" + g : g;
  var b = parseInt(rgb[2]).toString(16); b = ( b.length === 1 ) ? "0" + b : b;

  themeConfig["GENERAL"] = themeConfig["GENERAL"] || {}
  themeConfig["GENERAL"].brandPrimary = '#' + r + g + b;

  rgb            = getComputedStyle( document.querySelector(".brand-colors") )["background-color"].match(/\d+/g);

  r = parseInt(rgb[0]).toString(16); r = ( r.length === 1 ) ? "0" + r : r;
  g = parseInt(rgb[1]).toString(16); g = ( g.length === 1 ) ? "0" + g : g;
  b = parseInt(rgb[2]).toString(16); b = ( b.length === 1 ) ? "0" + b : b;

  themeConfig["GENERAL"].brandSecondary = '#' + r + g + b;

  /*** POLYFILLS ***/

  // SHIM POLYFILL FOR: requestAnimationFrame
  window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame ||
                                 window.mozRequestAnimationFrame || window.oRequestAnimationFrame ||
                                 window.msRequestAnimationFrame || function (cb){window.setTimeout(cb,1000/60);};

  var _p = _p || {};

  /*** OBJECT EXTEND: By @toddmotto ***/

  _p.extend = function( target, source ) {
      var merged = Object.create(target);
      Object.keys(source).map(function (prop) {  prop in merged && (merged[prop] = source[prop]);  });
      return merged;
  };

  /*
  _p.extend = function( target, source ) {
    for( var key in source ) {  if( source.hasOwnProperty( key ) ) target[key] = source[key];  }
    return target;
  }
  */

  /*** MULTI SLICE ***/

  _p.slice = function(){
    return [].slice.call.apply( [].slice, arguments );
  }


  /*** BOOLEAN OPERATOR CHECK ***/

  _p.checkBool = function(val){
      return ({1:1,true:1,on:1,yes:1}[(((typeof val !=="number")?val:(val>0))+"").toLowerCase()])?true:false;
  };

  /*** DEBUGGING CONSOLE ***/

  _p.debugLog = function(){
    themeConfig && themeConfig.debug && console.log.apply( console, arguments );
  }

  /*** SVG CREATION UTILITY FUNCTION ***/

  _p.SVGMold  = function( type, options ){
  var molding = doc.createElementNS('http://www.w3.org/2000/svg', type );
  for (var key in options) options.hasOwnProperty(key) && molding.setAttribute( key, options[key]);
    return molding;
  }

  /*** SCROLL ON CLICK ***/

   $(window).bind( 'hashchange', function(e) {
    console.log(parseInt(window.location.hash.replace("#", ""))); 
   });

  $.extend( $.easing, { easeOutQuart: function (x, t, b, c, d) { return -c * ((t=t/d-1)*t*t*t - 1) + b; }, });

  _p.scrollOnClick = function(e){

    var HeaderHeight = $('.header').outerHeight();

    _p.debugLog("Scrolled...");
    e.preventDefault();                   // PREVENT DEFAULT ANCHOR CLICK BEHAVIOR
    var hash        = this.hash;          // STORE HASH
    var hashElement = $(this.hash);       // CACHE $.SELECTOR
     if ( hashElement.length > 0 ){
       $('html, body').animate({ scrollTop: hashElement.offset().top - HeaderHeight }, themeConfig["GENERAL"]["onePagerScrollSpeed"],'easeOutQuart', 
        function(){  
          /*** ADD HASH TO URL WHEN FINISHED [v1.3] | Thank you @LeaVerou! ***/
          if ( history.pushState ) history.pushState( null, null, hash ); // Old Method: window.location.hash = hash 
        });
     }

  }

  return window._p = _p;

}( window, document, jQuery ));

//========================== NAVIGATION: COLLAPSER ==================================================

(function($){

    "use strict";

    // OPEN AND CLOSE SUBMENUS ON CLICK    
    $('.lihasdropdown').on('click', 'a', function(e){
        $('.lihasdropdown').not( $(this).parent() ).children(".menu-dropdown").removeClass("show");
        $('.sublihasdropdown').children(".menu-dropdown").removeClass('show');
        $(this).next(".menu-dropdown").toggleClass("show");
        e.stopPropagation();
    });

    $('.sublihasdropdown').on('click', 'a', function(e){
        $('.sublihasdropdown').not( $(this).parent() ).children(".show").removeClass("show");
        $(this).next(".menu-dropdown").toggleClass("show");
        e.stopPropagation();
    });

    // HIDE SUBMENUS WHEN CLICKING ELSEWHERE
    $(document.body).on('click', function(){
        $('.lihasdropdown').children(".menu-dropdown").removeClass('show');
        $('.sublihasdropdown').children(".menu-dropdown").removeClass('show');
    })

    // HANDLE THE MOBILE MENU
    var $collapser     = $('.mobile_collapser')

    $collapser.on('click', function(){
        var window_height = $(window).height();
        $('.menu_container').toggleClass('collapsed').css( "height", window_height );
        $('.header, .head_panel, .main, footer').toggleClass('collapsed');
    })

    var $ex_close_menu     = $('span.close_menu')
        $ex_close_menu.on('click', function(){
          var window_height = $(window).height();
          $('.menu_container').toggleClass('collapsed').css( "height", window_height );
          $('.header, .head_panel, .main, footer').toggleClass('collapsed');
        });
    
    // CLOSE MENUS ON RESIZE
    var widthhh = 0;
    $(window).load(function(){  widthhh = jQuery(window).width();  });
    $(window).resize(function(){  
      if(widthhh != jQuery(window).width()){
        $('.collapsed').removeClass('collapsed');
        $('.menu_container').css( "height", "auto" );
        widthhh = jQuery(window).width();
      }
    });

    //HOVER MENU FUNCTIONALITY
    //var myTimer = null;
    $('.hover_menu .lihasdropdown').on(
        {
        mouseenter: function() {
            $(this).children('ul').addClass('show wait_for_photo_load');
            //if(myTimer != null){
            //    clearTimeout(myTimer);
            //}
        },
        mouseleave: function(){
            //myTimer = setTimeout(function() {
                $('.lihasdropdown ul.show').removeClass('show wait_for_photo_load');
            //} , 100); 
        }
    });

    var myTimer2 = null;
    $('.hover_menu .sublihasdropdown').on(
        {
        mouseenter: function() {
            $(this).children('ul').addClass('show');
            //if(myTimer2 != null){
            //    clearTimeout(myTimer2);
            //}
        },
        mouseleave: function(){
            //myTimer2 = setTimeout(function() {
                $('.sublihasdropdown ul.show').removeClass('show');
            //} , 100); 
        }
    });


}(jQuery));

//END======================= NAVIGATION: COLLAPSER ==================================================


//========================== NAVIGATION ACTIVE STATE ================================================

(function($){

  var currentLink = document.location.pathname.split("/");
      currentLink = currentLink[currentLink.length-1];
  var activeLink  = document.querySelector(".main_menu a[href$='" + currentLink + "']");  
    ( activeLink !== null ) && activeLink.parentElement.setAttribute( "class", "active" );

}(jQuery));

//END======================= NAVIGATION ACTIVE STATE ================================================

//=============== JQUERY TO PERFORM ON DOM READY ====================================================

jQuery(function($){

  "use strict";

  //============================ STICKY HEADER HEIGHT ==============================

  if( $('.sticky_header .header:not(".transparent")').length ) {
    var HeaderHeight = $('.header').outerHeight();
    var $body = $('body');
    $body.css( 'margin-top', HeaderHeight );
    $(window).on( 'resize', function(){
      var HeaderHeight = $('.header').outerHeight();
      $body.css( 'margin-top', HeaderHeight );
    });
  }

  //======================== HEAD-PANEL Heights ===========================

  if( $('.head_panel .hgroup').length ) {
    var hgroupheight = $('.head_panel .hgroup').outerHeight();
    $('.head_panel').children().css( 'height' , hgroupheight )
  }

  //======================== FULL HEIGHT SECTIONS ===========================

  (function($){

    var section_with_full_height = $('.full_height');
    var section_with_vertical_center_container = $('.full_height.vertical_center').children('[class^=container]');
    var section_with_vertical_bottom_container = $('.full_height.vertical_bottom').children('[class^=container]');

    // All sections with a class="full_width" have their inner container change class, on DOM Ready
    //section_with_full_width.removeClass('container').addClass('container-fluid');

    $(window).on("load resize", function() {

      // Declaring some vars on Load and Resize
      var header_height = $('.header').height();
      var window_height = $(window).height();
      var usable_height = window_height - header_height;


      // All root sections with a class .full_height, take the window height as minimum-height    
      section_with_full_height.css( "min-height", usable_height );
      if ($('.header.transparent').length) {
        section_with_full_height.css( "min-height", window_height );
      }

      // All sections with a class="full_height vertical_center" will have their content vertically centered on the usable height
      section_with_vertical_center_container.each(function(){    
          var container_height = $(this).height();
          var top_padding = (usable_height - container_height -55) * 0.5;
          if (top_padding > 0) {
              $(this).css('padding-top' , top_padding);  
              };  
      });

      // All sections with a class="full_height vertical_bottom" will have their content vertically bottom on the usable height
      section_with_vertical_bottom_container.each(function(){ 
          var container_height = $(this).height(); 
          var top_padding = (usable_height - container_height -25);
          if (top_padding > 0) {
              $(this).css('padding-top' , top_padding - header_height);  
          };    
      });  

    });

  }(jQuery));

  //======================== ELEVATED COLUMN'S PARENT ROW PADDING FIX ==========

  if( $('div[class *="col-"].elevate').length ) {
    $('div[class *="col-"].elevate').parent().css('padding-top' , '70px');
  }

  //============================ 3D LINKS EFFECT ===============================

  (function linkify( selector ) {

      if ( !( themeConfig["GENERAL"].enable3DLinks || document.body.style['webkitPerspective'] !== undefined || document.body.style['MozPerspective'] !== undefined ) ) return;

      _p.slice( document.querySelectorAll( "a.roll" ) ).forEach(function(a){
          a.innerHTML = '<span data-title="'+ a.text +'">' + a.innerHTML + '</span>';
      });

  }());

  //============================ UI TO TOP BUTTON ==============================

  /* DEPRECATED CODE: $.fn.UItoTop && $.fn.UItoTop({ easingType: 'easeOutQuart' }); */

  var $returnToTop = $('#return-to-top');

  $(window).scroll(function() {

      ( $(this).scrollTop() >= 50 ) ? $returnToTop.fadeIn(500) : $returnToTop.fadeOut(500);

  });

  $returnToTop.click(function(){ $('body,html').animate({ scrollTop : 0 }, 500); });

  //======================== NAVIGATION SOCIAL LINKS ===========================

  $(".mainbar .social_links").on("click", function(e){ 
    e.preventDefault();
    $(".mainbar .team_social").toggleClass("showLinks"); 
  });
  $(".main").on("click", function(){ $(".mainbar .team_social").removeClass("showLinks"); });

  //====================== SCROLL ON CLICK OF A HASH-LINK init =================

  (function($){

    $(".mainbar .main_menu, .topbar .top_menu")
      .find('a[href^="#"], button[href^="#"]')
      .add("a.scrollify")
      .on('click', _p.scrollOnClick );

  })(jQuery);

  //==================== SVG NEWSLETTER ========================================

  (function($){

    function SVGNewsletterInit(){

      var svgWrapper        = $(".svg_newsletter");
      if ( svgWrapper.length ){

        var svgWrapperW  = svgWrapper.outerWidth();

        // CREATE SVG CONTAINER
        var svgNode = _p.SVGMold('svg',{
          width   : svgWrapperW + "px",
          height  : "220px",
          version : '1.1',
          xmlns   : 'http://www.w3.org/2000/svg',
          x       : "0px",
          y       : "0px"
        });
        var polygonGroup = _p.SVGMold( 'g', {
          //transform: "translate(-" + ( svgWrapperW * 5/100 ) + ",0)"
        });
        // RIGHT POLYGON SHAPE
        var right_polygon = _p.SVGMold('polygon', {
          points: svgWrapperW * 100/100 + ",220 420,220 560,40 " + svgWrapperW * 100/100 + ",40",
          fill: themeConfig["GENERAL"].brandSecondary
        });
        // LEFT POLYGON SHAPE
        var left_polygon = _p.SVGMold( 'polygon', {
          points : "600,180 " + svgWrapperW * 0/100 + ",180 " + svgWrapperW * 0/100 + ",0 440,0",
          fill   : themeConfig["GENERAL"].brandSecondary
        });
        var left_polygon_image = _p.SVGMold( 'polygon', {
          points : "600,180 " + svgWrapperW * 0/100 + ",180 " + svgWrapperW * 0/100 + ",0 440,0",
          fill   : "url(#svgImage)",
        });
        // CREATE SVG DEFS: PATTERN + PATTERN IMAGE
        if ( themeConfig["SVG_NEWSLETTER"].image !== "" ){
          var svgImage = new Image();
              svgImage.src = themeConfig["SVG_NEWSLETTER"].image; 
          var defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
          var patt_left = _p.SVGMold('pattern',{
            id           : 'svgImage',
            patternUnits : 'userSpaceOnUse',
            width        : '600',
            height       : '180',
            x            : '0',
            y            : '0'
          });
          var image = document.createElementNS('http://www.w3.org/2000/svg', 'image');
              image.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', svgImage.src );
              image.setAttribute('x', '0');
              image.setAttribute('y', '0');
              image.setAttribute('width', '600' );
              image.setAttribute('height', '180');
              image.setAttribute('opacity', '0.5');
          patt_left.appendChild(image); // APPEND IMAGE TO PATTERN
          defs.appendChild(patt_left);  // APPEND PATTERN TO DEFS
          svgNode.appendChild(defs);
        }
        polygonGroup.appendChild(right_polygon);
        polygonGroup.appendChild(left_polygon);
        polygonGroup.appendChild(left_polygon_image);
        svgNode.appendChild(polygonGroup);

        svgWrapper.append(svgNode);

      }

    };

    ( typeof SVGNewsletterInit !== "undefined" ) && SVGNewsletterInit();

  })(jQuery);

  //END================= SVG NEWSLETTER ========================================

  //==================== PARTICLES =============================================

  (function($){

    var preInit = function(){

      var enableAnim = ( themeConfig["PARTICLES"].animation === undefined ) ? false : themeConfig["PARTICLES"].animation;

      var particles_options = {
        light_section       : {
          group: true,
          canvas : {
            bgc: themeConfig["PARTICLES"].bgColor
          },
          particles: { 
            opacity: themeConfig["PARTICLES"].opacity,
            color: themeConfig["PARTICLES"].color, 
            nb: 100,
            line_linked: {
              color: themeConfig["PARTICLES"].color,
              opacity: themeConfig["PARTICLES"].opacity,
              condensed_mode: {
                enable: false,
                rotateX: 600,
                rotateY: 600
              }
            },
            anim: { enable: enableAnim, speed: 2 }
          },
          interactivity: { enable: false },
          retina_detect: true     
        },
        dark_section        : {
          group: true,
          particles: { 
            opacity: themeConfig["PARTICLES"].opacity,
            color: themeConfig["GENERAL"].brandPrimary || themeConfig["GENERAL"].brandPrimary, 
            nb: 100,
            line_linked: {
              opacity: themeConfig["PARTICLES"].opacity,
              color: themeConfig["GENERAL"].brandPrimary || themeConfig["GENERAL"].brandPrimary,
            },
            anim: { enable: enableAnim, speed: 2 }
          },
          interactivity: { enable: false },
          retina_detect: true  
        },
        skincolored_section : {
          group: true,
          particles: { 
            opacity: themeConfig["PARTICLES"].opacity,
            color: themeConfig["GENERAL"].brandSecondary, 
            nb: 100,
            line_linked: {
              opacity: themeConfig["PARTICLES"].opacity,
              color: themeConfig["GENERAL"].brandSecondary,
            },
            anim: { enable: enableAnim, speed: 2 }
          },
          interactivity: { enable: false },
          retina_detect: true  
        },
        secondary_section : {
          group: true,
          particles: { 
            opacity: themeConfig["PARTICLES"].opacity,
            color: '#eeeeee', 
            nb: 100,
            line_linked: {
              opacity: themeConfig["PARTICLES"].opacity,
              color: '#eeeeee',
            },
            anim: { enable: enableAnim, speed: 2 }
          },
          interactivity: { enable: false },
          retina_detect: true  
        }
      }

      particlesInit( particles_options );

    }

    // INITIALIZE PARTICLES EFFECT // 

    themeConfig["PARTICLES"] && themeConfig["PARTICLES"].enable && ( typeof particlesInit !== "undefined" ) && preInit();

  })(jQuery);

  //END================= PARTICLES =============================================

  //============ PARTICLES PARALLAX EFFECT (EXPERIMENTAL) ============//

/*  (function($){

    var parallax_particles = document.querySelector(".parallax.parallax-particles");
    var particlesBox;

    function createFragment( element ){
        var particlesDOM = document.createDocumentFragment();
            particlesBox = document.createElement("div");
            particlesBox.setAttribute("id", "dom");
            particlesBox.style.width = "1600px"; 
            particlesBox.style.height = "1200px";
        var particlesCanvas = document.createElement("canvas");
            particlesBox.appendChild(particlesCanvas);
            particlesDOM.appendChild(particlesBox);
        parallaxParticlesJS( particlesCanvas );
        var canvas   = particlesBox.querySelector("canvas");
        var img      = canvas.toDataURL("image/jpg");
        parallax_particles.style.backgroundImage = "url(" + img + ")";
    }

    function parallaxParticlesJS( elementId ){
      var particles_options_parallax_dark = {
        canvas: {
          el  : elementId,
          w   : 1200,
          h   : 1200,
          bgc : themeConfig["PARTICLES"].bgColorParallax
        },
        particles: { 
          color       : themeConfig["PARTICLES"].colorParallax, 
          nb          : 150,
          line_linked : {
            color       : themeConfig["PARTICLES"].colorParallax,
          },
          anim        : { enable: themeConfig["PARTICLES"].animation, speed: 2 }
        },
        interactivity : { enable: false },
        retina_detect : true     
      };

      particlesJS( elementId, particles_options_parallax_dark );
    }

    ( parallax_particles !== null && themeConfig["PARTICLES"].enableParallax ) && createFragment();

  })(jQuery);*/

  //END========= PARTICLES PARALLAX EFFECT (EXPERIMENTAL) ============//

  //=============== TEAM MEMBERS ===============================================

  (function($){

    $('.team_member').on(
        {
        mouseenter: function() {
            $(this).children('.team_social').addClass('reveal');
        },
        mouseleave: function(){
            $('.team_social.reveal').removeClass('reveal');
        }
    });

  })(jQuery);

  //END============ TEAM MEMBERS ===============================================

  //=============== TESTIMONIALS ===============================================

  (function($){

    var $testimonials     = $(".testimonial-slider ul.slides");
    if ( $testimonials.length && $.fn.owlCarousel ){

        $testimonials.owlCarousel({  
          items      : 1,
          loop       : true,
          autoplay   : true
        });

    }

    /* DEPRECATED CODE: Using FlexSlider */
    // $(".testimonial-slider").flexslider({
    //     pauseOnHover   : true,
    //     controlNav     : true,
    //     directionNav   : false,
    //     animation      : "slide",
    //     easing         : "swing",
    //     reverse        : true,
    //     slideshowSpeed : 6000,
    //     start          : function(){  $(this).find("ul.slides li").show();  },
    // });

  })(jQuery);

  //END============ TESTIMONIALS ===============================================

  //================== DOUBLE HELIX EFFECT =====================================

  (function($){

    if ( $.fn.DoubleHelix && themeConfig["DOUBLE_HELIX"].enable ){
      var captions = document.querySelectorAll(".portfolio_grid .portfolio_description");
      _p.slice(captions).forEach(function(c,i){
            var canvas = document.createElement("canvas");
                canvas.setAttribute("width", 100);
                canvas.setAttribute("height", c.offsetHeight );
                canvas.style.position = "absolute";
                canvas.style.top = 0;
                canvas.style.left = "30px";
                canvas.style.opacity = 0.8;
                c.appendChild(canvas);
                $(canvas).DoubleHelix();
      });
    }

  })(jQuery);
 
  //END=============== DOUBLE HELIX EFFECT =====================================

  //=================== PARALLAX ===================================================

  (function($){

    $('.parallax-window').each(function(){

      var bg_image = $(this).css("background-image").replace('url(','').replace(')','').replace(/\"/g, '').replace(/\'/g, '');
      $(this).addClass("transparent").css("background-image","none").attr("data-parallax", "scroll").attr("data-image-src", bg_image).attr("data-position", "center top");

    }); 

  }(jQuery));

//END=================== PARALLAX ===================================================

});
//END================== JQUERY TO PERFORM ON DOM READY ========================================================


//===================== JQUERY TO PERFORM ON WINDOW LOAD ======================================================

jQuery(window).load(function(a,b,c){
      
  "use strict";

  var $ = jQuery.noConflict();

  //================== SAME COLUMN HEIGHT ==========================================

  var sameHeightCols = $(".same_height_col");

  if ( !( window.matchMedia && window.matchMedia( "only screen and (max-width: 480px)" ).matches && sameHeightCols.length > 0 ) ){
      sameHeightCols.conformity();
      $(window).on( "resize", function() {  sameHeightCols.conformity();  });
  } 

  //END=============== SAME COLUMN HEIGHT ==========================================

  //================== ISOTOPE FILTERING: PORTFOLIO ================================

  (function($){

      var $container = $('#cont_medicus'); 

      if ( $.fn.isotope && $container.length ){

        $container.isotope({});   

        $('#filt_medicus a[data-filter="*"]').addClass('active'); 

        var $filterAnchor = $('#filt_medicus a');
            $filterAnchor.click(function(){ 

              $filterAnchor.removeClass('active'); 
              $(this).addClass('active'); 
              var selector = $(this).attr('data-filter'); 
              $container.isotope({ filter: selector }); 
              return false; 

            }); 

      $(window).resize(function(){ $container.isotope({}); });

      }

  })(jQuery);

  //END=============== ISOTOPE FILTERING ===========================================

  //================== MASONRY ===========================================

  (function($){

    var $container = $('.masonry > .row'); 

    if ( $.fn.isotope && $container.length ){

      $container.isotope({});   

      $(window).resize(function(){  $container.isotope({});  });
      
    }

  })(jQuery);

  //END=============== MASONRY ===========================================  

  //================== ENABLE BEFORE/AFTER PLUGIN ========================

  $.fn.twentytwenty && $('.twentytwenty-container') && $('.twentytwenty-container').twentytwenty({ default_offset_pct: 0.5, orientation: 'horizontal' });

  //================== SVG SLIDER ==================================================

  /*
  (function($){

  // CHECK FOR SVG BROWSER SUPPORT
  if ( 
    document.querySelector(".svg_slider") &&
    !! document.createElementNS 
    && !! document.createElementNS('http://www.w3.org/2000/svg','svg').createSVGRect 
    && document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1") 
    ){

      var angle   = 140;
      var divider = 2;

      /// SPEECH SYNTHESIS ////
      if ( window.speechSynthesis ) {

        // CHECK FOR CHROME VOICE AND INIT speakText();
        speechSynthesis.onvoiceschanged = function(){}

        var speakText = function speakText(text){
          var msg       = new SpeechSynthesisUtterance();
          var voices    = window.speechSynthesis.getVoices();

          msg.voice     = voices[2]; 
          msg.text      = text;
          msg.onend     = function(e) {
              svgSpeaking = false; // event.elapsedTime
          };

          if ( voices[2].name === "Google UK English Female" ){
            _p.debugLog("Speaking...", voices ); 
            svgSpeaking = true;
            speechSynthesis.speak(msg);
          }

        }
      }

    /// CAPTIONS ANIMATION ////

    var svg_captions        = document.querySelectorAll(".svg_captions li p");
    var svg_captions_length = svg_captions.length;
    var svgHover            = false;
    var svgSpeaking         = false;
    var currentSvgCaption   = 0;

    svg_captions = [].slice.apply(svg_captions);
    svg_captions.forEach(function(caption){
        caption.classList.add( "animated", themeConfig["SVGSLIDER"].animationType );
    });

    var svgChange = function( direction ){
      if ( direction !== "prev" ){
        if ( currentSvgCaption === svg_captions_length - 1 ){
          svg_captions[currentSvgCaption].classList.add("hidden");
          currentSvgCaption = 0;
          svg_captions[currentSvgCaption].classList.remove("hidden");
        } else {
          svg_captions[currentSvgCaption].classList.add("hidden");
          svg_captions[currentSvgCaption+1].classList.remove("hidden");
          currentSvgCaption++;
        }
      } else {
        if ( currentSvgCaption === 0 ){
          svg_captions[currentSvgCaption].classList.add("hidden");
          currentSvgCaption = svg_captions_length-1;
          svg_captions[currentSvgCaption].classList.remove("hidden");
        } else {
          svg_captions[currentSvgCaption].classList.add("hidden");
          svg_captions[currentSvgCaption-1].classList.remove("hidden");
          currentSvgCaption--;
        }
      }
      if ( themeConfig["SVGSLIDER"].speech ) speakText( svg_captions[currentSvgCaption].textContent );
    }

      // LOAD SLIDER IMAGES
      var imageLeft      = new Image();
          imageLeft.src  = themeConfig["SVGSLIDER"].leftImage;
      var imageRight     = new Image();
          imageRight.src = themeConfig["SVGSLIDER"].rightImage;

      // GET BODY ELEMENT WIDTH
      var bodyWidth      = $("body").width();  

      // CREATE SVG CONTAINER
      var slider_wrapper = document.getElementById('slider_wrapper');

      var svgNode = _p.SVGMold('svg',{
        width   : bodyWidth + "px",
        height  : "480px",
        version : '1.1',
        xmlns   : 'http://www.w3.org/2000/svg'
      });

      // CREATE SVG DEFS: PATTERN + PATTERN IMAGE
      var defs = _p.SVGMold('defs');

      var patt_left = _p.SVGMold('pattern',{
        id           : 'left_image',
        patternUnits : 'userSpaceOnUse',
        width        : '1366',
        height       : '480',
        x            : '0',
        y            : '0'
      });

      var image = document.createElementNS('http://www.w3.org/2000/svg', 'image');
          image.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', imageLeft.src );
          image.setAttribute('x', '0');
          image.setAttribute('y', '0');
          image.setAttribute('width', '1366' );
          image.setAttribute('height', '480');

      patt_left.appendChild(image); // APPEND IMAGE TO PATTERN
      defs.appendChild(patt_left);  // APPEND PATTERN TO DEFS

      //ANIMATED SVG SLIDER // EXPERIMENTAL
      // image.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', './assets/images/slider-right.jpg' );
      // image.setAttribute('width', '1170');
      // image.setAttribute('height', '779');
      // image.setAttribute('opacity', '0.5');
      

      // CREATE LEFT AND RIGHT SVG SLIDER CONTAINERS
      var svg_left = _p.SVGMold('polygon',{
        points : (bodyWidth/divider-angle) + ",480 0,480 0,0 "+(bodyWidth/divider+angle)+",0",
        fill   : "url(#left_image)"
      });

      var svgRightBgColor = themeConfig["SVGSLIDER"].rightImageColor;
          svgRightBgColor = ( svgRightBgColor.indexOf("#") === -1 ) ? themeConfig["GENERAL"]["brand" + svgRightBgColor[0].toUpperCase() + svgRightBgColor.slice(1)] : svgRightBgColor;

      var svg_right = _p.SVGMold('polygon',{
        points       : bodyWidth+",480 "+(bodyWidth/divider-angle)+",480 "+(bodyWidth/divider+angle)+",0 "+bodyWidth+",0",
        fill         : svgRightBgColor, 
        "fill-opacity" : "0.75",
      });

      document.querySelector('.svg_slider .right_image').style.backgroundImage = "url(" + imageRight.src + ")";

      svgNode.appendChild(svg_left);  
      svgNode.appendChild(svg_right);
      svgNode.appendChild(defs);

      // FIX IMAGE FLICKR
      var timeout = setTimeout(function(){
        slider_wrapper.appendChild(svgNode);
        slider_wrapper.getElementsByClassName("right_image")[0].style.visibility = "visible";
        clearTimeout(timeout);
      }, 100);

      // ON WINDOW RESIZE, REDRAW THE TWO TRIANGLES AND THE SVG CONTAINER
      window.onresize = function( el ){
        bodyWidth = $("body").width();
        svg_left.setAttribute( "points", ( bodyWidth/2-angle ) + ",480 0,480 0,0 "+( bodyWidth/2+angle )+",0" );
        svg_right.setAttribute( "points", bodyWidth+",480 "+( bodyWidth /2-angle )+",480 "+( bodyWidth/2+angle )+",0 "+ bodyWidth+",0" );
        svgNode.setAttributeNS( 'http://www.w3.org/2000/svg', "width", bodyWidth );
        svgNode.style.width = bodyWidth; // $(svgNode).width(bodyWidth) <- will work too.
      } 

      // CAPTIONS ANIMATION
      $(".svg_slider .flex-direction-nav li a").click(function(e){
        svgChange( e.target.className.replace( "flex-", "" ) );
      });

      var svgCaptionAnimation = setInterval(function(){
        _p.debugLog( svgSpeaking )
        if ( !svgHover && !svgSpeaking ) svgChange();
      }, themeConfig["SVGSLIDER"].speed );
      $(".svg_slider").mouseenter(function(){
        svgHover = true;
      }).mouseleave(function(){
        svgHover = false;
      })

  } else {
      // NOT SVG SUPPORT!
  }

  })(jQuery);
  */

  //END================ SVG SLIDER =================================================

  //=================== WOW (REVEAL ON SCROLL INIT FOR NO-TOUCH DEVICES) ===========

  (function($){

    if ($('.no-touch').length) {
      var wow = new WOW({
        animateClass : 'animated',
        offset       :       100
      });
      wow.init();
    }

  })(jQuery);

  //END================ WOW (REVEAL ON SCROLL INIT FOR NO-TOUCH DEVICES) ===========

  //=================== LIGHTBOX ===================================================

  (function($){

    var activityIndicatorOn = function(){
        $( '<div id="imagelightbox-loading"><div></div></div>' ).appendTo( 'body' );
      },
      activityIndicatorOff = function(){
        $( '#imagelightbox-loading' ).remove();
      },
      overlayOn = function(){
        $( '<div id="imagelightbox-overlay"></div>' ).appendTo( 'body' );
      },
      overlayOff = function(){
        $( '#imagelightbox-overlay' ).remove();
      },
      closeButtonOn = function( instance ){
        $( '<a href="#" id="imagelightbox-close">Close</a>' ).appendTo( 'body' ).on( 'click', function(){ $( this ).remove(); instance.quitImageLightbox(); return false; });
      },
      closeButtonOff = function(){
        $( '#imagelightbox-close' ).remove();
      },
      captionOn = function(){
            var description = $( 'a[href="' + $( '#imagelightbox' ).attr( 'src' ) + '"] img' ).attr( 'alt' ) || "";
        if( description.length > 0 )
          $( '<div id="imagelightbox-caption">' + description + '</div>' ).appendTo( 'body' );
      },

        // DISPLAY CAPTION ON SINGLE POST VIEW
        captionOnSingle = function()
        {
            var description = $( 'a[href="' + $( '#imagelightbox' ).attr( 'src' ) + '"]' ).attr( 'title' ) || "";
            if( description.length > 0 )
                $( '<div id="imagelightbox-caption">' + description + '</div>' ).appendTo( 'body' );
        },

        // DISPLAY CAPTION ON GALLERY GRID CLASSIC MODE. CAPTION IS BASED ON ALT ATTRIBUTE.
        captionOnGallery = function(){
            var description = $( 'a[href="' + $( '#imagelightbox' ).attr( 'src' ) + '"]' ) || "";
            if ( description.attr('data-description') !== "undefined" && description.attr('data-description') !== "" ){
                description = description.attr('data-description');
            } else if ( description.attr('datas-caption') !== "undefined" && description.attr('datas-caption') !== "" ) {
                description = description.attr('data-caption');
            }
            if( description && description.length > 0 )
                $( '<div id="imagelightbox-caption">' + description + '</div>' ).appendTo( 'body' );
        },

        captionOff = function(){
          $( '#imagelightbox-caption' ).remove();
        };

        // ARROWS

        var arrowsOn = function( instance, selector ){
          if ( instance.length > 3 ){
            var $arrows = $( '<button type="button" class="imagelightbox-arrow imagelightbox-arrow-left"></button><button type="button" class="imagelightbox-arrow imagelightbox-arrow-right"></button>' );
                $arrows.appendTo( 'body' );
                $arrows.on( 'click touchend', function( e ){
                  e.preventDefault();
                  var $this   = $( this ),
                      $target = $( selector + '[href="' + $( '#imagelightbox' ).attr( 'src' ) + '"]' ),
                      index   = $target.index( selector );
                  if( $this.hasClass( 'imagelightbox-arrow-left' ) ) {
                      index = index - 1;
                      if( !$( selector ).eq( index ).length ) index = $( selector ).length;
                  } else {
                      index = index + 1;
                      if( !$( selector ).eq( index ).length )
                          index = 0;
                  }
                  instance.switchImageLightbox( index ); 
                  return false;
            });
          }
        },
        arrowsOff = function(){
          $( '.imagelightbox-arrow' ).remove();
        };

    //  MASONRY GALLERY INITIALIZATION
    if ( $().imageLightbox ) {

        // ADDING LIGHTBOX FOR GALLERY GRID / CLASSIC "PORTFOLIO STRICT" & MASONRY
        // var selectorGG = 'a[data-imagelightbox="gallery"]';  // ENABLE ARROWS
        var selectorGG = 'a.lightbox_gallery';                  // ENABLE ARROWS
        var instanceGG = $( 'a.lightbox_gallery' ).imageLightbox({
            /* WITH ARROWS */
            onStart:        function() { arrowsOn( instanceGG, selectorGG ); overlayOn(); closeButtonOn( instanceGG ); }, 
            onEnd:          function() { arrowsOff(); overlayOff(); captionOff(); closeButtonOff(); activityIndicatorOff(); }, 
            onLoadEnd:      function() { $( '.imagelightbox-arrow' ).css( 'display', 'block' ); captionOnGallery(); activityIndicatorOff(); },
            onLoadStart:    function() { captionOff(); activityIndicatorOn(); }
        });
        var selectorS = 'a[data-imagelightbox="gallery"]'; // ENABLE ARROWS
        var instanceS = $( 'a.lightbox_single' ).imageLightbox({
          /* WITH ARROWS */
          onStart:        function() { arrowsOn( instanceS, selectorS ); overlayOn(); closeButtonOn( instanceS ); },
          onEnd:          function() { arrowsOff(); overlayOff(); captionOff(); closeButtonOff(); activityIndicatorOff(); },
          onLoadEnd:      function() { $( '.imagelightbox-arrow' ).css( 'display', 'block' ); captionOnSingle(); activityIndicatorOff(); },
          onLoadStart:    function() { captionOff(); activityIndicatorOn(); }
        });

    }

  })(jQuery);

  //END================ LIGHTBOX ===================================================

});
//END============================= JQUERY TO PERFORM ON WINDOW LOAD =======================================

;


}).call(this);
