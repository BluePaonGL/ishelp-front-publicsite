import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {UsersService} from '../utility/users.service';
import {KeycloakService} from 'keycloak-angular';
import {TranslateService} from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { selectUserUsername } from '../core/state/user';
import { Router } from '@angular/router';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isAdmin = false;
  isDisabled: boolean = false;
  username$ = this.store.select(selectUserUsername);
  id: any|undefined = '';
  user:any;
  links = [
    {title:'header.home', link:'/home'},
    {title:'header.apply', link:'/apply'},
    {title:'header.event', link:'/event'},
    {title:'header.news', link:'/news'},
    {title:'header.user', link:'/profile'},
  ];
  activeLink = this.links[0];

  constructor(private keycloakService: KeycloakService, private http: HttpClient, 
    private usersService: UsersService, public translate: TranslateService,
    private store: Store, private router: Router) { }
  
  async ngOnInit(): Promise<void> {
    if (this.keycloakService.getUserRoles().includes('ADMIN')){
      this.isAdmin = true;
    }
    if(await this.usersService.isLoggedIn()){
      this.isDisabled = true;
    }
  }

  isEventsManager(){
    return this.keycloakService.getUserRoles().includes('events');
  }

  isApplicationsManager(){
    return this.keycloakService.getUserRoles().includes('application');
  }

  async logout() {
    this.usersService.logout();
  }

  async registration() {
    this.router.navigate(['/registration/'])
  }

  lang(lang: string) {
    this.translate.setDefaultLang(lang)
    this.translate.use(lang);
    localStorage.setItem("language", lang);
    }
}
