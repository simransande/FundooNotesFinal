import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DataserviceService } from '../service/dataservice.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-ForgotPassword',
  templateUrl: './ForgotPassword.component.html',
  styleUrls: ['./ForgotPassword.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  model: any = {}
  Error: boolean = false;
  flag: any;


  constructor(private service: DataserviceService, private router: Router) { }

  ngOnInit() {
  }
  emailFormControl = new FormControl('', [
    Validators.required
  ]);
  s_forgotpass() {
    this.model;

    let data = [
      { 'email': this.model.email }
    ];
    this.service.ForgotPass({ data }).subscribe((Statusdata: any) => {
      this.flag = Statusdata.status;

      /**
       * if flag is 1 then it will navigate to login page
       */
      if (this.flag == 1) {

        this.router.navigate(['/login']);
      }
      else {
        this.Error = true;
      }
    });


  }

}
