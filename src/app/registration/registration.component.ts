import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

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
        student_id: new FormControl('', [
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


    constructor() {
    }

    ngOnInit(): void {

    }

    onSubmit() {

    }
}
