import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, tap, throwError } from 'rxjs';
import { GlobalHttpInterceptorService } from '../utility/app.init'
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {
  message: string = 'Vous êtes déconnecté. (pikachu/pikachu)';
  name: string = '';
  password: string = '';

  constructor(
    public translate: TranslateService, 
    private http: HttpClient
  ) { }

  ngOnInit() {
  }

  setMessage() {
  }

  login1(): Observable<any> {
    return this.http.get('https://user-service.cubetech-app.fr/user').pipe();
  }
  login(){
    this.login1().subscribe(message => this.message = message);

  }
}
