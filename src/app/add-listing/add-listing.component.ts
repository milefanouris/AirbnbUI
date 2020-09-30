import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AddResidenceRequestDto, AddResidenceResponseDto} from '../domain/airbnb-service';
import {NavigationExtras, Router} from '@angular/router';
import {AuthenticationService} from '../services';
import {Data} from '../domain/Data';

declare var ol: any;

@Component({
  selector: 'app-add-listing',
  templateUrl: './add-listing.component.html',
  styleUrls: ['./add-listing.component.css']
})
export class AddListingComponent implements OnInit, AfterViewInit {

  arrivalDate: any;
  departureDate: any;
  @ViewChild('country') country: ElementRef;
  @ViewChild('streetName') streetName: ElementRef;
  @ViewChild('buildingNumber') buildingNumber: ElementRef;
  @ViewChild('city') city: ElementRef;
  @ViewChild('state') state: ElementRef;
  @ViewChild('zipCode') zipCode: ElementRef;
  @ViewChild('propertyType') propertyType: ElementRef;
  @ViewChild('guests') guests: ElementRef;
  @ViewChild('bathrooms') bathrooms: ElementRef;
  @ViewChild('propertySize') propertySize: ElementRef;
  @ViewChild('bedrooms') bedrooms: ElementRef;
  @ViewChild('beds') beds: ElementRef;
  @ViewChild('propertyTitle') propertyTitle: ElementRef;
  @ViewChild('propertyDescription') propertyDescription: ElementRef;
  @ViewChild('pricing') pricing: ElementRef;
  @ViewChild('from_date') fromDate: ElementRef;
  @ViewChild('to_date') toDate: ElementRef;
  @ViewChild('wifi') wifi: ElementRef;
  @ViewChild('kitchen') kitchen: ElementRef;
  @ViewChild('heating') heating: ElementRef;
  @ViewChild('parking') parking: ElementRef;
  @ViewChild('elevator') elevator: ElementRef;

  private INDEX_ROUTE = ['/index'];
  add: any;
  latitude: number = 18.5204;
  longitude: number = 73.8567;

  map: any;

  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private data: Data) {
    if (JSON.parse(localStorage.getItem('currentUser')) == null) {
      this.router.navigate(this.INDEX_ROUTE, {clearHistory: true} as NavigationExtras);
    }
  }


  ngOnInit(): void {
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
    if (this.data.storage != null) {
      this.add = false;
    } else {
      this.add = true;
    }
  }

  ngAfterViewInit() {
    if (this.data.storage != null) {
      let residence = this.data.storage;
      this.streetName.nativeElement.value = residence.address;
      this.bathrooms.nativeElement.value = residence.bathrooms;
      this.bedrooms.nativeElement.value = residence.bedrooms;
      this.guests.nativeElement.value = residence.capacity;
      this.propertyDescription.nativeElement.value = residence.description;
      this.city.nativeElement.value = residence.location;
      this.propertySize.nativeElement.value = residence.size;
      this.propertyTitle.nativeElement.value = residence.title;
      this.bathrooms.nativeElement.value = residence.bathrooms;
      this.propertyType.nativeElement.value = residence.type;
      this.pricing.nativeElement.value = residence.prize;
      this.beds.nativeElement.value = residence.beds;

      if (residence.wifi === 1) {
        this.wifi.nativeElement.checked = true;
      }
      if (residence.kitchen === 1) {
        this.kitchen.nativeElement.checked = true;
      }
      if (residence.heating === 1) {
        this.heating.nativeElement.checked = true;
      }
      if (residence.parking === 1) {
        this.parking.nativeElement.checked = true;
      }
      if (residence.elevator === 1) {
        this.elevator.nativeElement.checked = true;
      }
      this.add = false;
    } else {
      this.add = true;
    }
  }

  addListing() {
    const newResidence = new AddResidenceRequestDto();
    newResidence.address = this.streetName.nativeElement.value;
    newResidence.bathrooms = this.bathrooms.nativeElement.value;
    newResidence.bedrooms = this.bedrooms.nativeElement.value;
    newResidence.capacity = this.guests.nativeElement.value;
    newResidence.description = this.propertyDescription.nativeElement.value;
    newResidence.location = this.city.nativeElement.value;
    newResidence.size = this.propertySize.nativeElement.value;
    newResidence.title = this.propertyTitle.nativeElement.value;
    newResidence.type = this.propertyType.nativeElement.value;
    newResidence.prize = this.pricing.nativeElement.value;
    newResidence.beds = this.beds.nativeElement.value;
    newResidence.wifi = this.wifi.nativeElement.value;

    if (this.kitchen.nativeElement.checked) {
      newResidence.kitchen = 1;
    } else {
      newResidence.kitchen = 0;
    }

    if (this.heating.nativeElement.checked) {
      newResidence.heating = 1;
    } else {
      newResidence.heating = 0;
    }
    if (this.parking.nativeElement.checked) {
      newResidence.parking = 1;
    } else {
      newResidence.parking = 0;
    }
    if (this.elevator.nativeElement.checked) {
      newResidence.elevator = 1;
    } else {
      newResidence.elevator = 0;
    }
    if (this.wifi.nativeElement.checked) {
      newResidence.wifi = 1;
    } else {
      newResidence.wifi = 0;
    }

    newResidence.username = JSON.parse(localStorage.getItem('currentUser')).username;
    newResidence.photoPaths = [];
    console.log(newResidence);

    this.authenticationService.addListing(newResidence).subscribe(
      residence => {
        console.log(residence);
        this.router.navigate(this.INDEX_ROUTE, {clearHistory: true} as NavigationExtras);
      },
      error => {
      });
  }

  updateResidence() {
    const newResidence = new AddResidenceResponseDto();
    newResidence.address = this.streetName.nativeElement.value;
    newResidence.bathrooms = this.bathrooms.nativeElement.value;
    newResidence.bedrooms = this.bedrooms.nativeElement.value;
    newResidence.capacity = this.guests.nativeElement.value;
    newResidence.description = this.propertyDescription.nativeElement.value;
    newResidence.location = this.city.nativeElement.value;
    newResidence.size = this.propertySize.nativeElement.value;
    newResidence.title = this.propertyTitle.nativeElement.value;
    newResidence.type = this.propertyType.nativeElement.value;
    newResidence.prize = this.pricing.nativeElement.value;
    newResidence.beds = this.beds.nativeElement.value;
    newResidence.residenceId = this.data.storage.residenceId;
    if (this.kitchen.nativeElement.checked) {
      newResidence.kitchen = 1;
    } else {
      newResidence.kitchen = 0;
    }
    if (this.heating.nativeElement.checked) {
      newResidence.heating = 1;
    } else {
      newResidence.heating = 0;
    }
    if (this.parking.nativeElement.checked) {
      newResidence.parking = 1;
    } else {
      newResidence.parking = 0;
    }
    if (this.elevator.nativeElement.checked) {
      newResidence.elevator = 1;
    } else {
      newResidence.elevator = 0;
    }
    if (this.wifi.nativeElement.checked) {
      newResidence.wifi = 1;
    } else {
      newResidence.wifi = 0;
    }

    newResidence.username = JSON.parse(localStorage.getItem('currentUser')).username;
    newResidence.photoPaths = [];
    console.log(newResidence);

    this.authenticationService.updateResidence(newResidence).subscribe(
      residence => {
        console.log(residence);
        this.router.navigate(this.INDEX_ROUTE, {clearHistory: true} as NavigationExtras);
      },
      error => {
      });
  }
}
