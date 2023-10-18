import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ServicePersonComponent } from './components/service-person/service-person.component';
import { ServiceRequestComponent } from './components/service-request/service-request.component'
import {NgOptimizedImage} from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './footer/footer.component';
import { TempComponent } from './components/temp/temp.component';
import { DashboardPannelComponent } from './components/dashboard-pannel/dashboard-pannel.component';
import { ServiceRequestPageComponent } from './components/service-request-page/service-request-page.component';
import { ServicePersonPageComponent } from './components/service-person-page/service-person-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    ServicePersonComponent,
    ServiceRequestComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    TempComponent,
    DashboardPannelComponent,
    ServiceRequestPageComponent,
    ServicePersonPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgOptimizedImage,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
