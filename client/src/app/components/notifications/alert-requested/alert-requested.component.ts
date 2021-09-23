import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-alert-requested',
  templateUrl: './alert-requested.component.html',
  styleUrls: ['./alert-requested.component.scss']
})
export class AlertRequestedComponent implements OnInit {
  @Input() request: any;
  constructor() { }

  ngOnInit(): void {
  }

  addFriend(email:string){
    console.log('friend added with email '+email)
  }

  declineFriend(email:string){
    console.log('friend declined with email '+email)
  }

}
