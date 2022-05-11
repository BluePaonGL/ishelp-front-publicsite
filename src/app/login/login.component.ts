import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, tap, throwError } from 'rxjs';
import { GlobalHttpInterceptorService } from '../utility/app.init'

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
    private router: Router, 
    private http: HttpClient
  ) { }

  ngOnInit() {
  }

  setMessage() {
  }

  login1(): Observable<any> {
    return this.http.get('http://localhost:3000/user').pipe();
  }
  login(){
    this.login1().subscribe(message => this.message = message);

  }
  

  logout() {

  }

  private log(response: any) {
    console.table(response);
  }

  
  private handleError(error: HttpErrorResponse, errorValue: any) {
    console.error(error.error);
    return of(errorValue);
  }
}
