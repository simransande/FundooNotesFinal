import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DialogData } from '../FundooNotes/FundooNotes.component';
import { CreatelabelService } from '../service/createlabel.service';


@Component({
  selector: 'app-editlabel',
  templateUrl: './editlabel.component.html',
  styleUrls: ['./editlabel.component.css']
})
export class EditlabelComponent implements OnInit,OnDestroy {

  editInput: boolean = false;
  LabelData: any;
  labelUpdate: any;
  observer1:any;
  observer2:any;

  observer3:any;

  observer4:any;


  constructor(public dialogRef: MatDialogRef<EditlabelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private service: CreatelabelService) { }

  ngOnInit() {
    console.log(this.data);
  }
  labels: any;

  onNoClick(): void {
    this.dialogRef.close();
  }

  
  /**
   * delete the label 
   */
  Clear() {
    this.data.labelInput = "";
  }

  /**
   * 
   * @param label on click edit it will bind the updated value
   */
  EditLabel(label: any) {
    this.LabelData = label;
    this.editInput = true;
  }


  /**
   * 
   * @param lbel update label
   */
  UpdateLabel(lbel: any) {

    this.editInput = true;
    var flag = 'updateLabel';
    this.crud(lbel, flag);

  }

  /**
   * @param lbel label delete
   */
  DeleteLabel(lbel: any) {
    this.editInput = true;
    var flag = 'deleteLabel';
    this.deleteCrud(lbel, flag);

  }

  /**
   * @param lbel crud for update and create label  
   * @param flag sending the string as a flag to backend api
   */
  crud(lbel: any, flag: any) {
    let data = [
      { 'id': lbel.id, 'flag': flag, 'label': lbel.label }
    ];

    this.observer3=this.service.updatlabel({ data }).subscribe((data: any) => {
      this.observer4=this.service.getLabel().subscribe(data => {
        this.labels = data;
      });
    });
  }

  /**
   * function is for deleting the label on that perticular note
   * @param lbel passing label for delete it
   * @param flag passing string to backend
   */
  deleteCrud(lbel: any, flag: any) {
    debugger;
    let data = [
      { 'id': lbel.id, 'flag': flag, 'label': lbel.label }
    ];

    this.observer1=this.service.deletelabel({ data }).subscribe((data: any) => {
      this.observer2=this.service.getLabel().subscribe(data => {
        this.labels = data;
      });
    });
  }

  ngOnDestroy()
  {
    // this.observer1.unsubscribe();
    // this.observer2.unsubscribe();

    // this.observer3.unsubscribe();

    // this.observer4.unsubscribe();

  }

}
