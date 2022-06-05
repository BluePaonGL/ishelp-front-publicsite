import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {KeycloakService} from 'keycloak-angular';
import {KeycloakProfile} from 'keycloak-js';

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
})
export class AppComponent implements OnInit {
	public isLoggedIn = false;
	public userProfile: KeycloakProfile | null = null;

	constructor(private readonly keycloak: KeycloakService, public translate: TranslateService) {
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
		if(this.translate.currentLang === undefined){
			this.translate.setDefaultLang(this.translate.getBrowserLang());
		}
		this.isLoggedIn = await this.keycloak.isLoggedIn();

		if (this.isLoggedIn) {
			this.userProfile = await this.keycloak.loadUserProfile();
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
