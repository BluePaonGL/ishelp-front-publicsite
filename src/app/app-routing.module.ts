import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventComponent } from './event/pages/public/event.component';
import { AuthGuard } from './guards/AuthGuard.guard';
import { ApplyComponent } from './recruitment/pages/apply/apply.component';
import { CandidatesListComponent } from './recruitment/pages/candidates-list/candidates-list.component';
import { PageNotFoundComponent } from './errors/page-not-found/page-not-found.component';
import { ShowcaseComponent } from './showcase/showcase.component';
import { UnauthorizedComponent } from './errors/unauthorized/unauthorized.component';
import { CreateEventComponent } from './event/pages/back/create-event.component';
import { ProfileComponent } from './profile/profile.component';
import { MaraudComponent } from './event/pages/back/maraud.component';
import { CandidateStatusComponent} from './recruitment/pages/candidate-status/candidate-status.component';
import { CandidateChoiceComponent} from './recruitment/pages/candidate-choice/candidate-choice.component';
import {RegistrationComponent} from "./registration/registration.component";
import { AboutUsComponent } from './about-us/about-us.component';
import { MaraudusersComponent } from './event/pages/back/maraudusers.component';


const routes: Routes = [
  { path: 'page_not_found', component: PageNotFoundComponent, canActivate : [AuthGuard] },
  { path: 'event/not_found', component: PageNotFoundComponent, canActivate : [AuthGuard] },
  { path: 'event/create', component: CreateEventComponent, canActivate : [AuthGuard]
  },
  { path: 'event/manage/:id', component: MaraudComponent, canActivate : [AuthGuard], data: {
    roles: ['events'],
    }
  },
  { path: 'event/manage/group/:id', component: MaraudusersComponent, canActivate : [AuthGuard], data: {
    roles: ['events'],
    } 
  },
  { path: 'apply/manage', component: CandidatesListComponent, canActivate : [AuthGuard], data: {
    roles: ['application'],
    } 
  },
  { path: 'apply/manage/:id', component: CandidateChoiceComponent, canActivate : [AuthGuard], data: {
    roles: ['application'],
    } 
  },
  { path: 'apply', component: ApplyComponent, canActivate : [AuthGuard] },
  { path: 'apply/status', component: CandidateStatusComponent, canActivate : [AuthGuard] },
  { path: 'event/:id', component: EventComponent, canActivate : [AuthGuard] },
  { path: 'event', component: EventComponent, canActivate : [AuthGuard]},
  { path: 'profile', component: ProfileComponent, canActivate : [AuthGuard]},
  { path: 'home', component: ShowcaseComponent, canActivate: [AuthGuard] },
  { path: 'candidature', component: ApplyComponent},
  { path: 'status', component: CandidateStatusComponent},
  { path: 'gestion/candidatures', component: CandidatesListComponent},
  { path: 'gestion/candidatures/choice', component: CandidateChoiceComponent},
  { path : 'registration', component: RegistrationComponent},
  {path: 'about_us', component: AboutUsComponent},
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
