import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services';
import {Data} from '../domain/Data';
import {SearchResidenceByIdDto} from '../domain/airbnb-service';

@Component({
  selector: 'app-show-listings',
  templateUrl: './show-listings.component.html',
  styleUrls: ['./show-listings.component.css']
})
export class ShowListingsComponent implements OnInit {
  residences: any;
  page: any;
  pageSize: any;
  hasResults: any;

  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private data: Data) {
    this.loadScript();
    this.page = 1;
    this.pageSize = 10;
    this.hasResults = false;
  }

  ngOnInit(): void {
    console.log(JSON.stringify(this.data.storage));
    this.authenticationService.searchForResidences(this.data.storage).subscribe(
      residenceResultSet => {
        console.log(residenceResultSet);
        this.residences = residenceResultSet;
        if (this.residences.length > 0) {
          this.hasResults = true;
        }
      },
      error => {
      });
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

  residenceDetails(residenceId: number) {
    let search = new SearchResidenceByIdDto();
    search.residenceId = residenceId;
    this.authenticationService.getResidenceById(search).subscribe(
      residence => {
        console.log(residence);
        this.data.storage = residence;
        this.router.navigate(['/listing-single']);
      },
      error => {
      });

  }

  editResidence(residenceId: any) {
    let search = new SearchResidenceByIdDto();
    search.residenceId = residenceId;
    this.authenticationService.getResidenceById(search).subscribe(
      residence => {
        console.log(residence);
        this.data.storage = residence;
        this.router.navigate(['/add-listing']);
      },
      error => {
      });
  }
}
