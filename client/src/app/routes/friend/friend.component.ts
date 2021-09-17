import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { FriendService} from "./friend.service";
import {CurrentUser} from "../../modules/currentUser/current-user";
import {Person} from "../../modules/person/person";
import {CurrentUserService} from "../../modules/currentUser/current-user.service";

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.scss']
})
export class FriendComponent implements OnInit {

  friend:any;
  AuthUser: CurrentUser = this.currentUser.getAuthUser()
  selectedEmail:string = this.router.snapshot.params.email

  constructor(
    public currentUser: CurrentUserService,
    private router :ActivatedRoute,
    private home: Router,
    private friendservice : FriendService) {}

  ngOnInit() {
    return this.getFriends("http://localhost:8080/allFriends")
  }

  public async getFriends(url: string) {
    let data = await fetch(url);
    this.friend = await data.json();
    this.friend = this.friend.find((person:Person) => person.email === this.selectedEmail)
  }

  rmPerson(id:string){
    this.friendservice.deleteFriend(id).subscribe((data => JSON.stringify(data)))
    this.home.navigate(['/']);
  }

}
