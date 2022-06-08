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
import {MatCheckboxModule} from '@angular/material/checkbox';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { CandidatesListComponent } from './recruitment/pages/candidates-list/candidates-list.component';
import { ApplyComponent } from './recruitment/pages/apply/apply.component';
import { CandidateCardComponent } from './recruitment/components/candidate-card/candidate-card.component';
import { CandidateStatusComponent} from './recruitment/pages/candidate-status/candidate-status.component';
import { CandidateChoiceComponent} from './recruitment/pages/candidate-choice/candidate-choice.component';

import { PageNotFoundComponent } from './errors/page-not-found/page-not-found.component';
import { ShowcaseComponent } from './showcase/showcase.component';
import { EventComponent } from './event/pages/public/event.component';
import { DatePipe } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { UnauthorizedComponent } from './errors/unauthorized/unauthorized.component';
import { AboutUsComponent} from './about-us/about-us.component';
import { CreateEventComponent } from './event/pages/back/create-event.component';
import { EventDialogComponent } from './event/pages/back/event-dialog.component';
import { ProfileComponent } from './profile/profile.component';
import { MaraudComponent } from './event/pages/back/maraud.component';
import { UserCardComponent } from './common/user-card/user-card.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './core/state';
import { UserEffects } from './core/state/user';
import { EffectsModule } from '@ngrx/effects';
import { EventsEffects } from './core/state/event';
import { MaraudusersComponent } from './event/pages/back/maraudusers.component';


registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    PageNotFoundComponent,
    CandidatesListComponent,
    ApplyComponent,
    CandidateCardComponent,
    CandidateStatusComponent,
    CandidateChoiceComponent,
    UnauthorizedComponent,
    ShowcaseComponent,
    EventComponent,
    AboutUsComponent,
    CreateEventComponent,
    EventDialogComponent,
    ProfileComponent,
    MaraudComponent,
    UserCardComponent,
    MaraudusersComponent
  ],
  imports: [
    MatCheckboxModule,
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
    MatFormFieldModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot({ }),
    StoreDevtoolsModule.instrument({
      maxAge: 10 // number of states to retain
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
    AppRoutingModule,
    KeycloakAngularModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: false
    }),
    EffectsModule.forRoot([UserEffects, EventsEffects]),
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
