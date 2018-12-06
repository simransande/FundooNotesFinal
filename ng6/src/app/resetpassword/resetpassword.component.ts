import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DataserviceService } from '../service/dataservice.service';
import { ActivatedRoute } from '@angular/router';
import { LoggerService } from '../service/logger/logger.service';


@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  model: any = {}
  params: any = {}
  userid: any = {}
  observe:any;

  constructor(private service: DataserviceService, private route: ActivatedRoute,
              private loggerService:LoggerService) { }

  ngOnInit() {
    this.params = this.route.snapshot.queryParamMap;
    this.userid = this.params.params.userId;

  }



  emailFormControl = new FormControl('', [
    Validators.required
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
    Validators.maxLength(8)
  ]);

  s_reset() {
    this.model;

    let data = [
      { 'password': this.model.pass, 'email': this.model.email, 'token': this.userid }
    ];
    this.observe=this.service.RessetPass({ data })
      .subscribe(response => {
        LoggerService.log('success')
      }
      );
  }

  handleResponse(response) {
    if (response.success) {
      LoggerService.log('success')
       } else if (response.error) {
        LoggerService.log('error')
      }

  }

  ngOnDestroy()
  {
    this.observe.unsubscribe();
  }
}
