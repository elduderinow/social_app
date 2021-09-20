export class FriendsCollection {
  email:string | undefined;
  friends:any[];
  pending_req:any[];
  pending_res:any[];

  constructor(email: string | undefined, friends: any[], pending_req: any[], pending_res: any[]) {
    this.email = email;
    this.friends = friends;
    this.pending_req = pending_req;
    this.pending_res = pending_res;
  }
}
