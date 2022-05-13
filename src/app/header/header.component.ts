import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';
  

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isDisabled: boolean = false;


  constructor(private router: Router ) { }
  ngOnInit(): void {
    if(this.router.url== '/header' ){
    }
      
  }

}
