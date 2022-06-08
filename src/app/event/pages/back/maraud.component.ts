import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UsersService } from 'src/app/utility/users.service';
import { EventsService } from '../../events.service';
import { MaraudsService } from '../../marauds.service';

@Component({
  selector: 'app-maraud',
  templateUrl: './maraud.component.html',
  styleUrls: ['../event.component.scss']
})
export class MaraudComponent implements OnInit {
  eventById: any;
  subscription: any;
	id: string | null = '';
  eventsNumber: any;
  events: any;
  lang!: string;
  maraudNumber: number = 0;
  marauds: any;
  usersMaraud: any;

  constructor(public router: Router, private route: ActivatedRoute,  private usersService: UsersService,
    private eventsService: EventsService, private maraudsService: MaraudsService) 
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
    await this.urlChange();
  }

  async urlChange(){
    if (this.id !== null) {
      this.eventById = await this.eventsService.getEventById(this.id);
      this.marauds = await this.maraudsService.getMaraudsByEventId(this.id);
      this.maraudNumber = this.marauds.length;
      this.usersMaraud =[];
      await this.marauds.forEach(async (maraud: any) => {
        let users: string[] = [];
        await maraud.maraudGroupMembers.forEach(async (user: string) => {  
          users.push(await this.getName(user))
        })
        
        this.usersMaraud.push([maraud.maraudGroupId, users])
      });
		}
	}
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  async addGroup() {
    await this.maraudsService.addGroup(this.eventById.eventId, (this.maraudNumber + 1).toString()).then((events) => (this.events = events));
    this.marauds = await this.maraudsService.getMaraudsByEventId(this.id);
    this.maraudNumber = this.marauds.length;
  }

  async deleteMaraudGroup(groupId: string){
    await this.maraudsService.deleteMaraudGroup(groupId);
    this.marauds = await this.maraudsService.getMaraudsByEventId(this.id);
    this.maraudNumber = this.marauds.length;
  }

  isUsers(listOfUsers: any[]): boolean {
    if(listOfUsers !== undefined){
      if(listOfUsers.length === 0){
        return false;
      }
    }
    return true;
  }
  
  async getName(userId: string) {
    let user = await this.usersService.getUserById(userId);
    let firstLastName = user.lastName + " " + user.firstName
    return firstLastName;
  }
}