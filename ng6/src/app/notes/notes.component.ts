import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataserviceService } from '../service/dataservice.service';
import { NotesService } from '../service/notes.service'
import { FormControl, Validators } from '@angular/forms';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material';
import { CollaboratorComponent } from '../collaborator/collaborator.component';
import { ViewService } from '../service/view.service';
import { EditnoteComponent } from '../editnote/editnote.component';
import { CreatelabelService } from '../service/createlabel.service';
import { interval } from 'rxjs';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

export interface DialogData 
{
  tittle: any;
  noteDes: string;
  note:any;
  notes:any;
  label:any;
}
export interface CollaboratorData
{
  sharedid:any;
  email:any;
  shareEmail:any;
}

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
  providers: [NotesService]

})

export class NotesComponent implements OnInit 
{
  message:boolean;
  tittle: any;
  noteDes: any;
  alldata :any;

  ngOnInit() 
  {
       this.service.currentMessage.subscribe((message:any) => {
       this.message = message
       console.log(message);
       });
  }

  m:any;
  Ini:any;
  Initial: any;
  imgUrl:any;
  colored: any;
  selectedFile: any;
  Image: any;
  notes: any;
  collabNotes:any;
  labell:any;
  collaborator:any;
  Initial1:any;
  localUrl: any;
  sharedEmail:any;
  sharedNote:any;
  email:any;
  notes1: any;
  labels:any;
  flag:any;
  model: any = {}
  archive: number = 0;
  reminder:any;
  dltReminder:any;
  dltLabel:any;
  trash: number = 0;
  pin: number = 0;
  unpin: number = 1;
  mainCard: boolean = true;
  createCard: boolean = false;
  getColor: any;
  remainderDisplay: boolean = false;
  colorDisplay:boolean=false;
  imageDisplay:boolean=false;
  remainderData: any;
  remainder: any;
  remaindergetdata:any;
  DeleteData: number = 0;
  NoteId: any;
  DateTime: boolean = false;
  filecolor;
  notes2:any;
  sharedid:any;
  notescount: any;
 Email:any = localStorage.getItem('email');
 reminderdataonly = new Array();
 fulldate:any;
  wrap: string = "wrap"
  direction: string = "row";
  layout: string = this.direction + " " + this.wrap;

  public res;
  public view;

  
  // injectable service that allows you to associate icon 
  // names with SVG URLs, HTML strings and to define
  //  aliases for CSS font classes
  constructor(private service: NotesService,private labelService:CreatelabelService, 
              iconRegistry: MatIconRegistry,sanitizer: DomSanitizer, public dialog: MatDialog,    
              private viewService: ViewService)
              
          {

              this.service.getNotesColl().subscribe(response=>
              {
              this.collabNotes=response;
              console.log(response);
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
            
              this.service.getNote().subscribe(notesData => 
              {
              debugger;
              this.alldata = notesData;
              console.log(this.notes);
             });

             iconRegistry.addSvgIcon('pin123',
              //  Bypass security and trust the given value 
              //  to be a safe resource URL, i.e. a location that may be used to 
              //  load executable code
              sanitizer.bypassSecurityTrustResourceUrl('../../assets/pin.svg'));
              this.callfirst();

              this.labelService.getLabel().subscribe(responseLabel => 
              {
                debugger;
              this.labell = responseLabel;
              console.log(this.labell);
              });

              this.service.getLabelid().subscribe(data => 
              {
                debugger;
              this.notes2 = data;
              console.log(this.notes2);         
              });

              this.service.getCollaborator().subscribe(data=>
              {
                debugger;
              this.collaborator=data;
              this.m=this.collaborator["0"];
              // this.m=this.collaborator.sharedEmail;
              //  this.Ini=this.m.substring(0,1);
              });
   
              interval(1000).subscribe(x =>
              { 
                var day = new Date();
                var fulldate = day.toDateString() + " " + day.getHours()%12 + ":" + day.getMinutes();
                  for (var i = 0; i < this.notescount; i++)
                   {
                    if (this.notes[i].reminder != "") 
                    {
                      this.reminderdataonly.push(this.notes[i]);
                  
                      if (this.notes[i].reminder == fulldate) 
                      {
                        alert(this.notes[i].description)
                        break;
                      }
                      
                    }
                   }
  
                  this.reminderdataonly = [];
                });

      
          }
 

  //drop the dragged note
  drop(event: CdkDragDrop<string[]>) 
  {
    alert(1);
    moveItemInArray(this.alldata, event.previousIndex, event.currentIndex);
  }

  callfirst() 
  {
    this.service.getNote()
    .subscribe(notesData => 
      {
        this.notes = notesData;
        this.notescount = Object.keys(notesData).length;
      });
  }

  //note box
  createNote()
  {
    this.mainCard = false;
    this.createCard = true;
  }

  //full note box on click
  closeNote() 
  {
    debugger;
    this.model;
    let data =
      [
      { 'title': this.model.title, 'description': this.model.note,'reminder':this.fulldate,
      'color':this.colored,'image':this.imgUrl}
      ];
   
    if ((this.model.title != "" || this.model.note != "") && (this.model.title != undefined || this.model.note != undefined))
    {
      this.service.Notes({ data }).subscribe((data: any) => 
      {
        this.service.getNote().subscribe(data =>
         {
           debugger;
          this.alldata = data;
         });
      });

      this.model.title = "";
      this.model.note = "";
      this.remainderData="";
      this.remainderDisplay=true;
      this.getColor=true;
      this.imageDisplay=true;
      this.archive = 0;
      this.pin = 0;
      this.trash= 0;
      this.reminder='';
      this.mainCard = true;
      this.createCard = false;
      this.imgUrl='';
    }
    else 
    {
      this.mainCard = true;
      this.createCard = false;
    }
  }

  //onclick Archive
  Archive(note: any)
  {
    var flag = 'archive';
    this.crud(note, flag);
  }

  //onclick Reminder
  Reminder(note: any)
  {
    this.notes1=note;
  }

  //reminder delete
  deletRem(note:any)
  {
    var flag='dltReminder'
    this.crud(note,flag);
  }

  //delete label
  deletLabel(note:any)
  {
    this.service.deleteLabel(note).subscribe((note: any) =>
     {
      this.service.getLabelid().subscribe(data =>
         {
           this.notes2 = data;
           console.log(this.notes);         
         });

     });
  }

  //onclick Trash
  Trash(note: any)
  {    
    var flag='trash';
    this.crud(note,flag);
  }

  //onclick pinNote
  pinNote(note: any)
  {   
    var flag = 'pin';
    this.crud(note, flag);
  }

  //onclick set color
  setcolor(color: any, note: any) 
  {
    if(note=='')
    {
      console.log('got it'); 
      this.colored=color;
    }
    this.getColor = color;
    var data = { 'colorcode': this.getColor, 'id': note.id, 'description': note.description,'tittle': note.tittle};
    var flag = 'color';
    this.crud(data, flag);
  }

  today() 
  {
    var newnote = this.notes1;
    this.remainderDisplay = true;
    var day = new Date();
    this.fulldate = day.toDateString() + " 08:00";
    newnote.reminder = this.fulldate;
    var flag = 'reminder';
    this.crud(newnote, flag);
  }

  more(note:any)
  {
    this.notes1=note;
  }

  //show label
  labelShow1(label: any)
  {
    var newnote=this.notes1;
    var data={'noteId':newnote.id,'labelId':label.id};
    this.service.setLabelid(data).subscribe((label: any) => 
    {
      this.service.getLabelid().subscribe(data =>
        {
          debugger;
          this.notes2 = data;
          this.labels=label;
        });
    });
  }

  //onclick tomorrow()
  tomorrow() 
  {
    var newnote=this.notes1;
    this.remainderDisplay = true;
    var flag='reminder';
    var day = new Date();
    var fulldate = (day.toDateString()+1) + " 08:00";
    newnote.reminder = fulldate;
    this.crud(newnote, flag);
  }

  //onclick nextWeek()
  nextWeek()
  {
    var newnote=this.notes1;
    this.remainderDisplay = true;
    var flag='reminder';
    var day = new Date();
    var fulldate = (day.toDateString()+(1 + 7 - day.getDay()) % 7) + " 08:00";
    newnote.reminder = fulldate;
    this.crud(newnote, flag);

  }

  //crud operation
  crud(note: any, flag: any)
  {
    let data = 
    [
      {'id': note.id, 'pin': note.pin, 'description': note.description, 'email': note.email,'trash': note.trash,'title': note.tittle, 'isarchive': note.archive,'flag': flag, 'color': note.colorcode, 'reminder':note.reminder}
    ];
    
    this.service.updatenotes({ data }).subscribe((data: any) => 
    {
      this.labelService.getLabel().subscribe(responseLabel => 
        {
          this.service.getCollaborator().subscribe(data=>
            {
              this.collaborator=data;
              this.service.getNote().subscribe(data => 
                {              
                  this.alldata = data;
                  this.labell = responseLabel;          
                });
                
            });
        
        });
    });
  }

  //select the id,image for uploading the image 
  Fillupload(event, note: any) 
  {    
    this.localUrl = event.target.result;
    let data = 
         [
          { 'selectedFile': <File>event.target.files[0], 'id': note.id, 'image': note.image, 'description': note.description,'title': note.tittle}
         ];
         
        this.service.uploading({data}).subscribe((data:any)=>
        {
          this.service.getNote().subscribe(data=>
            {
              this.imgUrl=data;
              this.alldata=data;
            });
        });
   
  }

     
  //dialog box for collaborator
  openDialogcoll(note): void
  {
    const dialogRef = this.dialog.open(CollaboratorComponent,
       { 
        data: {sharedid:note.id,note:note,shareEmail:this.sharedEmail}  
       });

        dialogRef.afterClosed().subscribe(result =>
        {
          console.log('The dialog was closed');
          this.email = result;
          let data = 
          [{ 'mail': this.email}];

          if (result != undefined && result != "")    
          this.service.collaborator({ data }).subscribe((response: any) => 
          { 
            this.notes1=note;
            var newnote=this.notes1;
            var sharedWith=response.email;

            this.service.addCollaborator(note,sharedWith).subscribe((response: any) =>
            {
              this.service.getCollaborator().subscribe(data=>{
              });
            });
          });

          dialogRef.afterClosed().subscribe(result => 
          {
          console.log("Dialog result:" + result);
          });
        });
  }
  
  //dialog box for edit note
  openDialogEdit(note):void
  {
    const dialogRef = this.dialog.open(EditnoteComponent, 
      {
        data:{tittle: note}
      });

    dialogRef.afterClosed().subscribe(result => 
      {
        console.log("Dialog result:" + result);
      });
  }

}


