import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AddResidenceRequestDto} from '../domain/airbnb-service';
import {NavigationExtras, Router} from '@angular/router';
import {AuthenticationService} from '../services';

@Component({
  selector: 'app-add-listing',
  templateUrl: './add-listing.component.html',
  styleUrls: ['./add-listing.component.css']
})
export class AddListingComponent implements OnInit {

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
  @ViewChild('propertyTitle') propertyTitle: ElementRef;
  @ViewChild('propertyDescription') propertyDescription: ElementRef;
  @ViewChild('pricing') pricing: ElementRef;
  @ViewChild('from_date') fromDate: ElementRef;
  @ViewChild('to_date') toDate: ElementRef;

  private INDEX_ROUTE = ['/index'];

  constructor(private router: Router,
              private authenticationService: AuthenticationService) {
    if (JSON.parse(localStorage.getItem('currentUser')) == null) {
      this.router.navigate(this.INDEX_ROUTE, {clearHistory: true} as NavigationExtras);
    }
  }

  ngOnInit(): void {
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
    newResidence.bathrooms = this.bathrooms.nativeElement.value;
    newResidence.type = this.propertyType.nativeElement.value;
    newResidence.prize = this.pricing.nativeElement.value;
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
}
