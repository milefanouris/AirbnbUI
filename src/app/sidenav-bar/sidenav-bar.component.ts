import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services';
import {SearchResidenceDto} from '../domain/airbnb-service';
import {Data} from '../domain/Data';

@Component({
  selector: 'app-sidenav-bar',
  templateUrl: './sidenav-bar.component.html',
  styleUrls: ['./sidenav-bar.component.css']
})
export class SidenavBarComponent implements OnInit {
  private currentUser: any;
  isHost: any;
  isTenant: any;

  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private data: Data) {
  }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.currentUser.roles[0].description);
    if (this.currentUser.roles[0].description === 'HOST') {
      this.isHost = true;
      this.isTenant = false;
    } else {
      this.isHost = false;
      this.isTenant = true;
    }
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/index']);
  }

  myListings() {
    const search = new SearchResidenceDto();
    search.username = this.authenticationService.currentUser.username;
    search.departureDate = null;
    search.arrivalDate = null;
    search.location = 'all';
    search.capacity = -1;
    search.elevator = 0;
    search.wifi = 0;
    search.kitchen = 0;
    search.parking = 0;
    search.heating = 0;
    console.log(search);
    this.data.storage = search;
    this.router.navigate(['/listings']);
  }
}
