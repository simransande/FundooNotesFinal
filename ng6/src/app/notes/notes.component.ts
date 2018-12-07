import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataserviceService } from '../service/dataservice.service';
import { NotesService } from '../service/notes.service'
import { FormControl, Validators } from '@angular/forms';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { CollaboratorComponent } from '../collaborator/collaborator.component';
import { ViewService } from '../service/view.service';
import { EditnoteComponent } from '../editnote/editnote.component';
import { CreatelabelService } from '../service/createlabel.service';
import { interval, Subscription } from 'rxjs';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
// import { CookieService } from "angular2-cookie";
import {Note} from '../core/model/note';


export interface DialogData {
  tittle: any;
  noteDes: string;
  note: any;
  notes: any;
  label: any;
}
export interface CollaboratorData {
  sharedid: any;
  email: any;
  shareEmail: any;
}

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
  providers: [NotesService]

})

export class NotesComponent implements OnInit {
  message: boolean;
  tittle: any;
  noteDes: any;
  alldata: any;
  m: any;
  Ini: any;
  Initial: any;
  imgUrl: any;
  colored: any;
  selectedFile: any;
  Image: any;
  notes: any;
  collabNotes: any;
  labell: any;
  collaborator: any;
  Initial1: any;
  localUrl: any;
  sharedEmail: any;
  sharedNote: any;
  email: any;
  notes1: any;
  labels: any;
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
  notes2: any;
  sharedid: any;
  notescount: any;
  Email: any = localStorage.getItem('email');
  reminderdataonly = new Array();
  fulldate: any;
  wrap: string = "wrap"
  direction: string = "row";
  layout: string = this.direction + " " + this.wrap;
  // alldata: Note[] =[];
  imageId:any;

  public res;
  public view;
  

  searchSubscription: Subscription;
  searchItem: any;
  iserror: boolean;
  errorMessage: any;
  base64textString: string;
  url: string;
  image: any;
  registration: any;


  ngOnInit() {
    this.service.currentMessage.subscribe((message: any) => {
      this.message = message
      console.log(message);
    });
    // obs.unsubscribe();
  }

 

 

  /**
   *   injectable service that allows you to associate icon names with SVG URLs,
   *   HTML strings and to define
   *   aliases for CSS font classes
   * @param service service of note service
   * @param labelService service of create label service
   * @param dialog for mat dialog
   * @param viewService for service of view
   */
  constructor(private service: NotesService, private labelService: CreatelabelService,
    iconRegistry: MatIconRegistry, sanitizer: DomSanitizer,
    public dialog: MatDialog,

    private viewService: ViewService) {

         
    this.service.getNotesColl().subscribe(response => {
      this.collabNotes = response;
    });

    this.viewService.getView().subscribe(res => {

      this.view = res;
      this.direction = this.view.data;

      this.layout = this.direction + " " + this.wrap;

    });

    this.service.getNote().subscribe(notesData => {
      debugger;
      this.alldata = notesData;
    });

    iconRegistry.addSvgIcon('pin123',

      /**
       * Bypass security and trust the given value 
       *  to be a safe resource URL, i.e. a location that may be used to 
       *  load executable code
       */
      sanitizer.bypassSecurityTrustResourceUrl('../../assets/pin.svg'));
    this.callfirst();

    this.labelService.getLabel().subscribe(responseLabel => {
      this.labell = responseLabel;
      console.log(this.labell);
    });

    this.service.getLabelid().subscribe(data => {
      this.notes2 = data;
    });

    this.service.getCollaborator().subscribe(data => {

      this.collaborator = data;
      this.m = this.collaborator["0"];

    });

    this.searchSubscription = this.viewService
      .getsearchItem()
      .subscribe(message => {
        this.searchItem = message;
      });

    interval(1000).subscribe(x => {
      var day = new Date();
      var fulldate = day.toDateString() + " " + day.getHours() % 12 + ":" + day.getMinutes();
      for (var i = 0; i < this.notescount; i++) {
        if (this.notes[i].reminder != "") {
          this.reminderdataonly.push(this.notes[i]);

          if (this.notes[i].reminder == fulldate) {
            alert(this.notes[i].description)
            break;
          }

        }
      }

      this.reminderdataonly = [];
    });


  }

  /**
   * drop the dragged note 
   * @param event for droping on that event 
   */
 
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.alldata, event.previousIndex, event.currentIndex);
    let diff: any;
    let direction: any;

    if (event.currentIndex > event.previousIndex) {
      direction = "upward";
      diff = event.currentIndex - event.previousIndex;
    } else {
      diff = event.previousIndex - event.currentIndex;
      direction = "downward";
    }

    let email = this.Email;
    debugger;
    let obs = this.service.dragnotes(
      email,
      this.alldata[event.currentIndex].DragAndDropID,
      diff,
      direction
    );
    obs.subscribe(
      (notes: any) => {
      },
      error => {
        this.iserror = true;
        this.errorMessage = error.message;
      }
    );
  }

  callfirst() {
    this.service.getNote()
      .subscribe(notesData => {
        this.notes = notesData;
        this.notescount = Object.keys(notesData).length;
      });
  }

  /**
   * @method is for opening the full card 
   */
  createNote() {
    this.mainCard = false;
    this.createCard = true;
  }

  /**
   * full note box on click 
   */
  closeNote() {
    this.model;
    let data =
      [
        {
          'title': this.model.title, 'description': this.model.note, 'reminder': this.fulldate,
          'color': this.colored, 'image': this.imgUrl
        }
      ];

    if ((this.model.title != "" || this.model.note != "") && (this.model.title != undefined || this.model.note != undefined)) {
      this.service.Notes({ data }).subscribe((data: any) => {
        this.service.getNote().subscribe(data => {
          this.alldata = data;
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

  /**
   * function for archive the note
   * @param note that perticular note
   */
  Archive(note: any) {
    var flag = 'archive';
    this.crud(note, flag);
  }

  /**
   * function for set the reminder
   * @param note that perticular note
   * 
   */
  Reminder(note: any) {
    this.notes1 = note;
  }

  /**
   * function for delete the reminder
   * @param note that perticular note
   */
  deletRem(note: any) {
    var flag = 'dltReminder'
    this.crud(note, flag);
  }

  /**
   * function for delete the label on that perticular note
   * @param note on that perticular note
   */
  deletLabel(note: any) {
    this.service.deleteLabel(note).subscribe((note: any) => {
      this.service.getLabelid().subscribe(data => {
        this.notes2 = data;
      });

    });
  }

  /**
   * function for delete the note
   * @param note on that note
   */
  Trash(note: any) {
    var flag = 'trash';
    this.crud(note, flag);
  }

  /**
   * function is for pined the note
   * @param note on that perticular note
   */
  pinNote(note: any) {
    var flag = 'pin';
    this.crud(note, flag);
  }


  /**
   * function for setting the color
   * @param color choose the color
   * @param note on that paerticular note
   */
  setcolor(color: any, note: any) {
    debugger;
    if (note == '') {
      this.colored = color;
    }
    this.getColor = color;
    var data = { 'colorcode': this.getColor, 'id': note.id, 'description': note.description, 'tittle': note.tittle };
    var flag = 'color';
    this.crud(data, flag);
  }

  /**
   * functin for set reminder for today button
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
   *  function for more button
   * @param note that paerticular note
   */
  more(note: any) {
    this.notes1 = note;
  }

  /**
   * function for showing the label
   */
  labelShow1(label: any) {
    var newnote = this.notes1;
    var data = { 'noteId': newnote.id, 'labelId': label.id };
    this.service.setLabelid(data).subscribe((label: any) => {
      this.service.getLabelid().subscribe(data => {
        this.notes2 = data;
        this.labels = label;
      });
    });
  }

  /**
   * function for setting the reminder for tommorow
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
   * function for setting the reminder for nextweek button
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

  //crud operation
  /**
   * function for creating note and update thatnote
   * @param note on that perticular note
   * @param flag passing string to backend to find the funtion/operation
   */
  crud(note: any, flag: any) {
    let data =
      [
        { 'id': note.id, 'pin': note.pin, 'description': note.description, 'email': note.email, 'trash': note.trash, 'title': note.tittle, 'isarchive': note.archive, 'flag': flag, 'color': note.colorcode, 'reminder': note.reminder }
      ];

    this.service.updatenotes({ data }).subscribe((data: any) => {
      this.labelService.getLabel().subscribe(responseLabel => {
        this.service.getCollaborator().subscribe(data => {
          this.collaborator = data;
          this.service.getNote().subscribe(data => {
            this.alldata = data;
            this.labell = responseLabel;
          });

        });

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
if (element.id == this.imageNoteId) 
{
element.image = "data:image/jpeg;base64," + this.base64textString;
}
});

let obss = this.service.noteSaveImage(this.base64textString, this.Email, this.imageNoteId);
obss.subscribe(
(res: any) => {
});


}

  
  /**
   * function for opening the dailog box for collaborator
   * @param note dailog box will be open on that particular note
   */
  openDialogcoll(note): void {
    const dialogRef = this.dialog.open(CollaboratorComponent,
      {
        data: { sharedid: note.id, note: note, shareEmail: this.sharedEmail }
      });

    dialogRef.afterClosed().subscribe(result => {
      this.email = result;
      let data =
        [{ 'mail': this.email }];

      if (result != undefined && result != "")
        this.service.collaborator({ data }).subscribe((response: any) => {
          this.notes1 = note;
          var newnote = this.notes1;
          var sharedWith = response.email;

          this.service.addCollaborator(note, sharedWith).subscribe((response: any) => {
            this.service.getCollaborator().subscribe(data => {
            });
          });
        });

      dialogRef.afterClosed().subscribe(result => {
      });
    });
  }

  /**
   * function for opening dialog box for edit
   * @param note 
   */
  openDialogEdit(note): void {
    const dialogRef = this.dialog.open(EditnoteComponent,
      {
        data: { tittle: note }
      });

    dialogRef.afterClosed().subscribe(result => {
    });
  }


  ngOnDestroy()
  {
    this.registration.unsubscribe();
  }
}


