import {Component, Input, OnInit} from '@angular/core';
import {FriendsCollectionService} from "../../../modules/Friends-Collection/friends-collection.service";

@Component({
  selector: 'app-alert-requested',
  templateUrl: './alert-requested.component.html',
  styleUrls: ['./alert-requested.component.scss']
})
export class AlertRequestedComponent implements OnInit {
  @Input() request: any;

  constructor(public friendsCollectionService: FriendsCollectionService) { }

  ngOnInit(): void {
  }

  editFriend(email:string){
    this.friendsCollectionService.editFriendCol(email).subscribe((data => JSON.stringify(data)))
  }

  declineFriend(email:string){
    console.log('friend declined with email '+email)
  }

}
