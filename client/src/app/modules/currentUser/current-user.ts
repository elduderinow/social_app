export class CurrentUser {
  email: string | undefined
  id: string | undefined
  updated_at: string | undefined
  friends: Array<Array<string>>
  pending_req: Array<Array<object>>
  pending_res: Array<Array<object>>


  constructor(email: string, id: string, updated_at: string, friends:Array<Array<string>>,pending_req:Array<Array<object>>,pending_res:Array<Array<object>>) {
    this.email = email;
    this.id = id;
    this.updated_at = updated_at;
    this.friends = friends;
    this.pending_req = pending_req;
    this.pending_res = pending_res;
  }
}
