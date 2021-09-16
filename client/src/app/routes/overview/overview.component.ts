import {Component, OnInit} from '@angular/core';
import {Person} from "../../modules/person/person";
import {ActivatedRoute, Router} from "@angular/router";
import {CurrentUser} from "../../modules/currentUser/current-user";
import {CurrentUserService} from "../../modules/currentUser/current-user.service";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  allPersons: Person[] = []
  AuthUser: CurrentUser = this.currentUser.getAuthUser()
  person: any = {}

  constructor(
    public currentUser: CurrentUserService,
    private router: ActivatedRoute,
    private home: Router) {
  }

  ngOnInit() {
    return this.getFriends("http://localhost:8080/allFriends")
  }

  public async getFriends(url: string) {
    let data = await fetch(url);
    this.allPersons = await data.json();

    //this.allPersons.find((person: Person) => {
    //  console.log(person)
    //  if (person === undefined) {
    //    console.log('this person is undefined')
    //  } if(person.email === this.AuthUser.email) {
    //    this.person = person
    //  }
    //});

    this.person = this.allPersons.find((person:Person) => person.email === this.AuthUser.email)
    if (this.person === undefined) {
      await this.home.navigate(['/edit', this.AuthUser.email]);
    }
  }
}
