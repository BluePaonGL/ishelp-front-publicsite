import {HttpClient, HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {KeycloakAngularModule, KeycloakService} from 'keycloak-angular';

import {AppRoutingModule} from './app-routing.module';
import {GlobalHttpInterceptorService} from './utility/app.init';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatTabsModule} from '@angular/material/tabs';
import {MatMenuModule} from '@angular/material/menu';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {NgxMatTimepickerModule} from 'ngx-mat-timepicker';
import {MatDialogModule} from '@angular/material/dialog';


import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { PageNotFoundComponent } from './errors/page-not-found/page-not-found.component';
import { FormulaireComponent } from './back-office/formulaire/formulaire.component';
import { ShowcaseComponent } from './showcase/showcase.component';
import { EventComponent } from './event/pages/public/event.component';
import { DatePipe } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { UnauthorizedComponent } from './errors/unauthorized/unauthorized.component';
import { AboutUsComponent} from './about-us/about-us.component';
import { CreateEventComponent } from './event/pages/back/create-event.component';
import { EventDialogComponent } from './event/pages/back/event-dialog.component';
import { MaraudComponent } from './event/pages/back/maraud.component';


registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    FormulaireComponent,
    FooterComponent,
    HeaderComponent,
    PageNotFoundComponent,
    UnauthorizedComponent,
    ShowcaseComponent,
    EventComponent,
    AboutUsComponent,
    CreateEventComponent,
    EventDialogComponent,
    MaraudComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    NgxMatTimepickerModule.setLocale('fr-FR'),
    MatDialogModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatMenuModule,
    MatGridListModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatCardModule,
    MatButtonToggleModule,
    MatToolbarModule,
    MatListModule,
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
    AppRoutingModule,
    KeycloakAngularModule,
    BrowserAnimationsModule
  ],
  providers: [
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: GlobalHttpInterceptorService,
      multi: true  
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    },
    DatePipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

export function httpTranslateLoader(http: HttpClient) {
	return new TranslateHttpLoader(http);
}

export function initializeKeycloak(keycloak: KeycloakService) {
	return () =>
		keycloak.init({
			config: {
				url: 'https://keycloak.cubetech-app.fr/auth',
				realm: 'ishelp',
				clientId: 'angular-front-public',
			},
			initOptions: {
				onLoad: 'check-sso',
				silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html',
			},
		});
}
