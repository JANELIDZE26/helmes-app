import { Component, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { User } from '../users-list/user.model';
import { ApiService } from '../../api/api.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.css'],
})
export class SearchUserComponent implements OnInit {
  icon = faSearch;
  lastSearches: User[] = [];
  searched = false;
  user: User;

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit(): void {
    if (localStorage.getItem('lastSearches')) {
      this.lastSearches = JSON.parse(localStorage.getItem('lastSearches'));
    }
  }

  onSearch(name, form): void {
    this.user = null;

    this.api.getUser(name).subscribe(
      (user) => {
        this.user = user;
        if (this.user) {
          this.lastSearches.push(this.user);
          if (this.lastSearches.length > 3) {
            this.lastSearches.shift();
          }
          this.router.navigateByUrl(this.user.login);
          form.reset();
          localStorage.setItem(
            'lastSearches',
            JSON.stringify(this.lastSearches)
          );
        }
      },
      (err) => (this.searched = true),
      () => (this.searched = true)
    );
  }
}
