import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {User} from '../../landing-page/users-list/User.model';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConnectApiService {
  users = new Subject<User[]>();
  usersArr: User[];

  constructor(private http: HttpClient) {
  }

  fetchUsers(): Observable<any> {
    // https://api.github.com/users/geerlingguy/repos?per_page=100&page=1
    // https://api.github.com/users?fbclid=IwAR0-MinaqPdogPzmQ2wz-mR_jEPZs0AbhNDtLVWB4L-WKKkartkwebLN84g

    return this.http.get(' https://api.github.com/users');

  }

  getRepos(url): Observable<Array<string>> {
    return this.http.get<Array<{ name: string }>>(url).pipe(map(repos => repos.map(repo => repo.name).slice(0, 3)
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
    return this.http.get<Array<{ login: string, avatar_url: string, url: string }>>(url).pipe(map(orgs => orgs.slice(0, 3)));
  }

  getOrganizationProfiles(url): Observable<any> {
    return this.http.get(url);
  }

}
