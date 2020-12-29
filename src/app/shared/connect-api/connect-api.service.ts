import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {User} from '../../landing-page/users-list/User.model';

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

  getRepos(url): Observable<any> {
    return this.http.get(url);
  }

  setUsers(users: User[]): void {
    this.users.next(users);
    this.usersArr = users;
  }

  getUsers(): User[] {
    return this.usersArr;
  }

  getOrganizations(url: string): Observable<any> {
    return this.http.get(url);
  }

  getOrganizationProfiles(url): Observable<any> {
    return this.http.get(url);
  }

}
