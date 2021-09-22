import {Component, OnInit} from '@angular/core';
import {Person} from "../../modules/person/person";
import {ActivatedRoute, Router} from "@angular/router";
import {CurrentUser} from "../../modules/currentUser/current-user";
import {CurrentUserService} from "../../modules/currentUser/current-user.service";
import {FriendService} from "../friend/friend.service";
import {FriendsCollectionService} from "../../modules/Friends-Collection/friends-collection.service";
import {FriendsCollection} from "../../modules/Friends-Collection/friends-collection";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  allPersons: Person[] = []
  AuthUser: CurrentUser = new CurrentUser("", "", "",[],[],[])
  person: Person = new Person("", "", "", "", "", "", "", "", 0, "",new Date(),new Date())
  friendsCollection: FriendsCollection | undefined;

  constructor(
    public friendsCollectionService: FriendsCollectionService,
    public friendService: FriendService,
    public currentUser: CurrentUserService,
    private router: ActivatedRoute,
    private home: Router) {
  }

  ngOnInit() {
    this.AuthUser = this.currentUser.getAuthUser()

    this.getFriends().then((persons) => {
      this.person = persons.find((person: Person) => person.email === this.AuthUser.email)

      //if the person does not exist, navigate to edit page + create new friends collection db entry.
      if (this.person === undefined) {
        this.getUser().then((data) => {
          this.friendsCollectionService.addFriendCol(data).subscribe((data => JSON.stringify(data)))
        })
        this.home.navigate(['/edit', this.AuthUser.email]);
      }
    })
  }

  async getUser() {
    return this.friendsCollection = new FriendsCollection(this.AuthUser.email, [], [], [])
  }

  async getFriends() {
    return this.allPersons = await this.friendService.getFriends()
  }

  testbutton() {
    console.log('testbutton')
    console.log(this.person)
  }

  deleteEmpty() {
    let email = "someemail"
    this.friendsCollectionService.deleteFriendCol(email).subscribe((data => JSON.stringify(data)))
  }
}
