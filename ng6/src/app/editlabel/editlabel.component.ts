import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { DialogData } from '../FundooNotes/FundooNotes.component';
import { CreatelabelService } from '../service/createlabel.service';


@Component({
  selector: 'app-editlabel',
  templateUrl: './editlabel.component.html',
  styleUrls: ['./editlabel.component.css']
})
export class EditlabelComponent implements OnInit {

  editInput: boolean = false;
  LabelData: any;
  labelUpdate: any;

  constructor(public dialogRef: MatDialogRef<EditlabelComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
              private service: CreatelabelService) { }

  ngOnInit() 
  {
    console.log(this.data);
  }
  labels: any;

   onNoClick(): void
   {
     this.dialogRef.close();
   }

  //delete the label
  Clear() 
  {
    this.data.labelInput = "";
  }
 
  //on click edit it will bind the updated value
  EditLabel(label: any) {
    this.LabelData = label;
    this.editInput = true;
  }


  // update label
  UpdateLabel(lbel: any){
   
    this.editInput = true;
    var flag='updateLabel';
    this.crud(lbel,flag);

  }

  //label delete
  DeleteLabel(lbel:any){
   
    this.editInput = true;
    var flag='deleteLabel';
    this.deleteCrud(lbel,flag);

  }

  //crud for update and create label
  crud(lbel: any, flag: any)
  {
    let data = [
      {'id': lbel.id,'flag': flag, 'label': lbel.label}
      ];
    
    this.service.updatlabel({ data }).subscribe((data: any) =>
     {
      this.service.getLabel().subscribe(data =>
         {
            this.labels = data;
         });
     });
  }

  //crude operation for delet label
  deleteCrud(lbel: any, flag: any) 
  {
    debugger;
    let data = [
    {'id': lbel.id,'flag': flag, 'label': lbel.label}
    ];
 
    this.service.deletelabel({ data }).subscribe((data: any) => 
    {
      this.service.getLabel().subscribe(data => 
        {     
          this.labels = data;
        });
    });
  }



}
