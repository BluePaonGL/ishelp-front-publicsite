import {Component, OnInit} from '@angular/core';
import {KeycloakService} from 'keycloak-angular';

@Component({
	selector: 'app-showcase',
	templateUrl: './showcase.component.html',
	styleUrls: ['./showcase.component.scss'],
})
export class ShowcaseComponent implements OnInit {
	constructor(private keycloakService: KeycloakService) {}

	async ngOnInit(): Promise<void> {
		if (await this.keycloakService.isLoggedIn()) {
			this.keycloakService.logout('http://localhost:4200/');
		}
	}
}
