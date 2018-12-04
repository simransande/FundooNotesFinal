import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { from } from 'rxjs';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
import { text } from '@angular/core/src/render3/instructions';
import { pipe } from '@angular/core/src/render3/pipe';
import { BehaviorSubject } from 'rxjs';
import { serviceUrl } from '../../app/serviceUrl/serviceUrl';



@Injectable({
  providedIn: 'root'

})
export class NotesService {

  private messageSource = new BehaviorSubject(true);
  currentMessage = this.messageSource.asObservable();
  
  noteview: any;
  constructor(private http: HttpClient,private serviceurl:serviceUrl) {
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
    return this.http.post(this.serviceurl.host+this.serviceurl.notes, note, otheroption)
    
  }

  /**
   * @method getNote() is for fetching notes
   * get the notes from the database for that perticular email id whoever is loged in
   */
  getNote(): Observable<{}>
  {
   debugger;
    let getnote = new FormData();
    let email = localStorage.getItem('email');
    let token=localStorage.getItem('token');

    getnote.append('email', email);

    let otheroption: any = 
    {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    return this.http.post(this.serviceurl.host+this.serviceurl.getnotes, getnote, otheroption)

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
    // getnote.append('image',value.data[0].image);
    getnote.append('flag', value.data[0].flag);
    getnote.append('label','')
    getnote.append('collaborator', '')

    let otheroption: any = 
    {
      'Content-Type': 'application/x-www-form-urlencoded' //body-x-www-form-urlencoded
    }
    return this.http.post(this.serviceurl.host+this.serviceurl.updatenotes, getnote, otheroption)

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
      return this.http.post(this.serviceurl.host+this.serviceurl.collaborator, collab, otheroption).pipe(
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
      return this.http.post(this.serviceurl.host+this.serviceurl.AddCollab, addcollab, otheroption).pipe(
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
      return this.http.post(this.serviceurl.host+this.serviceurl.GetCollab, getcollab, otheroption).pipe(
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
      return this.http.post(this.serviceurl.host+this.serviceurl.joinNoteCollab, test, otheroption).pipe(
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

    return this.http.post(this.serviceurl.host+this.serviceurl.notelabe,setid,otheroption).pipe(
    map((res: Response) => res)
    );
  }

  /**
   * @param value labelid for deleting label
   */
  deleteLabel(value:any):Observable<{}>
  {
    debugger;
    let dltid=new FormData();
    // dltid.append('flag','deleteLabel');
    dltid.append('labelid',value.labelid);
    dltid.append('noteid',value.noteid);
    let otheroption: any =
      {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
      return this.http.post(this.serviceurl.host+this.serviceurl.deletelabel,dltid,otheroption)
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

    return this.http.post(this.serviceurl.host+this.serviceurl.getnotelabe, getid, otheroption).pipe(
      map((res: Response) => res)
    );

  }

  /**
   * function for drag and drop the note
   * @param email on the localstorage mail
   * @param id passing the note id
   * @param loops number of loops
   * @param dir direction of draging and droping
   */
  dragnotes(email: any, id: any, loops: any, dir: any): any {
    const data = new FormData();
    debugger;
    data.append("email", email);
    data.append("id", id);
    data.append("loop", loops);
    data.append("direction", dir);
    return this.http.post(this.serviceurl.host+this.serviceurl.DragAndDrop, data);
  }

/**
* @method noteSaveImage() 
* @return observable data
* @param email 
* @param url 
* @description Function to send email and url to server
*/
noteSaveImage(url, email, noteId) {
  debugger;
  let saveImage = new FormData();
  saveImage.append("url", url)
  saveImage.append("email", email)
  saveImage.append("id", noteId)
  return this.http.post(this.serviceurl.host + this.serviceurl.noteSaveImage, saveImage)
  }
  /**
  * @method notesFetchImage() 
  * @return observable data
  * @param email 
  * @description Function to send email and url to server
  */
  notesFetchImage(email) {
  let noteFetchImage = new FormData();
  noteFetchImage.append("email", email)
  return this.http.post(this.serviceurl.host + this.serviceurl.notesFetchImage, noteFetchImage)
  }
  

}


