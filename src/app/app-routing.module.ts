import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnnouncementPageComponent } from './announcement-page/announcement-page.component';
import { AplicationPageComponent } from './aplication-page/aplication-page.component';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { ProjectComponent } from './project/project.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { ForgetPageComponent } from './forget-page/forget-page.component';
import { AnnouncerPageComponent } from './announcer-page/announcer-page.component';
import { AnnouncerFormComponent } from './announcer-form/announcer-form.component';
import { AnnouncerTenderComponent } from './announcer-tender/announcer-tender.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AdminProjectComponent } from './admin-project/admin-project.component';
import { AdminPaymentComponent } from './admin-payment/admin-payment.component';
import { FavouritesPageComponent } from './favourites-page/favourites-page.component';
import { AdminGuard } from './admin.guard';
import { AnnouncerGuard } from './announcer.guard';
import { SubscribeGuard } from './subscribe.guard';
import { ErrorPageComponent } from './error-page/error-page.component';

const routes: Routes = [
  { path: '', component: AuthPageComponent },
  { path: 'registration', component: RegistrationPageComponent },
  { path: 'forget', component: ForgetPageComponent },
  { path: 'announcement', component: AnnouncementPageComponent, canActivate: [AnnouncerGuard] },
  { path: 'profile', component: ProfilePageComponent, canActivate: [AnnouncerGuard] },
  { path: 'application', component: AplicationPageComponent, canActivate: [AnnouncerGuard] },
  { path: 'announcer', component: AnnouncerPageComponent, canActivate: [AnnouncerGuard] },
  { path: 'announcerform', component: AnnouncerFormComponent, canActivate: [AnnouncerGuard] },
  { path: 'announcertender', component: AnnouncerTenderComponent, canActivate: [AnnouncerGuard] },
  { path: 'admin', component: AdminPageComponent, canActivate: [AnnouncerGuard] },
  { path: 'adminproject', component: AdminProjectComponent, canActivate: [AnnouncerGuard] },
  { path: 'adminpayment', component: AdminPaymentComponent, canActivate: [AnnouncerGuard] },
  { path: 'favourites', component: FavouritesPageComponent, canActivate: [AnnouncerGuard] },
  { path: '**', component: ErrorPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
