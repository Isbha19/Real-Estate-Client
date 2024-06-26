import { Component } from '@angular/core';
declare var jQuery: any;
@Component({
  selector: 'app-testimonial',
  standalone: true,
  imports: [],
  templateUrl: './testimonial.component.html',
  styleUrl: './testimonial.component.scss'
})
export class TestimonialComponent {
  ngAfterViewInit() {
    (function ($) {
     $(document).ready(function () {
       $(".testimonial-carousel").owlCarousel({
         autoplay: true,
         smartSpeed: 1000,
         margin: 24,
         dots: false,
         loop: true,
         nav : true,
         navText : [
             '<i class="bi bi-arrow-left"></i>',
             '<i class="bi bi-arrow-right"></i>'
         ],
         responsive: {
             0:{
                 items:1
             },
             992:{
                 items:2
             }
         }
       });
     });
   })(jQuery);
   }
}
