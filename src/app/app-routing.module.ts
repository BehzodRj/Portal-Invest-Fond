import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { ProjectComponent } from './project/project.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { ForgetPageComponent } from './forget-page/forget-page.component';
import { AnnouncerPageComponent } from './announcer-page/announcer-page.component';
import { AnnouncerFormComponent } from './announcer-form/announcer-form.component';
import { AnnouncerTenderComponent } from './announcer-tender/announcer-tender.component';
import { AnnouncerFilePageComponent } from './announcer-file-page/announcer-file-page.component';
import { AnnouncerEditComponent } from './announcer-edit/announcer-edit.component';
import { ResultDataPageComponent } from './result-data-page/result-data-page.component';
import { ResultPageComponent } from './result-page/result-page.component';
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
import { SubscriberorderslotPageComponent } from './subscriberorderslot-page/subscriberorderslot-page.component';
import { SubscriberorderslotchangePageComponent } from './subscriberorderslotchange-page/subscriberorderslotchange-page.component';
import { MessagesComponent } from './messages/messages.component';
import { SubscriberAdminPageComponent } from './subscriber-admin-page/subscriber-admin-page.component';

const routes: Routes = [
  { path: '', component: AuthPageComponent },
  { path: 'registration', component: RegistrationPageComponent },
  { path: 'forget', component: ForgetPageComponent },
  { path: 'announcer', component: AnnouncerPageComponent, canActivate: [AnnouncerGuard]},
  { path: 'announcerform/:id', component: AnnouncerFormComponent, canActivate: [AnnouncerGuard] },
  { path: 'announcertender', component: AnnouncerTenderComponent, canActivate: [AnnouncerGuard] },
  { path: 'announceredit/:id', component: AnnouncerEditComponent, canActivate: [AnnouncerGuard] },
  { path: 'announcerpayment', component: AdminPaymentComponent, canActivate: [AnnouncerGuard] },
  { path: 'announcerfile/:id', component: AnnouncerFilePageComponent, canActivate: [AnnouncerGuard] }, 
  { path: 'resultdata', component: ResultDataPageComponent },
  { path: 'result/:id', component: ResultPageComponent },
  { path: 'admin', component: AdminPageComponent, canActivate: [AdminGuard] },
  { path: 'adminproject/:id', component: AdminProjectComponent,  canActivate: [AdminGuard] },
  { path: 'subscriberAdmin', component: SubscriberAdminPageComponent, canActivate: [AdminGuard] },
  { path: 'profile', component: ProfilePageComponent, canActivate: [SubscribeGuard] },
  { path: 'subscribertender', component: SubscriberTenderComponent, canActivate: [SubscribeGuard] },
  { path: 'announcement/:id', component: AnnouncementPageComponent, canActivate: [SubscribeGuard] },
  { path: 'subscriberorders', component: SubscriberOrdersComponent, canActivate: [SubscribeGuard] },
  { path: 'subscriberorderslot/:id', component: SubscriberorderslotPageComponent, canActivate: [SubscribeGuard] },
  { path: 'subscriberorderslotchange/:id', component: SubscriberorderslotchangePageComponent, canActivate: [SubscribeGuard] },
  { path: 'application/:id', component: AplicationPageComponent, canActivate: [SubscribeGuard] }, 
  { path: 'messages', component: MessagesComponent }, 
  { path: '**', component: ErrorPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
