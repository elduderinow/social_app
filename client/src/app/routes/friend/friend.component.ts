import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FriendService} from "./friend.service";
import {CurrentUser} from "../../modules/currentUser/current-user";
import {Person} from "../../modules/person/person";
import {CurrentUserService} from "../../modules/currentUser/current-user.service";

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.scss']
})
export class FriendComponent implements OnInit {
  person: Person = new Person("", "", "", "", "", "", "", "", 0, "",new Date(),new Date())
  AuthUser: CurrentUser = this.currentUser.getAuthUser()
  selectedEmail: string = this.router.snapshot.params.email

  button = {
    styles: {

    },
    text: 'Add'
  }

  constructor(
    public friendService: FriendService,
    public currentUser: CurrentUserService,
    private router: ActivatedRoute,
    private home: Router) {
  }

  ngOnInit() {
    this.getFriends().then((data) => {
      this.person = data.find((person: Person) => person.email === this.selectedEmail)
    })
  }

  async getFriends() {
    return await this.friendService.getNewPersons()
  }

  rmPerson(id: string) {
    this.friendService.deleteFriend(id).subscribe((data => JSON.stringify(data)))
    this.home.navigate(['/']);
  }

  async requestFriend(email: string | undefined) {
    console.log(email)
    await this.friendService.requestFriend(email, this.AuthUser).subscribe((data => JSON.stringify(data)))
  }
}
