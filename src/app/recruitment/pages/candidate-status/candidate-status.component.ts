import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectApplication } from 'src/app/core/state/user';

@Component({
  selector: 'candidate-status',
  templateUrl: './candidate-status.component.html',
  styleUrls: ['./candidate-status.component.scss']
})
export class CandidateStatusComponent implements OnInit {

  application$ = this.store.select(selectApplication);

  constructor(private store: Store) { }

  ngOnInit(): void {
  }

}
