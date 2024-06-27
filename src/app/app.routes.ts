import { ListPropertyFormComponent } from './components/Company/list-property-form/list-property-form.component';
import { AdminDashboardComponent } from './components/Admin/admin-dashboard/admin-dashboard.component';
import { UserCrudComponent } from './components/Admin/user-crud/user-crud.component';
import { ConfirmEmailComponent } from './components/User/features/account/confirm-email/confirm-email.component';
import { NotFoundComponent } from './components/User/errors/not-found/not-found.component';
import { ResetPasswordComponent } from './components/User/features/account/reset-password/reset-password.component';
import { HomeComponent } from './components/User/pages/home/home.component';
import { LayoutComponent } from './components/User/layouts/layout/layout.component';
import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AdminComponent } from './components/Admin/admin/admin.component';
import { adminGuard } from './core/guards/admin.guard';
import { SendEmailComponent } from './components/User/features/account/send-email/send-email.component';
import { RegisterWithThirdPartyComponent } from './components/User/features/account/register-with-third-party/register-with-third-party.component';
import { CompanyRegistrationComponent } from './components/Company/company-registration/company-registration.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'reset-password', component: ResetPasswordComponent },
      { path: 'not-found', component: NotFoundComponent },
      { path: 'confirm-email', component: ConfirmEmailComponent },
      { path: 'send-email/:mode', component: SendEmailComponent },
      {
        path: 'register/third-party/:provider',
        component: RegisterWithThirdPartyComponent,
      },
      {
        path: 'company-registration',
        component: CompanyRegistrationComponent,
      },
      {
        path: 'list-property',
        component: ListPropertyFormComponent,
      }
    ],
  },
  {
    path: 'admin-dashboard',
    runGuardsAndResolvers: 'always',
    canActivate: [adminGuard],
    component: AdminComponent,
children: [
   
     { path: '', component: AdminDashboardComponent },
   { path: 'user-crud', component: UserCrudComponent }
]
  },
 
  { path: '**', component: NotFoundComponent },
];
