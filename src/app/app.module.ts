import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {AppRoutingModule} from './app-routing.module';
import {FooterComponent} from './footer/footer.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {UserComponent} from './user/user.component';
import {AddListingComponent} from './add-listing/add-listing.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {ShowListingsComponent} from './show-listings/show-listings.component';
import {HeaderComponent} from './header/header.component';
import {EditProfileComponent} from './edit-profile/edit-profile.component';
import { SidenavBarComponent } from './sidenav-bar/sidenav-bar.component';
import {Data} from './domain/Data';
import { SingleListingComponent } from './single-listing/single-listing.component';
import { SearchComponent } from './search/search.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    UserComponent,
    AddListingComponent,
    ShowListingsComponent,
    HeaderComponent,
    EditProfileComponent,
    SidenavBarComponent,
    SingleListingComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    NgbModule
  ],
  providers: [Data],
  bootstrap: [AppComponent]
})
export class AppModule {
}
