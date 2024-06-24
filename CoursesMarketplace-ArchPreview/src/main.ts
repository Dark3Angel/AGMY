import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { withInMemoryScrolling, provideRouter } from '@angular/router';
import { withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { appRoutes } from './app/app-routes.component';


bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule),
        provideAnimations(),
        provideHttpClient(withInterceptorsFromDi()),
        provideRouter(appRoutes),
        provideRouter([], withInMemoryScrolling({ scrollPositionRestoration: 'enabled' }))
    ]
})
  .catch(err => console.error(err));
