import { Component, OnInit, Inject } from '@angular/core';
import { DialogData } from '../notes/notes.component';
// import { MAT_DIALOG_DATA } from '@angular/material';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { NotesService } from '../service/notes.service'


@Component({
  selector: 'app-editnote',
  templateUrl: './editnote.component.html',
  styleUrls: ['./editnote.component.css']
})
export class EditnoteComponent implements OnInit {

  constructor(private service: NotesService, public dialogRef: MatDialogRef<EditnoteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
    console.log(this.data);
  }
  imgUrl: any;
  colored: any;
  selectedFile: any;
  Image: any;
  notes: any;
  labell: any;
  localUrl: any;
  sharedEmail: any;
  email: any;
  notes1: any;
  flag: any;
  model: any = {}
  archive: number = 0;
  reminder: any;
  dltReminder: any;
  dltLabel: any;
  trash: number = 0;
  pin: number = 0;
  unpin: number = 1;
  mainCard: boolean = true;
  createCard: boolean = false;
  getColor: any;
  remainderDisplay: boolean = false;
  colorDisplay: boolean = false;
  imageDisplay: boolean = false;
  remainderData: any;
  remainder: any;
  remaindergetdata: any;
  DeleteData: number = 0;
  NoteId: any;
  DateTime: boolean = false;
  filecolor;

  Reminder(note: any) {

    this.notes1 = note;

  }
  //onclick today()
  today() {
    var newnote = this.notes1;
    this.remainderDisplay = true;
    var day = new Date();
    day.setDate(day.getDate());
    this.remainderData = day.toUTCString().substring(0, 22);
    //this.crud(this.remainderData,this.flag);
    newnote.reminder = day.toUTCString().substring(0, 22);

    this.crud(newnote);

  }
  //onclick tomorrow()
  tomorrow() {
    var newnote = this.notes1;
    this.remainderDisplay = true;
    var flag = 'reminder';
    var day = new Date();
    day.setDate(day.getDate() + 1);
    this.remainderData = day.toUTCString().substring(0, 22);
    newnote.reminder = day.toUTCString().substring(0, 22);
    this.crud(newnote);


  }

  //onclick nextWeek()
  nextWeek() {
    var newnote = this.notes1;

    this.remainderDisplay = true;
    var flag = 'reminder';
    var day = new Date();
    day.setDate(day.getDate() + (1 + 7 - day.getDay()) % 7);
    this.remainderData = day.toUTCString().substring(0, 22);
    newnote.reminder = day.toUTCString().substring(0, 22);
    this.crud(newnote);

  }
  setcolor(color: any, note: any) {


    this.getColor = color;

    var data = { 'colorcode': this.getColor };

    this.crud(data);
  }
  /**
   * function is for edit note dialogue box
   * changing title and description of that perticular note
   */
  showHideImp() {
    console.log(this.data.tittle.tittle);
    debugger;
    this.model;
    let data = [
      {
        'id': this.data.tittle.id, 'title': this.data.tittle.tittle
        , 'description': this.data.tittle.description, 'color': this.data.tittle.colorcode
      }
    ];
    this.crud(data);
  }

  /**
   * 
   * @param data tittle and description is changing on this function of crud()
   */
  crud(data: any) {

    if ((this.data.tittle.tittle != "") && (this.data.tittle.tittle != undefined)) {

      this.service.updatenotes({ data }).subscribe((data: any) => {
        this.service.getNote().subscribe(data => {
          this.notes = data;
        });
      });
      this.mainCard = false;
    }

  }
}