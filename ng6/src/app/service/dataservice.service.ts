import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { from } from 'rxjs';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
import { text } from '@angular/core/src/render3/instructions';
import { pipe } from '@angular/core/src/render3/pipe';



@Injectable({
  providedIn: 'root'

})
export class DataserviceService {

  //private _contactUrl = 'http://localhost:8080/html/codeigniter/register';
  private _contactUrl = ' http://localhost/code1/codeigniter/register';
  private _contactUrl1 = 'http://localhost/code1/codeigniter/login';
  // private _contactUrl1='http://localhost:8080/login';
  private _contactUrl2 = 'http://localhost/code1/codeigniter/forgotpassword';
  private _contactUrl3 = 'http://localhost/code1/codeigniter/resetpassword';
  constructor(private http: HttpClient) {

  }
  Register(value: any): Observable<{}> {
    // debugger;
    let register = new FormData();
    register.append('username', value[0].username);
    register.append('password', value[0].password);
    register.append('email', value[0].email);
    register.append('phone', value[0].phone);

    let otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    return this.http.post(this._contactUrl, register, otheroption).pipe(
      map((res: Response) => res)
    );
  }


  Login(value: any): Observable<{}> {
    //debugger;
    let login = new FormData();

    login.append('email', value[0].email);
    login.append('password', value[0].password);
    let otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }

    return this.http.post(this._contactUrl1, login, otheroption).pipe(
      map((res: Response) => res)
    );

  }


  ForgotPass(value: any): Observable<{}> {
    // debugger;
    let forgot = new FormData();
    forgot.append('email', value.data[0].email);
    let otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    return this.http.post(this._contactUrl2, forgot, otheroption);
  }

  RessetPass(value: any): Observable<{}> {
    debugger;
    let reset = new FormData();
    reset.append('email', value.data[0].email);
    reset.append('password', value.data[0].password);
    reset.append('token', value.data[0].token);

    let otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    return this.http.post(this._contactUrl3, reset, otheroption);
  }

}


