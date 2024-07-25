import { AgentRegCTAComponent } from './../agent-reg-cta/agent-reg-cta.component';
import { Component } from '@angular/core';
import { HeaderComponent } from '../../layouts/header/header.component';
import { SearchComponent } from '../../search/search.component';
import { CategoryComponent } from '../../category/category.component';
import { AboutComponent } from '../../about/about.component';
import { PropertyListComponent } from '../../property-list/property-list.component';
import { CallToActionComponent } from '../../call-to-action/call-to-action.component';
import { AgentListComponent } from '../../agent-list/agent-list.component';
import { TestimonialComponent } from './../Testimonial/pages/testimonial/testimonial.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, SearchComponent,
    CategoryComponent,
    AboutComponent,
    PropertyListComponent,
    CallToActionComponent,
    AgentListComponent,
    TestimonialComponent,AgentRegCTAComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
