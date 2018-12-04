<?php
defined('BASEPATH') OR exit('No direct script access allowed');
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Authorization");
//include "models/responseModel.php";
include "/var/www/html/code1/codeigniter/application/service/LabelService.php";


class Labelcontroller extends CI_Controller
{
     // protected $connect;
   public $label;
   public function __construct()
   {
       $this->label = new LabelService();
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
        $this->label->label($label, $mail);

    }

      //get notes and return data
  public function getlabel()
  {
      $mail=$_POST['email'];        
      $this->label->getlabel($mail);   
  }

  public function updatlabel()
  {  
    $flag=$_POST['flag'];  
    $mail=$_POST['email'];   
    $label=$_POST['label']; 
    $id=$_POST['id']; 

    $this->label->updatlabel($flag,$mail,$label,$id);
  }

  public function deletelabel()
  {
    
    $flag=$_POST['flag'];  
    $mail=$_POST['email'];    
    $id=$_POST['id']; 

    $this->label->deletelabel($flag,$mail,$id);
  }
           
}