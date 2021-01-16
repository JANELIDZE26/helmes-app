import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../landing-page/users-list/user.model';
import { map, mergeAll, mergeMap, tap, toArray } from 'rxjs/operators';

export interface Repos {
  name: string;
  html_url: string;
}

interface Organization {
  login: string;
  avatar_url: string;
  url: string;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  users$ = new BehaviorSubject<User[]>([]);
  usersArr: User[];
  url = ' https://api.github.com/users';

  constructor(private http: HttpClient) {}

  fetchData(): Observable<User[]> {
    return this.http.get<User[]>(this.url).pipe(
      tap(console.log),
      mergeAll(),
      mergeMap((user: User) => this.getUsers(user)),
      toArray()
    );
  }

  getUsers(user: User): Observable<User> {
    return this.getRepos(user.repos_url).pipe(
      map(
        (repos: Repos[]) =>
          new User(
            user.avatar_url,
            user.html_url,
            user.organizations_url,
            user.login,
            user.type,
            user.id,
            repos
          )
      )
    );
  }

  getUser(name: string): Observable<User> {
    return this.http.get<User>(`https://api.github.com/users/${name}`);
  }

  getRepos(url): Observable<Repos[]> {
    return this.http.get<Repos[]>(url).pipe(
      map((repos: Repos[]) =>
        repos
          .map(
            (repo: Repos): Repos => ({
              name: repo.name,
              html_url: repo.html_url,
            })
          )
          .slice(0, 3)
      )
    );
  }

  getOrganizations(url: string): Observable<Organization[]> {
    return this.http
      .get<Organization[]>(url)
      .pipe(map((org: Organization[]) => org.slice(0, 3)));
  }

  getOrganizationProfiles(url): Observable<any> {
    return this.http.get(url);
  }
}
