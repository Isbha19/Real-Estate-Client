import { TestimonialFormComponent } from './components/User/pages/Testimonial/pages/testimonial-form/testimonial-form.component';
import { ListedPropertiesComponent } from './components/Agent/pages/listed-properties/listed-properties.component';
import { CompanyMainDashboardComponent } from './components/Company/pages/companyDashboard/company-main-dashboard/company-main-dashboard.component';
import { MessagesComponent } from './components/Messages/pages/messages/messages.component';
import { UnverifiedCompanyPropertiesComponent } from './components/Company/pages/companyDashboard/unverified-company-properties/unverified-company-properties.component';
import { CompanyPropertiesComponent } from './components/Company/pages/companyDashboard/company-properties/company-properties.component';
import { UnverifiedAgentListComponent } from './components/Company/pages/companyDashboard/unverified-agent-list/unverified-agent-list.component';
import { VerifiedagentListComponent } from './components/Company/pages/companyDashboard/verifiedagent-list/verifiedagent-list.component';
import { AgentRegistrationFormComponent } from './components/Agent/pages/agent-registration-form/agent-registration-form.component';
import { CompanyDetailsComponent } from './components/Company/pages/companyDashboard/company-details/company-details.component';
import { CompanyAdminDashboardComponent } from './components/Company/pages/companyDashboard/company-admin-dashboard/company-admin-dashboard.component';
import { UnverifiedCompaniesComponent } from './components/Admin/pages/unverified-companies/unverified-companies.component';
import { VerifiedCompaniesComponent } from './components/Admin/pages/verified-companies/verified-companies.component';
import { CustomerPortalComponentComponent } from './components/Company/pages/customer-portal-component/customer-portal-component.component';
import { PaymentSuccessComponent } from './components/Company/pages/payment-success/payment-success.component';
import { SubscriptionPackagesComponent } from './components/Company/pages/subscription-packages/subscription-packages.component';
import { adminGuard } from './core/guards/admin.guard';
import { PropertyDetailComponent } from './components/Property/pages/property-detail/property-detail.component';
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
import { CompanyAdminGuard } from './core/guards/companyAdmin.guard';
import { SubscriptionManagementComponent } from './components/Admin/pages/subscription-management/subscription-management.component';

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
        path: 'list-property',
        canActivate: [agentGuard],
        component: ListPropertyFormComponent,
      },
      {
        path: 'agent-register',
        component: AgentRegistrationFormComponent,
      },
      {
        path: 'properties-list/:listingType',
        component: PropertyListTypeComponent,
      },
      { path: 'property-detail/:id', component: PropertyDetailComponent },
      {
        path: 'subscription-package',
        canActivate: [authGuard],
        component: SubscriptionPackagesComponent,
      },
      { path: 'payment-success', component: PaymentSuccessComponent },
      { path: 'customer-portal', component: CustomerPortalComponentComponent },
      { path: 'messages', canActivate:[authGuard],component: MessagesComponent },
      { path: 'listed-properties', canActivate:[authGuard],component: ListedPropertiesComponent },
      { path: 'testimonial-form', canActivate:[authGuard],component: TestimonialFormComponent },



      
    ],
  },
  { path: 'company-dashboard',    runGuardsAndResolvers: 'always',
    canActivate: [CompanyAdminGuard], component: CompanyAdminDashboardComponent,
    children:[
      { path: '', component: CompanyMainDashboardComponent },
      { path: 'company-details', component: CompanyDetailsComponent },
      { path: 'agents/verified-agents', component: VerifiedagentListComponent },
      { path: 'agents/unverified-agents', component: UnverifiedAgentListComponent },
      { path: 'properties/verified-properties', component: CompanyPropertiesComponent },
      { path: 'properties/unverified-properties', component: UnverifiedCompanyPropertiesComponent },

    ]
   },
  {
    path: 'admin-dashboard',
    runGuardsAndResolvers: 'always',
    canActivate: [adminGuard],
    component: AdminComponent,
    children: [
      { path: '', component: AdminDashboardComponent },
      { path: 'user-crud', component: UserCrudComponent },
      { path: 'verified-companies', component: VerifiedCompaniesComponent },
      { path: 'unverified-companies', component: UnverifiedCompaniesComponent },
      { path: 'manage-subscription', component: SubscriptionManagementComponent }
    ],
  },

  { path: '**', component: NotFoundComponent },
];
