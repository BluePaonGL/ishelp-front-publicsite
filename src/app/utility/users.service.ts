import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {KeycloakService} from 'keycloak-angular';
import {lastValueFrom} from 'rxjs';
import { User } from '../core/models/user.model';

@Injectable({
	providedIn: 'root',
})
export class UsersService {
	userUrl: string = 'https://user-service.cubetech-app.fr';
	constructor(private keycloakService: KeycloakService, private http: HttpClient) {}

	async isLoggedIn() {
		return this.keycloakService.isLoggedIn();
	}

	getUser(userId: string) {
		return this.http.get<User>(this.userUrl + '/user/' + userId);
	}

	async getUserById(userId: string): Promise<any> {
		let user;
		await this.keycloakService.loadUserProfile().then(async (profile) => {
			user = await lastValueFrom(this.http.get(this.userUrl + '/user/' + userId));
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
