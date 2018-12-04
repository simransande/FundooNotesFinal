import {environment} from "src/environments/environment";
export class serviceUrl
{

    public host=environment.baseurl;
    // public host="http://localhost/code1/codeigniter/";
    public login="login";
    public register="register";
    public forgotPassword="forgotPassword";
    public resetpassword="resetpassword";
    public socialLogin="socialLogin";
    // public profileUpload="profileUpload";
    public profileUploadinGeturl="profileUploadinGeturl";
    public uploadImage="uploadImage";
    public UploadinGetImage="UploadinGetImage";
    public imageurl="imageurl";
    public noteSaveImage="noteSaveImage";
    public notesFetchImage="notesFetchImage";

    public notes="notes";
    public getnotes="getnotes";
    public updatenotes="updatenotes";
    public collaborator="collaborator";
    public AddCollab="AddCollab";
    public GetCollab="GetCollab";
    public joinNoteCollab="joinNoteCollab";
    public notelabe="notelabe";
    public deletelabel="deletelabel";
    public getnotelabe="getnotelabe";
    public DragAndDrop="DragAndDrop";

    public label="label";
    public getlabel="getlabel";
    public updatlabel="updatlabel";
    public deletelabell="deletelabell";

}