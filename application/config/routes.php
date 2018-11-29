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
// $route['404_override'] = '';
// $route['translate_uri_dashes'] = FALSE;
//s$route['register']='register';
// $route['register/(:any)']='Manage_Accounts/register';

$route['login'] = 'Accountcontroller/login';
$route['register'] = 'Accountcontroller/register';
$route['uploadimage'] = 'Accountcontroller/uploadimage';

$route['forgotpassword'] = 'Accountcontroller/forgotpassword';
$route['resetpassword'] = 'Accountcontroller/resetpassword';
$route['notes'] = 'Notescontroller/notes';
$route['getnotes'] = 'Notescontroller/getnotes';
$route['updatenotes'] = 'Notescontroller/updatenotes';

$route['deleteurl'] = 'Notescontroller/deleteurl';

$route['label'] = 'Labelcontroller/label';
$route['getlabel'] = 'Labelcontroller/getlabel';
$route['updatlabel'] = 'Labelcontroller/updatlabel';
$route['deletelabel'] = 'Labelcontroller/deletelabel';
$route['collaborator'] = 'Notescontroller/collaborator';
$route['notelabe'] = 'Notescontroller/notelabe';
$route['getnotelabe'] = 'Notescontroller/getnotelabe';
$route['deletelabel1'] = 'Notescontroller/deletelabel1';
$route['AddCollab'] = 'Notescontroller/AddCollab';
$route['GetCollab'] = 'Notescontroller/GetCollab';
$route['joinNoteCollab'] = 'Notescontroller/joinNoteCollab';
$route['DragAndDrop'] = 'Notescontroller/DragAndDrop';
$route['socialLogin'] = 'Accountcontroller/socialLogin';



// $route['test1'] = 'testingcontroller';
$route['test']='test1/test';







