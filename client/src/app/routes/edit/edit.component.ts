import {Component, OnInit} from '@angular/core';
import {Person} from "../../modules/person/person";
import {AddFriendService} from "./add-friend.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CurrentUserService} from "../../modules/currentUser/current-user.service";
import {CurrentUser} from "../../modules/currentUser/current-user";
import {FriendService} from "../friend/friend.service";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  AuthUser: CurrentUser = this.currentUser.getAuthUser()
  person: Person = new Person("", "", "", "", "", "", "", "", 0, "",new Date(),new Date());

  constructor(
    public friendService: FriendService,
    public currentUser: CurrentUserService,
    private router: ActivatedRoute,
    private addFriendService: AddFriendService,
    private home: Router) {
  }

  ngOnInit() {
    this.getFriends().then((data) => {
      data.find((person: Person) => {
        if (person.email === this.AuthUser.email) this.person = person
      });
    })
  }

  onClick() {
    if (this.person._id === "") {
      //give extra info to the person object
      this.injectInfo()
      console.log(this.person)
      this.addFriendService.addFriend(this.person).subscribe((data => JSON.stringify(data)))
    } else {
      this.person.edited_on = new Date()
      this.addFriendService.editFriend(this.person).subscribe((data => JSON.stringify(data)))
    }
    this.home.navigate(['/overview']);
  }

  async getFriends() {
    return await this.friendService.getFriends()
  }

  injectInfo(){
    this.person.email = this.AuthUser.email
    this.person.created_on = new Date()
    this.person.edited_on = new Date()
  }
}
