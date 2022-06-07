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

	getUser(userId: string | undefined) {
		return this.http.get<User>(this.userUrl + '/user/' + userId);
	}

	registerUser(user: User) {
		return this.http.post<User>(this.userUrl + '/user', user);
	}

	async getUserById(userId: string): Promise<any> {
		let user;
		await this.keycloakService.loadUserProfile().then(async (profile) => {
			user = await lastValueFrom(this.http.get(this.userUrl + '/user/' + userId));
			return user;
		});
		return await user;
	}


	getUserList(users: string[] | undefined) {
		return this.http.post<User[]>(this.userUrl + '/user/list', users);
		
	}

	async logout() {
		this.keycloakService.logout('http://localhost:4200/');
	}
}
