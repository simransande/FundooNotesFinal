<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');
class Login_and_registeration extends CI_Model
{
    public function get_users($username)
{
    //$q = $this->db->select('password')->from('detail')->where('username',$username)->get();
    $password1 = $this->db->select('password')
    ->get_where('detail', array('username' => $username))
    ->row()
    ->password;
  return $password1;
    
}
public function add_users($data)
{
    if($this->db->insert('detail',$data))
    echo "data added sucessfully ";
    else
    echo "Data not added";
}
public function validate($username)
{
    $query = $this->db->get('detail');

foreach ($query->result() as $row)
{
        if($row->username===$username)
        {
        return true;
        break;
        }
}
}
}
?>