import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {DatePipe} from '@angular/common';
import { KeycloakService } from 'keycloak-angular';
import { EventsService } from 'src/app/event/events.service';
import { UsersService } from 'src/app/utility/users.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {
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

  constructor(private translateService: TranslateService, public router: Router,
    private eventsService: EventsService, public datePipe: DatePipe, private usersService: UsersService,
    private keycloakService: KeycloakService) {}

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

  reload(eventId: string){
    this.router.navigate(['/event/' + eventId]).then(() => {
      window.location.reload();
    });
  }

}
