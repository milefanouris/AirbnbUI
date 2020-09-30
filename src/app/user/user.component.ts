import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {first} from 'rxjs/operators';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {AuthenticationService} from '../services';
import {UserLogInRequestDto, UserRegisterRequestDto} from '../domain/airbnb-service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserComponent implements OnInit {

  loading = false;
  submitted = false;
  private returnUrl = ['/index'];
  error: string;
  userLogin: UserLogInRequestDto;
  userRegister: UserRegisterRequestDto;

  @ViewChild('signInButton') signInButton: ElementRef;
  @ViewChild('username') username: ElementRef;
  @ViewChild('password') password: ElementRef;

  @ViewChild('firstName') firstName: ElementRef;
  @ViewChild('lastName') lastName: ElementRef;
  @ViewChild('registerPassword') registerPassword: ElementRef;
  @ViewChild('email') email: ElementRef;
  @ViewChild('registerUsername') registerUsername: ElementRef;
  @ViewChild('phoneNumber') phoneNumber: ElementRef;
  @ViewChild('role') role: ElementRef;

  showErrorMessage: any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    if (this.authenticationService.currentUser) {
      this.router.navigate(['/index']);
    }
  }

  ngOnInit() {
  }

  onLogin() {
    this.userLogin = new UserLogInRequestDto();
    this.userLogin.username = this.username.nativeElement.value;
    this.userLogin.password = this.password.nativeElement.value;
    this.authenticationService.login(this.userLogin)
      .subscribe(
        data => {
          this.router.navigate(this.returnUrl);
        },
        error => {
          this.showErrorMessage = true;
          this.error = error;
          this.loading = false;
        });
  }

  onRegister() {
    this.submitted = true;
    this.loading = true;
    this.userRegister = new UserRegisterRequestDto();
    this.userRegister.username = this.username.nativeElement.value;
    this.userRegister.name = this.firstName.nativeElement.value;
    this.userRegister.surname = this.lastName.nativeElement.value;
    this.userRegister.password = this.password.nativeElement.value;
    this.userRegister.email = this.email.nativeElement.value;
    this.userRegister.username = this.registerUsername.nativeElement.value;
    this.userRegister.password = this.registerPassword.nativeElement.value;
    this.userRegister.phoneNumber = this.phoneNumber.nativeElement.value;
    this.userRegister.roleDtos = [];
    this.userRegister.roleDtos.push(this.role.nativeElement.value);

    console.log(this.userRegister);
    this.authenticationService.register(this.userRegister)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          console.log(error);
          this.error = error;
          this.loading = false;
        });

  }
}
