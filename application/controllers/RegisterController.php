<?php
defined('BASEPATH') OR exit('No direct script access allowed');
// require_once 'PHPUnit/Autoload.php';
// include_once '/var/www/html/code1/codeigniter/application/controllers/jwt.php';
require '/var/www/html/code1/codeigniter/application/controllers/vendor/autoload.php';
include '/var/www/html/code1/codeigniter/application/service/AccountControllerService.php';
 
use PHPUnit\Framework\TestCase;

class RegisterController extends \PHPUnit_Framework_TestCase
{   
   // protected $connect;
   public $ref;
   public function __construct()
   {
       $this->ref = new AccountControllerService();
   }

    
    /**
     * function regester create a new user with name,email,password and phone number     
     */
     
    public function register()
    {
        $flag=0; 
        /**
        * @var string
        * @range(4, 128)
        * @label('Name of user')
        */
       $name=$_POST['username'];
    //    assertEquals($name,'prashant');
       
       /**
        * @var integer
        * @range(4,8)
        * @label('password')
        */

       $pass=$_POST['password'];

        /**
        * @var integer
        *@label('phone number')
        */
       $phone=$_POST['phone'];
       
        
       $mail=$_POST['email'];
 
        $this->ref->register($name, $pass, $phone, $mail,$flag);

        
    }
}