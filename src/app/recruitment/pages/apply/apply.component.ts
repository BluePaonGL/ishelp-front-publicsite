import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { Application } from 'src/app/core/models/application.model';
import { selectUser, submitApplication } from 'src/app/core/state/user';

@Component({
  selector: 'app-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.scss']
})
export class ApplyComponent implements OnInit {
  applyForm = new FormGroup({
    object: new FormControl('', [
      Validators.required
    ]),
    motivations: new FormControl('', [
      Validators.required,
    ]),
    resume: new FormControl('', [
      Validators.required,
    ]),
    contact: new FormControl('', [
      Validators.required,
    ]),
    file: new FormControl('', []),
  });

  user$ = this.store.select(selectUser);

  constructor(private router: Router, private store: Store) { }

  ngOnInit(): void {
    this.user$.subscribe((user) =>
      {
        console.log(user.application);
        if (undefined !== user.application && user.application.applicationId !== undefined) {
          this.router.navigate(['/apply/status']);
        }
      }
    )
  }

  onSubmit() {
    let application : Application = {};
    delete this.applyForm.value.file;
    Object.assign(application, this.applyForm.value)
    console.log(this.applyForm.value);
    console.log(application);
    

    this.store.dispatch(submitApplication({application}));
    this.router.navigate(['/apply/status']);
  }
}
