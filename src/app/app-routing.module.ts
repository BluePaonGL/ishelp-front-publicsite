import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/AuthGuard.guard';
import { HeaderComponent } from './header/header.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'page-not-found.component', pathMatch: 'full' },
  { path: 'page-not-found.component', component: PageNotFoundComponent, canActivate : [AuthGuard] },
  { path: 'header', component: HeaderComponent, canActivate : [AuthGuard] },
  { path: '**', component: PageNotFoundComponent,
  loadChildren: () => import('./app.module').then(m => m.AppModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
