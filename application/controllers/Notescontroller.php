<?php
defined('BASEPATH') OR exit('No direct script access allowed');
include '/var/www/html/code1/codeigniter/application/service/NoteControllerService.php';

class Notescontroller extends CI_Controller
{

     // protected $connect;
   public $serviceNote;
   public function __construct()
   {
       $this->serviceNote = new NoteControllerService();
   }

    /**
     *function for create notes
     *if variable is empty or undefined then it will be blank it will not inserted 
     */
    
    public function notes()
    {
        /**
         * $title is the title of note coming from frontend
         * $mail is the mail id who has loged in 
         * $des is the content of note
         */
        $title=$_POST['title'];
        if(empty($title)|| $title=='undefined'  )
        {
            $title="";
        }
        $mail=$_POST['email'];           
        $des=$_POST['description'];
        $reminder =$_POST['reminder'];
        if(empty($reminder) || $reminder=='undefined' )
        {
            $reminder='';
        }
        /**
         * $pin is the response of pined and unpined note
         * $archive is the response of archived note
         * $trash is the response of delete note
         * $colorcode is for changing the color of notes
         * $image if for uploading image
         */
        $pin=$_POST['pin'];
        if(empty($pin)|| $pin=='undefined' )
        {
            $pin=0;
        }
        $archive=$_POST['archive'];
        if(empty($archive )||$archive=='undefined' )
        {
            $archive=0;
        }
        $trash=$_POST['trash'];
        if(empty($trash) || $trash=='undefined' )
        {
            $trash=0;
        }
        $colorcode =$_POST['colorcode'];
        if(empty($colorcode ) || $colorcode=='undefined' )
        {
            $colorcode="";
        }
        $image=$_POST['image'];
        if(empty($image ) || $image=='undefined')
        {
            $image="";
        }
       
        $this->serviceNote->note($title,$des,$mail,$reminder, $pin,
        $archive, $trash, $colorcode, $image);

        
    }

    /**
     * @method to get notes and return data 
     */
    
    public function getnotes()
    { 
        /**
         *depend on $mail all data will be fetched and return it in the form of json 
         */
        $mail=$_POST['email'];  

        /**
         *queury for selecting that perticular notes for the mail id 
         */
        
        $this->serviceNote->getnotes($mail);
       
    }

    /**
     * @method to find the mail and its collaborate note from two tabel 
     */
    
    public function joinNoteCollab()
    {
        $mail=$_POST['email'];  

        $this->serviceNote->joinNoteCollab($mail);         
    }
 
 
     /**
      * function for update a notes
      */
    public function updatenotes()
    {

        $flag=$_POST['flag'];   
        $id=$_POST['id'];

        $mail=$_POST['email'];   
        if(empty($mail) || $mail=='undefined' )
        {
          $mail='';
        }

        $image=$_POST['image'];   
        if(empty($image) || $image=='undefined' )
        {
          $image='';
        }
 
        $description=$_POST['description'];   
        if(empty($description) || $description=='undefined' )
        {
          $description='';
        }

        $trash=$_POST['trash'];   
        if(empty($trash) || $trash=='undefined' )
        {
         $trash=0;
        }

        $title=$_POST['title'];   
        if(empty($title) || $title=='undefined' )
        {
          $title='';
        }

        $isarchive=$_POST['isarchive'];   
        if(empty($isarchive) || $isarchive=='undefined' )
        {
          $isarchive='';
        }
    
        $pin=$_POST['pin'];   
        if(empty($pin) || $pin=='undefined' )
        {
          $pin=0;
        }

        $color=$_POST['color']; 
        $color = str_replace(' ', '', $color);
        if(empty($color) || $color=='undefined' )
        {
          $color='';
        }

        $reminder=$_POST['reminder']; 
        if(empty($reminder) || $reminder=='undefined' )
        {
          $reminder='';
        }
  
        $this->serviceNote->updatenotes($flag,$id,$mail,$image,$description,$trash,$title,$isarchive,$pin,$color,$reminder);         

       
    }


    /**
     * function for delete a note forever 
     */
    
    public function deleteurl()
    {
        $flag=$_POST['flag'];   
        $id=$_POST['id'];  
        $mail=$_POST['email'];   
 
        if($flag=='dltForever')
        {
            $this->serviceNote->deleteurl($id,$mail);         
        }
    }


    /**
     * function for check the colaborator mail is registered if true the mailid will return 
     */
    
    public function collaborator()
    {   
        $mail=$_POST['mail'];   
        if(empty($mail) || $mail=='undefined' )
        {
          $mail='';
        }
        $this->serviceNote->collaborator($mail);         
    }

    /**
     * function for add colaborator to a note 
     */
    public function AddCollab()
    {
        $noteid=$_POST['noteid']; 
        if(empty($noteid) || $noteid=='undefined' )
        {
            $noteid='';
        }

        $sharedEmail=$_POST['sharedEmail'];   
        if(empty($sharedEmail) || $sharedEmail=='undefined' )
        {
            $sharedEmail='';
        }

        $email=$_POST['email'];   
        if(empty($email) || $email=='undefined' )
        {
            $email='';
        }

        $this->serviceNote->AddCollab($noteid,$sharedEmail,$email);         
    }

    /**
     * function for get colaborator id 
     */
    
    public function GetCollab()
    {
        $mail=$_POST['email'];     
        $this->serviceNote->GetCollab($mail);         
  
    }


    /**
     * function for select the note on the basis of relation between note and label with id 
     */
    
    public function notelabe()
    {

        $mail=$_POST['mail'];   
        if(empty($mail)|| $mail=='undefined'  )
        {
            $mail="";
        }

        $noteid=$_POST['noteid'];  
        if(empty($noteid)|| $noteid=='undefined'  )
        {
            $noteid="";
        } 

        $labelid=$_POST['labelid'];   
        if(empty($labelid)|| $labelid=='undefined'  )
        {
            $labelid="";
        }
        $this->serviceNote->notelabe($mail,$noteid,$labelid);         

    }


    /**
     * function for get notelabel and return data
     */
    public function getnotelabe()
    { 
        $mail=$_POST['email'];       
        $this->serviceNote->getnotelabe($mail);         
    }

    /**
     * function for delete the label 
     */
    public function deletelabel1()
    {
    
        /**
         * @var labelid is the id of that perticular id which user want to delete
         */
        $labelid=$_POST['labelid'];  
        $noteid=$_POST['noteid'];          
        if(empty($labelid)|| $labelid=='undefined'  )
        {
            $labelid="";
        }
       
        $this->serviceNote->deletelabel1($labelid,$noteid);         

        
    }


    public function DragAndDrop(){
        $email     = $_POST["email"];
        $id        = $_POST["id"];
        $loop      = $_POST["loop"];
        $direction = $_POST["direction"];
        /**
         * If direction is upward get the note id which is less than current id
         */
        for ($i = 0; $i < $loop; $i++) {
            if ($direction == "upward") {
                $querry = "SELECT max(id) as nextid from note where id < '$id' and email='$email'";
            } else {
                $querry = "SELECT min(id) as nextid from note where id > '$id' and email='$email'";
            }
            $stmt   = $this->connect->prepare($querry);
            $var    = $stmt->execute();
            $noteid = $stmt->fetch(PDO::FETCH_ASSOC);
            $noteid = $noteid['nextid'];
            $querry = "UPDATE note a inner join note b on a.id <> b.id set a.email = b.email,a.tittle = b.tittle,a.description = b.description,a.colorcode = b.colorcode,a.reminder = b.reminder,a.archive = b.archive,a.trash = b.trash,a.image=b.image,a.pin=b.pin where a.id in('$noteid','$id') and b.id in('$noteid','$id')";
            $stmt   = $this->connect->prepare($querry);
            $var    = $stmt->execute();
            $id=$noteid;
        }

    }

}
?>