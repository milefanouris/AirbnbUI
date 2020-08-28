import {Routes} from '@angular/router';
import {ListingsComponent} from './listings/listings.component';
import {HomeComponent} from './home/home.component';

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
    component: ListingsComponent
  }
];
