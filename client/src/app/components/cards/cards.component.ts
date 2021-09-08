import { Component, OnInit, Input } from '@angular/core';
import {Person} from "../../modules/person";

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {

  @Input() person: any;

  constructor() { }

  ngOnInit(): void {

  }

}
