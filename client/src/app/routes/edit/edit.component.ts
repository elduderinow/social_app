import {Component, OnInit} from '@angular/core';
import {Person} from "../../modules/person";
import {AddFriendService} from "./add-friend.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
  export class EditComponent implements OnInit {
  private addFriendService: AddFriendService;
  friend:any;
  selectedId:any = this.router.snapshot.params

  title: string = 'Angular Friends';
  person: Person = new Person("", "", "", "", "", "", "", "", 0, "");

  constructor(private router :ActivatedRoute, addFriendService: AddFriendService, private home: Router) {
    this.addFriendService = addFriendService;
  }

  ngOnInit() {
    if (this.selectedId.id !== undefined) {
      return this.getFriends("http://localhost:8080/allFriends")
    } else {
      return
    }
  }

  onClick() {
    if (this.selectedId.id !== undefined) {
      this.addFriendService.editFriend(this.person)
    } else {
      this.addFriendService.addFriend(this.person).subscribe((data => JSON.stringify(data)))
    }

    this.home.navigate(['/']);
  }


  public async getFriends(url: string) {
    let data = await fetch(url);
    this.friend = await data.json();
    this.person = this.friend.find((person:any) => person._id === this.selectedId.id)
  }

}
