import { Component, OnInit } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { EventsService } from '../../events.service';

@Component({
  selector: 'app-maraud',
  templateUrl: './maraud.component.html',
  styles: [
  ]
})
export class MaraudComponent implements OnInit {
  eventById: null;
  subscription: any;
  id: string | null | undefined;
  eventsNumber: any;
  events: any;
  lang!: string;

  constructor(private translateService: TranslateService, public router: Router, private route: ActivatedRoute,
    private eventsService: EventsService, private dateAdapter: DateAdapter<Date>) 
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
    this.dateAdapter.setLocale(this.translateService.getDefaultLang()); 
    await this.eventsService.getAllEvents().then((events) => (this.events = events));
    this.eventsNumber = this.events.length;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}