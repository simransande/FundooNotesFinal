import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
//import {FormsModule} from "@angular/forms";
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import {MatChipsModule} from '@angular/material/chips';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { DataserviceService } from './service/dataservice.service';
import { FundooNotesComponent } from './FundooNotes/FundooNotes.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import { ForgotPasswordComponent } from './ForgotPassword/ForgotPassword.component';
import { NotesComponent } from './notes/notes.component';
// import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTooltipModule} from '@angular/material/tooltip';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import {MatMenuModule} from '@angular/material/menu';
import { ArchiveComponent } from './archive/archive.component';
import { BinComponent } from './bin/bin.component';
import {MatDialogModule} from '@angular/material/dialog';
import { EditlabelComponent } from './editlabel/editlabel.component';
import { ReminderComponent } from './reminder/reminder.component';
 import { CollaboratorComponent } from './collaborator/collaborator.component';
import { ViewService } from './service/view.service';
import { EditnoteComponent } from './editnote/editnote.component';
import { LabelComponent } from './label/label.component';
import { AuthService } from './service/auth.service';
import {DragDropModule} from '@angular/cdk/drag-drop';


@NgModule({
  declarations: [
    AppComponent,

    LoginComponent,
    RegistrationComponent,
    FundooNotesComponent,
    ForgotPasswordComponent,
    NotesComponent,
    ResetpasswordComponent,
    ArchiveComponent,
    BinComponent,
    EditlabelComponent,
    ReminderComponent,
     CollaboratorComponent,
     EditnoteComponent,
     LabelComponent
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    BrowserAnimationsModule,
    MatChipsModule,
    MatButtonModule,
    MatDividerModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatTooltipModule,
    MatMenuModule,
    MatDialogModule,
    DragDropModule
  
  ],
  providers: [DataserviceService,HttpClientModule,ViewService,FundooNotesComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
