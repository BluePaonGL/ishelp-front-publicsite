import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {DatePipe} from '@angular/common';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  eventUrl: string = 'https://event-service.cubetech-app.fr'
  startDate = new Date('2022-05-18T12:30'); 
  endDate = new Date('2022-05-18T14:30');
  profilePictureUrl = '../../assets/logo-whiteback-round.png';
  profileName = 'profile name';
  id: string|null = '';
  lang!: string;
  eventById: any;
  events: any;
  participantNumber: number | undefined;
  subscription: any

  constructor(private translateService: TranslateService, public router: Router, private route: ActivatedRoute, private http: HttpClient, public datePipe: DatePipe) { 
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
    if(this.router.url === '/event'){    
      this.getAllEvents()
    }
    else if(this.id !== null){
      this.eventById = await this.getEventById(this.id)
      this.participantNumber = this.eventById.participantsId.length
    }
    
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getAllEvents(): void {
    this.http.get(this.eventUrl + '/event/events').subscribe(apiEvents => {
        this.events = apiEvents;
        console.log(this.events);
    });
  }

  async getEventById(eventId: string|null): Promise<any> {
    let event= await lastValueFrom(this.http.get(this.eventUrl + '/event/findEvent/' + eventId))
    return event
  }

  signUp(){

  }

  signOut(){

  }

  isSignedUp(){
    return false;
  }
}
