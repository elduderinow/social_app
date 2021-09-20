import {Injectable} from '@angular/core';
import {FriendsCollection} from "./friends-collection";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FriendsCollectionService {
  public url: string = 'http://localhost:8080/addFriendCollection';

  constructor(private http: HttpClient) {
  }

  addFriendCol(friend: FriendsCollection) {
    console.log(this.url) //this is getting logged
    return this.http.post(this.url, friend) //this doesnt get send to the server.. or the server does not log anything..
  }
}
