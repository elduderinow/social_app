import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CurrentUser} from "../../modules/currentUser/current-user";

@Injectable({
  providedIn: 'root'
})
export class FriendService {
  private http: HttpClient;
  public url: string = "http://localhost:8080";

  constructor(http: HttpClient) {
    this.http = http;
  }

  deleteFriend(id: string) {
    return this.http.delete(this.url + `/delete/${id}`)
  }

  public async getPersons() {
    let data = await fetch(this.url + `/allPersons`);
    return await data.json();
  }

  public async getFriends(email: string | undefined) {
    let data = await fetch(this.url + `/allPersons/friends/${email}`);
    console.log(data)
    return await data.json();
  }

  requestFriend(res_email: string | undefined, req_email: CurrentUser) {
    let request = {
      req_email: req_email.email,
      res_email: res_email,
      requested_on: new Date()
    }
    //console.log('user ' + req_email + ' wants to be friends with ' + res_email.email)
    console.log(request)
    return this.http.put(`${this.url}/allFriends`, request)
  }
}
