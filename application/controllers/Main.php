<?php
	if (!defined('BASEPATH')) exit('No direct script access allowed');
Class Main extends CI_Controller
{
    public function index()
    {
        $this->load->view('Login');
        $n=$_POST['n'];
        if($n==1)
        {
        $username=$_POST['username'];
        $password=$_POST['password'];
        $password1=$_POST['password1'];
        if($password1===$password)
        {
            $data=array('username'=>$username,'password'=>$password);
        $this->load->model('login_and_registeration');
        $res=$this->login_and_registeration->validate($username);
        if($res!=1)
        {
        $this->login_and_registeration->add_users($data);
        }
        else
        echo "username already found";
    }
        else
        echo "Please enter the same password";
    }
        else if($n==2)
        {
            $username=$_POST['username'];
            $password=$_POST['password'];
            $this->load->model('login_and_registeration');
             /**/
             $res=$this->login_and_registeration->validate($username);
             if($res==1)
             {
             $res=$this->login_and_registeration->get_users($username);
             if($res===$password)
             {
                 $this->load->library('session');
               $this->session->set_userdata('username',$username);
             $this->load->view('test');
             }
             else
             echo "oops you have entered wrong password";
             }
             else
             echo "username not found";

        }

    }
      public function register()
    {
        
        $this->load->view('Register');
    }
    public function login()
    {
        $this->load->view('Login');
    }
}
?>