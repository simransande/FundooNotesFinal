<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class Manage_Accounts extends CI_Controller
{

    public function index() {

    //$this->load->view('template/header');
    // $this->load->view('Login');


    }
    public function register()
    {
       
        $name=$_POST['username'];
       $pass=$_POST['password'];
       $phone=$_POST['phone'];
       $mail=$_POST['email'];
      // $pass = crypt($hashed_password);
       // $mail = test_input($email);
        // check if e-mail address is well-formed
        if (!filter_var($mail, FILTER_VALIDATE_EMAIL)) {
        echo "Invalid email format"; 
        }
   
        else{
       $conn=new mysqli("localhost","root","root","fundooNotes");//($servername, $username, $password, $dbname)
       if ($conn->connect_error) {

           die("Connection failed: " . $conn->connect_error);
          
       }
        
       $duplicate="SELECT * From user where email='$mail' and uname='$name'";
       
       $result=mysqli_query($conn, $duplicate);
       if($result->num_rows>=1)
        {
        echo "User name or Email id already exists.";
        }

        else{
        $sql = "INSERT INTO user(uname,email,password,phone) VALUES('$name','$mail','$pass',$phone)";
       echo $sql;
        if (mysqli_query($conn, $sql)) {
       echo "New record created successfully";
        }
         else 
         {
       echo "Error: " . $sql . "<br>" . mysqli_error($conn);
        }
        
    }
    }
}


    public function login()
    {     
        $flag=0;
        $mail=$_POST['email'];
        $pass=$_POST['password'];
   
        $conn=new mysqli("localhost","root","root","fundooNotes");//($servername, $username, $password, $dbname)
        if ($conn->connect_error) {

            die("Connection failed: " . $conn->connect_error);
        }
         $sql = "SELECT * From user where email='$mail' and password='$pass'";
    
        $result = mysqli_query($conn, $sql);

        if ($result->num_rows>=0) 
        {
                echo "record found successfully";
                $flag++;
                return $flag;     
        } 
        else
        {
                echo "Error: " . $sql . "<br>" . mysqli_error($conn);
                $flag--;
        }
        return $flag;     
    }

    public function forgotpassword()
    {

        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Headers: X-Requested-With');
        header('Access-Control-Allow-Methods: POST, GET, OPTIONS');

        // echo 'id' . $this->post('username');

        if (!empty($_POST["email"])) {
            $email = $_POST["email"];
            $conn = mysqli_connect("localhost", "root", "root", "fundooNotes");
            $sql = "Select * from user where email='$email'";
            $result = mysqli_query($conn, $sql);
            $user = mysqli_fetch_array($result);
            if (!empty($user)) {
                require_once("forgot-password-recovery-mail.php");
            } else {
                $error_message = 'No User Found';
            }
        }

    //     $response = array();
    //     $response = var_dump($_POST);
    //     echo "we are getting budy";
    //     echo json_encode($_POST);

    //     session_start();
    //     //$login=$_POST;
    //     $mail=$_POST['email'];
    //     $conn=new mysqli("localhost","root","root","fundooNotes");//($servername, $username, $password, $dbname)
    //     if ($conn->connect_error) {

    //         die("Connection failed: " . $conn->connect_error);
    //     }
    //     else{

        
    //      $sql = "SELECT * From user where email='$mail'";
    //     //echo $sql;
    //     $result = mysqli_query($conn, $sql);


    //     $row = mysqli_fetch_assoc($result);
    //     $fetch_user_id=$row['email'];

    //     $email_id=$row['email'];
    //     $password=$row['password'];
    //     //echo $result;
       
    //     if($mail==$fetch_user_id) {
    //     $to = $email_id;
    //     $subject = "Password";
    //     $txt = "Your password is : $password.";
    //     $headers = "From: simransande.a@gmail.com" . "\r\n" .
    //     "CC: ankitaunhalkar19@gmail.com";
    //     mail($to,$subject,$txt,$headers);
    //     }
    //     else{
    //     echo 'invalid userid';
    //     }
    // }
    //     }






        
    // if ($result->num_rows>=1) {
    //     echo "record found successfully";
    //     // include 'test.html';

    // } else {
    //     echo "Error: " . $sql . "<br>" . mysqli_error($conn);
    // }

    




    }


}