import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DataserviceService } from '../service/dataservice.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  providers: [DataserviceService]  
})
export class RegistrationComponent implements OnInit {
 model:any={}
 flag:any;
 Error: boolean = false;

  constructor(private service:DataserviceService,private router:Router){//private service:DataserviceService) { 

 }

  ngOnInit() {
  }
 

  UsernameFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
    Validators.maxLength(128)
  ]);
  emailFormControl=new FormControl('',[
    Validators.required,
    Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
  ]);
  PasswordFormControl=new FormControl('',[
    Validators.required,
    Validators.minLength(4),
    Validators.maxLength(8)
  ]);
  PhoneFormControl=new FormControl('',[
    Validators.required,
    Validators.pattern("[0-9]{10}")
  ]);

  s_register() {
   debugger;
    this.model;

    let data = [
      { 'username': this.model.uname, 'password': this.model.pass, 'email': this.model.email, 'phone': this.model.phone }
    ];
    this.service.Register(data).subscribe((Statusdata: any) => { 
      this.flag=Statusdata.status;

      if (this.flag == 1) 
      {
        alert("succsessfully registered");
        this.router.navigate(['/login']);

      }
      else
      {
        this.Error = true;


      }
    });
     
    }


}
