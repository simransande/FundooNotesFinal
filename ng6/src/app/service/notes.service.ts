import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { from } from 'rxjs';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
import { text } from '@angular/core/src/render3/instructions';
import { pipe } from '@angular/core/src/render3/pipe';
import { BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root'

})
export class NotesService {

  private messageSource = new BehaviorSubject(true);
  currentMessage = this.messageSource.asObservable();

  private _NoteUrl = 'http://localhost/code1/codeigniter/notes';
  private _getNoteUrl = 'http://localhost/code1/codeigniter/getnotes';
  private _updateNoteUrl = 'http://localhost/code1/codeigniter/updatenotes';
  private collaboratorUrl='http://localhost/code1/codeigniter/collaborator';
  private labelUrl='http://localhost/code1/codeigniter/notelabe';
  private labelgetUrl='http://localhost/code1/codeigniter/getnotelabe';
  private deleteUrl='http://localhost/code1/codeigniter/deletelabel1';
  private AddCollab='http://localhost/code1/codeigniter/AddCollab';
  private GetCollab='http://localhost/code1/codeigniter/GetCollab';
  private joinNoteCollab='http://localhost/code1/codeigniter/joinNoteCollab';
  noteview: any;
  constructor(private http: HttpClient) {
  }

  changeMessage(message: boolean) {
    console.log(message);
    this.messageSource.next(message)
  }

  /**
   * @method Notes for creating a note
   * title,description,email,reminder,pin,archive,trash,color,image this data
   * is sending to api to insert in database
   */
  
  Notes(value: any): Observable<{}> 
  {
    let note = new FormData();
    var data ={'pin': value.data[0].pin}
    let email = localStorage.getItem('email');

    note.append('title', value.data[0].title);
    note.append('description', value.data[0].description);
    note.append('email', email);
    note.append('reminder',value.data[0].reminder);
    note.append('pin', value.data[0].pin);
    note.append('archive',value.data[0].archive);
    note.append('trash',value.data[0].trash);
    note.append('colorcode',value.data[0].color);
    note.append('image',value.data[0].image);   

    let otheroption: any = 
    {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    return this.http.post(this._NoteUrl, note, otheroption)
    
  }

  /**
   * @method getNote() is for fetching notes
   * get the notes from the database for that perticular email id whoever is loged in
   */
  getNote(): Observable<{}>
  {
   
    let getnote = new FormData();
    let email = localStorage.getItem('email');
    let token=localStorage.getItem('token');

    getnote.append('email', email);

    let otheroption: any = 
    {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    return this.http.post(this._getNoteUrl, getnote, otheroption)

  }

  
  /**
   * update a note 
   */
  updatenotes(value: any): Observable<{}> 
  {
    let getnote = new FormData();
    /**
     * email is the geting email from local storage
     */
    let email = localStorage.getItem('email');
    getnote.append('email', email);
    getnote.append('description', value.data[0].description);
    getnote.append('id', value.data[0].id);
    getnote.append('isarchive', value.data[0].isarchive);
    getnote.append('pin', value.data[0].pin);
    getnote.append('trash', value.data[0].trash);
    getnote.append('title', value.data[0].title);
    getnote.append('color', value.data[0].color);
    getnote.append('reminder',value.data[0].reminder);
    getnote.append('image',value.data[0].image);
    getnote.append('flag', value.data[0].flag);
    getnote.append('label','')
    getnote.append('collaborator', '')

    let otheroption: any = 
    {
      'Content-Type': 'application/x-www-form-urlencoded' //body-x-www-form-urlencoded
    }
    return this.http.post(this._updateNoteUrl, getnote, otheroption)

  }

  /**
   * 
   * @param imgdata uploading the image for the perticular note id
   */
  uploading(imgdata: any): Observable<any> 
  {
    var abc=imgdata.data[0].id
    let getnote = new FormData();
   
    getnote.append('file', imgdata.data[0].selectedFile);
    getnote.append('id', imgdata.data[0].id);
    getnote.append('image', imgdata.data[0].image);
    getnote.append('flag', 'image');
    getnote.append('email', '');
    getnote.append('reminder', '');
    getnote.append('color', '');
    getnote.append('pin','0');
    getnote.append('isarchive', '');
    getnote.append('title', imgdata.data[0].title);
    getnote.append('trash', '0');
    getnote.append('description', imgdata.data[0].description);
   
    return this.http.post(this._updateNoteUrl, getnote).pipe(
      map((res: Response) => res)
    );
  }

  /**
   * 
   * @param value mail id to whoom user want to send the note
   */
  collaborator(value: any): Observable<{}>
  {
      let collab = new FormData();
      collab.append('mail',value.data[0].mail);   
      
      let otheroption: any =
      {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
      return this.http.post(this.collaboratorUrl, collab, otheroption).pipe(
      map((res: Response) => res)
      );
  }

  /**
   * function is for adding collaborator
   * @param note perticular note for adding colaborator
   * @param mail to whoom the note should collaborate
   */
  addCollaborator(note:any,mail:any):Observable<{}>
  {
      let addcollab=new FormData();
      let email = localStorage.getItem('email');
      addcollab.append('noteid',note.id);
      addcollab.append('sharedEmail',mail);
      addcollab.append('email',email);

      let otheroption: any = 
      {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
      return this.http.post(this.AddCollab, addcollab, otheroption).pipe(
       map((res: Response) => res)
      );

  }

  /**
   * get the collaboratored mailid
   */
  getCollaborator():Observable<{}>
  {
    let getcollab=new FormData();
    let email = localStorage.getItem('email');
    getcollab.append('email',email);

    let otheroption: any =
      {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
      return this.http.post(this.GetCollab, getcollab, otheroption).pipe(
        map((res: Response) => res)
       );
  }

  /**
   * get the collaborated note
   */
  getNotesColl():Observable<{}>
  {
    let test=new FormData();
    let email = localStorage.getItem('email');
    test.append('email',email);

    let otheroption: any =
      {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
      return this.http.post(this.joinNoteCollab, test, otheroption).pipe(
        map((res: Response) => res)
       );
  }

  /**
   * to set the id for label
   */
  setLabelid(value:any): Observable<{}>
  {
    let setid = new FormData();
    let email = localStorage.getItem('email');
    setid.append('mail',email);
    setid.append('noteid',value.noteId);
    setid.append('labelid',value.labelId);
    let otheroption: any = 
    {
      'Content-Type': 'application/x-www-form-urlencoded'
    }

    return this.http.post(this.labelUrl,setid,otheroption).pipe(
    map((res: Response) => res)
    );
  }

  /**
   * @param value labelid for deleting label
   */
  deleteLabel(value:any):Observable<{}>
  {
    let dltid=new FormData();
    dltid.append('labelid',value.labelid);
    dltid.append('noteid',value.noteid);
    let otheroption: any =
      {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
      return this.http.post(this.deleteUrl,dltid,otheroption)
  }

  /**
   * get the label id
   */
  getLabelid(): Observable<{}>
  {
   
    let getid = new FormData();
    let email = localStorage.getItem('email');
    getid.append('email', email);

    let otheroption: any = 
    {
      'Content-Type': 'application/x-www-form-urlencoded'
    }

    return this.http.post(this.labelgetUrl, getid, otheroption).pipe(
      map((res: Response) => res)
    );

  }



}


