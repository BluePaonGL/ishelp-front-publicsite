import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {DatePipe} from '@angular/common';
import { EventsService } from 'src/app/event/events.service';
import { UsersService } from 'src/app/utility/users.service';
import { selectUser, selectUserFirstName, selectUserId, selectUserLastName } from 'src/app/core/state/user';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {
  profilePictureUrl: string | undefined = '../../assets/logo-whiteback-round.png';
	userLastName$ = this.store.select(selectUserLastName);
	userFirstName$ = this.store.select(selectUserFirstName);
	user$ = this.store.select(selectUser);
	userId: string | undefined;
	user: any;
	id: string | null = '';
	lang!: string;
	eventById: any;
	eventsUser: any;
	eventsUserNumber: number | undefined;
	participantNumber: number | undefined;
	isManagerAndMaraud: boolean = false;

  constructor(private translateService: TranslateService, public router: Router, private store: Store,
    private eventsService: EventsService, public datePipe: DatePipe, private usersService: UsersService) {}

  async ngOnInit() {
		this.user$.subscribe(userStore => {
			this.userId = userStore.user.id;
			this.profilePictureUrl = userStore.user.profilePicture;
			this.eventsService.getEventByUserId(this.userId).then((eventsUser) => {
				this.eventsUser = eventsUser;
				this.eventsUserNumber = this.eventsUser.length;
			});
		})
		this.lang = this.translateService.getBrowserLang();
		

	}

  reload(eventId: string){
    this.router.navigate(['/event/' + eventId]).then(() => {
      window.location.reload();
    });
  }
}
