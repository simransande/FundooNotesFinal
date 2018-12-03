import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { from } from 'rxjs';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
import { text } from '@angular/core/src/render3/instructions';
import { pipe } from '@angular/core/src/render3/pipe';
import { Router } from '@angular/router';
import { serviceUrl } from '../../app/serviceUrl/serviceUrl';
// /var/www/html/code1/codeigniter/ng6/src/app/serviceUrl/serviceUrl.ts



@Injectable({
  providedIn: 'root'

})
export class DataserviceService {
  
  constructor(private http: HttpClient,public router: Router,private serviceurl:serviceUrl) {

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
    return this.http.post(this.serviceurl.host+this.serviceurl.register, register, otheroption).pipe(
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

    return this.http.post( this.serviceurl.host+this.serviceurl.login,login,otheroption).pipe(
      map((res: Response) => res)
    );

  }


  /**
      * mail will send your the register mail id if password forget
      * Observable<{}> -respond to user
      */
  ForgotPass(value: any): Observable<{}> {
    debugger;
    let forgot = new FormData();
    forgot.append('email', value.data[0].email);
    let otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    return this.http.post( this.serviceurl.host+this.serviceurl.forgotPassword,forgot,otheroption);
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
    return this.http.post(this.serviceurl.host+this.serviceurl.resetpassword, reset, otheroption);
  }


  SocialLogin(value: any): Observable<{}> {
    debugger;
    let social = new FormData();
    social.append('email', value.data[0].email);
    social.append('profilepic', value.data[0].profilepic);
    social.append('username', value.data[0].username);

    let otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    return this.http.post(this.serviceurl.host+this.serviceurl.socialLogin, social, otheroption).pipe(
      map((res: Response) => res)
    );
   }


/**
* to upload the image for the profile picture
* @param fileToUpload image file to be stored in db
* @param email email of particular 
* @return Observables
*/
uploadImage(base64string, email) {
  debugger;
let otheroption: any = {
'Content-Type': 'application/x-www-form-urlencoded'
}
const params = new FormData();
params.append("fileKey", base64string);
params.append("email", email);

return this.http.post(this.serviceurl.host+this.serviceurl.imageurl, params, otheroption);
}

   profileUploadinGet(value:any): Observable<{}> {
     debugger;
    let profileget = new FormData();
    profileget.append('email', value);


    let otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    return this.http.post(this.serviceurl.host+this.serviceurl.profileUploadinGeturl, profileget, otheroption);
   }

}


