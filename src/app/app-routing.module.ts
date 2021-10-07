import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnnouncementPageComponent } from './announcement-page/announcement-page.component';
import { AplicationPageComponent } from './aplication-page/aplication-page.component';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { ProjectComponent } from './project/project.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { SallaryComponent } from './sallary/sallary.component';
import { HeaderComponent } from './header/header.component';

const routes: Routes = [
  { path: '', component: AuthPageComponent },
  { path: 'registration', component: RegistrationPageComponent },
  { path: 'announcement', component: AnnouncementPageComponent },
  { path: 'sallary', component: SallaryComponent },
  { path: 'profile', component: ProfilePageComponent },
  { path: 'project', component: ProjectComponent },
  { path: 'application', component: AplicationPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
