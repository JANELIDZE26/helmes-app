import {Component, OnInit} from '@angular/core';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {User} from '../users-list/user.model';
import {ApiService} from '../../services/api/api.service';

import {Router} from '@angular/router';
import {LocalStorageService} from '../../services/local-storage/local-storage.service';

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

  constructor(
    private api: ApiService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {
  }

  ngOnInit(): void {
    if (this.localStorageService.getItem('lastSearches')) {
      this.lastSearches = this.localStorageService.getItem('lastSearches');
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
          this.localStorageService.setItem('lastSearches', this.lastSearches);
        }
      },
      (err) => (this.searched = true),
      () => (this.searched = true)
    );
  }
}
