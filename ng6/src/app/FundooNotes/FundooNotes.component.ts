import { Component, OnInit } from '@angular/core';
import { NotesService } from '../service/notes.service'
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { EditlabelComponent } from '../editlabel/editlabel.component';
import { CreatelabelService } from '../service/createlabel.service';
import { Router } from '@angular/router';
import { CollaboratorComponent } from '../collaborator/collaborator.component';
import { ViewService } from '../service/view.service';
import { DataserviceService } from '../service/dataservice.service';


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
  message: boolean;

  grid: boolean = false;
  list: boolean = true;
  prof: {};
  observer:any;
  base64textString: string;
  image: any;
  cookie: any;
  url: string;

  constructor(private service: CreatelabelService, public dialog: MatDialog,private serviceData: DataserviceService,
    public noteService: NotesService, private router: Router, private viewServiceObj: ViewService) {

    this.changeView();
    this.service.getLabel().subscribe(responseLabel => {

      this.notelabel = responseLabel;
      console.log(this.notelabel);
    });
    let email = localStorage.getItem('email');

    this.serviceData.profileUploadinGet(email).subscribe(Statusdata=> {
      debugger;
      this.url='data:image/jpeg;base64,'+Statusdata;    
      console.log("simran"+Statusdata);
      
    });
  }

  label: string;
  notelabel: any;
  noteView = 'grid';
  email = localStorage.getItem('email');
  username = localStorage.getItem('uname');
  localUrl: any;



  ngOnInit() {
    this.noteService.currentMessage.subscribe(message => this.message = message)
  }
  listview() {

    this.noteService.changeMessage(true)
  }


  
  /**
   * dialog box for label
   */
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
        this.observer=this.service.addLabel({ data }).subscribe(responseData => {
          console.log(responseData);
          this.observer=this.service.getLabel().subscribe(responseLabel => {

            this.notelabel = responseLabel;
            console.log(this.notelabel);
          });
        });
      }
    });
  }

  /**
   * view of notes 
   */
  changeView() {
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

  /**
   * logout button
   */
  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

    /**
   * function is for uploading the image on selected note
   * @param event it is the file to select
   * @param note on that perticular note
   */
  // Fillupload(event) {
  //   this.localUrl = event.target.result;
  //   let email = localStorage.getItem('email');

  //   let data =
  //     [
  //       { 'selectedFile': <File>event.target.files[0],email }
  //     ];

  //     this.observer=this.serviceData.profileUploading(data).subscribe((Statusdata: any) => {
  //       // console.log(Statusdata);
      

  //     });

  // }

  Fillupload(event) {
    debugger;
    var files = event.target.files;
    var file = files[0];
    if (files && file) {
    var reader = new FileReader();
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsBinaryString(file);
    }
    }
    
    _handleReaderLoaded(readerEvt) {
      let email = localStorage.getItem('email');
    debugger;
    var binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
    console.log(btoa(binaryString));
    
    this.serviceData.uploadImage(this.base64textString, email )
    .subscribe(
    (status: any) => {
    console.log("darshuuuu");
    
    
    console.log(status);
    
    this.url = "data:image/jpeg;base64," + status;
    }, error => {
    console.log(error);
    alert(error.error.text)
    });
    this.serviceData.profileUploadinGet(email).subscribe(Statusdata=> {
      debugger;
      this.url='data:image/jpeg;base64,'+Statusdata;    
      console.log("simran"+Statusdata);
      
    });
    }

  search(searchItem) {
    this.viewServiceObj.searchItem(searchItem);
    }
    
    // ngOnDestroy()
    // {
    //   this.observer.unsubscribe();
    // }
}



