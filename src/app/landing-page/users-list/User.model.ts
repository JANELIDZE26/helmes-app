import {Repo} from '../../shared/connect-api/connect-api.service';

export class User {
  constructor(
    public avatarUrl: string,
    public userName: string,
    public userType: string,
    public id: string,
    public reposArray: Repo[],
    public userProfileURL: string,
    public organizationsURL: string,
  ) {
  }
}
