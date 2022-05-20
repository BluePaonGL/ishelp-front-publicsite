import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isDisabled: boolean = false;
  username: string|undefined = '';
  links = [
    {title:'header.home', link:'/home'},
    {title:'header.apply', link:'/apply'},
    {title:'header.event', link:'/event'},
    {title:'header.news', link:'/news'},
    {title:'header.user', link:'/user'},
  ];
  activeLink = this.links[0];


  constructor(private keycloakService: KeycloakService) { }
  async ngOnInit(): Promise<void> {
    if(await this.keycloakService.isLoggedIn()){
      this.isDisabled = true;
      this.keycloakService.loadUserProfile().then(profile => {
        console.log(profile.username)
        this.username = profile.username?.toString();
      })
    }
  }

  async isLoggedIn() {
    return this.keycloakService.isLoggedIn
  }

  async getUsername() {
    this.keycloakService.loadUserProfile().then(profile => {
      console.log(profile.username)
      profile.username;
    })
  }

  async logout() {
    this.keycloakService.logout("http://localhost:4200/");
  }
}
