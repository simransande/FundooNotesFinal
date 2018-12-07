import { Component, OnInit, Inject } from '@angular/core';
import { DialogData } from '../FundooNotes/FundooNotes.component';
// import { MAT_DIALOG_DATA } from '@angular/material';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { NotesService } from '../service/notes.service'
import { CollaboratorData } from '../notes/notes.component';
import { LoggerService } from '../service/logger/logger.service';

@Component({
  selector: 'app-collaborator',
  templateUrl: './collaborator.component.html',
  styleUrls: ['./collaborator.component.css']
})
export class CollaboratorComponent implements OnInit {
  mail = localStorage.getItem('email');
  username = localStorage.getItem('uname');
  Initial = this.mail.substring(0, 1);
  collaborator: any;
  model: any = {}
  notes: any;
  sharedEmail: any;

  constructor(private service: NotesService, private loggerService: LoggerService, public dialogRef: MatDialogRef<CollaboratorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CollaboratorData) { }

  ngOnInit() {
    this.service.getCollaborator().subscribe(response => {
      this.collaborator = response;
      LoggerService.log('success');
      for (var item of this.collaborator) {
        if (this.data.sharedid == item.noteId) {
          this.sharedEmail = item.sharedEmail;
        }
      }
    });
  }

}


