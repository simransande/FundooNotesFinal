<?php
defined('BASEPATH') OR exit('No direct script access allowed');
require_once 'PHPUnit/Autoload.php';
include_once '/var/www/html/code1/codeigniter/application/controllers/jwt.php';
require '/var/www/html/code1/codeigniter/application/controllers/vendor/autoload.php';
class AccountControllerService
{
    
    protected $connect;
   
    public function __construct()
    {
        try {
            /**
             * Database conncetion using PDO
             */
            $this->connect = new PDO("mysql:host=localhost;dbname=fundooNotes", "root", "root");
        } catch (PDOException $e) {
            print "Error!: " . $e->getMessage() . "<br/>";
            die();
        }
    }
    

    /**
     * @method getRegisterValue() add the registration details
     * @return void
     */
    public function register($name, $mail, $pass, $phone,$flag)
    {
       
        $sql = "SELECT * FROM user  WHERE email = '$mail' and uname='$name'";
        $stmt = $this->connect->prepare($sql);
        $res = $stmt->execute();
   
       if( $row = $stmt->fetch(PDO::FETCH_ASSOC))
        { 
             echo "User name or Email id already exists.";
     
         }
 
          else
          {
 
          $sql1 = "INSERT INTO user(uname,email,pass,phone) VALUES('$name','$mail','$pass',$phone)";
          $stmt = $this->connect->prepare($sql1);
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


         public function login($mail, $pass,$flag){

            $sql = "SELECT * FROM user  WHERE email = '$mail' and pass='$pass'";
            $stmt = $this->connect->prepare($sql);
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

         public function forgotpassword($email,$flag){

            $sql = "SELECT * FROM user  WHERE email = '$email'";
            $stmt = $this->connect->prepare($sql);
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

         public function resetpassword($mail, $pass){
            $sql = "update user SET pass='$pass' where email='$mail'";
            $stmt = $this->connect->prepare($sql);
            $res = $stmt->execute();
         }
    
         public function uploadimage($image){

        $sql = "INSERT INTO user(image) VALUES('$image')";
        $stmt = $this->connect->prepare($sql);
        $res = $stmt->execute();
         }

    
}

?>