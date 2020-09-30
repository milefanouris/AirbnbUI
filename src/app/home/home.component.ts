import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {SearchResidenceByIdDto, SearchResidenceDto, UserUtilsDto} from '../domain/airbnb-service';
import {AuthenticationService} from '../services';
import {Data} from '../domain/Data';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  private SIGNIN_ROUTE = ['/signIn'];
  private SEARCH_ROUTE = ['/search'];
  arrivalDate: any;
  departureDate: any;
  @ViewChild('search_addr') searchAddr: ElementRef;
  @ViewChild('visitors') visitors: ElementRef;
  @ViewChild('from_date') fromDate: ElementRef;
  @ViewChild('to_date') toDate: ElementRef;
  username: any;
  residences: any;
  hasResults: boolean;


  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private data: Data) {
    this.loadScript();
    this.hasResults = false;
    if (this.authenticationService.currentUser != null) {
      this.username = this.authenticationService.currentUser.username;
      console.log(this.authenticationService.currentUser);
    } else {
      this.username = 'guest';
    }
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


  ngOnInit(): void {

    if (this.username !== 'guest') {
      let userUtilsDto = new UserUtilsDto();
      userUtilsDto.username = this.username;
      this.authenticationService.getRecommendedListings(userUtilsDto).subscribe(
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
  }

  onClick($event: any) {
    this.router.navigate(this.SIGNIN_ROUTE);
  }

  search($event: any) {
    const searchResidence = new SearchResidenceDto();
    searchResidence.arrivalDate = this.fromDate.nativeElement.value;
    searchResidence.departureDate = this.toDate.nativeElement.value;
    searchResidence.location = this.searchAddr.nativeElement.value;
    searchResidence.capacity = this.visitors.nativeElement.value;
    searchResidence.username = this.username;
    searchResidence.elevator = 0;
    searchResidence.wifi = 0;
    searchResidence.kitchen = 0;
    searchResidence.parking = 0;
    searchResidence.heating = 0;
    console.log(searchResidence);
    this.data.storage = searchResidence;
    this.router.navigate(this.SEARCH_ROUTE);
  }

  residenceDetails(residenceId: any) {
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
}
