import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isShown: any;
  username: any;

  constructor(private router: Router,
              private authenticationService: AuthenticationService) {

    authenticationService.currentUserSubject.subscribe(value => {
      this.isShown = value;
      if (this.authenticationService.currentUser != null) {
        this.username = this.authenticationService.currentUser.username;
      }
    });
    let user = JSON.parse(localStorage.getItem('currentUser'));
    if (user != null) {
      this.isShown = true;
      this.username = user.username;
    }


  }

  ngOnInit(): void {
  }

}
