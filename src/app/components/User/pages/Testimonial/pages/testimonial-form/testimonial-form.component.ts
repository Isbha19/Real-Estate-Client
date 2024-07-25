import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../../../../../../material.module';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { AccountService } from '../../../../../../core/service/account.service';
import { JwtDecodedToken } from '../../../../../../core/model/jwtTokenDecoded';
import { jwtDecode } from 'jwt-decode';
import {Testimonial} from '../../model/Testimonial';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TestimonialService } from '../../service/testimonial.service';
@Component({
  selector: 'app-testimonial-form',
  standalone: true,
  imports: [ReactiveFormsModule,MaterialModule,NgxStarRatingModule],
  templateUrl: './testimonial-form.component.html',
  styleUrl: './testimonial-form.component.scss'
})

export class TestimonialFormComponent {
  testimonialForm: FormGroup;
  rating=0;
  constructor(private fb: FormBuilder,private accountService:AccountService,
    private router:Router, private toastr:ToastrService,private testimonialService:TestimonialService
  ) {
    this.testimonialForm = this.fb.group({
      name:  [{ value: '', disabled: true },
        Validators.required],
      title: ['', Validators.required],
      message: ['', Validators.required],
      rating: [3, [Validators.required, Validators.min(1), Validators.max(5)]]
    });
  }
  ngOnInit(): void {
   this.populateUserInformation();
  }
  populateUserInformation(): void {
    this.accountService.user$.subscribe((user) => {
      if (user) {
        const decodedToken: JwtDecodedToken = jwtDecode(user?.jwt);
        this.testimonialForm.get('name')?.setValue(user.firstName + ' ' + user.lastName);
      }
    });
  }

  onSubmit(): void {
    if (this.testimonialForm.valid) {
      const testimonial: Testimonial = {
        title:this.testimonialForm.value.title,
        message:this.testimonialForm.value.message,
        rating:this.testimonialForm.value.rating,
      };
      this.testimonialService.submitTestimonial(testimonial).subscribe({
        next: (response) => {
          this.toastr.success(response.message)
          this.testimonialForm.reset();
this.router.navigateByUrl('/');
        }
      });
    
    }else{
      this.toastr.warning("please fill in all the fields")
    }
  }
}
