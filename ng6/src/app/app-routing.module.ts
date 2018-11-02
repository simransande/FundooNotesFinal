import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import{RegistrationComponent} from './registration/registration.component';
import { LoginComponent} from './login/login.component';
import { FundooNotesComponent } from './FundooNotes/FundooNotes.component';
import { ForgotPasswordComponent } from './ForgotPassword/ForgotPassword.component';
import { NotesComponent } from './notes/notes.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { ArchiveComponent } from './archive/archive.component';
import { BinComponent } from './bin/bin.component';
import { EditlabelComponent } from './editlabel/editlabel.component';
import { ReminderComponent } from './reminder/reminder.component';
import { CollaboratorComponent } from './collaborator/collaborator.component';
import { EditnoteComponent } from './editnote/editnote.component';
import { LabelComponent } from './label/label.component';
import { AuthGuard } from './auth.guard';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      
      { path: 'registration', component: RegistrationComponent },
      { path: 'login', component: LoginComponent },
      { path: 'ForgotPassword', component: ForgotPasswordComponent },
      { path: 'resetpassword', component: ResetpasswordComponent },
      { path: 'FundooNotes', component: FundooNotesComponent,canActivate: [AuthGuard],
       children:[
        {path: '',component:NotesComponent},
        { path: 'archive', component: ArchiveComponent },
        {path: 'notes',component:NotesComponent,
        children:[
          { path: 'collaborator', component: CollaboratorComponent },
          { path: 'editnote', component: EditnoteComponent }
        ]},
        { path: 'bin', component: BinComponent },
        { path: 'label', component: LabelComponent },

        { path: 'editlabel', component: EditlabelComponent },
        { path: 'reminder', component: ReminderComponent }
        

        ]
     },
     
     
    ])
  ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
