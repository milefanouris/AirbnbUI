import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services';
import {Data} from '../domain/Data';
import {ReservationDto, UserUtilsDto} from '../domain/airbnb-service';

declare var ol: any;

@Component({
  selector: 'app-single-listing',
  templateUrl: './single-listing.component.html',
  styleUrls: ['./single-listing.component.css']
})
export class SingleListingComponent implements OnInit {
  numberOfGuests: any;
  numberOfBeds: any;
  numberOfBathrooms: any;
  propertyDescription: any;
  propertyId: any;
  propertySize: any;
  propertyPrice: any;
  username: any;
  propertyCost: any;
  propertyType: any;
  title: any;
  numberOfBedrooms: any;
  arrivalDate: any;
  departureDate: any;
  isUserLoggedIn: any;
  propertyOwner: any;
  latitude: number = 18.5204;
  longitude: number = 73.8567;

  map: any;

  @ViewChild('from_date') fromDate: ElementRef;
  @ViewChild('to_date') toDate: ElementRef;
  @ViewChild('guests') guests: ElementRef;

  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private data: Data) {
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

  ngOnInit(): void {

    if (this.authenticationService.currentUser != null) {
      this.username = this.authenticationService.currentUser.username;
    } else {
      this.username = 'guest';
    }

    let residence = this.data.storage;
    let userUtils = new UserUtilsDto();
    this.isUserLoggedIn = localStorage.getItem('currentUser') != null;
    this.propertyOwner = this.username === residence.username;
    userUtils.username = residence.username;

    let latitude = residence.latitude;
    let longitude = residence.longitude;
    this.map = new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([73.8567, 18.5204]),
        zoom: 8
      })
    });

    this.authenticationService.getUserProfile(userUtils).subscribe(
      userEntity => {
        this.numberOfGuests = residence.capacity;
        this.numberOfBeds = residence.beds;
        this.numberOfBathrooms = residence.bathrooms;
        this.propertyDescription = residence.description;
        this.propertyId = residence.residenceId;
        this.propertySize = residence.size;
        this.propertyPrice = residence.prize;
        this.username = JSON.parse(userEntity).name + ' ' + JSON.parse(userEntity).surname;
        this.propertyCost = residence.prize;
        this.propertyType = residence.type;
        this.title = residence.title;
        this.numberOfBedrooms = residence.bedrooms;

      },
      error => {
        console.log(error);
      });
  }

  makeReservation() {
    let reservationDto = new ReservationDto();
    reservationDto.arrivalDate = this.fromDate.nativeElement.value;
    reservationDto.departureDate = this.toDate.nativeElement.value;
    reservationDto.residenceId = this.data.storage.residenceId;
    reservationDto.username = JSON.parse(localStorage.getItem('currentUser')).username;

    this.authenticationService.makeReservation(reservationDto).subscribe(
      data => {
        this.router.navigate(['/index']);
      },
      error => {
        console.log(error);
      });

  }

}
