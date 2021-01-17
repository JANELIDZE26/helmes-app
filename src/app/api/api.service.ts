import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../landing-page/users-list/user.model';
import { map, mergeAll, mergeMap, shareReplay, toArray } from 'rxjs/operators';

export interface Repos {
  name: string;
  html_url: string;
}

export interface Organization {
  login: string;
  avatar_url: string;
  url: string;
  html_url?: string; // for fetching
  htmlUrl?: string; // actual link
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  usersArr: User[];
  url = ' https://api.github.com/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url).pipe(
      mergeAll(),
      mergeMap((user: User) => this.attachRepos(user)),
      toArray(),
      shareReplay(1)
    );
  }

  getUser(name: string): Observable<User> {
    return this.http.get<User>(` https://api.github.com/users/${name}`).pipe(
      mergeMap((user: User) => this.attachRepos(user)),
      mergeMap((user: User) => this.getOrganizations(user))
    );
  }

  attachRepos(user: User): Observable<User> {
    return this.http.get<Repos[]>(user.repos_url).pipe(
      map((repos: Repos[]) => ({
        ...user,
        repos: repos.slice(0, 3),
      })),
      shareReplay(1)
    );
  }

  getOrganizations(user: User): Observable<User> {
    return this.http
      .get(`https://api.github.com/users/${user.login}/orgs`)
      .pipe(
        map((orgs: Organization[]) => orgs.slice(0, 3)),
        mergeAll(),
        mergeMap((org: Organization) => this.getOrganizationProfiles(org)),
        toArray(),
        map((orgs: Organization[]) => ({ ...user, organizations: orgs }))
      );
  }

  getOrganizationProfiles(
    organization: Organization
  ): Observable<Organization> {
    return this.http.get<Organization>(organization.url).pipe(
      map((org: Organization) => ({
        ...organization,
        htmlUrl: org.html_url,
      }))
    );
  }
}
