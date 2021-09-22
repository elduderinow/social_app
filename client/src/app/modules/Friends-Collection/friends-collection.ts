export class FriendsCollection {
  email:string | undefined;
  friends:Array<string>;
  pending_req:Array<string>;
  pending_res:Array<string>;

  constructor(email: string | undefined, friends: Array<string>, pending_req: Array<string>, pending_res: Array<string>) {
    this.email = email;
    this.friends = friends;
    this.pending_req = pending_req;
    this.pending_res = pending_res;
  }
}
