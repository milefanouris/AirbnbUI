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
  isHost: any;

  constructor(private router: Router,
              private authenticationService: AuthenticationService) {

    authenticationService.currentUserSubject.subscribe(value => {
      this.isShown = value;
      if (this.authenticationService.currentUser != null) {
        this.username = this.authenticationService.currentUser.username;
      }
    });
    let user = JSON.parse(localStorage.getItem('currentUser'));
    if (this.authenticationService.currentUser.roles[0].description === 'HOST') {
      this.isHost = true;
    } else {
      this.isHost = false;
    }
    if (user != null) {
      this.isShown = true;
      this.username = user.username;
    }


  }

  ngOnInit(): void {
    this.loadScript();
  }

  public loadScript() {
    var isFound = false;
    var scripts = document.getElementsByTagName('script');
    for (var i = 0; i < scripts.length; ++i) {
      if (scripts[i].getAttribute('src') != null && scripts[i].getAttribute('src').includes('loader')) {
        isFound = true;
      }
    }

    if (!isFound) {
      var dynamicScripts = ['../assets/js/scripts.js'];

      for (var i = 0; i < dynamicScripts.length; i++) {
        let node = document.createElement('script');
        node.src = dynamicScripts [i];
        node.type = 'text/javascript';
        node.async = false;
        node.charset = 'utf-8';
        document.getElementsByTagName('head')[0].appendChild(node);
      }

    }
  }



  logOut() {
    this.authenticationService.logout();
    this.router.navigate(['/index']);
  }
}
