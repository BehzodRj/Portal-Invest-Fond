import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnnouncementPageComponent } from './announcement-page/announcement-page.component';
import { AplicationPageComponent } from './aplication-page/aplication-page.component';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { ProjectComponent } from './project/project.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { AnnouncerPageComponent } from './announcer-page/announcer-page.component';
import { AnnouncerSaveComponent } from './announcer-save/announcer-save.component';
import { AnnouncerLotsComponent } from './announcer-lots/announcer-lots.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', component: AuthPageComponent },
  { path: 'registration', component: RegistrationPageComponent },
  { path: 'announcement', component: AnnouncementPageComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfilePageComponent, canActivate: [AuthGuard] },
  { path: 'project', component: ProjectComponent, canActivate: [AuthGuard] },
  { path: 'application', component: AplicationPageComponent, canActivate: [AuthGuard] },
  { path: 'announcer', component: AnnouncerPageComponent, canActivate: [AuthGuard] },
  { path: 'announcersave', component: AnnouncerSaveComponent, canActivate: [AuthGuard] },
  { path: 'announcerlots', component: AnnouncerLotsComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminPageComponent, canActivate: [AuthGuard] },
  { path: '**', component: AuthPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
