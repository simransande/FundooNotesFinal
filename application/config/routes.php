<?php
defined('BASEPATH') or exit('No direct script access allowed');

/*
| -------------------------------------------------------------------------
| URI ROUTING
| -------------------------------------------------------------------------
| This file lets you re-map URI requests to specific controller functions.
|
| Typically there is a one-to-one relationship between a URL string
| and its corresponding controller class/method. The segments in a
| URL normally follow this pattern:
|
|    example.com/class/method/id/
|
| In some instances, however, you may want to remap this relationship
| so that a different class/function is called than the one
| corresponding to the URL.
|
| Please see the user guide for complete details:
|
|    https://codeigniter.com/user_guide/general/routing.html
|
| -------------------------------------------------------------------------
| RESERVED ROUTES
| -------------------------------------------------------------------------
|
| There are three reserved routes:
|
|    $route['default_controller'] = 'welcome';
|
| This route indicates which controller class should be loaded if the
| URI contains no data. In the above example, the "welcome" class
| would be loaded.
|
|    $route['404_override'] = 'errors/page_missing';
|
| This route will tell the Router which controller/method to use if those
| provided in the URL cannot be matched to a valid route.
|
|    $route['translate_uri_dashes'] = FALSE;
|
| This is not exactly a route, but allows you to automatically route
| controller and method names that contain dashes. '-' isn't a valid
| class or method name character, so it requires translation.
| When you set this option to TRUE, it will replace ALL dashes in the
| controller and method URI segments.
|
| Examples:    my-controller/index    -> my_controller/index
|        my-controller/my-method    -> my_controller/my_method
 */
$route['default_controller'] = 'Accountcontroller';

$route['register']='RegisterController/register';
$route['login'] = 'LoginController/login';
$route['forgotPassword'] = 'ForgotpasswordController/forgotpassword';
$route['resetpassword'] = 'ResetPasswordController/resetpassword';
// $route['profileUpload'] = 'ProfileUploadController/profileUpload';
$route['imageurl'] = 'ProfileUploadController/uploads';


$route['notes'] = 'Notescontroller/notes';
$route['getnotes'] = 'Notescontroller/getnotes';
$route['updatenotes'] = 'Notescontroller/updatenotes';
$route['deleteurl'] = 'Notescontroller/deleteurl';
$route['collaborator'] = 'Notescontroller/collaborator';
$route['notelabe'] = 'Notescontroller/notelabe';
$route['getnotelabe'] = 'Notescontroller/getnotelabe';
$route['deletelabel'] = 'Notescontroller/deletelabel1';
$route['AddCollab'] = 'Notescontroller/AddCollab';
$route['GetCollab'] = 'Notescontroller/GetCollab';
$route['joinNoteCollab'] = 'Notescontroller/joinNoteCollab';
$route['DragAndDrop'] = 'Notescontroller/DragAndDrop';
$route['profileUploadinGeturl'] = 'Notescontroller/profileUploadinGet';
$route['uploadingImage']='Notescontroller/uploadingImage';
$route['uploadImage']="Notescontroller/uploadImage";
// $route['UploadinGetImage']="Notescontroller/UploadinGetImage";
$route['noteSaveImage']="Notescontroller/noteSaveImage";
$route['notesFetchImage']="Notescontroller/notesFetchImage";
$route['fetchUserData']="Notescontroller/fetchUserData";


$route['label'] = 'Labelcontroller/label';
$route['getlabel'] = 'Labelcontroller/getlabel';
$route['updatlabel'] = 'Labelcontroller/updatlabel';
$route['deletelabell'] = 'Labelcontroller/deletelabel';


$route['socialLogin'] = 'Accountcontroller/socialLogin';













// $route['test1'] = 'testingcontroller';
$route['test']='test1/test';







