
<?php
defined('BASEPATH') OR exit('No direct script access allowed');
require_once 'PHPUnit/Autoload.php';
include_once '/var/www/html/code1/codeigniter/application/controllers/jwt.php';
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
    public function uploadimage()
    {

        $image=$_POST['image'];
        $this->ref->uploadimage($image);

    }


    /**
     * login the user using email id and password 
     */ 
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
            $this->ref->forgotpassword($email,$flag);        
       
           }
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
   

    public function socialLogin()
    {
        $fb = new Facebook\Facebook([
            'app_id' => '{347982709337483}',
            'app_secret' => '{7f63c380e7f88a905590d1ea991735b6}',
            'default_graph_version' => 'v3.2',
            ]);
          
          try {
            // Returns a `Facebook\FacebookResponse` object
            $response = $fb->get('/me?fields=id,name', '{accessToken}');
          } catch(Facebook\Exceptions\FacebookResponseException $e) {
            echo 'Graph returned an error: ' . $e->getMessage();
            exit;
          } catch(Facebook\Exceptions\FacebookSDKException $e) {
            echo 'Facebook SDK returned an error: ' . $e->getMessage();
            exit;
          }
          
          $user = $response->getGraphUser();
          
          echo 'Name: ' . $user['name'];
    }
}

