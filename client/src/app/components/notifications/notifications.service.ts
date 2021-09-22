import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  public url: string = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  public async getFriendColl(email: string | undefined) {
    let data = await fetch(`${this.url}/FriendCOll/${email}`);
    return data.json();
  }
}
