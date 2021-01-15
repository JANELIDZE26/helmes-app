import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../api/api.service';

import {User} from './user.model';
import {HttpClient} from '@angular/common/http';
import {faThLarge, faThList} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  userArr: User[] = [];
  isLoading = false;
  listIcon = faThList;
  gridIcon = faThLarge;
  listView = true;
  gridView = false;

  constructor(private http: HttpClient, private api: ApiService) {
  }

  ngOnInit(): void {
    this.isLoading = true;

    this.api.fetchUsers().subscribe(
      (res) => {

        this.isLoading = false;
        for (const user of res) {
          this.api.getRepos(user.repos_url).subscribe(
            (repos) => {
              console.log([...repos]);
              if (repos.length !== 0) {
                this.userArr
                  .push(new User(user.avatar_url, user.login, user.type, user.id, [...repos], user.html_url, user.organizations_url));
              }
            }
          );
        }
        this.api.setUsers(this.userArr);
        localStorage.setItem('users', JSON.stringify(this.userArr));
      },
      (err) => {
        this.isLoading = false;
        alert(err);
      }
    );

  }

  changeToGrid(): void {
    this.listView = false;
    this.gridView = true;
  }

  changeToList(): void {
    this.listView = true;
    this.gridView = false;
  }

}


