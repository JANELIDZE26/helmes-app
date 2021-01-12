import {Component, OnInit} from '@angular/core';
import {ConnectApiService} from '../../shared/connect-api/connect-api.service';
import {User} from './User.model';
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

  constructor(private http: HttpClient, private connect: ConnectApiService) {
  }

  ngOnInit(): void {
    this.isLoading = true;

    this.connect.fetchUsers().subscribe(
      (res) => {

        this.isLoading = false;
        for (const user of res) {
          this.connect.getRepos(user.repos_url).subscribe(
            (repos) => {
              console.log([...repos]);
              if (repos.length !== 0) {
                this.userArr
                  .push(new User(user.avatar_url, user.login, user.type, user.id, [...repos], user.html_url, user.organizations_url));
              }
            }
          );
        }
        this.connect.setUsers(this.userArr);
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


