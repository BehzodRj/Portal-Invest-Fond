import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { AnnouncementPageComponent } from './announcement-page/announcement-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SallaryComponent } from './sallary/sallary.component';
import { HeaderComponent } from './header/header.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProjectComponent } from './project/project.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthPageComponent,
    RegistrationPageComponent,
    AnnouncementPageComponent,
    SallaryComponent,
    HeaderComponent,
    ProjectComponent,
  ],
  imports: [  
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
