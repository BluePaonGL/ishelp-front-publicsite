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
	}
}
