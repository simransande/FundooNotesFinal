import { Component, OnInit } from '@angular/core';
import { NotesService } from '../service/notes.service'
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { EditlabelComponent } from '../editlabel/editlabel.component';
import { CreatelabelService } from '../service/createlabel.service';
import { Router } from '@angular/router';
import { CollaboratorComponent } from '../collaborator/collaborator.component';
import { ViewService } from '../service/view.service';


//import { NotesService } from '../service/notes.service'
export interface DialogData {
  label: string;
  notelabel: string;
  labelInput: string;

}

@Component({
  selector: 'app-FundooNotes',
  templateUrl: './FundooNotes.component.html',
  styleUrls: ['./FundooNotes.component.css'],
  providers: [CreatelabelService]
})
export class FundooNotesComponent implements OnInit {

  labels: any;
  message:boolean;
  
  grid: boolean = false;
  list: boolean = true;


  constructor(private service: CreatelabelService, public dialog: MatDialog, 
    public noteService: NotesService,private router:Router,private viewServiceObj: ViewService) {

      this.changeView();
    this.service.getLabel().subscribe(responseLabel => {

      this.notelabel = responseLabel;
       console.log(this.notelabel);
    });
  }

  label: string;
  notelabel: any;
  noteView = 'grid';
  email = localStorage.getItem('email');
  //Initial=this.email.substring(0,1);
  //localStorage.setItem('uname', this.name);
  username = localStorage.getItem('uname');



  ngOnInit() {
    this.noteService.currentMessage.subscribe(message => this.message = message)
  }
  listview() {
    
    this.noteService.changeMessage(true)
  }
  // Display:boolean=true;
  
  
  //dialog box for label
  openDialog(): void {
    const dialogRef = this.dialog.open(EditlabelComponent, {

      data: { label: this.notelabel, labelInput: this.label }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.label = result;
      let data = [
        { 'label': this.label }
      ];
      if (result != undefined && result != "") {
        this.service.addLabel({ data }).subscribe(responseData => {
          console.log(responseData);
          this.service.getLabel().subscribe(responseLabel => {

            this.notelabel = responseLabel;
            console.log(this.notelabel);
          });
        });
      }
    });
  }

  //view of notes
  changeView() {
    debugger;
    if (this.list == true) {

      this.grid = true;
      this.list = false;
    }
    else {
      this.list = true;
      this.grid = false;
    }

    this.viewServiceObj.gridview()


  }

  //logout button
  logout()
  {
      // localStorage.removeItem('email');
      localStorage.clear();
      this.router.navigate(['/login']);
  }

}



