import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Person} from "../../modules/person";

@Injectable({
  providedIn: 'root'
})
export class FriendService {
  private http: HttpClient;
  public url : string = "http://localhost:8080/delete";

  constructor(http: HttpClient) {
    this.http = http;
  }

  deleteFriend(id: string) {
    this.url = `http://localhost:8080/delete/${id}`;
    return this.http.delete(this.url)
  }
}
