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
  person: any = {}

  constructor(
    public friendService: FriendService,
    public currentUser: CurrentUserService,
    private router: ActivatedRoute,
    private home: Router) {
  }

  async ngOnInit() {
    this.getFriends()
  }

  getFriends(){
    this.friendService.getFriends().subscribe((data =>{ JSON.stringify(data); console.log(data)}))
  }
  //ngOnInit() {
  //  return this.getFriends("http://localhost:8080/allFriends")
  //}
//
  //public async getFriends(url: string) {
  //  let data = await fetch(url);
  //  this.allPersons = await data.json();
//
  //  this.person = this.allPersons.find((person:Person) => person.email === this.AuthUser.email)
  //  if (this.person === undefined) {
  //    await this.home.navigate(['/edit', this.AuthUser.email]);
  //  }
  //}
}

