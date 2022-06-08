import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { UsersService } from 'src/app/utility/users.service';
import { MaraudsService } from '../../marauds.service';

@Component({
  selector: 'app-maraudusers',
  templateUrl: './maraudusers.component.html',
  styleUrls: ['../event.component.scss']
})
export class MaraudusersComponent implements OnInit {
  eventById: any;
  subscription: any;
	id: string | null = '';
  eventsNumber: any;
  events: any;
  lang!: string;
  memberNumber: number = 0;
  maraud: any;
  formAdd: FormGroup;
  formRemove: FormGroup;
  availableUsernames: string[] = [];
  participantUsernames: string[] = [];
  users: string[] = [];


  constructor(public router: Router, private route: ActivatedRoute,  private usersService: UsersService,
    private maraudsService: MaraudsService, private formBuilder: FormBuilder) 
    { 
      this.eventById = null;
      this.subscription = this.router.events.subscribe((ev) => {
        if (ev instanceof NavigationEnd) {
          if(this.router.url !== '/event'){    
            this.id = this.route.snapshot.paramMap.get("id");
          }
        }
      });
      this.formAdd = this.formBuilder.group({
        orders: new FormArray([])
      });
      this.formRemove = this.formBuilder.group({
        orders: new FormArray([])
      });
    
  }

  get ordersFormAddArray() {
    return this.formAdd.controls['orders'] as FormArray;
  }
  
  get ordersFormRemoveArray() {
    return this.formRemove.controls['orders'] as FormArray;
  }

  private addCheckboxesToForm() {
    this.users.forEach(() => this.ordersFormAddArray.push(new FormControl(false)));
    this.maraud.maraudGroupMembers.forEach(() => this.ordersFormRemoveArray.push(new FormControl(false)));
  }
  
  async memberName(userId: string): Promise<any> {
    let user = await this.usersService.getUserById(userId);
    return user.lastName + ' ' + user.firstName;
  }
  
  async ngOnInit(): Promise<void> {
    if (this.id !== null) {
      this.maraud = await this.maraudsService.getMaraudsByGroupId(this.id);
      console.log(this.maraud)
      this.memberNumber = this.maraud.maraudGroupMembers.length;
      this.users = await this.maraudsService.getAvailableUsers(this.maraud.eventId)
      
      await this.updateList()

      this.addCheckboxesToForm();
		}
  }
  
  async updateList(){
    console.log(this.users)
    this.availableUsernames = [];
    let usersTemp: string[] = [];
    var userss = new Promise<void>((resolve, reject) => {this.users.forEach(async (user: string,  i: number, array: string | any[]) => {
      let userTemp = await this.usersService.getUserById(user)
      this.availableUsernames.push(userTemp.lastName + ' ' + userTemp.firstName);
      usersTemp.push(user)
      if (i === array.length -1) resolve();
    })})
    userss.then(() => this.users = usersTemp);
    

    let usersTemp2: string[] = [];
    this.participantUsernames = [];
    var maraud = new Promise<void>((resolve, reject) => {this.maraud.maraudGroupMembers.forEach(async (user: string,  i: number, array: string | any[]) => {
      let userTemp = await this.usersService.getUserById(user)
      this.participantUsernames.push(userTemp.lastName + ' ' + userTemp.firstName);
      usersTemp2.push(user)
      if (i === array.length -1) resolve();
    })})
    maraud.then(() => this.maraud.maraudGroupMembers = usersTemp2)
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  async submitAdd() {
    const selectedOrderIds = this.formAdd.value.orders
      .map((checked: any, i: number) => checked ? this.users[i] : null)
      .filter((checked: null) => checked !== null);
      console.log(selectedOrderIds)
      let index;
      var add = new Promise<void>((resolve, reject) => {selectedOrderIds.forEach(async (selected: string, i: number, array: string | any[]) => {
        await this.maraudsService.addMaraudGroupUser(this.maraud.maraudGroupId, selected)
        index = this.users.indexOf(selected);
        this.users.splice(index, 1);
        this.ordersFormAddArray.removeAt(index)
        this.ordersFormRemoveArray.push(new FormControl(false))
        this.maraud.maraudGroupMembers.push(selected)
        if (i === array.length -1) resolve();
      })})
      add.then(async () => {console.log(selectedOrderIds);await this.updateList()})
  }

  async submitRemove() {
    const selectedOrderIds = this.formRemove.value.orders
      .map((checked: any, i: number) => checked ? this.maraud.maraudGroupMembers[i] : null)  
      .filter((checked: null) => checked !== null);
      console.log(selectedOrderIds)
      var remove = new Promise<void>((resolve, reject) => {selectedOrderIds.forEach(async (selected: string, i: number, array: string | any[]) => {
        await this.maraudsService.deleteMaraudGroupUser(this.maraud.maraudGroupId, selected)
        this.users.push(selected)
        let index = this.maraud.maraudGroupMembers.indexOf(selected);
        this.maraud.maraudGroupMembers.splice(index, 1);
        this.ordersFormRemoveArray.removeAt(index)
        this.ordersFormAddArray.push(new FormControl(false))
        if (i === array.length -1) resolve();
      })})
      remove.then(async () => {console.log(selectedOrderIds);await this.updateList()})
  }

}
