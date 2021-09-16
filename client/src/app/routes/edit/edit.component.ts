import {Component, OnInit} from '@angular/core';
import {Person} from "../../modules/person/person";
import {AddFriendService} from "./add-friend.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from '@auth0/auth0-angular';
import {CurrentUser} from "../../modules/currentUser/current-user";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  private addFriendService: AddFriendService;
  friend: any;
  selectedId: any = this.router.snapshot.params.email
  title: string = 'Angular Friends';
  AuthUser: CurrentUser = new CurrentUser("", "", "")
  person: Person = new Person("", "", "", "", "", "", "", "", 0, "");

  constructor(public auth: AuthService,private router: ActivatedRoute, addFriendService: AddFriendService, private home: Router) {
    this.addFriendService = addFriendService;
  }

  ngOnInit() {
    this.auth.user$.subscribe(data => {
      this.AuthUser.email = data?.email
      this.AuthUser.id = data?.sub
      this.AuthUser.updated_at = data?.updated_at
    });
    return this.getFriends("http://localhost:8080/allFriends")
  }

  onClick() {
    if (this.person._id === "") {
      this.person.email = this.AuthUser.email
      this.addFriendService.addFriend(this.person).subscribe((data => JSON.stringify(data)))
    } else {
      this.addFriendService.editFriend(this.person).subscribe((data => JSON.stringify(data)))
    }
    this.home.navigate(['/overview']);
  }


  public async getFriends(url: string) {

    let data = await fetch(url);
    this.friend = await data.json();
    let temp = this.friend.find((person: any) => person.email === this.AuthUser.email)

    if (temp !== undefined) {
      this.person = this.friend.find((person: any) => person.email === this.AuthUser.email)
    }
  }


}
