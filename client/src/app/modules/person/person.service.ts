import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Person} from "./person";

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private http: HttpClient;
  public url : string = "http://localhost:9000/addPerson";

  constructor(http: HttpClient) {
    this.http = http;
  }

  //this will bind the users input as an object and post this to the desired server.
  addFriend(x: Person) {
    return this.http.post(this.url, x)
  }

}
