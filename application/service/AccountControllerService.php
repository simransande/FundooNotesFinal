<?php
require_once 'PHPUnit/Autoload.php';
// include_once '/var/www/html/code1/codeigniter/application/controllers/jwt.php';
// require '/var/www/html/code1/codeigniter/application/controllers/vendor/autoload.php';
// include "/var/www/html/code1/codeigniter/application/rabitMQ/send.php";
include "/var/www/html/code1/codeigniter/application/rabitMQ/send.php";
include "/var/www/html/code1/codeigniter/application/static/HardCode.php";
class AccountControllerService
{
    
    protected $connect;
   
    public function __construct()
    {
        try {
            /**
             * Database conncetion using PDO
             */
            $data=new HardCode();
            $this->connect = new PDO("$data->database:host=$data->host;dbname=$data->dbname", "$data->user", "$data->password");
        } catch (PDOException $e) {
            print "Error!: " . $e->getMessage() . "<br/>";
            die();
        }
    }
    

    /**
     * @method getRegisterValue() add the registration details
     * @return void
     */
    public function register($name, $pass, $phone, $mail,$flag)
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
          $reg = "insert into user (uname,email,pass,phone) values ('$name','$mail',$pass,'$phone')";
          $stmt = $this->connect->prepare($reg);
          $ref = $stmt->execute();
          if($ref)
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


         public function login($mail, $pass,$flag)
         {

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
            // $user = $stmt->fetch(PDO::FETCH_ASSOC);
            // set the resulting array to associative
            while ($result = $stmt->fetch(PDO::FETCH_ASSOC)) {
                if (!empty($result)) 
            {    
             $flag++;
             $myjson='{"status":"1"}';     
             print $myjson;
             
                if ($email == $result['email']) {
                    $name = $result['uname'];
                    $flag = 1;
                    $ref=new SendMail();
                    $token = md5($email);
                    $query = "UPDATE user SET token='$token' WHERE email='$email'";
                    $statement = $this->connect->prepare($query);
                    $statement->execute();
                    $subject="Forgot Password Recovery";
                    $body="Click this link to recover your password http://localhost:4200/resetpassword?token=" . $token;
                    $ref->sendEmail($email,$subject,$body);
                    break;
                }
            }
         else
         {
            $myjson='{"status":"0"}';    
             print $myjson;
         }
            }
         }

         public function resetpassword($mail, $pass){
            $sql = "update user SET pass='$pass' where email='$mail'";
            $stmt = $this->connect->prepare($sql);
            $res = $stmt->execute();
         }
    

         public function profileUpload($email,$filePath){


        //     move_uploaded_file($fileTmpName, "uploads/" . $name);

        //     // $dataD=new Constant();
        //     $newfileloc = 'http://localhost/code1/codeigniter/uploads/' . $name;
        //     // $upload = move_uploaded_file($fileTmpName, $newfileloc);

        //     $sql = "UPDATE user SET profilepic='$name' WHERE email='$email'";
        //     $res = $this->connect->exec($sql);

        //     $stmt = $this->connect->prepare("SELECT * From user where email='$email'");
        //     $stmt->execute();

        //     $myArray = $stmt->fetchAll(PDO::FETCH_ASSOC);
        //     $myjson = json_encode($myArray);
        //     print($myjson);

        //  }

         if ($email != null) {

            // $filePath = base64_decode($_POST['fileKey']);
            $stmt = $this->connect->prepare("UPDATE user SET `profilepic` = :filePath where `email`= :email ");
            
            $stmt->execute(array(
            ':filePath' => $filePath,
            ':email' => $email
            ));
            
            $stmt = $this->connect->prepare("SELECT profilepic From user where email='$email'");
            $stmt->execute();
            $row=$stmt->fetch(PDO::FETCH_ASSOC);
            $res=$row['profilepic'];
            // print json_encode($data);
            $ref=json_encode(base64_encode($res));
            print $ref;
        }
    }

        public function socilaLoginReg($email, $profilepic, $username){

            $flag=0;
            $large_parts = explode(" ", $username);
            $name=$large_parts[0];

              $reg = "insert into user (uname,email,pass,phone) values ('$name','$email',123123,'9632587410')";
              $stmt = $this->connect->prepare($reg);
              $ref = $stmt->execute();
              if($ref)
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

?>