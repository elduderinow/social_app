import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Person} from "../../modules/person/person";

@Injectable({
  providedIn: 'root'
})
export class FriendService {
  private http: HttpClient;
  public url : string = "http://localhost:8080/";
  private allPersons: Person[];

  constructor(http: HttpClient, allPersons:Person[]) {
    this.http = http;
    this.allPersons = allPersons
  }

  deleteFriend(id: string) {
    return this.http.delete(this.url + `delete/${id}`)
  }

  getFriends() {
    return this.http.get(this.url + `allFriends`)
  }
}
