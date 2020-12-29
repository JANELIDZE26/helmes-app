import {Component, OnInit} from '@angular/core';
import {ConnectApiService} from '../shared/connect-api/connect-api.service';
import {User} from '../landing-page/users-list/User.model';
import {ActivatedRoute} from '@angular/router';
import {faLongArrowAltLeft} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  users: User[] = [];
  user: User = null;
  organizations: Array<{
    name: string,
    avatarURL: string,
    profileURL: string
  }> = [];

  noOrgs = false;
  backIcon = faLongArrowAltLeft;
  isLoading = false;
  loaded = false;

  constructor(private connect: ConnectApiService, private router: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.users = this.connect.getUsers();
    const name = this.router.snapshot.params.name;
    for (const user of this.users) {
      if (user.userName === name) {
        this.user = user;
      }
    }

    this.connect.getOrganizations(this.user.organizationsURL).subscribe(
      (orgs) => {
        this.isLoading = false;
        if (orgs.length > 0) {
          // tslint:disable-next-line:forin
          for (const index in orgs) {
            this.connect.getOrganizationProfiles(orgs[index].url).subscribe(
              (orgData) => {
                this.organizations.push({
                  name: orgs[index].login,
                  avatarURL: orgs[index].avatar_url,
                  profileURL: orgData.html_url
                });
              }
            );
            if (+index === 2) {
              break;
            }

          }
          this.loaded = true;
        } else {
          this.noOrgs = true;
          this.loaded = true;
        }
      }, error => {
        this.isLoading = false;
      }
    );
  }
}
