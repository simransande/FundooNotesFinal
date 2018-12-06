<?php
defined('BASEPATH') OR exit('No direct script access allowed');
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Authorization");
require '/var/www/html/code1/codeigniter/application/controllers/vendor/autoload.php';
include '/var/www/html/code1/codeigniter/application/service/AccountControllerService.php';
 
// use PHPUnit\Framework\TestCase;

class ForgotpasswordController
{   
   // protected $connect;
   public $ref;
   public function __construct()
   {
       $this->ref = new AccountControllerService();
   }
     /**
      * if user forget password then with using mail id it will recover the password
      */
      public function forgotpassword()
      {
          /**
           * header-if its not set the response will not get back to frontend
           */  
          header('Access-Control-Allow-Origin: *');
          header('Access-Control-Allow-Headers: X-Requested-With');
          header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
  
  
          if (!empty($_POST["email"])) 
          {
  
              $flag=0;
  
            /**
             * @Assert\Email(
             *     message = "The email '{{ value }}' is not a valid email.",
             *     checkMX = true
             * )
             */
              $email = $_POST["email"]; 
              return $this->ref->forgotpassword($email,$flag);        
         
             }
      }

    }
