import {Component, OnInit} from '@angular/core';
import {Person} from "../../modules/person/person";
import {ActivatedRoute, Router} from "@angular/router";
import {CurrentUser} from "../../modules/currentUser/current-user";
import {CurrentUserService} from "../../modules/currentUser/current-user.service";
import {FriendService} from "../friend/friend.service";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  allPersons: Person[] = []
  AuthUser: CurrentUser = this.currentUser.getAuthUser()
  person: Person = new Person("", "", "", "", "", "", "", "", 0, "")

  constructor(
    public friendService: FriendService,
    public currentUser: CurrentUserService,
    private router: ActivatedRoute,
    private home: Router) {
  }

  ngOnInit() {
    this.getFriends().then((data)=> {
      this.person = data.find((person: Person) => person.email === this.AuthUser.email)
      if (this.person === undefined) {
         this.home.navigate(['/edit', this.AuthUser.email]);
      }
    })
  }

  async getFriends() {
    return this.allPersons = await this.friendService.getFriends()
  }
}

