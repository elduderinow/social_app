import { Component, OnInit } from '@angular/core';
import {Person} from "../../modules/person/person";
import {AuthService} from '@auth0/auth0-angular';
import {ActivatedRoute, Router} from "@angular/router";
import {CurrentUser} from "../../modules/currentUser/current-user";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  allPersons: Person[] = []
  AuthUser: CurrentUser = new CurrentUser("","","")
  currentUser: any = {}

  constructor(public auth: AuthService, private router :ActivatedRoute, private home: Router) {
  }

  ngOnInit() {
    this.auth.user$.subscribe(data => {
      this.AuthUser.email = data?.email
      this.AuthUser.id = data?.sub
      this.AuthUser.updated_at = data?.updated_at
    });
    return this.getFriends("http://localhost:8080/allFriends")
  }

  public async getFriends(url: string) {
    let data = await fetch(url);
    this.allPersons = await data.json();
    this.currentUser = this.allPersons.find(friend => friend.email === this.AuthUser.email)
    if (this.currentUser === undefined) {
      await this.home.navigate(['/edit',this.AuthUser.email]);
    }
  }
}
