import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {DatePipe} from '@angular/common';
import { UsersService } from '../../../utility/users.service';
import { EventsService } from '../../events.service';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['../event.component.scss']
})
export class EventComponent implements OnInit {
	profilePictureUrl = '../../assets/logo-whiteback-round.png';
	profileName = '';
	user: any;
	id: string | null = '';
	lang!: string;
	eventById: any;
	events: any;
	eventsNumber: number | undefined;
	eventsUser: any;
	eventsUserNumber: number | undefined;
	participantNumber: number | undefined;
	subscription: any;
	users: any[] | undefined;
	isManagerAndMaraud: boolean = false;

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
		await this.usersService.getUser().then((user) => {
			this.user = user;
		});
		this.profileName = this.user.lastName + ' ' + this.user.firstName;
		this.lang = this.translateService.getBrowserLang();
		await this.eventsService.getEventByUserId(this.user.userId).then((eventsUser) => {
			this.eventsUser = eventsUser;
		});
		this.eventsUserNumber = this.eventsUser.length;

		if (this.user.profilePicture !== null) {
			this.profilePictureUrl = this.user.profilePicture;
		}
		this.urlChange()
	}

	async urlChange(){
		if (this.router.url === '/event') {
			await this.eventsService.getAllEvents().then((events) => (this.events = events));
			this.eventsNumber = this.events.length;
		} else if (this.id !== null) {
			this.eventById = await this.eventsService.getEventById(this.id);
			this.participantNumber = this.eventById.participantsId.length;
			await this.usersService.getUserList(this.eventById.participantsId).then((users) => {
				this.users = users;
			});
			if(this.keycloakService.getUserRoles().includes('events') && this.eventById.eventType == 'MARAUDE'){
				this.isManagerAndMaraud = true;
			}
		}
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}
  async signUp(){
    await this.eventsService.addParticipant(this.user.userId, this.id);
    this.eventById = await this.eventsService.getEventById(this.id);
		this.participantNumber = this.eventById.participantsId.length;
		await this.usersService.getUserList(this.eventById.participantsId).then((users) => {
			this.users = users;
		});
		await this.eventsService.getEventByUserId(this.user.userId).then((eventsUser) => {
			this.eventsUser = eventsUser;
		});
		this.eventsUserNumber = this.eventsUser.length;
  }

  async signOut(){
    await this.eventsService.deleteParticipant(this.user.userId, this.id);
		this.eventById = await this.eventsService.getEventById(this.id);
		this.participantNumber = this.eventById.participantsId.length;
		await this.usersService.getUserList(this.eventById.participantsId).then((users) => {
			this.users = users;
		});
		await this.eventsService.getEventByUserId(this.user.userId).then((eventsUser) => {
			this.eventsUser = eventsUser;
		});
		this.eventsUserNumber = this.eventsUser.length;
  }

  isSignedUp(){
    if(this.id !== null){return this.eventById.participantsId.includes(this.user.userId)}
    else return false
  }

  reload(eventId: string){
    this.router.navigate(['/event/' + eventId]).then(() => {
      this.urlChange()
    });
  }
}
