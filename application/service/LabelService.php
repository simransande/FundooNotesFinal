<?php
include "/var/www/html/code1/codeigniter/application/static/HardCode.php";
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Authorization");
class LabelService{

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


    public function label($label, $mail){

        $sql = "INSERT INTO label (email,label)
        VALUES('$mail','$label')";
        $stmt = $this->connect->prepare($sql);
        $res = $stmt->execute();
    }

    public function getlabel($mail){

        $sql = "SELECT * From label where email='$mail'";
    
        $stmt = $this->connect->prepare($sql);
        $res = $stmt->execute();
        while( $row = $stmt->fetch(PDO::FETCH_ASSOC)) 
        {
          $myArray[] = $row;
        }
        $notes= json_encode($myArray);
        print $notes;
    }

    public function updatlabel($flag,$mail,$label,$id){

        if($flag=='updateLabel')
        {
            $sql = "UPDATE label SET label='$label' WHERE id=$id";
            $stmt = $this->connect->prepare($sql);
            $res = $stmt->execute();
        }
    
    }

    public function deletelabel($flag,$mail,$id){

        if($flag=='deleteLabel')
        {
            $sql = "DELETE FROM label WHERE id=$id";
            $stmt = $this->connect->prepare($sql);
            $res = $stmt->execute();
        }
    }


}




?>