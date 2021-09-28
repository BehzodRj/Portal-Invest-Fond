import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { AnnouncementPageComponent } from './announcement-page/announcement-page.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthPageComponent,
    RegistrationPageComponent,
    AnnouncementPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
