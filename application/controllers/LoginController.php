<?php
defined('BASEPATH') OR exit('No direct script access allowed');
// require_once 'PHPUnit/Autoload.php';
// include_once '/var/www/html/code1/codeigniter/application/controllers/jwt.php';
require '/var/www/html/code1/codeigniter/application/controllers/vendor/autoload.php';
include '/var/www/html/code1/codeigniter/application/service/AccountControllerService.php';
 
use PHPUnit\Framework\TestCase;

class LoginController extends \PHPUnit_Framework_TestCase
{   
   // protected $connect;
   public $ref;
   public function __construct()
   {
       $this->ref = new AccountControllerService();
   }

   public function login()
   {     

       $flag=0;
       /**
       * @Assert\Email(
       *     message = "The email '{{ value }}' is not a valid email.",
       *     checkMX = true
       * )
       */
       $mail=$_POST['email'];
       // assertEquals($mail,'simransande.a@gmail.com');

       /**
       * @var integer
       *@range(8,14)
       *@label('password')
       */

       $pass=$_POST['password'];

       $this->ref->login($mail, $pass,$flag);        
   }
}