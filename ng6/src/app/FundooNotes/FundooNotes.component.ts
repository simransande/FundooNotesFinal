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
  observer: any;
  base64textString: string;
  image: any;
  cookie: any;
  url;
  ispresent: boolean;
  myurl: any;
  urll: any;

  constructor(private service: CreatelabelService, public dialog: MatDialog, private serviceData: DataserviceService,
    public noteService: NotesService, private router: Router, private viewServiceObj: ViewService) {

    this.changeView();
    this.service.getLabel().subscribe(responseLabel => {

      this.notelabel = responseLabel;
      console.log(this.notelabel);
    });
    let email = localStorage.getItem('email');

    this.serviceData.profileUploadinGet(email).subscribe(Statusdata => {
      debugger;
      this.url =  Statusdata;
  
    });
  }

  label: string;
  notelabel: any;
  noteView = 'grid';
  // email = localStorage.getItem('email');
  email;
  username = localStorage.getItem('uname');
  localUrl: any;



  ngOnInit() {
    this.noteService.currentMessage.subscribe(message => this.message = message)
    let observer = this.noteService.fetchUserData();
    debugger;
    observer.subscribe((res: any) => {
      this.email = res.email;
    });
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
      this.label = result;
      let data = [
        { 'label': this.label }
      ];
      if (result != undefined && result != "") {
        this.observer = this.service.addLabel({ data }).subscribe(responseData => {
          this.observer = this.service.getLabel().subscribe(responseLabel => {

            this.notelabel = responseLabel;
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
 * function is for uploading the image on profile
 * @param event it is the file to select
 */

  Fillupload(event) {

    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
debugger;
      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        debugger;
        this.urll = event.target.result;
        console.log(this.urll);
      alert(this.urll)
        let obss = this.serviceData.uploadImage(this.urll, this.email);
        obss.subscribe(
          (res: any) => {
            if (res != "") {
              this.ispresent = true;
              this.url = res;
        
            }
            else {
              this.ispresent = false;
            }
        });
      }
    }
  }

  search(searchItem) {
    this.viewServiceObj.searchItem(searchItem);
  }

  ngOnDestroy()
  {
    this.observer.unsubscribe();
  }
}



