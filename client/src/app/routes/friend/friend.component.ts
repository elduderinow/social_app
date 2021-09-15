import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { FriendService} from "./friend.service";

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.scss']
})
export class FriendComponent implements OnInit {
  private friendservice : FriendService;
  friend:any;
  selectedEmail:string = this.router.snapshot.params.email

  constructor(private router :ActivatedRoute, private home: Router, friendservice: FriendService) {
    this.friendservice = friendservice;
  }

  ngOnInit() {
    return this.getFriends("http://localhost:8080/allFriends")
  }

  public async getFriends(url: string) {
    let data = await fetch(url);
    this.friend = await data.json();
    this.friend = this.friend.find((person:any) => person.email === this.selectedEmail)
  }

  rmPerson(id:string){
    console.log(id)
    this.friendservice.deleteFriend(id).subscribe((data => JSON.stringify(data)))
    this.home.navigate(['/']);
  }

}
