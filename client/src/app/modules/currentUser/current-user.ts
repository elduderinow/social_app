export class CurrentUser {
  email: string | undefined
  id: string | undefined
  updated_at: string | undefined

  constructor(email: string, id: string, updated_at: string) {
    this.email = email;
    this.id = id;
    this.updated_at = updated_at;
  }
}
