import { CustomerPortalComponentComponent } from './components/Company/pages/customer-portal-component/customer-portal-component.component';
import { PaymentSuccessComponent } from './components/Company/pages/payment-success/payment-success.component';
import { SubscriptionPackagesComponent } from './components/Company/pages/subscription-packages/subscription-packages.component';
import { adminGuard } from './core/guards/admin.guard';
import { PropertyDetailComponent } from'./components/Property/pages/property-detail/property-detail.component';
import { PropertyListTypeComponent } from './components/Property/pages/property-lists-type/property-lists-type.component';
import { UserCrudComponent } from './components/Admin/pages/user-crud/user-crud.component';
import { AdminDashboardComponent } from './components/Admin/pages/admin-dashboard/admin-dashboard.component';
import { AdminComponent } from './components/Admin/pages/admin/admin.component';
import { ListPropertyFormComponent } from './components/Agent/pages/list-property-form/list-property-form.component';
import { CompanyRegistrationComponent } from './components/Company/pages/company-registration/company-registration.component';
import { authGuard } from './core/guards/authguard';
import { agentGuard } from './core/guards/agent.guard';
import { ConfirmEmailComponent } from './components/User/features/account/confirm-email/confirm-email.component';
import { NotFoundComponent } from './components/User/errors/not-found/not-found.component';
import { ResetPasswordComponent } from './components/User/features/account/reset-password/reset-password.component';
import { HomeComponent } from './components/User/pages/home/home.component';
import { LayoutComponent } from './components/User/layouts/layout/layout.component';
import { Routes } from '@angular/router';
import { SendEmailComponent } from './components/User/features/account/send-email/send-email.component';
import { RegisterWithThirdPartyComponent } from './components/User/features/account/register-with-third-party/register-with-third-party.component';

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
        canActivate: [authGuard],

        component: CompanyRegistrationComponent,
      },
      {
        path: 'list-property', canActivate: [agentGuard],
        component: ListPropertyFormComponent,
      },
      { path: 'properties-list/:listingType',    
        component:PropertyListTypeComponent   },
      { path: 'property-detail/:id', component: PropertyDetailComponent },
      {path:'subscription-package',component:SubscriptionPackagesComponent},
      {path:'payment-success',component:PaymentSuccessComponent},
      {path:'customer-portal',component:CustomerPortalComponentComponent},




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
