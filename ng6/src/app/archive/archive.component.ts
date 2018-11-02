import { Component, OnInit } from '@angular/core';
import { NotesService } from '../service/notes.service'
import { ViewService } from '../service/view.service';
import { CreatelabelService } from '../service/createlabel.service';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {

  notes: any;
  model: any = {}
  archive: number = 0;
  pin: number = 0;
  trash:number=0;
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
  labell:any;
  notes2:any;


  constructor(private service: NotesService, private viewService: ViewService,
    iconRegistry: MatIconRegistry,sanitizer: DomSanitizer,private labelService:CreatelabelService) 
    { 
              
              this.service.getNote().subscribe(notesData =>
                {      
                  this.notes = notesData;
                })

              this.labelService.getLabel().subscribe(responseLabel => 
                {
                  this.labell = responseLabel;
                });
              
              this.service.getLabelid().subscribe(data => 
                {
                  this.notes2 = data;
                });

              this.viewService.getView().subscribe(res => 
                {
                console.log("View Result is ", res);
                this.view = res;
                this.direction = this.view.data;
                console.log("Direction is :", this.direction);
                this.layout = this.direction + " " + this.wrap;
                console.log("Layout is ", this.layout);
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

  //onclick archive
  Archive(note: any) 
  {
    var flag = 'archive';
    this.crud(note, flag);
  }

  //onclick Trash
  Trash(note: any)
  {
    var flag='trash';
    this.crud(note,flag);
  }

  //onclick Reminder
  Reminder(note: any)
  {
    this.notes1=note;     
  }

  //crud operation for update and getnotes
  crud(note: any, flag: any)
  {

    let data =
     [
      {
        'id': note.id, 'pin': note.pin, 'description': note.description, 'email': note.email, 'trash': note.trash,
        'title': note.title, 'isarchive': note.archive,
        'reminder':note.reminder, 'flag': flag, 'color': note.colorcode
      }
     ];
      this.service.updatenotes({ data }).subscribe((data: any) => 
      {
        this.service.getNote().subscribe(data => 
          {
           this.notes = data;
          });

      });
  }

  //color select
  setcolor(color: any, note: any) 
  {
    this.getColor = color;
    var data = { 'colorcode': this.getColor, 'id': note.id };
    var flg = 'color';
    this.crud(data, flg);
  }

  //onclick today()
  today() 
  {
    var newnote = this.notes1;
    this.remainderDisplay = true;
    var day = new Date();
    var fulldate = day.toDateString() + " 08:00";
    newnote.reminder = fulldate;
    var flag = 'reminder';
    this.crud(newnote, flag);
  }

  //onclick tomorrow()
  tomorrow() {
    var newnote=this.notes1;
    this.remainderDisplay = true;
    var flag='reminder';
    var day = new Date();
    day.setDate(day.getDate() + 1);
    this.remainderData = day.toUTCString().substring(0, 22);
    newnote.reminder=day.toUTCString().substring(0, 22);
    this.crud(newnote, flag);


  }

  //onclick nextWeek()
  nextWeek() {
    var newnote=this.notes1;

    this.remainderDisplay = true;
    var flag='reminder';
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


}


