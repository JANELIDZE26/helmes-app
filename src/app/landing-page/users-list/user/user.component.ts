import {Component, Input, OnInit} from '@angular/core';
import {User} from '../User.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @Input() user: User;
  @Input() reposArray;

  constructor() {

  }

  ngOnInit(): void {
    this.reposArray.sort((a, b) => {
      return a.length - b.length;
    });
  }

}
