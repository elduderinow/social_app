import {Component, OnInit} from '@angular/core';
import {NotificationsService} from "./notifications.service";
import {CurrentUserService} from "../../modules/currentUser/current-user.service";
import {CurrentUser} from "../../modules/currentUser/current-user";
import {Person} from "../../modules/person/person";

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  AuthUser: CurrentUser = new CurrentUser("", "", "", [], [], [])
  allPersons: Person[] = []

  constructor(
    public notificationsService: NotificationsService,
    public currentUser: CurrentUserService
  ) {
  }

  ngOnInit() {
    this.AuthUser = this.currentUser.getAuthUser()
    this.notificationsService.getFriendColl(this.AuthUser.email).then((res) => {
      this.getReqPersons(res)
      this.populateAuthUser(res)
    })
  }

  getReqPersons(res: Array<CurrentUser>) {
    res[0].pending_req.forEach((array: object) => {
      //console.log(array)
    })
  }

  populateAuthUser(res: Array<CurrentUser>) {
    this.AuthUser.friends = res[0].friends
    this.AuthUser.pending_req = res[0].pending_req
    this.AuthUser.pending_res = res[0].pending_res

    //console.log(this.AuthUser)

    this.AuthUser.pending_req.forEach((arr) => {
      //console.log(arr[0])
    })
  }

}
