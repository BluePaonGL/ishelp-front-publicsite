import { Component  } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Location } from '@angular/common'

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent {
  private urlHistory: string[] = []

  constructor(private location: Location, private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.urlHistory.push(event.urlAfterRedirects)
      }
    })
  }

  back(): void {
    this.location.back()
  }
}