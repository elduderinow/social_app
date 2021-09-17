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
  person: Person | undefined

  constructor(
    public friendService: FriendService,
    public currentUser: CurrentUserService,
    private router: ActivatedRoute,
    private home: Router) {
  }

  ngOnInit() {
    this.getFriends()
  }

  async getFriends(){
    this.allPersons = await this.friendService.getFriends()
    this.person = this.allPersons.find((person: Person) => person.email === this.AuthUser.email)
    if (this.person === undefined) {
      await this.home.navigate(['/edit', this.AuthUser.email]);
    }
  }
}

