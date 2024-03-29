import {Component, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import { selectApplicationItems, selectApplications } from 'src/app/core/state/applications';
import {Candidate} from "../../models/candidate.model";

@Component({
  selector: 'app-candidates-list',
  templateUrl: './candidates-list.component.html',
  styleUrls: ['./candidates-list.component.scss']
})
export class CandidatesListComponent implements OnInit {
  candidates!: Candidate[];
  applications$ = this.store.select(selectApplicationItems);

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.candidates = [
      {
        id: '1',
        fullname :'Paul',
        subject: "Com a Ishelp",
        status: "En cours"
      },
      {
        id: '2',
        fullname :"Arthur",
        subject: "Demande candidature",
        status: "Validé"
      },
      {
        id: '3',
        fullname :"Salomé",
        subject: "Créa Ishelp",
        status: "En cours"
      },      
      {
        id: '4',
        fullname :'Paul',
        subject: "Com a Ishelp",
        status: "En cours"
      },
      {
        id: '5',
        fullname :"Arthur",
        subject: "Demande candidature",
        status: "Validé"
      },
      {
        id: '6',
        fullname :"Salomé",
        subject: "Créa Ishelp",
        status: "En cours"
      }
    ]
  }

}
