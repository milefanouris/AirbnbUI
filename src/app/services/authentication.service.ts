import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {
  AddResidenceRequestDto,
  UserLogInRequestDto,
  UserLogInResponseDto,
  UserUpdateProfileDto,
  UserUtilsDto
} from '../domain/airbnb-service';

const headerOptions = {
  headers: new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json'),
  withCredentials: true
};

@Injectable({providedIn: 'root'})
export class AuthenticationService {
  public currentUserSubject: BehaviorSubject<boolean>;
  public currentUser: any;
  userUserLogInResponseDto: UserLogInResponseDto;
  private apiUrl: string = environment.API_ENDPOINT;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<boolean>(false);
    this.currentUser = null;
  }

  login(user) {
    return this.http.post(`${this.apiUrl}/login`, user, headerOptions)
      .pipe(map(userLogInResponseDto => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(userLogInResponseDto));
        this.currentUser = userLogInResponseDto;
        this.currentUserSubject.next(true);
        return userLogInResponseDto;
      }, error => {
        console.log(error);
        // use message in error object
        // you can use Angular Material dialog to show message in the popup.
        // to show message in the form, you can use a class variable and bind it to the template.
      }));
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  register(user: UserLogInRequestDto) {
    return this.http.post(`${this.apiUrl}/register`, user, headerOptions)
      .pipe(map(userUserLogInResponseDto => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        return user;
      }, error => {
        console.log(error);
        // use message in error object
        // you can use Angular Material dialog to show message in the popup.
        // to show message in the form, you can use a class variable and bind it to the template.
      }));
  }

  getUserProfile(userUtils: UserUtilsDto){
    return this.http.post(`${this.apiUrl}/getProfile`, userUtils, headerOptions)
      .pipe(map(userEntity => {
        console.log(userEntity);
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        return JSON.stringify(userEntity);
      }, error => {
        console.log(error);
        // use message in error object
        // you can use Angular Material dialog to show message in the popup.
        // to show message in the form, you can use a class variable and bind it to the template.
      }));
  }

  updateUser(updatedUser: UserUpdateProfileDto) {
    return this.http.post(`${this.apiUrl}/updateProfile`, updatedUser, headerOptions)
      .pipe(map(userEntity => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        return userEntity;
      }, error => {
        console.log(error);
        // use message in error object
        // you can use Angular Material dialog to show message in the popup.
        // to show message in the form, you can use a class variable and bind it to the template.
      }));
  }

  addListing(newResidence: AddResidenceRequestDto) {
    return this.http.post(`${this.apiUrl}/residence`, newResidence, headerOptions)
      .pipe(map(residense => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        return JSON.stringify(residense);
      }, error => {
        console.log(error);
        // use message in error object
        // you can use Angular Material dialog to show message in the popup.
        // to show message in the form, you can use a class variable and bind it to the template.
      }));

  }
}
