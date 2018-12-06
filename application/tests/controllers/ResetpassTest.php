<?php
include "/var/www/html/code1/codeigniter/application/controllers/ResetPasswordController.php";
/**
 * @description api for the testing the logins
 */
include "/var/www/html/code1/codeigniter/application/controllers/TestCase.php";
class ResetpassTest extends TestCase
{

public function test_resetpassword()
    {
        $testcases = file_get_contents("Resetpass.json", true);
        $testcases = json_decode($testcases, true);
        foreach ($testcases as $key => $value) {
            $password = $value['password'];
            $_POST['password'] = $password;
            $ref    = new ResetPasswordController();
            $result = $ref->resetpassword();
            $res    = $this->assertEquals($value['expected'], $result);
        }
    }
}