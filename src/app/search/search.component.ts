import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {SearchResidenceByIdDto, SearchResidenceDto} from '../domain/airbnb-service';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services';
import {Data} from '../domain/Data';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, AfterViewInit {
  arrivalDate: any;
  departureDate: any;
  residences: any;
  host: any;

  @ViewChild('from_date') fromDate: ElementRef;
  @ViewChild('to_date') toDate: ElementRef;
  @ViewChild('address') address: ElementRef;
  @ViewChild('visitors') visitors: ElementRef;
  @ViewChild('wifi') wifi: ElementRef;
  @ViewChild('kitchen') kitchen: ElementRef;
  @ViewChild('heating') heating: ElementRef;
  @ViewChild('parking') parking: ElementRef;
  @ViewChild('elevator') elevator: ElementRef;
  page: any;
  pageSize: any;
  hasResults: any;
  private username: any;

  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private data: Data) {
    this.loadScript();
    this.page = 1;
    this.pageSize = 10;
    this.hasResults = false;
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

  ngAfterViewInit() {

    if (this.authenticationService.currentUser != null) {
      this.username = this.authenticationService.currentUser.username;
      console.log(this.authenticationService.currentUser);
    } else {
      this.username = 'guest';
    }

    this.fromDate.nativeElement.value = this.data.storage.arrivalDate;
    this.toDate.nativeElement.value = this.data.storage.departureDate;
    this.address.nativeElement.value = this.data.storage.location;
    this.visitors.nativeElement.value = this.data.storage.capacity;

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

  ngOnInit(): void {


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

  update() {
    const searchResidence = new SearchResidenceDto();
    searchResidence.arrivalDate = this.fromDate.nativeElement.value;
    searchResidence.departureDate = this.toDate.nativeElement.value;
    searchResidence.location = this.address.nativeElement.value;
    searchResidence.capacity = this.visitors.nativeElement.value;
    searchResidence.username = this.username;
    if (this.kitchen.nativeElement.checked) {
      searchResidence.kitchen = 1;
    } else {
      searchResidence.kitchen = 0;
    }

    if (this.heating.nativeElement.checked) {
      searchResidence.heating = 1;
    } else {
      searchResidence.heating = 0;
    }
    if (this.parking.nativeElement.checked) {
      searchResidence.parking = 1;
    } else {
      searchResidence.parking = 0;
    }
    if (this.elevator.nativeElement.checked) {
      searchResidence.elevator = 1;
    } else {
      searchResidence.elevator = 0;
    }
    if (this.wifi.nativeElement.checked) {
      searchResidence.wifi = 1;
    } else {
      searchResidence.wifi = 0;
    }
    this.authenticationService.searchForResidences(searchResidence).subscribe(
      residenceResultSet => {
        console.log(residenceResultSet);
        this.residences = residenceResultSet;
      },
      error => {
      });
  }
}
