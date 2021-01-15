import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {User} from '../landing-page/users-list/user.model';
import {map} from 'rxjs/operators';

export interface Repo {
  name: string;
  url: string;
}

interface FetchRepos {
  name: string;
  html_url: string;
}

interface OrganizationData {
  login: string;
  avatar_url: string;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  users = new Subject<User[]>();
  usersArr: User[];

  constructor(private http: HttpClient) {
  }

  fetchUsers(): Observable<any> {
    return this.http.get(' https://api.github.com/users');
  }

  getRepos(url): Observable<Array<Repo>> {
    return this.http.get <Array<FetchRepos>>(url).pipe(map(repos => {
        return repos.map((repo: FetchRepos): Repo => ({
          name: repo.name,
          url: repo.html_url
        })).slice(0, 3);
      }
    ));
  }

  setUsers(users: User[]): void {
    this.users.next(users);
    this.usersArr = users;
  }

  getUsers(): User[] {
    return this.usersArr;
  }

  getOrganizations(url: string): Observable<Array<any>> {
    return this.http.get<Array<OrganizationData>>(url).pipe(map(org => org.slice(0, 3)));
  }

  getOrganizationProfiles(url): Observable<any> {
    return this.http.get(url);
  }

}
