import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Person} from "../../modules/person/person";

@Injectable({
  providedIn: 'root'
})
export class FriendService {
  private http: HttpClient;
  public url : string = "http://localhost:8080/";

  constructor(http: HttpClient) {
    this.http = http;
  }

  deleteFriend(id: string) {
    return this.http.delete(this.url + `delete/${id}`)
  }

  public async getFriends() {
    let data = await fetch(this.url + `allFriends`);
    return await data.json();
  }
}
