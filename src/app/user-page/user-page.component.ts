import {Component, OnInit} from '@angular/core';
import {ApiService} from '../api/api.service';
import {User} from '../landing-page/users-list/user.model';
import {ActivatedRoute} from '@angular/router';
import {faLongArrowAltLeft} from '@fortawesome/free-solid-svg-icons';
import {Organization} from './organization.model';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})

export class UserPageComponent implements OnInit {
  users: User[] = [];
  user: User = null;
  organizations: Organization[] = [];

  noOrgs = false;
  backIcon = faLongArrowAltLeft;
  isLoading = false;
  loaded = false;

  constructor(private api: ApiService, private router: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.users = this.api.getUsers();
    const name = this.router.snapshot.params.name;
    for (const user of this.users) {
      if (user.userName === name) {
        this.user = user;
      }
    }

    this.api.getOrganizations(this.user.organizationsURL).subscribe(
      (orgs) => {
        this.isLoading = false;
        if (orgs.length > 0) {

          for (const organization of orgs) {
            this.api.getOrganizationProfiles(organization.url).subscribe(
              (orgData) => {
                this.organizations.push(new Organization(organization.login, organization.avatar_url, orgData.html_url));
              }
            );
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
