import { APP_INITIALIZER, ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { authInterceptor } from './auth.interceptor';
import { errorInterceptor } from './error.interceptor';
import { GetCurrentUserService } from './services/get-current-user.service';

export function initCurrentUser(currentUserService: GetCurrentUserService) {
    
    return () => currentUserService.getCurrentUser();
}


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes) , provideHttpClient(withInterceptors([authInterceptor , errorInterceptor])) ,  {
    provide: APP_INITIALIZER,
    useFactory: initCurrentUser,
    deps: [GetCurrentUserService],
    multi: true
  }]
};
