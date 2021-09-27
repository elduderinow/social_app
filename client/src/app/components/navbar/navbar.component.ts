import { Component, OnInit } from '@angular/core';
import {AuthService} from '@auth0/auth0-angular';
import {CurrentUser} from "../../modules/currentUser/current-user";
import {CurrentUserService} from "../../modules/currentUser/current-user.service";
import {FriendService} from "../../routes/friend/friend.service";
import {Person} from "../../modules/person/person";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  AuthUser: CurrentUser = new CurrentUser("", "", "",[],[],[])
  allFriends: Person[] | any = []
  isUser: Person | any


  button = {
    styles: {
      float: 'right',
      marginLeft:'1rem'
    },
    text: 'Logout'
  }

  constructor(
    public auth: AuthService,
    public currentUser: CurrentUserService,
    public friendService: FriendService
    ) { }

  ngOnInit(): void {
    this.AuthUser = this.currentUser.getAuthUser()
    this.getFriends(this.AuthUser.email).then((friends)=>{
      this.allFriends = friends
     this.checkUser().then(user => this.isUser = user)
    })

  }

  async getFriends(email:string | undefined){
    return await this.friendService.getFriends(email)
  }

  async checkUser(){
     return await this.allFriends.find((person: Person) => person.email === this.AuthUser.email)
  }
}
