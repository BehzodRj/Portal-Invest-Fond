import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { ProjectComponent } from './project/project.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { ForgetPageComponent } from './forget-page/forget-page.component';
import { AnnouncerPageComponent } from './announcer-page/announcer-page.component';
import { AnnouncerFormComponent } from './announcer-form/announcer-form.component';
import { AnnouncerTenderComponent } from './announcer-tender/announcer-tender.component';
import { AnnouncerGuard } from './announcer.guard';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AdminProjectComponent } from './admin-project/admin-project.component';
import { AdminPaymentComponent } from './admin-payment/admin-payment.component';
import { AdminGuard } from './admin.guard';
import { SubscriberTenderComponent } from './subscriber-tender/subscriber-tender.component';
import { AnnouncementPageComponent } from './announcement-page/announcement-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { SubscriberOrdersComponent } from './subscriber-orders/subscriber-orders.component';
import { AplicationPageComponent } from './aplication-page/aplication-page.component';
import { FavouritesPageComponent } from './favourites-page/favourites-page.component';
import { SubscribeGuard } from './subscribe.guard';
import { ErrorPageComponent } from './error-page/error-page.component';

const routes: Routes = [
  { path: '', component: AuthPageComponent },
  { path: 'registration', component: RegistrationPageComponent },
  { path: 'forget', component: ForgetPageComponent },
  { path: 'announcer', component: AnnouncerPageComponent, canActivate: [AnnouncerGuard] },
  { path: 'announcerform/:id', component: AnnouncerFormComponent, canActivate: [AnnouncerGuard] },
  { path: 'announcertender', component: AnnouncerTenderComponent, canActivate: [AnnouncerGuard] },
  { path: 'admin', component: AdminPageComponent, canActivate: [AdminGuard] },
  { path: 'adminpayment', component: AdminPaymentComponent, canActivate: [AdminGuard] },
  { path: 'adminproject/:id', component: AdminProjectComponent, canActivate: [AdminGuard] },
  { path: 'subscribertender', component: SubscriberTenderComponent, canActivate: [SubscribeGuard] },
  { path: 'announcement/:id', component: AnnouncementPageComponent, canActivate: [SubscribeGuard] },
  { path: 'profile', component: ProfilePageComponent, canActivate: [SubscribeGuard] },
  { path: 'subscriberorders', component: SubscriberOrdersComponent, canActivate: [SubscribeGuard] },
  { path: 'application', component: AplicationPageComponent, canActivate: [SubscribeGuard] },
  { path: '**', component: ErrorPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
