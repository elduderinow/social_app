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



@NgModule({
  declarations: [
    AppComponent,
    FriendComponent,
    OverviewComponent,
    NavbarComponent,
    FooterComponent,
    CardsComponent,
    ButtonComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
