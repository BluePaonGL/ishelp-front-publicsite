import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {KeycloakService} from 'keycloak-angular';
import {KeycloakProfile} from 'keycloak-js';
import {Store} from "@ngrx/store";
import { appLoaded, fetchUserOnLogin } from './core/state/user';
import { User } from './core/models/user.model';

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
})
export class AppComponent implements OnInit {
	public isLoggedIn = false;
	public userProfile: KeycloakProfile | null = null;

	constructor(private readonly keycloak: KeycloakService, public translate: TranslateService,
				private store: Store) {
		translate.addLangs(['en', 'fr']);
		if(localStorage.getItem('language')){
			translate.setDefaultLang(localStorage.getItem('language')!);
			translate.use(localStorage.getItem('language')!);
		}else {
			translate.setDefaultLang('fr');
			translate.use('fr');
			localStorage.setItem("language","fr");
		}
	}

	public async ngOnInit() {
		this.store.dispatch(appLoaded());
		if(this.translate.currentLang === undefined){
			this.translate.setDefaultLang(this.translate.getBrowserLang());
		}
		this.isLoggedIn = await this.keycloak.isLoggedIn();
		
		if (this.isLoggedIn) {
			let user: User = {} as User;
			this.userProfile = await this.keycloak.loadUserProfile();
			if(this.userProfile.username) {
				this.userProfile.username = this.userProfile.username[0].toUpperCase() + this.userProfile.username.slice(1);
			}
			user = {username: this.userProfile.username, userId: this.userProfile.id};
			this.store.dispatch(
				fetchUserOnLogin({
					user: user
				})
			);
		}
		
	}

	public login() {
		this.keycloak.login();
	}

	public logout() {
		this.keycloak.logout();
	}

	switchLanguages(lang: string) {
		this.translate.use(lang);
	}
}
