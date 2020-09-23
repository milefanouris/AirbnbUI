import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services';
import {UserUpdateProfileDto, UserUtilsDto} from '../domain/airbnb-service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  firstname: any;
  lastname: any;
  email: any;
  phoneNumber: any;
  user: any;


  @ViewChild('name') name: ElementRef;
  @ViewChild('surname') surname: ElementRef;
  @ViewChild('mail') mail: ElementRef;
  @ViewChild('number') number: ElementRef;
  private returnUrl = ['/index'];

  constructor(private router: Router,
              private authenticationService: AuthenticationService) {
    if (JSON.parse(localStorage.getItem('currentUser')) != null) {
      let userUtils = new UserUtilsDto();
      userUtils.username = JSON.parse(localStorage.getItem('currentUser')).username;
      this.authenticationService.getUserProfile(userUtils).subscribe(
        userEntity => {
          this.user = JSON.parse(userEntity);
          this.firstname = this.user.name;
          this.lastname = this.user.surname;
          this.email = this.user.email;
          this.phoneNumber = this.user.phoneNumber;
        },
        error => {
        });

    }
  }

  ngOnInit(): void {
  }

  updateProfile() {
    const updatedUser = new UserUpdateProfileDto();
    updatedUser.username = this.user.username;
    updatedUser.city = this.user.city;
    updatedUser.email = this.mail.nativeElement.value || this.user.email;
    updatedUser.surname = this.surname.nativeElement.value || this.user.surname;
    updatedUser.phoneNumber = this.number.nativeElement.value || this.user.phoneNumber;
    updatedUser.roleDtos = this.user.roleDtos;
    updatedUser.name = this.name.nativeElement.value || this.user.name;
    this.authenticationService.updateUser(updatedUser).subscribe(
      data => {
        this.router.navigate(this.returnUrl);
      },
      error => {
      });
  }
}
