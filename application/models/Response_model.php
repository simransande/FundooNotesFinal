<?php
if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Response_model extends CI_Model {

    public function __construct(){
        parent::__construct();
    }
    private $flag;
    private $email;

    public function getFlag() {
        return $this->flag;
    }
 
    public function setFlag($flag) {
        $this->flag = $flag;
        return $this;
    }
 
    public function getEmail() {
        return $this->email;
    }
 
    public function setEmail($email) {
        $this->email = $email;
        return $this;
    }
    // public function toArray() {
    //     return [
    //         'flag' => $this->flag,
    //         'email' => $this->email,
    //     ];
    // }
}