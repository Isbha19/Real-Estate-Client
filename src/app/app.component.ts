import { LoadingSpinnerComponent } from './components/User/shared/loading-spinner/loading-spinner.component';
import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { TestimonialComponent } from './components/User/testimonial/testimonial.component';

import { CommonModule } from '@angular/common';

import { AccountService } from './core/service/account.service';
import { AboutComponent } from './components/User/about/about.component';
import { AgentListComponent } from './components/User/agent-list/agent-list.component';
import { CallToActionComponent } from './components/User/call-to-action/call-to-action.component';
import { CategoryComponent } from './components/User/category/category.component';
import { FooterComponent } from './components/User/layouts/footer/footer.component';
import { HeaderComponent } from './components/User/layouts/header/header.component';
import { PropertyListComponent } from './components/User/property-list/property-list.component';
import { SearchComponent } from './components/User/search/search.component';
import { NavbarComponent } from './components/User/shared/navbar/navbar.component';
import { ToastrService } from 'ngx-toastr';
import { SignalRService } from './core/service/signal-r.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CarouselModule,
    NavbarComponent,
    HeaderComponent,
    SearchComponent,
    CategoryComponent,
    AboutComponent,
    PropertyListComponent,
    CallToActionComponent,
    AgentListComponent,
    TestimonialComponent,
    FooterComponent,
    LoadingSpinnerComponent,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  loading: boolean = true; // Flag to track loading state
  constructor(private accountService: AccountService,
    private toastr:ToastrService,private router:Router,
  ) {}
  ngOnInit(): void {
    this.router.events.subscribe(x => {
      if(x instanceof NavigationEnd)
      {
        window.scrollTo(0, 0);
      }
    });
    this.refreshUser(); 

  }
  

  private refreshUser() {
    const jwt = this.accountService.getjwt();
    
    if (jwt) {
      
      this.accountService.refreshUser(jwt).subscribe({
        next: (_) => {
          this.loading = false;
        },
        error: (error) => {
          this.accountService.logout();
          const errorMessage = error.error?.message || 'An error occurred';
          this.toastr.error(errorMessage);
          this.loading = false;
        },
      });
    } else {
     
      
      this.accountService.refreshUser(null).subscribe();
      this.loading = false;
    }
  }
}
