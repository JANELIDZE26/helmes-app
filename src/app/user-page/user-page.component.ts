import {Component, OnInit} from '@angular/core';
import {ApiService} from '../api/api.service';
import {User} from '../landing-page/users-list/user.model';
import {ActivatedRoute} from '@angular/router';
import {faLongArrowAltLeft} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css'],
})
export class UserPageComponent implements OnInit {
  user: User = null;
  backIcon = faLongArrowAltLeft;
  isLoading = false;

  constructor(private api: ApiService, private router: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.isLoading = true;

    const name = this.router.snapshot.params.name;
    this.api.getUser(name).subscribe(
      (user: User) => this.user = user,
      console.log,
      () => (this.isLoading = false)
    );
  }
}
