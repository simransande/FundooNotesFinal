<?php
defined('BASEPATH') OR exit('No direct script access allowed');
//include "models/responseModel.php";


class Labelcontroller extends CI_Controller
{
   
    public function index() 
    {
         //loading session library 
         $this->load->library('session');
    }

    //create notes
    public function label()
    {
       
        $label=$_POST['label'];
        if(empty($label) )
        {
            $label="";
        }
        $mail=$_POST['email'];
        $conn=new mysqli("localhost","root","root","fundooNotes");//($servername, $username, $password, $dbname)
        if ($conn->connect_error) 
        { 
            die("Connection failed: " . $conn->connect_error);           
        }
        $sql = "INSERT INTO label (email,label)
        VALUES('$mail','$label')";

 $result = mysqli_query($conn, $sql); 

    }

      //get notes and return data
  public function getlabel()
  {
      $mail=$_POST['email'];        

      $mysqli = new mysqli('localhost','root','root','fundooNotes');
      $myArray = array();
      if ($result = $mysqli->query("SELECT * From label where email='$mail'"))
         {      
          while($row = $result->fetch_array())
          {
            $myArray[] = $row;
          }
          $label= json_encode($myArray);
          print $label;
      }
      
      $result->close();
      $mysqli->close();

   
  }

  public function updatlabel()
  {  
    $flag=$_POST['flag'];  
    $mail=$_POST['email'];   
    $label=$_POST['label']; 
    $id=$_POST['id']; 

    $conn=new mysqli("localhost","root","root","fundooNotes");//($servername, $username, $password, $dbname)
   
    if($flag=='updateLabel')
    {
        if ($conn->connect_error) 
        { 
            die("Connection failed: " . $conn->connect_error);           
        }
        
        $sql="UPDATE label SET label='$label' WHERE id=$id";
        $result = mysqli_query($conn, $sql); 
    }

  }

  public function deletelabel()
  {
    
    $flag=$_POST['flag'];  
    $mail=$_POST['email'];    
    $id=$_POST['id']; 
    $conn=new mysqli("localhost","root","root","fundooNotes");//($servername, $username, $password, $dbname)
   
    if($flag=='deleteLabel')
    {
        if ($conn->connect_error) 
        { 
            die("Connection failed: " . $conn->connect_error);           
        }
    
        $sql="DELETE FROM label WHERE id=$id";
        $result = mysqli_query($conn, $sql); 
    }
  }
           
}