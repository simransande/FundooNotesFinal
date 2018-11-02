import { Component, OnInit } from '@angular/core';
import { NotesService } from '../service/notes.service';
import { CreatelabelService } from '../service/createlabel.service';
import { ViewService } from '../service/view.service';




@Component({
  selector: 'app-bin',
  templateUrl: './bin.component.html',
  styleUrls: ['./bin.component.css']
})
export class BinComponent implements OnInit {

  notes: any;
  labell:any;

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
  DeleteData: number = 1;
  MoreNotes: any;
  NoteId: any;
  DateTime: boolean = false;
  filecolor;
  notes2:any;

  
  constructor(private service: NotesService, private viewService: ViewService,private labelService:CreatelabelService) { 
    this.service.getNote().subscribe(notesData => {
      this.notes = notesData;
      console.log(this.notes);
    })

    this.labelService.getLabel().subscribe(responseLabel => {

      this.labell = responseLabel;
       console.log(this.labell);
    });

    this.service.getLabelid().subscribe(data => {
      debugger;
       this.notes2 = data;
      console.log(this.notes2);         

     });
     this.viewService.getView().subscribe(res => {

      console.log("View Result is ", res);
      this.view = res;
      this.direction = this.view.data;
      console.log("Direction is :", this.direction);

      this.layout = this.direction + " " + this.wrap;
      console.log("Layout is ", this.layout);

    });
    // this.archive = 1;
  }

  ngOnInit() {
  }
  wrap: string = "wrap"
  direction: string = "row";
  layout: string = this.direction + " " + this.wrap;

  public res;
  public view;
  Archive(note: any) {

    var flag = 'archive';
    this.crud(note, flag);
  }

  Trash(note: any){

    var flag='restore';
    this.crud(note,flag);
  }

  dltForever(note:any)
  {
    var flag='dltForever';
    this.crud(note,flag);

  }
  pinNote(note: any) {
   
    var flag = 'pin';
    this.crud(note, flag);
  }


  crud(note: any, flag: any) {
    let data = [
      {
        'id': note.id, 'pin': note.pin, 'description': note.description, 'email': note.email, 'trash': note.trash,
        'title': note.title, 'isarchive': note.archive, 'flag': flag, 'color': note.colorcode
      }
    ];
      this.service.updatenotes({ data }).subscribe((data: any) => {
        this.labelService.getLabel().subscribe(responseLabel => {
      this.service.getNote().subscribe(data => {
        this.notes = data;
        this.labell = responseLabel;
        console.log(this.labell);         
 
       })
      });

    });
  }


  setcolor(color: any, note: any) {
   
    this.getColor = color;
    var data = { 'colorcode': this.getColor, 'id': note.id };
    var flg = 'color';
    this.crud(data, flg);
  }

  today() {
    this.remainderDisplay = true;
    var day = new Date();
    day.setDate(day.getDate());
    this.remainderData = day.toUTCString().substring(0, 22);
  }

  tomorrow() {
    this.remainderDisplay = true;
    var day = new Date();
    day.setDate(day.getDate() + 1);
    this.remainderData = day.toUTCString().substring(0, 22);
  }

  nextWeek() {
    this.remainderDisplay = true;
    var day = new Date();
    day.setDate(day.getDate() + (1 + 7 - day.getDay()) % 7);
    this.remainderData = day.toUTCString().substring(0, 22);
  }

  More(note: any) {
    this.MoreNotes = note;
  }

  pinnedRemainder(note: any) {
    this.NoteId = note;
  }


}

