(function(o){"use strict";var n=function(){setTimeout(function(){o("#spinner").length>0&&o("#spinner").removeClass("show")},1)};n(),new WOW().init(),o(window).scroll(function(){o(this).scrollTop()>45?o(".nav-bar").addClass("sticky-top"):o(".nav-bar").removeClass("sticky-top")}),o(window).scroll(function(){o(this).scrollTop()>300?o(".back-to-top").fadeIn("slow"):o(".back-to-top").fadeOut("slow")}),o(".back-to-top").click(function(){return o("html, body").animate({scrollTop:0},1500,"easeInOutExpo"),!1})})(jQuery);
