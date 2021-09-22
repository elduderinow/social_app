import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import {AppRoutingModule} from "./app-routing.module";

import { AppComponent } from './app.component';
import { FriendComponent } from './routes/friend/friend.component';
import { OverviewComponent } from './routes/overview/overview.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { CardsComponent } from './components/cards/cards.component';
import { ButtonComponent } from './components/button/button.component';
import { EditComponent } from './routes/edit/edit.component';
import { LoginComponent } from './routes/login/login.component';

import {AuthModule} from '@auth0/auth0-angular';
import { NotificationsComponent } from './components/Notifications/notifications.component';
import { AlertRequestedComponent } from './components/notifications/alert-requested/alert-requested.component';




@NgModule({
  declarations: [
    AppComponent,
    FriendComponent,
    OverviewComponent,
    NavbarComponent,
    FooterComponent,
    CardsComponent,
    ButtonComponent,
    EditComponent,
    LoginComponent,
    NotificationsComponent,
    AlertRequestedComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    AuthModule.forRoot({
      domain: 'dev-xopeuohm.eu.auth0.com',
      clientId: 'GYbgyEMgyxZOQkKIcURZmCjnUPXzM7RN'
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
