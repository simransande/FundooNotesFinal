import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { from } from 'rxjs';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
import { text } from '@angular/core/src/render3/instructions';
import { pipe } from '@angular/core/src/render3/pipe';
import { Router } from '@angular/router';




@Injectable({
  providedIn: 'root'

})
export class DataserviceService {

  private register = ' http://localhost/code1/codeigniter/register';
  private login = 'http://localhost/code1/codeigniter/login';
  private forgotpassword = 'http://localhost/code1/codeigniter/forgotpassword';
  private resetpassword = 'http://localhost/code1/codeigniter/resetpassword';
  private uploadimage= 'http://localhost/code1/codeigniter/uploadimage';
  private socialLogin= 'http://localhost/code1/codeigniter/socialLogin';

  
  constructor(private http: HttpClient,public router: Router) {

  }

  async storeData(data) {
    localStorage.setItem('userData', JSON.stringify(data));
    const newData = await this.getData();
    return this.router.navigate(['/FundooNotes'], newData);
}

getData() {
   return JSON.parse(localStorage.getItem('email'));
}

sessionIn() {
   let A;
   if (this.getData()) {
       A = this.router.navigate(['/FundooNotes'], this.getData());
   }
   return A;
}

sessionOut() {
   let A;
   if (!this.getData()) {
     A = this.router.navigate(['']);
   }
   return A;
}

logOut() {
   localStorage.setItem('email', '');
   localStorage.clear();
   return this.router.navigate(['']);
}

  /**
      * Regester a new id
      * Observable<{}> -respond to user
      */
  Register(value: any): Observable<{}> {
    let register = new FormData();
    register.append('username', value[0].username);
    register.append('password', value[0].password);
    register.append('email', value[0].email);
    register.append('phone', value[0].phone);

    let otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    return this.http.post(this.register, register, otheroption).pipe(
      map((res: Response) => res)
    );
  }


  /**
      * login the id
      * Observable<{}> -respond to user
      */
  Login(value: any): Observable<{}> {
  
    let login = new FormData();

    login.append('email', value[0].email);
    login.append('password', value[0].password);
    let otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }

    return this.http.post(this.login, login, otheroption).pipe(
      map((res: Response) => res)
    );

  }

  uploading(imgdata: any): Observable<any> 
  {
    debugger;
    let getnote = new FormData();
     
    getnote.append('image', imgdata.data[0].image);
   
   
    return this.http.post(this.uploadimage, getnote).pipe(
      map((res: Response) => res)
    );
  }

  /**
      * mail will send your the register mail id if password forget
      * Observable<{}> -respond to user
      */
  ForgotPass(value: any): Observable<{}> {
    let forgot = new FormData();
    forgot.append('email', value.data[0].email);
    let otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    return this.http.post(this.forgotpassword, forgot, otheroption);
  }

  /**
   * for reseting the password
   * append email,password,and token in reset
   */
  RessetPass(value: any): Observable<{}> {
    debugger;
    let reset = new FormData();
    reset.append('email', value.data[0].email);
    reset.append('password', value.data[0].password);
    reset.append('token', value.data[0].token);

    let otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    return this.http.post(this.resetpassword, reset, otheroption);
  }


  SocialLogin(value: any): Observable<{}> {
    let social = new FormData();
    social.append('email', value.data[0].accessToken);

    let otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    return this.http.post(this.socialLogin, social, otheroption);

   }
}


