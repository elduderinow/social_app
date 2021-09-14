import { Component, OnInit } from '@angular/core';
import {Person} from "../../modules/person/person";
import {AuthService} from '@auth0/auth0-angular';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  allPersons: Person[] = []
  currentUser: any = {
  }

  constructor(public auth: AuthService, private router :ActivatedRoute, private home: Router) {
  }

  ngOnInit() {
    this.auth.user$.subscribe(data => this.currentUser = data);
    return this.getFriends("http://localhost:8080/allFriends")
  }

  public async getFriends(url: string) {
    let data = await fetch(url);
    this.allPersons = await data.json();

    this.currentUser = this.allPersons.find(friend => friend.email === this.currentUser.email)
    console.log(this.currentUser)
    let route;
    if (this.currentUser === undefined) {
      route = '/edit'
    } else {
      route = '/overview'
    }
      this.home.navigate([route]);
  }
}
