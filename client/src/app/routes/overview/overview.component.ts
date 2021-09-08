import { Component, OnInit } from '@angular/core';
import {Person} from "../../modules/person";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  allPersons: Person[] = []

  constructor() { }

  ngOnInit() {
    return this.getFriends("http://localhost:8080/allFriends")
  }

  public async getFriends(url: string) {
    let data = await fetch(url);
    this.allPersons = await data.json();
  }
}
