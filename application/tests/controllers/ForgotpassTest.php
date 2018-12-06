<?php
include "/var/www/html/code1/codeigniter/application/controllers/ForgotpasswordController.PHP";
/**
 * @description api for the testing the logins
 */
include "/var/www/html/code1/codeigniter/application/controllers/TestCase.php";
class ForgotpassTest extends TestCase
{

public function test_ForgotPassword()
    {
        $testcases = file_get_contents("ForgotPasswordTestCase.json", true);
        $testcases = json_decode($testcases, true);
        foreach ($testcases as $key => $value) {
            $email          = $value['email'];
            $_POST['email'] = $email;
            $ref            = new ForgotpasswordController();
            $result         = $ref->forgotpassword();
            $res            = $this->assertEquals($value['expected'], $result);
        }
    }
}
