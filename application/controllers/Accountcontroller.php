
<?php
defined('BASEPATH') OR exit('No direct script access allowed');
// require_once 'PHPUnit/Autoload.php';
// include_once '/var/www/html/code1/codeigniter/application/controllers/jwt.php';
require '/var/www/html/code1/codeigniter/application/controllers/vendor/autoload.php';
include '/var/www/html/code1/codeigniter/application/service/AccountControllerService.php';
 
use PHPUnit\Framework\TestCase;

class Accountcontroller extends \PHPUnit_Framework_TestCase
{   
   // protected $connect;
   public $ref;
   public function __construct()
   {
       $this->ref = new AccountControllerService();
   }

    /**
     * login the user using email id and password 
     */ 
    public function socialLogin()
    {

      $email=$_POST['email'];
      $profilepic=$_POST['profilepic'];
      $username=$_POST['username']; 
      $this->ref->socilaLoginReg($email, $profilepic, $username);
    }
}

