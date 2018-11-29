import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable} from 'rxjs';

@Injectable()

export class ViewService {


  private result: boolean = true;
  private subject = new Subject();
  private subjectforSearch=new Subject();

  getView() {
    this.gridview();
    return this.subject.asObservable();
  }
  /**
   * to check the data is column or row
   */
  gridview() {

    if (this.result) {
      this.subject.next({ data: "column" });      
      this.result = false;

    }
    else {
      this.subject.next({ data: "row" });
      this.result = true;
    }

  }

  searchItem(searchItem: any): any {
    this.subjectforSearch.next(searchItem);
    }
    getsearchItem(): Observable<any> {
    return this.subjectforSearch.asObservable();
    }
}