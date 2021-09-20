import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Person} from "../../modules/person/person";

@Injectable({
  providedIn: 'root'
})
export class AddFriendService {
  public url: string = "http://localhost:8080/addPerson";

  constructor(private http: HttpClient) {
  }

  addFriend(x: Person) {
    return this.http.post(this.url, x)
  }

  editFriend(x: Person) {
    this.url = `http://localhost:8080/allPersons/${x}`;
    return this.http.put(this.url, x)
  }
}
