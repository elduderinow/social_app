export class Person {
  fname: string;
  lname: string;
  email: string | undefined;
  phone: string;

  language: string;
  chicken: string;
  biography: string;

  picture: string;
  age: number;

  _id: string;
  created_on: Date;
  edited_on: Date;

  constructor(
    fname: string,
    lname: string,
    email: string,
    phone: string,
    language: string,
    chicken: string,
    biography: string,
    picture: string,
    age: number,
    _id: string,
    created_on: Date,
    edited_on: Date)
  {
    this.fname = fname;
    this.lname = lname;
    this.email = email;
    this.phone = phone;

    this.language = language;
    this.chicken = chicken;
    this.biography = biography;

    this.age = age;
    this.picture = picture;

    this._id = _id;

    this.created_on = created_on;
    this.edited_on = edited_on;

  }
}
