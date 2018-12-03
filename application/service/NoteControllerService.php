<?php
defined('BASEPATH') OR exit('No direct script access allowed');
require_once 'PHPUnit/Autoload.php';
include_once '/var/www/html/code1/codeigniter/application/controllers/jwt.php';
require '/var/www/html/code1/codeigniter/application/controllers/vendor/autoload.php';
include "/var/www/html/code1/codeigniter/application/static/HardCode.php";

class NoteControllerService
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

    public function note($title,$des,$mail,$reminder, $pin,
    $archive, $trash, $colorcode, $image)
    {

        /**
         * insert all the data into tabel 
         */
        $sql = "INSERT INTO note (tittle,description,email, reminder, pin,
                archive, trash, colorcode, image)
                VALUES('$title','$des','$mail','$reminder', $pin,
                $archive, $trash, '$colorcode', '$image')";

        /**
         * prepare connection
         */
        $stmt = $this->connect->prepare($sql);
        
        /**
         * excuting that stmt
         */
        // $res = $stmt->execute();
            if ($stmt->execute()) {
                $sql    = "select max(id) as id from note where email = '$mail'";
                $stmt   = $this->connect->prepare($sql);
                $var    = $stmt->execute();
                $noteid = $stmt->fetch(PDO::FETCH_ASSOC);
                $noteid = $noteid['id'];
                /**
                 * To update ID for Drag and drop.
                 */
                $sqlquerry         = "UPDATE note set DragAndDropID = $noteid where id = '$noteid'";
                $statementofQuerry = $this->connect->prepare($sqlquerry);
                $var               = $statementofQuerry->execute();
            }
    }

    public function getnotes($mail){

        $sql = "SELECT * From note where email='$mail' order by DragAndDropID DESC ";
      
        $stmt = $this->connect->prepare($sql);
        $res = $stmt->execute();
        while( $row = $stmt->fetch(PDO::FETCH_ASSOC)) 
        {
            $myArray[] = $row;
        }
        $notes= json_encode($myArray);
        print $notes;    
    }

    public function joinNoteCollab($mail){
         /**
         * query to join two tabels note and collaborator
         */
        $sql = "SELECT * FROM fundooNotes.note INNER JOIN fundooNotes.collaborator ON note.id = collaborator.noteId
                where collaborator.sharedEmail='$mail'";
    
        $stmt = $this->connect->prepare($sql);
        $res = $stmt->execute();
        while( $row = $stmt->fetch(PDO::FETCH_ASSOC)) 
        {
          $myArray[] = $row;
        }
        $notes= json_encode($myArray);
        print $notes;
    }

    public function updatenotes($flag,$id,$mail,$image,$description,$trash,$title,
    $isarchive,$pin,$color,$reminder){
        if($flag=='pin')
        {
           if($pin==0)
           {        
             $sql = "UPDATE note SET pin=1 WHERE id=$id";
             $stmt = $this->connect->prepare($sql);
             $res = $stmt->execute();
           }
           else
           {
             $sql = "UPDATE note SET pin=0 WHERE id=$id";
             $stmt = $this->connect->prepare($sql);
             $res = $stmt->execute();
           }
        
        }
    

        if($title==$title)
        {
            $sql = "UPDATE note SET tittle='$title' WHERE id=$id";
            $stmt = $this->connect->prepare($sql);
            $res = $stmt->execute(); 
        }
    
       
        if($description==$description)
        {
            $sql="UPDATE note SET description='$description' WHERE id=$id";
            $stmt = $this->connect->prepare($sql);
            $res = $stmt->execute();
        
        }
    
        if($color=='color')
        {
           $sql="UPDATE note SET colorcode='$color' WHERE id=$id";
           $stmt = $this->connect->prepare($sql);
           $res = $stmt->execute();
        
        }
    
        if($flag=='color')
        {
            $sql="UPDATE note SET colorcode='$color' WHERE id=$id";
            $stmt = $this->connect->prepare($sql);
            $res = $stmt->execute();
        }

        if($flag=='archive')
        {
            if($isarchive==0)
            {        
                $sql="UPDATE note SET archive='1' WHERE id=$id";
                $stmt = $this->connect->prepare($sql);
                $res = $stmt->execute();
            }
            else
            {
                $sql="UPDATE note SET archive='0' WHERE id=$id";
                $stmt = $this->connect->prepare($sql);
                $res = $stmt->execute();
            }
        }

        if($flag=='trash')
        {
            if($trash==0)
            {        
                $sql="UPDATE note SET trash=1 WHERE id=$id";
                $stmt = $this->connect->prepare($sql);
                $res = $stmt->execute();
            }
            else{
                $sql="UPDATE note SET trash=0 WHERE id=$id";
            }
            $stmt = $this->connect->prepare($sql);
            $res = $stmt->execute();

        }

        if($flag=='dltForever')
        {        
            $sql="DELETE FROM note WHERE id=$id";
            $stmt = $this->connect->prepare($sql);
            $res = $stmt->execute();
        
        }

        if($flag=='restore')
        {
            $sql="UPDATE note SET trash=0 WHERE id=$id";
            $stmt = $this->connect->prepare($sql);
            $res = $stmt->execute();
        }

        if($flag=='reminder')
        {
            $sql="UPDATE note SET reminder='$reminder' WHERE id=$id";
            $stmt = $this->connect->prepare($sql);
            $res = $stmt->execute();
        } 
        
        if($flag=='dltReminder')
        {
            $sql="UPDATE note SET reminder='' WHERE id=$id";
            $stmt = $this->connect->prepare($sql);
            $res = $stmt->execute();
        }
            
        if($flag=='dltLabel')
        {
            $sql="UPDATE note SET label='' WHERE id=$id";
            $stmt = $this->connect->prepare($sql);
            $res = $stmt->execute();
        }

        if($flag=='image')
        {
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
             $stmt = $this->connect->prepare($sql);
             $res = $stmt->execute();
           
            }
             
        }


    }


    public function deleteurl($id,$mail){

        
        $sql = "DELETE FROM note WHERE id=$id";
        $stmt = $this->connect->prepare($sql);
        $res = $stmt->execute();

    }

    public function collaborator($mail){
        $sql = "SELECT count(*) FROM user  where email='$mail'"; 
        $result = $this->connect->prepare($sql); 
        $result->execute(); 
        $number_of_rows = $result->fetchColumn();
     
        if ($number_of_rows>=1) 
        {  
            $mail=$_POST['mail'];                     
            $myjson='{"email":'.'"'.$mail.'"}';           
            print $myjson;  
        } 
    }

    public function AddCollab($noteid,$sharedEmail,$email){
        $sql = "SELECT count(*)  FROM collaborator  where  sharedEmail='$sharedEmail'  and   noteId=$noteid"; 
        $result = $this->connect->prepare($sql); 
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
            $result = $this->connect->prepare($sql); 
            $result->execute(); 

            $noteid=$_POST['noteid']; 
            $sharedEmail=$_POST['sharedEmail'];   
            $email=$_POST['email'];   

            $myjson='{"noteid":'.'"'.$noteid.'","sharedEmail":'.'"'.$sharedEmail.'","email":'.'"'.$email.'"}';           
            print $myjson;  
        }
    }

    public function GetCollab($mail){
        
        $sql = "SELECT * From collaborator where email='$mail'"; 
        $stmt = $this->connect->prepare($sql); 
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

    public function notelabe($mail,$noteid,$labelid){
        
        $sql = "SELECT * FROM noteLabel  where  labelid=$labelid  and   noteid=$noteid "; 
        $result = $this->connect->prepare($sql); 
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
            $result = $this->connect->prepare($sql); 
            $result->execute(); 
           
        }
    }

    public function getnotelabe($mail){
        $sql ="SELECT * From noteLabel where email='$mail'"; 
        $stmt = $this->connect->prepare($sql); 
        $res = $stmt->execute();

        while( $row = $stmt->fetchAll(PDO::FETCH_ASSOC)) 
        {
            $notes= json_encode($row);
        }
       
        print $notes;

    }

    public function deletelabel1($labelid,$noteid){
         /**
         * query to select labelid from notelabel tabel to delete it 
         */
        $sql ="DELETE FROM noteLabel WHERE labelid=$labelid and noteid=$noteid"; 
        $stmt = $this->connect->prepare($sql); 
        $res = $stmt->execute(); 
    }

    public function DragAndDrop($email,$id,$loop,$direction){

        for ($i = 0; $i < $loop; $i++) {
            if ($direction == "upward") {
                $querry = "SELECT max(DragAndDropID) as nextid from note where DragAndDropID < '$id' and email='$email'";
            }
            else {
                $querry = "SELECT min(DragAndDropID) as nextid from note where DragAndDropID > '$id' and email='$email'";
            }
       
            $stmt   = $this->connect->prepare($querry);
            $var    = $stmt->execute();
            $noteid = $stmt->fetch(PDO::FETCH_ASSOC);
            $noteid = $noteid['nextid'];

            $querry = "UPDATE note a inner join note b on a.DragAndDropID <> b.DragAndDropID 
             set a.DragAndDropID =b.DragAndDropID  where a.DragAndDropID in('$noteid','$id')
              and b.DragAndDropID in('$noteid','$id')";
              $stmt   = $this->connect->prepare($querry);
              $var    = $stmt->execute();
              $id=$noteid;
    }
}

public function profileUploadinGet($email){

    $sql ="SELECT * From user where email='$email'"; 
    $stmt = $this->connect->prepare($sql); 
    $res = $stmt->execute();
    $row=$stmt->fetch(PDO::FETCH_ASSOC);

        // $notes= json_encode(base64_encode($row));
        print json_encode(base64_encode($row['profilepic']));
    // print $notes;


}
}