import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {UsersService} from '../utility/users.service';
import {KeycloakService} from 'keycloak-angular';
import {TranslateService} from '@ngx-translate/core';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isAdmin = false;
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

  constructor(private keycloakService: KeycloakService, private http: HttpClient, 
    private usersService: UsersService, public translate: TranslateService) { }
  
  async ngOnInit(): Promise<void> {
    if (this.keycloakService.getUserRoles().includes('ADMIN')){
      this.isAdmin = true;
    }
    if(await this.usersService.isLoggedIn()){
      this.isDisabled = true;
      this.user = await this.usersService.getUser();
      console.log(this.user)
      this.username = this.user.username;
      
    }
  }

  isEventsManager(){
    return this.keycloakService.getUserRoles().includes('events');
  }

  async logout() {
    this.usersService.logout();
  }

  lang(lang: string) {
    this.translate.use(lang)
    }
}