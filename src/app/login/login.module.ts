import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { LoginComponent } from './login.component';



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    TranslateModule,
  ]
})
export class LoginModule { }
