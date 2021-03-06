import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { DataserviceService } from '../service/dataservice.service';
import { Router } from '@angular/router';
import { RouterModule, Routes } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import * as $ from 'jquery';
import { LoggerService } from '../service/logger/logger.service';

import { AuthService } from '../service/auth.service';
import { takeUntil } from 'rxjs/operators';
import { AuthService as social, FacebookLoginProvider, GoogleLoginProvider } from 'angular-6-social-login';


declare var FB: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

})
export class LoginComponent implements OnInit {
  model: any = {}
  Error: boolean = false;
  // socialAuthService: any;
  constructor(private service: DataserviceService, private socialAuthService: social,
    private loggerService: LoggerService, private router: Router, private auth: AuthService, ) {

  }


  ngOnInit() {
  }

  /**
   * function for social login
   * @param socialPlatform passing string
   */
  public socialSignIn(socialPlatform: string) {
    debugger;
    let socialPlatformProvider;
    if (socialPlatform == "facebook") {
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    } else if (socialPlatform == "google") {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }

    this.socialAuthService.signIn(socialPlatformProvider).then(userData => {
      // console.log(socialPlatform + " sign in data : ", userData);
      // Now sign-in with userData
      // ...
      this.sendToRestApiMethod(
        userData.token,
        userData.email,
        userData.image,
        userData.name
      );
    });
  }

  sendToRestApiMethod(
    token: string,
    email: string,
    profilepic: string,
    first_name: string
  ): void {
    let data = [{ username: first_name, email: email, profilepic: profilepic }];
    this.service.SocialLogin({ data }).subscribe((Statusdata: any) => {
      var Status = Statusdata;
      this.flag = Status.status;
      this.mail = Statusdata.email;
      this.name = Statusdata.name;
      this.flag = Statusdata.status;

      /**
       * if flag is 1 then it will navigate to login page
       */
      if (Statusdata.status == 1) {
        alert("succsessfully registered");
        localStorage.setItem('email', this.mail);
        localStorage.setItem('uname', this.name);
        localStorage.setItem('LoggedInUser', this.mail);
        this.auth.sendToken(this.mail);
        this.router.navigate(['/FundooNotes']);

      }
      else {
        this.Error = true;
      }

    });
  }
  onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  }

  flag: any;
  mail: any;
  name: any;
  token: any;

  MailIdFormControl = new FormControl('', [
    Validators.required
  ]);
  PasswordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
    Validators.maxLength(8)
  ]);
  login;
  /**
   * @method s_login() for login the page using gmail and password
   */
  s_login() {
    debugger;
    this.model;

    let data = [
      { 'email': this.model.email, 'password': this.model.pass }
    ];

    this.login = this.service.Login(data).subscribe((Statusdata: any) => {
      debugger;
      LoggerService.log('Login');
      this.flag = Statusdata.status;
      this.mail = Statusdata.email;
      this.name = Statusdata.name;
      this.token = Statusdata.token;

      /**
       * if flag is 1 then it will navigate to fundooNotes  
       */
      if (this.flag == 1) {
        localStorage.setItem('email', this.mail);
        localStorage.setItem('uname', this.name);
        localStorage.setItem('LoggedInUser', this.mail);


        this.auth.sendToken(this.mail)

        this.router.navigate(['/FundooNotes']);
      }
      else {
        this.Error = true;
      }
    });
  }
  ngOnDestroy() {
    // this.login.unsubscribe();
  }
}





