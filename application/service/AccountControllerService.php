<?php
require_once 'PHPUnit/Autoload.php';
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Authorization");
include "/var/www/html/code1/codeigniter/application/rabitMQ/send.php";
include "/var/www/html/code1/codeigniter/application/static/HardCode.php";
require '/var/www/html/code1/codeigniter/application/controllers/vendor/autoload.php';
require '/var/www/html/code1/codeigniter/application/cloud/vendor/cloudinary/cloudinary_php/src/Uploader.php';
require '/var/www/html/code1/codeigniter/application/cloud/vendor/cloudinary/cloudinary_php/src/Helpers.php';
require '/var/www/html/code1/codeigniter/application/cloud/vendor/cloudinary/cloudinary_php/src/Api.php';
require '/var/www/html/code1/codeigniter/application/cloud/settings.php';

class AccountControllerService extends CI_Controller
{
    
    protected $connect;
   
    public function __construct()
    {
        parent::__construct();

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
                     return "200";
          
                  }
                 else 
                 {
                     $myjson='{"status":"0"}';     
                     $myjson='{"status":'.$flag."}";     
                     print $myjson;
                     return "200";

                 }
          }
        
         }


    /**
     * @method login() add the login details
     * @return void
     */
    public function login($mail, $pass,$flag)
    {
        $this->load->library('Redis');
        $redis=$this->redis->config();

        $set= $redis->set('email',$mail);
         $get=  $redis->get('email');
        $this->load->driver('cache', array('adapter' => 'apc', 'backup' => 'file'));
        $this->cache->save('email',$mail);
       
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
              //  return "200";
             } 
             else
             {
                $flag--;
                print  $flag;
                //return "401";
             }
         }

            /**
     * @method forgotpassword() passing the mail
     * @return void
     */
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
                    return "200";

                }
            }
         else
         {
            $myjson='{"status":"0"}';    
             print $myjson;
             return "400";

         }
            }
         }


            /**
     * @method resetpassword() passing the mail and password
     * @return void
     */
         public function resetpassword($mail, $pass){
            $sql = "update user SET pass='$pass' where email='$mail'";
            $stmt = $this->connect->prepare($sql);
            $res = $stmt->execute();
            return "200";

         }
    

            /**
     * @method profileUpload() service for uploading the profile with mail id
     * @return void
     */
        public function profileUpload($url, $email)
    {
        if ($url != null) {
            /**
             * adding image to the cloudinary using uploader method
             */
            // $return        = \Cloudinary\Uploader::upload($url);
            $return        = \Cloudinary\Uploader::upload($url);
            /**
             * @var imageUrl the cloudinary url 
             */
            $imageUrl      = $return['url'];
            
          
            /**
             * @var string $query has query to update the user profile pic to the data base
             */
        

            $stmt = $this->connect->prepare("UPDATE user  SET imageCloud = '$imageUrl'  where email= '$email'");


            if ($stmt->execute()) {
            
                   /**
         * @var string $query has query to select the profile stored in the cloudinary of the user
         */
        $stmt = $this->connect->prepare("SELECT imageCloud FROM user where email='$email'");

        if ($stmt->execute()) {

            $arr = $stmt->fetch(PDO::FETCH_ASSOC);
            /**
             * returns json array response
             */
            print json_encode($arr['imageCloud']);
        }
            } else {
                $data = array(
                    "message" => "404",
                );
                /**
                 * return thye json response
                 */
                print json_encode($data);

            }

        } else {
            $data = array(
                "message" => "404",
            );
            /**
             * return the json response
             */
            print json_encode($data);

        }
    }

    public function fetchImage($email)
    {
        /**
         * @var string $query has query to select the profile stored in the cloudinary of the user
         */
        $stmt = $this->connect->prepare("SELECT imageCloud FROM user where email='$email'");

        if ($stmt->execute()) {

            $arr = $stmt->fetch(PDO::FETCH_ASSOC);
            /**
             * returns json array response
             */
            print json_encode($arr['imageCloud']);
        }

    
    }


    /**
     * @method socilaLoginReg() service for social login with facebook and google
     * @return void
     */

    public function socilaLoginReg($email, $profilepic, $username){

            $flag=0;
            $large_parts = explode(" ", $username);
            $name=$large_parts[0];

            // $this->load->library('Redis');
            // $redis = $this->redis->config();
            // $set = $redis->set('email', $email);
            // $set = $redis->set('name', $username);
            // $get = $redis->get('email');

            // $this->load->driver('cache', array('adapter' => 'apc', 'backup' => 'file'));
            // $this->cache->save('email', $email);


            
            $sql = "SELECT * FROM user  WHERE email = '$email' and uname='$name'";
            $stmt = $this->connect->prepare($sql);
            $res = $stmt->execute();
       
           if( $row = $stmt->fetch(PDO::FETCH_ASSOC))
            { 
                $flag++;
                        $myjson='{"email":'.'"'.$email.'","name":'.'"'.$name.'","status":'.$flag."}";           
                        $fg= $myjson;
                        print $fg;                                
            }
            else
            {

              $reg = "insert into user (uname,email,pass,phone) values ('$name','$email',123123,'9632587410')";
              $stmt = $this->connect->prepare($reg);
              $ref = $stmt->execute();
              if($ref)
              {
                 $flag++;
                        $myjson='{"email":'.'"'.$email.'","name":'.'"'.$name.'","status":'.$flag."}";           
                        $fg= $myjson;
                        print $fg;                
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

?>