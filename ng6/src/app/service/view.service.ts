import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable()

export class ViewService {


  private result: boolean = true;
  private subject = new Subject();

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


}