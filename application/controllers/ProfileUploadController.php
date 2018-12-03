<?php
defined('BASEPATH') OR exit('No direct script access allowed');
// require_once 'PHPUnit/Autoload.php';
// include_once '/var/www/html/code1/codeigniter/application/controllers/jwt.php';
require '/var/www/html/code1/codeigniter/application/controllers/vendor/autoload.php';
include '/var/www/html/code1/codeigniter/application/service/AccountControllerService.php';
 
use PHPUnit\Framework\TestCase;

class ProfileUploadController extends \PHPUnit_Framework_TestCase
{   
   // protected $connect;
   public $ref;
   public function __construct()
   {
       $this->ref = new AccountControllerService();
   }


//    public function profileUpload(){

//     // $mail=$_POST['email'];
//     // $file=$_FILES['selectedFile'];
//     $email = $_POST['email'];
//     $file = $_FILES['selectedFile'];
//     $name = $_FILES['selectedFile']['name'];
//     $fileTmpName = $_FILES['selectedFile']['tmp_name'];

//     $this->ref->profileUpload($email, $name, $fileTmpName);
// }

public function uploads()
{
    
$email = $_POST['email'];
$filePath=base64_decode($_POST['fileKey']);
$this->ref->profileUpload($email,$filePath);
}
}
?>
