//*** MAIN MENU FUNCTIONALITY =====================================================================================

(function($){

    "use strict";

    /*//ADD APPROPRIATE CLASSES TO SUBMENUS
    if ($('ul.main_menu > li > ul').length) {
        $('ul.main_menu > li > ul').addClass('menu-dropdown');        
        var lihasdropdown = $('ul.main_menu > li > ul').parent();
        lihasdropdown.addClass('lihasdropdown');  
    };
    if ($('ul.main_menu > li > ul > li > ul').length) {
        $('ul.main_menu > li > ul > li > ul').addClass('menu-dropdown');        
        var sublihasdropdown = $('ul.main_menu > li > ul > li > ul').parent();
        sublihasdropdown.addClass('sublihasdropdown');  
    };*/

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

    // FIX for not jumping to top everytime you hit a menu item that has sub-menu
    //$('.lihasdropdown a:first').attr( 'onclick' , 'return false');
    //$('.sublihasdropdown a:first').attr( 'onclick' , 'return false');

    // HANDLE THE MOBILE MENU
    var collapser     = $('.mobile_collapser')

    collapser.on('click', function(){
        var window_height = $(window).height();
        $('.menu_container').toggleClass('collapsed').css( "height", window_height );
        $('.header').toggleClass('collapsed');
        $('.head_panel').toggleClass('collapsed');
        $('.main').toggleClass('collapsed');
        $('footer').toggleClass('collapsed');
    })

    var ex_close_menu     = $('span.close_menu')

    ex_close_menu.on('click', function(){
        var window_height = $(window).height();
        $('.menu_container').toggleClass('collapsed').css( "height", window_height );
        $('.header').toggleClass('collapsed');
        $('.head_panel').toggleClass('collapsed');
        $('.main').toggleClass('collapsed');
        $('footer').toggleClass('collapsed');
    })
    
    // CLOSE MENUS ON RESIZE
    var widthhh = 0;
    $(window).load(function(){
       widthhh = jQuery(window).width();
    });

    $(window).resize(function(){  
      if(widthhh != jQuery(window).width()){
        $('.collapsed').removeClass('collapsed');
        $('.menu_container').css( "height", "auto" );
        widthhh = jQuery(window).width();
      }
    });

    //HOVER MENU FUNCTIONALITY
    var myTimer = null;
    $('.hover_menu .lihasdropdown').on(
        {
        mouseenter: function() {
            $(this).children('ul').addClass('show wait_for_photo_load');
            if(myTimer != null){
                clearTimeout(myTimer);
            }
        },
        mouseleave: function(){
            myTimer = setTimeout(function() {
                $('.lihasdropdown ul.show').removeClass('show wait_for_photo_load');
            } , 100); 
        }
    });

    var myTimer2 = null;
    $('.hover_menu .sublihasdropdown').on(
        {
        mouseenter: function() {
            $(this).children('ul').addClass('show');
            if(myTimer2 != null){
                clearTimeout(myTimer2);
            }
        },
        mouseleave: function(){
            myTimer2 = setTimeout(function() {
                $('.sublihasdropdown ul.show').removeClass('show');
            } , 100); 
        }
    });


}(jQuery));

//***END MAIN MENU FUNCTIONALITY =========================================================================================


    









