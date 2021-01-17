import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api/api.service';

import { User } from './user.model';
import { HttpClient } from '@angular/common/http';
import { faThLarge, faThList } from '@fortawesome/free-solid-svg-icons';

enum ViewMode {
  Grid,
  List,
}

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent implements OnInit {
  userArr: User[] = [];
  isLoading = false;
  listIcon = faThList;
  gridIcon = faThLarge;
  viewMode = ViewMode.List;

  constructor(private http: HttpClient, private api: ApiService) {}

  get isList(): boolean {
    return ViewMode.List === this.viewMode;
  }

  get isGrid(): boolean {
    return ViewMode.Grid === this.viewMode;
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.api.getUsers().subscribe(
      (users: User[]) => {
        this.userArr = users;
      },
      console.log,
      () => (this.isLoading = false)
    );
  }

  changeToGrid(): void {
    this.viewMode = ViewMode.Grid;
  }

  changeToList(): void {
    this.viewMode = ViewMode.List;
  }
}
