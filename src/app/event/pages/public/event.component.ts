import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {DatePipe} from '@angular/common';
import { UsersService } from '../../../utility/users.service';
import { EventsService } from '../../events.service';
import { KeycloakService } from 'keycloak-angular';
import { selectUser, selectUserId } from 'src/app/core/state/user';
import { Store } from '@ngrx/store';
import { addEventParticipant, fetchEventParticipant, selectEventItems, selectCurrentEvent, setCurrentEvent, deleteEventParticipant} from 'src/app/core/state/event';
import { filter, map, Observable, tap } from 'rxjs';
import { Event } from 'src/app/core/models/event.model';

@Component({
	selector: 'app-event',
	templateUrl: './event.component.html',
	styleUrls: ['../event.component.scss']
})
export class EventComponent implements OnInit {
	profilePictureUrl = '../../assets/logo-whiteback-round.png'
	user$ = this.store.select(selectUser);
	events$ = this.store.select(selectEventItems);
	currentEvent$ = this.store.select(selectCurrentEvent);
	signedUp: boolean = false;


	userId: string | undefined;
	id: string = '';
	lang!: string;
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
		this.subscription = this.router.events.subscribe((ev) => {
		if (ev instanceof NavigationEnd) {
			if(this.router.url !== '/event'){
				const id = this.route.snapshot.paramMap.get("id");
				if(id !== null)  {
					this.id = id;
				}   
			
			}
		}
		});
	}

	async ngOnInit(): Promise<void> {
		this.lang = this.translateService.getBrowserLang();
		this.user$.subscribe(userStore => {
			this.userId = userStore.user.userId;
		});
		this.urlChange();
		console.log(this.id);
		this.events$.subscribe(events => {
			if(this.id !== '' && events.length > 0) {
				let event = events.find(event => event.eventId === this.id);
				if(event === undefined) {
					event = {}
				}
				this.store.dispatch(setCurrentEvent({event}));
			
			}
		}

		)
		
	}

	async urlChange(){
		if (this.router.url === '/event') {
			/* this.events$.subscribe(events => {
				this.eventsNumber = events.length;
			}) */
		} else if (this.id !== null) {
			//this.participantNumber = this.eventById.participantsId.length;
/* 			await this.usersService.getUserList(this.eventById.participantsId).then((users) => {
				this.users = users;
			}); */
			/* if(this.keycloakService.getUserRoles().includes('events') && this.eventById.eventType == 'MARAUDE'){
				this.isManagerAndMaraud = true;
			} */
			
		}
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}
	async signUp(){
		/* this.eventsService.addParticipant(this.userId, this.id);
		this.eventById = this.eventsService.getEventById(this.id);
		this.participantNumber = this.eventById.participantsId.length;
		this.usersService.getUserList(this.eventById.participantsId).then((users) => {
			this.users = users;
		});
		this.eventsService.getEventByUserId(this.userId).then((eventsUser) => {
			this.eventsUser = eventsUser;
		});
		this.eventsUserNumber = this.eventsUser.length; */
		
		this.store.dispatch(addEventParticipant({
			userId: this.userId,
			eventId: this.id
		}));
		console.log(this.currentEvent$);
		this.signedUp = true;
	}

	async signOut(){

		//await this.eventsService.deleteParticipant(this.userId, this.id);
		//this.participantNumber = this.eventById.participantsId.length;
/* 		await this.usersService.getUserList(this.eventById.participantsId).then((users) => {
			this.users = users;
		}); */
		/* await this.eventsService.getEventByUserId(this.userId).then((eventsUser) => {
			this.eventsUser = eventsUser;
		}); */
		//this.eventsUserNumber = this.eventsUser.length;

		this.store.dispatch(deleteEventParticipant({
			userId: this.userId,
			eventId: this.id
		}))

		this.signedUp = false;
	}

	reload(eventId: string){
		this.router.navigate(['/event/' + eventId]).then(() => {
		this.urlChange()
		});
	}
}
