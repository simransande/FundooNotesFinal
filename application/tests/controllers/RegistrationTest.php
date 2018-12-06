<?php
include "/var/www/html/code1/codeigniter/application/controllers/RegisterController.php";
/**
 * @description api for the testing the logins
 */
include "/var/www/html/code1/codeigniter/application/controllers/TestCase.php";
class RegistrationTest extends TestCase
{

public function testRegistration()
    {
        $testcases = file_get_contents("RegistrationTestCase.json", true);
        $testcases = json_decode($testcases, true);
        foreach ($testcases as $key => $value) {
            $email    = $value['email'];
            $password = $value['password'];
            $phno     = $value['phno'];
            $name     = $value['username'];
            $_POST['email'] = $email;
            $_POST['password']  = $password;
            $_POST['phone']  = $phno;
            $_POST['username']  = $name;
            $ref    = new RegisterController();
            $result = $ref->register();
            $res = $this->assertEquals($value['expected'], $result);
        }
    }
}