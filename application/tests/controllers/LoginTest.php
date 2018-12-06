<?php
include "/var/www/html/code1/codeigniter/application/controllers/LoginController.php";
/**
 * @description api for the testing the logins
 */
include "/var/www/html/code1/codeigniter/application/controllers/TestCase.php";
class LoginTest extends TestCase
{
    public function testLogins()
    {

        $data = file_get_contents('userData.json', true);
        $json = json_decode($data, true);

        foreach ($json as $key => $value) {
            $_POST['email'] = $value['email'];
            $_POST['password'] = $value['password'];
            $ref = new LoginController();
            $result = $ref->login();
            $res = $this->assertEquals($value['expected'], $result);
        }
    }
}
?>