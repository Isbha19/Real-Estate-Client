import { Testimonial } from "../model/Testimonial";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment';
import { ApiResponse } from '../../../../../core/model/response/ApiResponse';
import { Injectable } from "@angular/core";
import { TestimonialDetail } from "../model/TestimonialDetail";

@Injectable({ providedIn: 'root' })
export class TestimonialService {
  
  constructor(private http: HttpClient){}
  submitTestimonial(testimonial: Testimonial): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(
      `${environment.apiUrl}Testimonial/submit-testimonial`,
      testimonial
    );
  }
  getAllTestimonials(): Observable<TestimonialDetail[]> {
    return this.http.get<TestimonialDetail[]>(`${environment.apiUrl}Testimonial/get-all-testimonials`);
  }
}

