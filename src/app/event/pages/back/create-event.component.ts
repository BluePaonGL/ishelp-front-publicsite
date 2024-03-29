import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { EventsService } from '../../events.service';
import {FormControl, FormGroupDirective, FormGroup, NgForm, Validators} from '@angular/forms';
import { EventDialogComponent } from './event-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { addEvent, deleteEvent, selectEventItems } from 'src/app/core/state/event';
import { Event } from 'src/app/core/models/event.model';
import { fetchEventsOnLogin, selectUserId } from 'src/app/core/state/user';

export interface eventData {
  action: 'create' | 'delete';
  success: boolean;
}

@Component({
  selector: 'app-back',
  templateUrl: 'create-event.component.html',
  styleUrls: ['../event.component.scss']
})
export class CreateEventComponent implements OnInit {
  isDeleted: boolean = false;
	id: string | null = '';
	lang!: string;
	eventById: any;
  events$ = this.store.select(selectEventItems);
	eventsNumber: number | undefined;
	participantNumber: number | undefined;
	subscription: any;
	users: any[] | undefined;
  date: any;
  response: any;
  eventForm = new FormGroup({
    type: new FormControl('', [
      Validators.required
    ]),
    name: new FormControl('', [
      Validators.required,
    ]),
    campus: new FormControl('', []),
    location: new FormControl('', []),
    date: new FormControl('', [
      Validators.required,
    ]),
    start: new FormControl('', [
      Validators.required,
    ]),
    end: new FormControl('', [
      Validators.required,
    ]),
    description: new FormControl('', [
      Validators.required,
    ]),
  });

    async onSubmit() {
      this.response = await this.eventsService.addEvent(
        this.eventForm.value['name'],
        this.eventForm.value['type'],
        this.eventForm.value['campus'],
        this.eventForm.value['location'],
        this.datePipe.transform(this.eventForm.value['date'], 'yyyy-MM-dd'),
        this.eventForm.value['start'] + ':00',
        this.eventForm.value['end']+ ':00',
        this.eventForm.value['description']
        );

      const test: Event =  {
        eventId: "test",
        name: "test",
        eventType: "test",
        startingCampus: "test",
        startingTime: "test",
        endingTime: "test",
        location: "test",
        date: "test",
        description: "test",
        participantsId: [''],
        participants: []
      }
      
      if(this.response['eventId']!== null){
        const event: Event =  {
          eventId: this.response['eventId'],
          name: this.response['name'],
          eventType: this.response['eventType'],
          startingCampus: this.response['startingCampus'],
          startingTime: this.response['startingTime'],
          endingTime: this.response['endingTime'],
          location: this.response['location'],
          date: this.response['date'],
          description: this.response['description'],
          participantsId: [],
          participants: []
        };
        this.store.dispatch(addEvent({
          event: event
        }));
        this.openDialog('create', true, null);
      }
      else {
        this.openDialog('create', false, null);
      }
      
    }

  constructor(private translateService: TranslateService, public router: Router, private route: ActivatedRoute, public dialog: MatDialog, 
              private eventsService: EventsService, public datePipe: DatePipe, private store: Store, private dateAdapter: DateAdapter<Date>) 
              { 
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
    this.events$.subscribe(events => {
      this.eventsNumber = events.length;
    })
    this.dateAdapter.setLocale(this.translateService.getDefaultLang()); 
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}
  
  async openDialog(action: string, success: boolean, eventId: string | null | undefined){
    const dialogRef =this.dialog.open(EventDialogComponent, {
      data: {
        action: action,
        success: success
      },
    });
    await dialogRef.afterClosed().subscribe(async result => {
      this.isDeleted = result;
      if (this.isDeleted) {
        if(eventId !== null &&  eventId !== undefined){     
          this.response = await this.eventsService.deleteEvent(eventId);   
          this.store.dispatch(deleteEvent({
          eventId: eventId
        }));
        this.store.select(selectUserId).subscribe(userIdT => {
          if(userIdT !== undefined){
            this.store.dispatch(
            fetchEventsOnLogin({
              userId: userIdT
            })
          );
          }
        });

      }

        this.isDeleted = false;
        this.events$ = this.store.select(selectEventItems);
      }
    });
  }
}
