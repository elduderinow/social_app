import {Injectable} from '@angular/core';
import {FriendsCollection} from "./friends-collection";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FriendsCollectionService {
  public url: string = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  addFriendCol(friend: FriendsCollection) {
    return this.http.post(this.url + '/addFriendCollection', friend)
  }

  getFriendCol(email:string) {
    return this.http.get(`${this.url}/getFriendCollection`)
  }

  deleteFriendCol(email:string) {
    return this.http.delete(this.url + `/deleteFriend/${email}`)
  }
}
