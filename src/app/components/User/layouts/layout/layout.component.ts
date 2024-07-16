import { MembersChattedCardComponent } from './../../../Messages/pages/members-chatted-card/members-chatted-card.component';
import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { AccountService } from '../../../../core/service/account.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [NavbarComponent,FooterComponent,RouterOutlet,MembersChattedCardComponent,CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
constructor(public accountService:AccountService){

}
}
