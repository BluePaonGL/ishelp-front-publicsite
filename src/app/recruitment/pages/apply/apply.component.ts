import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.scss']
})
export class ApplyComponent implements OnInit {
  applyForm = new FormGroup({
    subject: new FormControl('', [
      Validators.required
    ]),
    motivations: new FormControl('', [
      Validators.required,
    ]),
    experiences: new FormControl('', [
      Validators.required,
    ]),
    contact: new FormControl('', [
      Validators.required,
    ]),
    file: new FormControl('', []),
  });


  constructor(private router: Router) { }

  ngOnInit(): void {
    if(false){ // condition de recrutement en cours
      this.router.navigate(['/apply/status'])
    }
  }

  onSubmit() {
    this.router.navigate(['/apply/status'])
  }
}
