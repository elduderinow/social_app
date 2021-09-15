import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { FriendService} from "./friend.service";
import {AuthService} from "@auth0/auth0-angular";
import {CurrentUser} from "../../modules/currentUser/current-user";

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.scss']
})
export class FriendComponent implements OnInit {
  private friendservice : FriendService;
  friend:any;
  AuthUser: CurrentUser = new CurrentUser("", "", "")
  selectedEmail:string = this.router.snapshot.params.email

  constructor(public auth: AuthService,private router :ActivatedRoute, private home: Router, friendservice: FriendService) {
    this.friendservice = friendservice;
  }

  ngOnInit() {
    this.getAuth()
    return this.getFriends("http://localhost:8080/allFriends")
  }

  public async getFriends(url: string) {
    let data = await fetch(url);
    this.friend = await data.json();
    this.friend = this.friend.find((person:any) => person.email === this.selectedEmail)
  }

  rmPerson(id:string){
    this.friendservice.deleteFriend(id).subscribe((data => JSON.stringify(data)))
    this.home.navigate(['/']);
  }

  getAuth() {
    this.auth.user$.subscribe(data => {
      this.AuthUser.email = data?.email
      this.AuthUser.id = data?.sub
      this.AuthUser.updated_at = data?.updated_at
    });

  }

}
