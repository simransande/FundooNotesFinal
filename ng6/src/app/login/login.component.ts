import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DataserviceService } from '../service/dataservice.service';
import { Router } from '@angular/router';
import { RouterModule, Routes } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

})
export class LoginComponent implements OnInit {
  model: any = {}
  Error: boolean = false;
  constructor(private service: DataserviceService, private router: Router, private auth: AuthService) { }

  ngOnInit() {
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
      console.log(Statusdata);
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





