import {Component, OnInit} from '@angular/core';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {User} from '../users-list/User.model';
import {ConnectApiService} from '../../shared/connect-api/connect-api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.css']
})
export class SearchUserComponent implements OnInit {
  icon = faSearch;
  users: User[] = [];
  lastSearches: User[] = [];
  exists = false;
  clicked = false;
  user: User;

  constructor(private connect: ConnectApiService, private router: Router) {
  }

  ngOnInit(): void {
    this.connect.users.subscribe(
      (users) => {
        this.users = users;
      }
    );

    // this.users = this.connect.getUsers();

    if (localStorage.getItem('lastSearches')) {
      this.lastSearches = JSON.parse(localStorage.getItem('lastSearches'));
    }
  }

  onSearch(name, form): void {
    this.clicked = true;

    for (const user of this.users) {
      if (user.userName === name) {
        this.exists = true;
        this.user = user;
        break;
      }
    }

    if (this.exists) {
      this.lastSearches.push(this.user);
      if (this.lastSearches.length > 3) {
        this.lastSearches.shift();
      }
      // this.lastSearches.sort((a, b) => {
      //   return a.length - b.length;
      // });
      localStorage.setItem('lastSearches', JSON.stringify(this.lastSearches));
      this.router.navigate([this.user.userName]);

      form.reset();
    }

  }

}
