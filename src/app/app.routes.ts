import {Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {UserComponent} from './user/user.component';
import {AddListingComponent} from './add-listing/add-listing.component';
import {ShowListingsComponent} from './show-listings/show-listings.component';
import {EditProfileComponent} from './edit-profile/edit-profile.component';
import {SingleListingComponent} from './single-listing/single-listing.component';
import {SearchComponent} from './search/search.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/index',
    pathMatch: 'full'
  },
  {
    path: 'index',
    component: HomeComponent
  },
  {
    path: 'add-listing',
    component: AddListingComponent
  },
  {
    path: 'signIn',
    component: UserComponent
  },
  {
    path: 'search',
    component: SearchComponent
  },
  {
    path: 'editProfile',
    component: EditProfileComponent
  },
  {
    path: 'listings',
    component: ShowListingsComponent
  },
  {
    path: 'listing-single',
    component: SingleListingComponent
  }
];
