import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {DatePipe} from '@angular/common';
import { lastValueFrom } from 'rxjs';
import { UsersService } from '../../../utility/users.service';
import { EventsService } from '../../events.service';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['../event.component.scss']
})
export class EventComponent implements OnInit {
  startDate = new Date('2022-05-18T12:30'); 
  endDate = new Date('2022-05-18T14:30');
  profilePictureUrl = '../../assets/logo-whiteback-round.png';
  profileName = '';
  user: any;
  id: string|null = '';
  lang!: string;
  eventById: any;
  events: any;
  eventsNumber: number |undefined;
  eventsUser: any;
  eventsUserNumber: number |undefined;
  participantNumber: number | undefined;
  subscription: any
  users: any[] | undefined;

  constructor(private translateService: TranslateService, public router: Router, private route: ActivatedRoute, 
              private eventsService: EventsService, public datePipe: DatePipe, private usersService: UsersService,
              private keycloakService: KeycloakService) { 
    this.eventById = null;
    this.subscription = this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        if(this.router.url !== '/event'){    
          this.id = this.route.snapshot.paramMap.get("id");
        }
      }
    });
  }

  async ngOnInit(): Promise<void> {
    await this.usersService.getUser().then(user => {
      this.user = user;
    });
    this.profileName = this.user.lastName + ' ' + this.user.firstName;
    this.lang = this.translateService.getBrowserLang();
    await this.eventsService.getEventByUserId(this.user.userId).then(eventsUser => {
      this.eventsUser = eventsUser;
    });
    this.eventsUserNumber = this.eventsUser.length

    if(this.user.profilePicture !== null){
      this.profilePictureUrl = this.user.profilePicture;
    }

    if(this.router.url === '/event'){    
      await this.eventsService.getAllEvents().then(events =>
        this.events = events);
      this.eventsNumber = this.events.length
    }
    else if(this.id !== null){
      this.eventById = await this.eventsService.getEventById(this.id)
      this.participantNumber = this.eventById.participantsId.length
      await this.usersService.getUserList(this.eventById.participantsId).then(users => {
        this.users = users;
      })
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }



  async signUp(){
    await this.eventsService.addParticipant(this.user.userId, this.id);
    location.reload();
  }

  async signOut(){
    console.log('test1')
    await this.eventsService.deleteParticipant(this.user.userId, this.id);
    console.log('test2')
    location.reload();
  }

  isSignedUp(){
    if(this.id !== null){return this.eventById.participantsId.includes(this.user.userId)}
    else return false
  }

  isManager(){
    return this.keycloakService.getUserRoles().includes('events');
  }

  reload(eventId: string){
    this.router.navigate(['/event/'+eventId]).then(() => {
      window.location.reload();
    });;
  }

  goToStockList(){
    this.router.navigate(['/stock']);
  }

}
