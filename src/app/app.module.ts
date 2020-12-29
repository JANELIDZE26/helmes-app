import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {UserComponent} from './landing-page/users-list/user/user.component';
import {UsersListComponent} from './landing-page/users-list/users-list.component';
import { SearchUserComponent } from './landing-page/search-user/search-user.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {FormsModule} from '@angular/forms';
import { UserPageComponent } from './user-page/user-page.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    UsersListComponent,
    SearchUserComponent,
    UserPageComponent,
    LandingPageComponent,
    SpinnerComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FontAwesomeModule,
        FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
