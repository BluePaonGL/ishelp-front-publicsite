import { Component  } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Location } from '@angular/common'

@Component({
  selector: 'app-page-not-found',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['../page-not-found.component.scss']
})
export class UnauthorizedComponent {
  private urlHistory: string[] = []

  constructor(private location: Location, private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.urlHistory.push(event.urlAfterRedirects)
      }
    })
  }

  back(): void {
    if(this.router.url.indexOf("/event/") !== -1){
      this.router.navigate(['/event/']);
    }
    else{
      this.location.back()
    }
  }
}