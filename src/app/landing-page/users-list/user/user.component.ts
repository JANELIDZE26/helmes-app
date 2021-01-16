import {Component, Input, OnInit} from '@angular/core';
import {User} from '../user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @Input() user: User;
  @Input() repos;
  @Input() viewMode;
  constructor() {

  }

  ngOnInit(): void {
    this.repos.sort((a, b) => {
      return a.length - b.length;
    });
  }

}
