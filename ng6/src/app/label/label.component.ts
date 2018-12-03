import { Component, OnInit } from '@angular/core';
import { NotesService } from '../service/notes.service';
import { CollaboratorComponent } from '../collaborator/collaborator.component';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { CreatelabelService } from '../service/createlabel.service';


@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.css']
})
export class LabelComponent implements OnInit {
  notes: any;
  model: any = {}
  archive: number = 0;
  pin: number = 0;
  trash: number = 0;
  labell: any;
  label:any;
  unpin: number = 1;
  mainCard: boolean = true;
  createCard: boolean = false;
  getColor: any;
  remainderDisplay: boolean = false;
  remainderData: any;
  DeleteData: number = 1;
  MoreNotes: any;
  NoteId: any;
  DateTime: boolean = false;
  filecolor;
  localUrl: any;
  imgUrl: any;
  selectedFile: any;
  imageDisplay: boolean;
  reminder: string;
  colored: any;


  constructor(private service: NotesService, private labelService: CreatelabelService, public dialog: MatDialog) {
    this.labelService.getLabel().subscribe(responseLabel => {

      this.labell = responseLabel;
      console.log(this.labell);
    });
  }

  ngOnInit() {
  }
  notes1: any;

  createNote() {
    this.mainCard = false;
    this.createCard = true;
  }


  /**
   * full note box on click 
   */
  closeNote() {
    this.model;
    let data = [
      {
        'title': this.model.title, 'description': this.model.note, 'reminder': this.remainderData,
        'color': this.colored, 'image': this.imgUrl
      }
    ];

    if ((this.model.title != "" || this.model.note != "") && (this.model.title != undefined || this.model.note != undefined)) {

this.label=this.service.Notes({ data }).subscribe((data: any) => {
        this.label=this.labelService.getLabel().subscribe(responseLabel => {

          this.labell = responseLabel;
          console.log(this.labell);
        });

      });
      this.model.title = "";
      this.model.note = "";
      this.remainderData = "";
      this.remainderDisplay = true;
      this.getColor = true;
      this.imageDisplay = true;
      this.archive = 0;
      this.pin = 0;
      this.trash = 0;
      this.reminder = '';
      this.mainCard = true;
      this.createCard = false;
      this.imgUrl = '';
    }
    else {
      this.mainCard = true;
      this.createCard = false;
    }
  }

  Archive(note: any) {

    var flag = 'archive';
    this.crud(note, flag);
  }

  Trash(note: any) {

    var flag = 'trash';
    this.crud(note, flag);
  }
  deletRem(note: any) {
    var flag = 'dltReminder'
    this.crud(note, flag);
  }
  pinNote(note: any) {

    var flag = 'pin';
    this.crud(note, flag);
  }

  Reminder(note: any) {

    this.notes1 = note;

  }
  more(note: any) {
    this.notes1 = note;

  }
  labelShow1(label: any) {
    var newnote = this.notes1;

    newnote.labell = label;
    if (newnote.label != 0) {
      var flag = "label";
      this.crud(newnote, flag);

    }
  }

  crud(note: any, flag: any) {

    let data = [
      {
        'id': note.id, 'pin': note.pin, 'description': note.description, 'email': note.email, 'trash': note.trash,
        'title': note.title, 'isarchive': note.archive, 'flag': flag, 'color': note.colorcode,
        'reminder': note.reminder, 'label': note.labell
      }
    ];
    
    this.label=this.service.updatenotes({ data }).subscribe((data: any) => {
      this.label=this.labelService.getLabel().subscribe(responseLabel => {

        this.labell = responseLabel;
        console.log(this.labell);
      });
      this.label=this.service.getNote().subscribe(data => {
        this.notes = data;
      });

    });
  }



  Fillupload(event, note: any) {
    this.localUrl = event.target.result;
    let data = [
      { 'selectedFile': <File>event.target.files[0], 'id': note.id, 'image': note.image }
    ];
    console.log(this.selectedFile);
    this.label=this.service.uploading({ data }).subscribe((data: any) => {
      this.label=this.service.getNote().subscribe(data => {

        this.imgUrl = data;
        this.notes = data;
      });
    });

  }

  openDialogcoll(): void {
    debugger;
    const dialogRef = this.dialog.open(CollaboratorComponent, {
    });
  }

  setcolor(color: any, note: any) {
    debugger;
    this.getColor = color;
    var data = { 'colorcode': this.getColor, 'id': note.id };
    var flg = 'color';
    this.crud(data, flg);
  }

  today() {
    var newnote = this.notes1;
    this.remainderDisplay = true;
    var day = new Date();
    day.setDate(day.getDate());
    this.remainderData = day.toUTCString().substring(0, 22);
    //this.crud(this.remainderData,this.flag);
    newnote.reminder = day.toUTCString().substring(0, 22);
    var flag = 'reminder';
    this.crud(newnote, flag);

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
    this.crud(newnote, flag);


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
    this.crud(newnote, flag);

  }


  More(note: any) {
    this.MoreNotes = note;
  }

  pinnedRemainder(note: any) {
    this.NoteId = note;
  }

  ngOnDestroy()
  {
    this.label.unsubscribe();
  }

}
