
<?php
defined('BASEPATH') OR exit('No direct script access allowed');
require_once 'PHPUnit/Autoload.php';
 include_once '/var/www/html/code1/codeigniter/application/controllers/jwt.php';
 require '/var/www/html/code1/codeigniter/application/controllers/vendor/autoload.php';
 

  use PHPUnit\Framework\TestCase;

class Accountcontroller extends \PHPUnit_Framework_TestCase
{   
    public function index() 
    {
         //loading session library 
         $this->load->library('session');
    }
   
    /**
     * function regestercreate a new user with name,email,password and phone number     
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
       assertEquals($name,'prashant');
       
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
 
       /**
        * check if e-mail address is well-formed
        */
        if (!filter_var($mail, FILTER_VALIDATE_EMAIL)) 
        {
         echo "Invalid email format"; 
        }
   
        else
        {
            /**
             * Create connection
             */
            $connect = new PDO("mysql:host=localhost;dbname=fundooNotes", "root", "root");
            $connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

       $sql = "SELECT * FROM user  WHERE email = '$mail' and uname='$name'";
       $stmt = $connect->prepare($sql);
       $res = $stmt->execute();
  
      if( $row = $stmt->fetch(PDO::FETCH_ASSOC))
       { 
            echo "User name or Email id already exists.";
    
        }

         else
         {

         $sql1 = "INSERT INTO user(uname,email,pass,phone) VALUES('$name','$mail','$pass',$phone)";
         $stmt = $connect->prepare($sql1);
         if($stmt->execute())
         {
            $flag++;
                    $myjson='{"status":"1"}';     
                    $myjson='{"status":'.$flag."}";     
                    print $myjson;                
                 }
                else 
                {
                    $myjson='{"status":"0"}';     
                    $myjson='{"status":'.$flag."}";     
                    print $myjson;
                }
         }
       
        }
    
        
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
   
        
        
        $connect = new PDO("mysql:host=localhost;dbname=fundooNotes", "root", "root");
        $connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
        $sql = "SELECT * FROM user  WHERE email = '$mail' and pass='$pass'";
        $stmt = $connect->prepare($sql);
        $res = $stmt->execute();
             
         $row = $stmt->fetch(PDO::FETCH_ASSOC);
         $name=$row['uname'];
       
        //if the number of rows greater or equal to 1
         if ($row!=false) 
         {  
             $mail=$_POST['email'];              
            $flag++;            
            $myjson='{"email":'.'"'.$mail.'","name":'.'"'.$name.'","status":'.$flag."}";           
            print $myjson;  
         } 
        else
         {
     $flag--;
             print  $flag;
         }
        
    }

     /**
      * if user forget password then with using mail id it will recover the password
      */
    public function forgotpassword()
    {
        //if its not set the response will not get back to frontend  
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
            $connect = new PDO("mysql:host=localhost;dbname=fundooNotes", "root", "root");
            $connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            
            $sql = "SELECT * FROM user  WHERE email = '$email'";
            $stmt = $connect->prepare($sql);
            $res = $stmt->execute();
            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!empty($user)) 
            {    
               
            /**
             * flag will be 1 here for sending the status 1
             */
            $flag++;
            $myjson='{"status":"1"}';     
            print $myjson;

               $token= md5(uniqid(rand(), true));
               require_once("forgot-password-recovery-mail.php");
            } else
            {
                $myjson='{"status":"0"}';    
                print $myjson;
            }
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
            $connect = new PDO("mysql:host=localhost;dbname=fundooNotes", "root", "root");
            $connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            
            $sql = "update user SET pass='$pass' where email='$mail'";
            $stmt = $connect->prepare($sql);
            $res = $stmt->execute();
        }


    }
   

}

