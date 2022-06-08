import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Application } from 'src/app/core/models/application.model';
import { selectApplicationById } from 'src/app/core/state/applications';

@Component({
  selector: 'candidate-choice',
  templateUrl: './candidate-choice.component.html',
  styleUrls: ['./candidate-choice.component.scss']
})
export class CandidateChoiceComponent implements OnInit {

  id: string = "";
  application$ = this.store.select(selectApplicationById({id: this.route.snapshot.paramMap.get("id")}));

  constructor(private route: ActivatedRoute, private store: Store) { }

  ngOnInit(): void {
      const id = this.route.snapshot.paramMap.get("id");
      if(id !== null)  {
        this.id = id;
      }   
      
  
  }

}
