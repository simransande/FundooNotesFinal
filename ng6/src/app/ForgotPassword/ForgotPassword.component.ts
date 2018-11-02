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
  model:any={}
  Error: boolean = false;
  flag:any;


  constructor(private service:DataserviceService,private router:Router) { }

  ngOnInit() {
  }
  emailFormControl=new FormControl('',[
    Validators.required
  ]);
  s_forgotpass() {
    //debugger;
    this.model;


    //let user = new User('', '');
    //user.username = "prashant";
    //user.password = "asdfasfa";
    let data = [
      {'email': this.model.email}
    ];
    this.service.ForgotPass({ data }).subscribe((Statusdata: any) => {      
      //debugger;
     // console.log(Statusdata);
      this.flag=Statusdata.status;
     
     
  
        if (this.flag == 1) 
        {
         
          this.router.navigate(['/login']);
        }
        else
        {
         this.Error = true;
        }
      });










      // .subscribe(
      //   response => this.handleResponse(response)
      //  error => this.handleResponse(error)
      // );
  

  // handleResponse(response) {
    // if (response.success) {
    //  // console.log("success");
    // } else if (response.error) {
    //   //console.log("errror");
    // } else {

    // }

  }

}
