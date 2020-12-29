export class User {
  constructor(
    public avatarUrl: string,
    public userName: string,
    public userType: string,
    public id: string,
    public reposArray: string[],
    public userProfileURL: string,
    public organizationsURL: string,
  ) {
  }
}
