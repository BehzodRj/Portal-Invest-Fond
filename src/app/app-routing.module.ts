import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnnouncementPageComponent } from './announcement-page/announcement-page.component';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';

const routes: Routes = [
  { path: '', component: AuthPageComponent },
  { path: 'registration', component: RegistrationPageComponent },
  { path: 'announcement', component: AnnouncementPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
