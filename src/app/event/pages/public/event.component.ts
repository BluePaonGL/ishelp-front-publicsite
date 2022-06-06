import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {DatePipe} from '@angular/common';
import { UsersService } from '../../../utility/users.service';
import { EventsService } from '../../events.service';
import { KeycloakService } from 'keycloak-angular';
import { selectUser } from 'src/app/core/state/user';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['../event.component.scss']
})
export class EventComponent implements OnInit {
	profilePictureUrl = '../../assets/logo-whiteback-round.png'
	user$ = this.store.select(selectUser);
	userId: string | undefined;
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
              private keycloakService: KeycloakService, private store: Store) { 
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
		this.lang = this.translateService.getBrowserLang();
		this.user$.subscribe(userStore => {
			this.userId = userStore.user.userId;
		})
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
		this.eventsService.addParticipant(this.userId, this.id);
		this.eventById = this.eventsService.getEventById(this.id);
		this.participantNumber = this.eventById.participantsId.length;
		this.usersService.getUserList(this.eventById.participantsId).then((users) => {
			this.users = users;
		});
		this.eventsService.getEventByUserId(this.userId).then((eventsUser) => {
			this.eventsUser = eventsUser;
		});
		this.eventsUserNumber = this.eventsUser.length;
  }

  async signOut(){

    await this.eventsService.deleteParticipant(this.userId, this.id);
		this.eventById = await this.eventsService.getEventById(this.id);
		this.participantNumber = this.eventById.participantsId.length;
		await this.usersService.getUserList(this.eventById.participantsId).then((users) => {
			this.users = users;
		});
		await this.eventsService.getEventByUserId(this.userId).then((eventsUser) => {
			this.eventsUser = eventsUser;
		});
		this.eventsUserNumber = this.eventsUser.length;
  }

  isSignedUp(){
    if(this.id !== null){return this.eventById.participantsId.includes(this.userId)}
    else return false
  }

  reload(eventId: string){
    this.router.navigate(['/event/' + eventId]).then(() => {
      this.urlChange()
    });
  }
}
