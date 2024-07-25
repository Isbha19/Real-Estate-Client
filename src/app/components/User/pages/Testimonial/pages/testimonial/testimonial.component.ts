import { Component } from '@angular/core';
import { TestimonialDetail } from '../../model/TestimonialDetail';
import { TestimonialService } from '../../service/testimonial.service';
import { CommonModule } from '@angular/common';
declare var jQuery: any;
@Component({
  selector: 'app-testimonial',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonial.component.html',
  styleUrl: './testimonial.component.scss'
})
export class TestimonialComponent {
  testimonials: TestimonialDetail[] = [];

  ngOnInit(): void {
     this.testimonialService.getAllTestimonials().subscribe((data: TestimonialDetail[]) => {
      console.log(JSON.stringify(data)+"from testimonial");
      
       this.testimonials = data;
       this.initializeCarousel();


     });
   }
initializeCarousel(){
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
   constructor(private testimonialService: TestimonialService) {}
 
   getStars(rating: number): number[] {
    return Array(rating).fill(0);
  }
}
