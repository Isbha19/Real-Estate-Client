import { HttpErrorInterceptor } from './core/interceptors/httpErrorHandling.interceptor';
import { AppEffects } from './shared/store/Common/App.Effects';
import { jwtInterceptor } from './core/interceptors/jwt.interceptor';

import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideToastr } from 'ngx-toastr';
import { provideState, provideStore } from '@ngrx/store';
import { userReducer } from './shared/store/user/user.reducer';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { UserEffects } from './shared/store/user/user.effects';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), provideToastr({ closeButton: true }),
    provideHttpClient(withInterceptors([
        jwtInterceptor,HttpErrorInterceptor
    ])), provideStore(), provideState({ name: 'user', reducer: userReducer }), provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),provideEffects([UserEffects,AppEffects])]
};
