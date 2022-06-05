import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {KeycloakService} from 'keycloak-angular';
import {lastValueFrom} from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class UsersService {
	userUrl: string = 'https://user-service.cubetech-app.fr';
	constructor(private keycloakService: KeycloakService, private http: HttpClient) {}

	async isLoggedIn() {
		return this.keycloakService.isLoggedIn();
	}

	async getUser(): Promise<any> {
		let user;
		await this.keycloakService.loadUserProfile().then(async (profile) => {
			user = await lastValueFrom(this.http.get(this.userUrl + '/user/' + profile.id?.toString()));
			return user;
		});
		return await user;
	}

	async getUserList(users: any[]): Promise<any> {
		let usersParticipants = await lastValueFrom(this.http.post(this.userUrl + '/user/list', users));
		return usersParticipants;
	}

	async logout() {
		this.keycloakService.logout('http://localhost:4200/');
	}
}
