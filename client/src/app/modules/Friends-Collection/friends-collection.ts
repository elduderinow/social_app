export class FriendsCollection {
  email:string | undefined;
  friends:any[];
  pending:any[];

  constructor(email: string | undefined, friends: any[], pending: any[]) {
    this.email = email;
    this.friends = friends;
    this.pending = pending;
  }
}
