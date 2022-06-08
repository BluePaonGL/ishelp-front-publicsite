import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { registerUser } from '../core/state/user';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

    hide = true;
    hideCheck = true;
    userForm = new FormGroup({
        username: new FormControl('', [
            Validators.required
        ]),
        studentId: new FormControl('', [
            Validators.required,
        ]),
        email: new FormControl('', [
            Validators.required,
        ]),
        firstName: new FormControl('', [
            Validators.required,
        ]),
        lastName: new FormControl('', [
            Validators.required,
        ]),
        profilePicture: new FormControl('', []),
        password: new FormControl('', [
            Validators.required,
        ]),
        passwordCheck: new FormControl('', [
            Validators.required,
        ]),
    });


    constructor(private store: Store, private router: Router, public dialog: MatDialog) {
    }

    ngOnInit(): void {

    }

    onSubmit() {
        delete this.userForm.value.passwordCheck;
        this.store.dispatch(registerUser({user: this.userForm.value}));
        this.router.navigate(['/home'])
    }
}
