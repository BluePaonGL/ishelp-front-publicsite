import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/AuthGuard.guard';
import { HeaderComponent } from './header/header.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FormulaireComponent } from './recruitment/formulaire/formulaire.component';
import { CandidatesListComponent } from './recruitment/candidates-list/candidates-list.component';

const routes: Routes = [
  { path: 'page-not-found.component', component: PageNotFoundComponent, canActivate : [AuthGuard] },
  { path: 'home', component: PageNotFoundComponent, canActivate : [AuthGuard] },
  { path: 'candidature', component: FormulaireComponent},
  { path: 'gestion/candidatures', component: CandidatesListComponent},
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
