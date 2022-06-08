import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {DatePipe} from '@angular/common';
import { KeycloakService } from 'keycloak-angular';
import { addUserEvent, deleteUserEvent, selectUser } from 'src/app/core/state/user';
import { Store } from '@ngrx/store';
import { addEventParticipant, selectEventItems, selectCurrentEvent, setCurrentEvent, deleteEventParticipant, selectEvent} from 'src/app/core/state/event';


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
	startingTime$: string = '00:00:00'
	endingTime$: string = '00:00:00'
	signedUp$: boolean = false;
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
				public datePipe: DatePipe,private keycloakService: KeycloakService, private store: Store) { 
	}

	ngOnInit() {
		if(this.router.url !== '/event'){
				const id = this.route.snapshot.paramMap.get("id");
				if(id !== null)  {
					this.id = id;
				}   
			
		}
		this.lang = this.translateService.getBrowserLang();
		this.user$.subscribe(userStore => {
			this.userId = userStore.user.userId;
			this.isSignedUp();
		});
		this.urlChange();
		this.events$.subscribe(events => {
			if(this.id !== '' && events.length > 0) {
				let event = events.find(event => event.eventId === this.id);
				if(event === undefined) {
					event = {}
				}
				this.store.dispatch(setCurrentEvent({event}));
			}
		})
		this.store.select(selectCurrentEvent).subscribe(currentEvent => {
			if(currentEvent.startingTime !== undefined && currentEvent.endingTime !== undefined) {
				this.startingTime$ = currentEvent.startingTime;
				this.endingTime$ = currentEvent.endingTime;
			}
		});
			
	}

	async urlChange(){
		if (this.router.url === '/event') {
			this.events$.subscribe(events => {
				this.eventsNumber = events.length;
			})
		} else if (this.id !== null) {
			this.store.select(selectCurrentEvent).subscribe(currentEvent => {
				if(this.keycloakService.getUserRoles().includes('events') && currentEvent.eventType == 'MARAUDE'){
					this.isManagerAndMaraud = true;
				}
				else{this.isManagerAndMaraud = false;}
			})
		}
	}

	async signUp(){
		this.store.dispatch(addEventParticipant({
			userId: this.userId,
			eventId: this.id
		}));
		this.store.select(selectEvent(this.id)).subscribe( event => {
			if(event !== undefined){
					this.store.dispatch(addUserEvent({event: event}));
			}	
		}
		).unsubscribe();
		
		this.signedUp$ = true;
	}

	isSignedUp(){
    if(this.id !== null){
			this.store.select(selectCurrentEvent).subscribe(currentEvent => {
				if(this.userId !== undefined && currentEvent.participantsId?.includes(this.userId) !== undefined){
					this.signedUp$ = currentEvent.participantsId?.includes(this.userId)
				}
			})}
  }


	async signOut(){
		this.store.dispatch(deleteEventParticipant({
			userId: this.userId,
			eventId: this.id
		}))
		this.store.select(selectEvent(this.id)).subscribe( event => {
			if(event !== undefined){
					this.store.dispatch(deleteUserEvent({event: event}));
			}	
		}
		).unsubscribe();
		this.signedUp$ = false;
	}

	reload(eventId: string){
		this.router.navigate(['/event/' + eventId]).then(() => {
		this.urlChange()
		});
	}
}
