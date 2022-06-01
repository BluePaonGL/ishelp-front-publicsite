import {Component, OnInit} from '@angular/core';

@Component({
	selector: 'app-about-us',
	templateUrl: './about-us.component.html',
	styleUrls: ['./about-us.component.scss'],
})
export class AboutUsComponent implements OnInit {
	ourPartners: String[] = [
		'../../assets/pictures/partnerTest.png',
		'../../assets/pictures/partnerTest.png',
		'../../assets/pictures/partnerTest.png',
		'../../assets/pictures/partnerTest.png',
		'../../assets/pictures/partnerTest.png',
		'../../assets/pictures/partnerTest.png',
	];
	ngOnInit() {
		// TODO catch partners
	}
}
