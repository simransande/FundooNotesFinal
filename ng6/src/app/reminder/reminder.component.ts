import { Component, OnInit } from '@angular/core';
import { NotesService } from '../service/notes.service';
import { CollaboratorComponent } from '../collaborator/collaborator.component';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { CreatelabelService } from '../service/createlabel.service';
import { ViewService } from '../service/view.service';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.css']
})
export class ReminderComponent implements OnInit {

  notes: any;
  model: any = {}
  archive: number = 0;
  pin: number = 0;
  trash: number = 0;
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
  labell: any;
  notes2: any;
  collaborator: any;
  labels: any;
  fulldate: any;
  observe:any;
  base64textString: string;
  Email: any = localStorage.getItem('email');


  constructor(private service: NotesService, public dialog: MatDialog,
    private labelService: CreatelabelService, iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer, private viewService: ViewService) {
    this.service.getNote().subscribe(notesData => {
      this.notes = notesData;
      console.log(this.notes);
    })
    this.labelService.getLabel().subscribe(responseLabel => {
      this.labell = responseLabel;
      console.log(this.labell);
    });
    this.service.getCollaborator().subscribe(data => {
      this.collaborator = data;
    });

    this.service.getLabelid().subscribe(data => {
      debugger;
      this.notes2 = data;
      console.log(this.notes2);

    });

    iconRegistry.addSvgIcon(
      'pin123',
    
      /**
       * Bypass security and trust the given value 
       * to be a safe resource URL, i.e. a location that may be used to 
       * load executable code
       */
      sanitizer.bypassSecurityTrustResourceUrl('../../assets/pin.svg'));
    this.viewService.getView().subscribe(res => {

      console.log("View Result is ", res);
      this.view = res;
      this.direction = this.view.data;
      console.log("Direction is :", this.direction);

      this.layout = this.direction + " " + this.wrap;
      console.log("Layout is ", this.layout);

    });
  }

  ngOnInit() {
  }
  notes1: any;
  wrap: string = "wrap"
  direction: string = "row";
  layout: string = this.direction + " " + this.wrap;

  public res;
  public view;

  /**
   * function for archive the note
   * @param note on that perticular note
   */
  Archive(note: any) {
    var flag = 'archive';
    this.crud(note, flag);
  }

  /**
   * function for delete the note
   * @param note on thet particular note
   */
  Trash(note: any) {
    var flag = 'trash';
    this.crud(note, flag);
  }

  /**
   * function is for delete the remider
   * @param note on that perticular note
   */
  deletRem(note: any) {
    var flag = 'dltReminder'
    this.crud(note, flag);
  }

  /**
   * function is for pinned the note
   * @param note on that prticular note
   */
  pinNote(note: any) {
    var flag = 'pin';
    this.crud(note, flag);
  }

  /**
   * function is for showing the reminder on that note
   * @param note which one is selected
   */
  Reminder(note: any) {
    this.notes1 = note;
  }

  /**
   * function is for updatig the notes
   * @param note to that particular note
   * @param flag passing the string to backend to initilize the function/operation
   */
  crud(note: any, flag: any) {

    let data = [
      {
        'id': note.id, 'pin': note.pin, 'description': note.description, 'email': note.email, 'trash': note.trash,
        'title': note.title, 'isarchive': note.archive, 'flag': flag, 'color': note.colorcode,
        'reminder': note.reminder
      }
    ];
    this.observe=this.service.updatenotes({ data }).subscribe((data: any) => {
      this.observe=this.labelService.getLabel().subscribe(responseLabel => {

        this.observe=this.service.getNote().subscribe(data => {
          this.notes = data;
          this.labell = responseLabel;
          console.log(this.labell);

        })
      });

    });
  }

/**
* variable to store the note id of image to be added
*/
imageNoteId:any;
/**
* @method onSelectFile()
* @return void
* @description Function to save the image 
*/
onSelectFile(event, noteId) {
debugger;
this.imageNoteId = noteId;
// alert(this.imageNoteId);
var files = event.target.files;
var file = files[0];
if (files && file) {
var reader = new FileReader();
reader.onload = this._handleReaderLoaded.bind(this);
reader.readAsBinaryString(file);
}
}

_handleReaderLoaded(readerEvt) {
var binaryString = readerEvt.target.result;
this.base64textString = btoa(binaryString);
this.notes.forEach(element => {
if (element.id == this.imageNoteId) {
element.image = "data:image/jpeg;base64," + this.base64textString;
}
});

let obss = this.service.noteSaveImage(this.base64textString, this.Email, this.imageNoteId);
obss.subscribe(
(res: any) => {
});

}
  /**
   * open dailog box for collaborator
   */
  openDialogcoll(): void {
    const dialogRef = this.dialog.open(CollaboratorComponent, {
    });
  }

  //set the color of note
  /**
   * function for set the color
   */
  setcolor(color: any, note: any) {
    debugger;
    this.getColor = color;
    var data = { 'colorcode': this.getColor, 'id': note.id,'description': note.description, 'title': note.tittle };
    var flg = 'color';
    this.crud(data, flg);
  }

  /**
   * function is for setting reminder for today button
   */
  today() {
    var newnote = this.notes1;
    this.remainderDisplay = true;
    var day = new Date();
    this.fulldate = day.toDateString() + " 08:00";
    newnote.reminder = this.fulldate;
    var flag = 'reminder';
    this.crud(newnote, flag);
  }

  /**
   * function is for setting reminder for tommorow button
   */
  tomorrow() {
    var newnote = this.notes1;
    this.remainderDisplay = true;
    var flag = 'reminder';
    var day = new Date();
    var fulldate = (day.toDateString() + 1) + " 08:00";
    newnote.reminder = fulldate;
    this.crud(newnote, flag);
  }

  /**
   * function is for setting the reminder for nextweek button
   */
  nextWeek() {
    var newnote = this.notes1;
    this.remainderDisplay = true;
    var flag = 'reminder';
    var day = new Date();
    var fulldate = (day.toDateString() + (1 + 7 - day.getDay()) % 7) + " 08:00";
    newnote.reminder = fulldate;
    this.crud(newnote, flag);

  }

  /**
   * function for the more button
   * @param note on that particular note
   */
  More(note: any) {
    this.MoreNotes = note;
  }

  pinnedRemainder(note: any) {
    this.NoteId = note;
  }

  // ngOnDestroy()
  // {
  //   this.observe.unsubscribe();
  // }
}

