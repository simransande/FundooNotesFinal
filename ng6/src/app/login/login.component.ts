import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { DataserviceService } from '../service/dataservice.service';
import { Router } from '@angular/router';
import { RouterModule, Routes } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import * as $ from 'jquery';
// import 'rxjs/add/operator/takeUntil'
// import { Subject } from '@angular/core';
import { AuthService } from '../service/auth.service';
// import {
//   AuthService,
//   FacebookLoginProvider,
// } from 'angular-6-social-login';

declare var FB: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

})
export class LoginComponent implements OnInit {
  model: any = {}
  Error: boolean = false;
  constructor(private service: DataserviceService, private router: Router, private auth: AuthService,
) {

     }

  //    public socialSignIn(socialPlatform : string) {
  //     let socialPlatformProvider;
  //     if(socialPlatform == "facebook"){
  //       socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
  //     }
      
  //     this.socialAuthService.signIn(socialPlatformProvider).then(
  //       (userData) => {
  //         console.log(socialPlatform+" sign in data : " , userData);
  //         // Now sign-in with userData
  //         // ...
              
  //       }
  //     );
  // }

  public statusChangeCallback(response){
    console.log(response);
    
  }

  checkLoginState(){
    FB.getLoginStatus((resp: any) =>
      this.statusChangeCallback(resp)
    );
  }

  ngOnInit() {

    $(document).ready(function() {
      $.ajaxSetup({ cache: true });
      $.getScript('https://connect.facebook.net/en_US/sdk.js', function(){
        FB.init({
          appId: '347982709337483',
          version: 'v2.7' // or v2.1, v2.2, v2.3, ...
        });     
        // $('#loginbutton,#feedbutton').removeAttr('disabled');
        FB.XFBML.parse();
        debugger;
        FB.getLoginStatus((resp: any) =>
         //console.log(resp)
        this.service.SocialLogin(resp).subscribe((Statusdata: any) => {
          console.log(Statusdata.accessToken);
          
        })        
      );
      });
    });
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

  /**
   * @method s_login() for login the page using gmail and password
   */
  s_login() {
    this.model;

    let data = [
      { 'email': this.model.email, 'password': this.model.pass }
    ];

    this.service.Login(data).subscribe((Statusdata: any) => {
      debugger;
      console.log(Statusdata);
      this.flag = Statusdata.status;
      this.mail = Statusdata.email;
      this.name = Statusdata.name;
      this.token = Statusdata.token;

      /**
       * if flag is 1 then it will navigate to fundooNotes  
       */
      if (this.flag == 1) {
        debugger;
        localStorage.setItem('email', this.mail);
        localStorage.setItem('uname', this.name);
        localStorage.setItem('token', this.token);

        this.auth.sendToken(this.mail)

        this.router.navigate(['/FundooNotes']);
      }
      else {
        this.Error = true;
      }
    });

  }
}





