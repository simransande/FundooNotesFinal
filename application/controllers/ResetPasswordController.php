<?php
defined('BASEPATH') OR exit('No direct script access allowed');
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Authorization");
// require_once 'PHPUnit/Autoload.php';
// include_once '/var/www/html/code1/codeigniter/application/controllers/jwt.php';
require '/var/www/html/code1/codeigniter/application/controllers/vendor/autoload.php';
include '/var/www/html/code1/codeigniter/application/service/AccountControllerService.php';
 
use PHPUnit\Framework\TestCase;

class ResetPasswordController extends \PHPUnit_Framework_TestCase
{   
   // protected $connect;
   public $ref;
   public function __construct()
   {
       $this->ref = new AccountControllerService();
   }
   /**
     * reset a password using mail and password
     */
    public function resetpassword()
    { 

        /**
         * $mail is taking mail id from fronend
         * $pass is the new password
         * $token is genarating the token
         */
        $mail=$_POST['email'];
        $pass=$_POST['password'];
        $token=$_POST['token'];
        if($_POST['token']==$token)
        {                
            $this->ref->resetpassword($mail, $pass);
        }

    }
    }