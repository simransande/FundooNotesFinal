import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotesService } from '../service/notes.service'
import { ViewService } from '../service/view.service';
import { CreatelabelService } from '../service/createlabel.service';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { LoggerService } from '../service/logger/logger.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit, OnDestroy {

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
  DeleteData: number = 0;
  MoreNotes: any;
  NoteId: any;
  DateTime: boolean = false;
  filecolor;
  notes1: any;
  labell: any;
  notes2: any;
  observer: any;
  observerGet: any;
  base64textString: string;
  Email: any = localStorage.getItem('email');


  constructor(private service: NotesService, private viewService: ViewService,
    iconRegistry: MatIconRegistry, sanitizer: DomSanitizer,
    private labelService: CreatelabelService, private loggerService: LoggerService) {

    this.service.getNote().subscribe(notesData => {
      this.notes = notesData;
    })

    this.labelService.getLabel().subscribe(responseLabel => {
      this.labell = responseLabel;
    });

    this.service.getLabelid().subscribe(data => {
      this.notes2 = data;
    });

    this.viewService.getView().subscribe(res => {
      LoggerService.logdata('view Result is', res);

      this.view = res;
      this.direction = this.view.data;
      LoggerService.logdata('Direction is :', this.direction);

      this.layout = this.direction + " " + this.wrap;
      LoggerService.logdata('Layout is', this.layout);

    });
    iconRegistry.addSvgIcon('pin123',
      // Bypass security and trust the given value 
      // to be a safe resource URL, i.e. a location that may be used to 
      // load executable code
      sanitizer.bypassSecurityTrustResourceUrl('../../assets/pin.svg'));

  }

  ngOnInit() {
  }
  wrap: string = "wrap"
  direction: string = "row";
  layout: string = this.direction + " " + this.wrap;

  public res;
  public view;

  /**
   * for the archive function
   */
  Archive(note: any) {
    var flag = 'archive';
    this.crud(note, flag);
  }


  /**
   * @param note delete/trash the particular note
   */
  Trash(note: any) {
    var flag = 'trash';
    this.crud(note, flag);
  }

  /**
   * for the reminder function
   */
  Reminder(note: any) {
    this.notes1 = note;
  }


  /**
   * @param note crude operation for update and get the note 
   * @param flag the string is passing to backend for finding pareticular function
   */
  crud(note: any, flag: any) {

    let data =
      [
        {
          'id': note.id, 'pin': note.pin, 'description': note.description, 'email': note.email, 'trash': note.trash,
          'title': note.tittle, 'isarchive': note.archive,
          'reminder': note.reminder, 'flag': flag, 'color': note.colorcode
        }
      ];
    this.observer = this.service.updatenotes({ data }).subscribe((data: any) => {
      this.observerGet = this.service.getNote().subscribe(data => {
        this.notes = data;
      });

    });
  }

  /**
   * setcolor is function for set the color to any note
   * @param color to set the color
   * @param note set color for that perticular note
   */
  setcolor(color: any, note: any) {
    this.getColor = color;
    var data = { 'colorcode': this.getColor, 'id': note.id };
    var flg = 'color';
    this.crud(data, flg);
  }

  /**
   * onclick today button
   */
  today() {
    var newnote = this.notes1;
    this.remainderDisplay = true;
    var day = new Date();
    var fulldate = day.toDateString() + " 08:00";
    newnote.reminder = fulldate;
    var flag = 'reminder';
    this.crud(newnote, flag);
  }

  /**
   * onclick tommorrow button
   */
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

  /**
   * onclick of nextweek button
   */
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

  /**
   * 
   * @param note for more menu on theat perticular note
   */
  More(note: any) {
    this.MoreNotes = note;
  }

  /**
   * 
   * @param note pined that perticular note
   */
  pinnedRemainder(note: any) {
    this.NoteId = note;
  }
  ngOnDestroy() {
    // this.observer.unsubscribe();
    // this.observerGet.unsubscribe();
  }


  /**
  * variable to store the note id of image to be added
  */
  imageNoteId: any;
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
      if (element.id == this.imageNoteId) {
        element.image = "data:image/jpeg;base64," + this.base64textString;
      }
    });

    let obss = this.service.noteSaveImage(this.base64textString, this.Email, this.imageNoteId);
    obss.subscribe(
      (res: any) => {
      });

  }

}
