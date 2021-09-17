import {Component, OnInit} from '@angular/core';
import {Person} from "../../modules/person/person";
import {AddFriendService} from "./add-friend.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CurrentUserService} from "../../modules/currentUser/current-user.service";
import {CurrentUser} from "../../modules/currentUser/current-user";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  AuthUser:CurrentUser = this.currentUser.getAuthUser()
  person: Person = new Person("", "", "", "", "", "", "", "", 0, "");

  constructor(
    public currentUser: CurrentUserService,
    private router: ActivatedRoute,
    private addFriendService: AddFriendService,
    private home: Router) {}

  ngOnInit() {
    return this.getFriends("http://localhost:8080/allFriends")
  }

  onClick() {
    if (this.person._id === "") {
      this.person.email = this.AuthUser.email
      this.addFriendService.addFriend(this.person).subscribe((data => JSON.stringify(data)))
    } else {
      this.addFriendService.editFriend(this.person).subscribe((data => JSON.stringify(data)))
    }
    this.home.navigate(['/overview']);
  }

  public async getFriends(url: string) {
    let data = await fetch(url);
    let result = await data.json();

    result.find((person: any) => {
      if (person.email === this.AuthUser.email) this.person = person
    });
  }
}
