import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Person} from "../../modules/person/person";

@Injectable({
  providedIn: 'root'
})
export class AddFriendService {
  private http: HttpClient;
  public url: string = "http://localhost:8080/addFriend";

  constructor(http: HttpClient) {
    this.http = http;
  }

  addFriend(x: Person) {
    return this.http.post(this.url, x)
  }

  editFriend(x: Person) {
    this.url = `http://localhost:8080/allFriends/${x}`;
    return this.http.put(this.url, x)
  }
}
