<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class Notescontroller extends CI_Controller
{
   
    public function index() 
    {
         $this->load->library('session');
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
       
        $connect = new PDO("mysql:host=localhost;dbname=fundooNotes", "root", "root");
        $connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        //insert all the data into tabel
        $sql = "INSERT INTO note (tittle,description,email, reminder, pin,
                archive, trash, colorcode, image)
                VALUES('$title','$des','$mail','$reminder', $pin,
                $archive, $trash, '$colorcode', '$image')";

        //prepare connection
        $stmt = $connect->prepare($sql);
        //excuting that stmt
        $res = $stmt->execute();
        
    }

    /**
     *get notes and return data 
     */
    
    public function getnotes()
    { 
        /**
         *depend on $mail all data will be fetched and return it in the form of json 
         */
        $mail=$_POST['email'];  

        $connect = new PDO("mysql:host=localhost;dbname=fundooNotes", "root", "root");
        $connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        /**
         *queury for selecting that perticular notes for the mail id 
         */
        
        $sql = "SELECT * From note where email='$mail'";
      
        $stmt = $connect->prepare($sql);
        $res = $stmt->execute();
        while( $row = $stmt->fetch(PDO::FETCH_ASSOC)) 
        {
            $myArray[] = $row;
        }
        $notes= json_encode($myArray);
        print $notes;

         
    }

    /**
     *find the mail and its collaborate note from two tabel 
     */
    
    public function joinNoteCollab()
    {
        $mail=$_POST['email'];  

        $connect = new PDO("mysql:host=localhost;dbname=fundooNotes", "root", "root");
        $connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        //query to join two tabels note and collaborator
        $sql = "SELECT * FROM fundooNotes.note INNER JOIN fundooNotes.collaborator ON note.id = collaborator.noteId
                where collaborator.sharedEmail='$mail'";
    
        $stmt = $connect->prepare($sql);
        $res = $stmt->execute();
        while( $row = $stmt->fetch(PDO::FETCH_ASSOC)) 
        {
          $myArray[] = $row;
        }
        $notes= json_encode($myArray);
        print $notes;
         
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
  
        if($flag=='pin')
        {
           $connect = new PDO("mysql:host=localhost;dbname=fundooNotes", "root", "root");
           $connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
     

           if($pin==0)
           {        
             $sql = "UPDATE note SET pin=1 WHERE id=$id";
             $stmt = $connect->prepare($sql);
             $res = $stmt->execute();
           }
           else
           {
             $sql = "UPDATE note SET pin=0 WHERE id=$id";
             $stmt = $connect->prepare($sql);
             $res = $stmt->execute();
           }
        
        }
    

        if($title==$title)
        {
       
            $connect = new PDO("mysql:host=localhost;dbname=fundooNotes", "root", "root");
            $connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            $sql = "UPDATE note SET tittle='$title' WHERE id=$id";
            $stmt = $connect->prepare($sql);
            $res = $stmt->execute(); 
        }
    
       
        if($description==$description)
        {

            $connect = new PDO("mysql:host=localhost;dbname=fundooNotes", "root", "root");
            $connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
       
            $sql="UPDATE note SET description='$description' WHERE id=$id";
            $stmt = $connect->prepare($sql);
            $res = $stmt->execute();
        
        }
    
        if($color=='color')
        {

           $connect = new PDO("mysql:host=localhost;dbname=fundooNotes", "root", "root");
           $connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

           $sql="UPDATE note SET colorcode='$color' WHERE id=$id";
           $stmt = $connect->prepare($sql);
           $res = $stmt->execute();
        
        }
    
        if($flag=='color')
        {

            $connect = new PDO("mysql:host=localhost;dbname=fundooNotes", "root", "root");
            $connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            $sql="UPDATE note SET colorcode='$color' WHERE id=$id";
            $stmt = $connect->prepare($sql);
            $res = $stmt->execute();
        }

        if($flag=='archive')
        {
            $connect = new PDO("mysql:host=localhost;dbname=fundooNotes", "root", "root");
            $connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            if($isarchive==0)
            {        
                $sql="UPDATE note SET archive='1' WHERE id=$id";
                $stmt = $connect->prepare($sql);
                $res = $stmt->execute();
            }
            else
            {
                $sql="UPDATE note SET archive='0' WHERE id=$id";
                $stmt = $connect->prepare($sql);
                $res = $stmt->execute();
            }
        }

        if($flag=='trash')
        {
            $connect = new PDO("mysql:host=localhost;dbname=fundooNotes", "root", "root");
            $connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            if($trash==0)
            {        
                $sql="UPDATE note SET trash=1 WHERE id=$id";
                $stmt = $connect->prepare($sql);
                $res = $stmt->execute();
            }
            else{
                $sql="UPDATE note SET trash=0 WHERE id=$id";
            }
            $stmt = $connect->prepare($sql);
            $res = $stmt->execute();

        }

        if($flag=='dltForever')
        {
            $connect = new PDO("mysql:host=localhost;dbname=fundooNotes", "root", "root");
            $connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        
            $sql="DELETE FROM note WHERE id=$id";
            $stmt = $connect->prepare($sql);
            $res = $stmt->execute();
        
        }

        if($flag=='restore')
        {
            $connect = new PDO("mysql:host=localhost;dbname=fundooNotes", "root", "root");
            $connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            $sql="UPDATE note SET trash=0 WHERE id=$id";
            $stmt = $connect->prepare($sql);
            $res = $stmt->execute();
        }

        if($flag=='reminder')
        {
            $connect = new PDO("mysql:host=localhost;dbname=fundooNotes", "root", "root");
            $connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            $sql="UPDATE note SET reminder='$reminder' WHERE id=$id";
            $stmt = $connect->prepare($sql);
            $res = $stmt->execute();
        } 
        
        if($flag=='dltReminder')
        {
            $connect = new PDO("mysql:host=localhost;dbname=fundooNotes", "root", "root");
            $connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            $sql="UPDATE note SET reminder='' WHERE id=$id";
            $stmt = $connect->prepare($sql);
            $res = $stmt->execute();
        }
            
        if($flag=='dltLabel')
        {
            $connect = new PDO("mysql:host=localhost;dbname=fundooNotes", "root", "root");
            $connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
       
            $sql="UPDATE note SET label='' WHERE id=$id";
            $stmt = $connect->prepare($sql);
            $res = $stmt->execute();
        }

        if($flag=='image')
        {
            $connect = new PDO("mysql:host=localhost;dbname=fundooNotes", "root", "root");
            $connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            if ($_FILES['file']['size'] == 0 && $_FILES['file']['error'] == 0)
            {
                // cover_image is empty (and not an error)
            }
            else
            {
                /**
                 * Move the file to the uploads folder 
                 */
             move_uploaded_file($_FILES["file"]["tmp_name"], "uploads/" . $_FILES["file"]["name"]);

             /**
              * Set location for image
              */
             $fileloc='http://localhost/code1/codeigniter/uploads/'.$_FILES["file"]["name"];
         
             $sql="UPDATE note SET image='$fileloc' WHERE id=$id";
             $stmt = $connect->prepare($sql);
             $res = $stmt->execute();
           
            }
             
        }

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
            $connect = new PDO("mysql:host=localhost;dbname=fundooNotes", "root", "root");
            $connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
            $sql = "DELETE FROM note WHERE id=$id";
            $stmt = $connect->prepare($sql);
            $res = $stmt->execute();
    
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

        $connect = new PDO("mysql:host=localhost;dbname=fundooNotes", "root", "root");
        $connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $sql = "SELECT count(*) FROM user  where email='$mail'"; 
        $result = $connect->prepare($sql); 
        $result->execute(); 
        $number_of_rows = $result->fetchColumn();
     
        if ($number_of_rows>=1) 
        {  
            $mail=$_POST['mail'];                     
            $myjson='{"email":'.'"'.$mail.'"}';           
            print $myjson;  
        } 

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

        $connect = new PDO("mysql:host=localhost;dbname=fundooNotes", "root", "root");
        $connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $sql = "SELECT count(*)  FROM collaborator  where  sharedEmail='$sharedEmail'  and   noteId=$noteid"; 
        $result = $connect->prepare($sql); 
        $result->execute(); 
        $number_of_rows = $result->fetchColumn();
 
        if($number_of_rows>=1)
        {
            //  echo("already exist");
        }
        else
        {
            $sql = "INSERT INTO collaborator (noteId,email,sharedEmail)
                    VALUES($noteid,'$email','$sharedEmail')";
            $result = $connect->prepare($sql); 
            $result->execute(); 

            $noteid=$_POST['noteid']; 
            $sharedEmail=$_POST['sharedEmail'];   
            $email=$_POST['email'];   

            $myjson='{"noteid":'.'"'.$noteid.'","sharedEmail":'.'"'.$sharedEmail.'","email":'.'"'.$email.'"}';           
            print $myjson;  
        }
    }

    /**
     * function for get colaborator id 
     */
    
    public function GetCollab()
    {
        $mail=$_POST['email'];     
         
        $connect = new PDO("mysql:host=localhost;dbname=fundooNotes", "root", "root");
        $connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
        $sql = "SELECT * From collaborator where email='$mail'"; 
        $stmt = $connect->prepare($sql); 
        $res = $stmt->execute();
        while( $row = $stmt->fetch(PDO::FETCH_ASSOC)) 
        {
          $myArray[] = $row;
        }
        for ($a=0;$a<count($myArray);$a++)
        {
            array_push($myArray[$a],substr($myArray[$a]['sharedEmail'],0,1) );
        }        
        $notes= json_encode($myArray);
        print $notes;    
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
       
        $connect = new PDO("mysql:host=localhost;dbname=fundooNotes", "root", "root");
        $connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $sql = "SELECT * FROM noteLabel  where  labelid=$labelid  and   noteid=$noteid "; 
        $result = $connect->prepare($sql); 
        $result->execute(); 
        $number_of_rows = $result->fetchColumn();


        if($number_of_rows >=1)
        {
            //  echo("already exist");

        }
        else
        {
            $sql = "INSERT INTO noteLabel (noteid,labelid,email)
                    VALUES('$noteid','$labelid','$mail')";
            $result = $connect->prepare($sql); 
            $result->execute(); 
           
        }
    }


    /**
     * function for get notelabel and return data
     */
    public function getnotelabe()
    { 
        $mail=$_POST['email'];        

        $connect = new PDO("mysql:host=localhost;dbname=fundooNotes", "root", "root");
        $connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
        $sql ="SELECT * From noteLabel where email='$mail'"; 
        $stmt = $connect->prepare($sql); 
        $res = $stmt->execute();

        while( $row = $stmt->fetchAll(PDO::FETCH_ASSOC)) 
        {
            $notes= json_encode($row);
        }
       
        print $notes;

    }

    /**
     * function for delete the label 
     */
    public function deletelabel1()
    {
    
        /**
         * $labelid is the id of that perticular id which user want to delete
         */
        $labelid=$_POST['labelid'];   
        if(empty($labelid)|| $labelid=='undefined'  )
        {
            $labelid="";
        }
        $connect = new PDO("mysql:host=localhost;dbname=fundooNotes", "root", "root");
        $connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
        /**
         * query to select labelid from notelabel tabel to delete it 
         */
        $sql ="DELETE FROM noteLabel WHERE labelid=$labelid"; 
        $stmt = $connect->prepare($sql); 
        $res = $stmt->execute(); 
        
    }


}
?>