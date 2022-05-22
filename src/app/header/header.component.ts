import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UsersService } from '../utility/users.service';
import { KeycloakService } from 'keycloak-angular';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isDisabled: boolean = false;
  username: string|undefined = '';
  id: any|undefined = '';
  user:any;
  links = [
    {title:'header.home', link:'/home'},
    {title:'header.apply', link:'/apply'},
    {title:'header.event', link:'/event'},
    {title:'header.news', link:'/news'},
    {title:'header.user', link:'/user'},
  ];
  activeLink = this.links[0];


  constructor(private keycloakService: KeycloakService, private http: HttpClient, private usersService: UsersService) { }
  
  async ngOnInit(): Promise<void> {
    if(await this.usersService.isLoggedIn()){
      this.isDisabled = true;
      this.user = await this.usersService.getUser();
      console.log(this.user)
      this.username = this.user.username;
      
    }
  }

  async logout() {
    this.usersService.logout();
  }
}
