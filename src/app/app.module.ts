import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatProgressBarModule} from '@angular/material/progress-bar';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { AnnouncementPageComponent } from './announcement-page/announcement-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { FooterPageComponent } from './footer-page/footer-page.component';
import { ProjectComponent } from './project/project.component';
import { AplicationPageComponent } from './aplication-page/aplication-page.component';
import { AnnouncerPageComponent } from './announcer-page/announcer-page.component';
import { AnnouncerFormComponent } from './announcer-form/announcer-form.component';
import { AnnouncerTenderComponent } from './announcer-tender/announcer-tender.component';
import { AnnouncerEditComponent } from './announcer-edit/announcer-edit.component';
import { AdminProjectComponent } from './admin-project/admin-project.component';
import { AdminPaymentComponent } from './admin-payment/admin-payment.component';
import { FavouritesPageComponent } from './favourites-page/favourites-page.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ForgetPageComponent } from './forget-page/forget-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { SubscriberTenderComponent } from './subscriber-tender/subscriber-tender.component';
import { SubscriberOrdersComponent } from './subscriber-orders/subscriber-orders.component';
import { LoadingComponent } from './loading/loading.component';
import { ResultPageComponent } from './result-page/result-page.component';
import { SubscriberorderslotPageComponent } from './subscriberorderslot-page/subscriberorderslot-page.component';
import { SubscriberorderslotchangePageComponent } from './subscriberorderslotchange-page/subscriberorderslotchange-page.component';
import { ResultDataPageComponent } from './result-data-page/result-data-page.component';
import { AnnouncerFilePageComponent } from './announcer-file-page/announcer-file-page.component';
import { MessagesComponent } from './messages/messages.component';
import { SubscriberAdminPageComponent } from './subscriber-admin-page/subscriber-admin-page.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthPageComponent,
    RegistrationPageComponent,
    AnnouncementPageComponent,
    HeaderComponent,
    ProfilePageComponent,
    FooterPageComponent,
    ProjectComponent,
    AplicationPageComponent,
    AnnouncerPageComponent,
    FavouritesPageComponent,
    ErrorPageComponent,
    ForgetPageComponent,
    AdminProjectComponent,
    AdminPaymentComponent,
    AnnouncerFormComponent,
    AnnouncerTenderComponent,
    AdminPageComponent,
    SubscriberTenderComponent,
    SubscriberOrdersComponent,
    LoadingComponent,
    ResultPageComponent,
    SubscriberorderslotPageComponent,
    SubscriberorderslotchangePageComponent,
    AnnouncerEditComponent,
    ResultDataPageComponent,
    AnnouncerFilePageComponent,
    MessagesComponent,
    SubscriberAdminPageComponent,
  ],
  imports: [  
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatProgressBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
