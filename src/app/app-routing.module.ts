import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventComponent } from './event/pages/public/event.component';
import { AuthGuard } from './guards/AuthGuard.guard';
import { PageNotFoundComponent } from './errors/page-not-found/page-not-found.component';
import { ShowcaseComponent } from './showcase/showcase.component';
import { UnauthorizedComponent } from './errors/unauthorized/unauthorized.component';
import { CreateEventComponent } from './event/pages/back/create-event.component';

const routes: Routes = [
  { path: 'page_not_found', component: PageNotFoundComponent, canActivate : [AuthGuard] },
  { path: 'event/not_found', component: PageNotFoundComponent, canActivate : [AuthGuard] },
  { path: 'event/create', component: CreateEventComponent, canActivate : [AuthGuard], data: {
    roles: ['events'],
    } 
  },
  { path: 'event/:id', component: EventComponent, canActivate : [AuthGuard] },
  { path: 'event', component: EventComponent, canActivate : [AuthGuard] },
  { path: 'home', component: ShowcaseComponent, canActivate : [AuthGuard] },
  { path: '', component: ShowcaseComponent},
  { path: 'unauthorized', component: UnauthorizedComponent, canActivate : [AuthGuard] },
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    urlUpdateStrategy: 'eager'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
