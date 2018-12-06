import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { serviceUrl } from '../../app/serviceUrl/serviceUrl';

@Injectable({
  providedIn: 'root'
})
export class CreatelabelService {
  private _labelUrl = 'http://localhost/code1/codeigniter/label';
  private _getlabelUrl = 'http://localhost/code1/codeigniter/getlabel';
  private _updatelabelUrl = 'http://localhost/code1/codeigniter/updatlabel';
  private _deletelabelUrl = 'http://localhost/code1/codeigniter/deletelabel';

  constructor(private http: HttpClient,private serviceurl:serviceUrl) {

  }
  /**
   * add label
   * Observable<{}> -respond to user
   */
  addLabel(value: any): Observable<{}> {

    let label = new FormData();

    let email = localStorage.getItem('email');
    label.append('label', value.data[0].label);
    label.append('email', email);

    let otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }

    return this.http.post(this.serviceurl.host+this.serviceurl.label, label, otheroption)

  }

  /**
    * get label
    * Observable<{}> -respond to user
    */

  getLabel(): Observable<{}> {

    let getlabel = new FormData();
    let email = localStorage.getItem('email');

    getlabel.append('email', email);

    let otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }


    return this.http.post(this.serviceurl.host+this.serviceurl.getlabel, getlabel, otheroption)

  }


  /**
     * update the label
     * Observable<{}> -respond to user
     */
  updatlabel(value: any): Observable<{}> {
    debugger;
    let updatlabel = new FormData();
    let email = localStorage.getItem('email');

    updatlabel.append('email', email);
    updatlabel.append('label', value.data[0].label);
    updatlabel.append('id', value.data[0].id);
    updatlabel.append('flag', value.data[0].flag)

    let otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded' //body-x-www-form-urlencoded
    }
    return this.http.post(this.serviceurl.host+this.serviceurl.updatlabel, updatlabel, otheroption)

  }

  /**
      * delete the label
      * Observable<{}> -respond to user
      */
  deletelabel(value: any): Observable<{}> {
debugger;
    let deletelabel = new FormData();
    let email = localStorage.getItem('email');
    deletelabel.append('email', email);
    deletelabel.append('id', value.data[0].id);
    deletelabel.append('flag', value.data[0].flag)

    let otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded' //body-x-www-form-urlencoded
    }
    return this.http.post(this.serviceurl.host+this.serviceurl.deletelabell, deletelabel, otheroption)
  }
}
