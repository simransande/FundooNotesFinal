<?php
class value
{

  public  $key = "fundooNotes";
  public $iss =11;
  public $aud = 30;
  public $iat = 1356999524;
  public $nbf = 1358000000;
    function val()
    {
// show error reporting
error_reporting(E_ALL);
 
// set your default time-zone
date_default_timezone_set('Asia/Manila');
 
    }
}
?>