<?php
defined('BASEPATH') OR exit('No direct script access allowed');
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Authorization");
require '/var/www/html/code1/codeigniter/application/controllers/vendor/autoload.php';
include '/var/www/html/code1/codeigniter/application/service/AccountControllerService.php';
// include '/var/www/html/code1/codeigniter/application/predis/autoload.php';

use PHPUnit\Framework\TestCase;

class LoginController extends CI_Controller
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