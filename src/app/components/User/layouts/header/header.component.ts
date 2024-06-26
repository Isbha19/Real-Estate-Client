import { Component } from '@angular/core';
declare var jQuery: any;
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  ngAfterViewInit() {
    (function ($) {
      $(document).ready(function () {
        $('.header-carousel').owlCarousel({
         autoplay: true,
         smartSpeed: 1500,
         items: 1,
         dots: true,
         loop: true,
         nav : true,
         navText : [
             '<i class="bi bi-chevron-left"></i>',
             '<i class="bi bi-chevron-right"></i>'
         ]
        });
      });
    })(jQuery);
   
    
   }

}
