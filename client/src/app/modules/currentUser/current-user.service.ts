import { Injectable } from '@angular/core';
import {AuthService} from "@auth0/auth0-angular";
import {CurrentUser} from "./current-user";
import {Person} from "../person/person";

@Injectable({
  providedIn: 'root'
})

export class CurrentUserService {
  AuthUser: CurrentUser = new CurrentUser("", "", "",[],[],[])

  constructor(public auth: AuthService) {
    this.auth.user$.subscribe(data => {
      this.AuthUser.email = data?.email
      this.AuthUser.id = data?.sub
      this.AuthUser.updated_at = data?.updated_at
    });
  }

  getAuthUser():CurrentUser{
    return this.AuthUser
  }

}
