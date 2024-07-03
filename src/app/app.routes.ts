import { adminGuard } from './core/guards/admin.guard';
import { authGuard } from './core/guards/authguard';
import { agentGuard } from './core/guards/agent.guard';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/User/layouts/layout/layout.component').then(m => m.LayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./components/User/pages/home/home.component').then(
            (m) => m.HomeComponent
          ),
      },
      {
        path: 'reset-password',
        loadComponent: () =>
          import(
            './components/User/features/account/reset-password/reset-password.component'
          ).then((m) => m.ResetPasswordComponent),
      },
      {
        path: 'not-found',
        loadComponent: () =>
          import('./components/User/errors/not-found/not-found.component').then(
            (m) => m.NotFoundComponent
          ),
      },
      {
        path: 'confirm-email',
        loadComponent: () =>
          import(
            './components/User/features/account/confirm-email/confirm-email.component'
          ).then((m) => m.ConfirmEmailComponent),
      },
      {
        path: 'send-email/:mode',
        loadComponent: () =>
          import(
            './components/User/features/account/send-email/send-email.component'
          ).then((m) => m.SendEmailComponent),
      },
      {
        path: 'register/third-party/:provider',
        loadComponent: () =>
          import(
            './components/User/features/account/register-with-third-party/register-with-third-party.component'
          ).then((m) => m.RegisterWithThirdPartyComponent),
      },
      {
        path: 'company-registration',
        canActivate: [authGuard],

        loadComponent: () =>
          import(
            './components/Company/pages/company-registration/company-registration.component'
          ).then((m) => m.CompanyRegistrationComponent),
      },
      {
        path: 'list-property',
        canActivate: [agentGuard],
        loadComponent: () =>
          import(
            './components/Agent/pages/list-property-form/list-property-form.component'
          ).then((m) => m.ListPropertyFormComponent),
      },
      {
        path: 'properties-list/:listingType',
        loadComponent: () =>
          import(
            './components/Property/pages/property-lists-type/property-lists-type.component'
          ).then((m) => m.PropertyListTypeComponent),
      },
      {
        path: 'property-detail/:id',
        loadComponent: () =>
          import(
            './components/Property/pages/property-detail/property-detail.component'
          ).then((m) => m.PropertyDetailComponent),
      },
    ],
  },
  {
    path: 'admin-dashboard',
    runGuardsAndResolvers: 'always',
    canActivate: [adminGuard],
    loadComponent: () => import('./components/Admin/pages/admin/admin.component').then(m => m.AdminComponent),
    children: [
      {
        path: '',
        loadComponent: () =>
          import(
            './components/Admin/pages/admin-dashboard/admin-dashboard.component'
          ).then((m) => m.AdminDashboardComponent),
      },
      {
        path: 'user-crud',
        loadComponent: () =>
          import('./components/Admin/pages/user-crud/user-crud.component').then(
            (m) => m.UserCrudComponent
          ),
      },
    ],
  },

  {
    path: '**',
    loadComponent: () =>
      import('./components/User/errors/not-found/not-found.component').then(
        (m) => m.NotFoundComponent
      ),
  },
];
