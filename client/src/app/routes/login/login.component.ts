import {Component, OnInit} from '@angular/core';
import {AuthService} from '@auth0/auth0-angular';
import {Person} from "../../modules/person/person";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  allPersons: Person[] = []

  constructor(public auth: AuthService,private router :ActivatedRoute, private home: Router) {
  }

  currentUser: any = {
  }

  ngOnInit(): void {
    this.auth.user$.subscribe(data => this.currentUser = data);
  }

  login() {
    this.auth.loginWithRedirect({
      appState: { target: '/overview'}
    })
  }

  onClick() {
    const result = this.allPersons.find(friend => friend.email === this.currentUser.email)
    let url:string;
    if(result === undefined) {
      url = '/edit'
    } else {
      url = '/'
    }

    // this.home.navigate(['/edit']);

    console.log(this.currentUser, this.allPersons, result, url)
    //console.log(this.currentUser.email)
  }



}
