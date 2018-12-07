<?php
defined('BASEPATH') OR exit('No direct script access allowed');
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Authorization");
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
$url=$_POST['fileKey'];
$this->ref->profileUpload($url,$email);
}


}

?>
