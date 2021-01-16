import { Repos } from '../../api/api.service';

export class User {
  constructor(
    public avatar_url: string,
    public html_url: string,
    public organizations_url: string,
    public login: string,
    public type: string,
    public id: string,
    public reposArray?: Repos[],
    public repos_url?: string
  ) {}
}
