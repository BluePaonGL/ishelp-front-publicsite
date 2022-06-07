import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUserEmail, selectUserFirstName, selectUserLastName, selectUserStudentId, selectUserUsername } from '../core/state/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  lastName$ = this.store.select(selectUserLastName);
  firstName$ = this.store.select(selectUserFirstName);
  username$ = this.store.select(selectUserUsername);
  role$ = 'Not yet implemented';
  email$ = this.store.select(selectUserEmail)
  studentId$ = this.store.select(selectUserStudentId);
  promo$ = 'Not yet implemented';

  constructor(private store: Store) { }

  ngOnInit(): void {
  }

}
