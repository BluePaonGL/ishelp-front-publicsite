import {Component, OnInit} from '@angular/core';
import {Candidate} from "../../models/candidate.model";

@Component({
  selector: 'app-candidates-list',
  templateUrl: './candidates-list.component.html',
  styleUrls: ['./candidates-list.component.scss']
})
export class CandidatesListComponent implements OnInit {
 candidates!: Candidate[];

  constructor() { }

  ngOnInit(): void {
    this.candidates = [
      {
        fullname :'Paul',
        subject: "Com a Ishelp",
        status: "En cours"
      },
      {
        fullname :"Arthur",
        subject: "Demande candidature",
        status: "Validé"

      },
      {
        fullname :"Salomé",
        subject: "Créa Ishelp",
        status: "En cours"
      }
    ]
  }

}
