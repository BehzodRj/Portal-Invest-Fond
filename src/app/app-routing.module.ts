import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnnouncementPageComponent } from './announcement-page/announcement-page.component';
import { AuthPageComponent } from './auth-page/auth-page.component'; 
import { ProjectComponent } from './project/project.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { SallaryComponent } from './sallary/sallary.component';

const routes: Routes = [
  { path: '', component: AuthPageComponent },
  { path: 'registration', component: RegistrationPageComponent },
  { path: 'announcement', component: AnnouncementPageComponent },
  { path: 'sallary', component: SallaryComponent },
  { path: 'project', component: ProjectComponent }, 
  { path: 'profile', component: ProfilePageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
