<?php
if (!class_exists('PHPMailer')) {

    require 'application/vendor/phpmailer/phpmailer/src/PHPMailer.php';
    require 'application/vendor/phpmailer/phpmailer/src/SMTP.php';
}
require_once "mail_configuration.php";
$mail = new PHPMailer();

$emailBody = "<div>" . $user["email"] . ",<br><br><p>Click this link to recover your password<br>" . PROJECT_HOME ;

$mail->IsSMTP();
$mail->SMTPDebug = 0;
$mail->SMTPAuth = true;
$mail->SMTPSecure = "tls";
$mail->Port = 587;
$mail->Username = "simransande.a@gmail.com";
$mail->Password = "simrangmail";
$mail->Host = "smtp.gmail.com";
$mail->Mailer = MAILER;

$mail->SetFrom('simransande.a@gmail.com', 'Simran');
$mail->AddReplyTo('simransande.a@gmail.com', 'Simran');
$mail->ReturnPath = SERDER_EMAIL;
$mail->AddAddress($user["email"]);
$mail->Subject = "Forgot Password Recovery";
$mail->MsgHTML($emailBody);
$mail->IsHTML(true);

if (!$mail->Send()) {
    $error_message = 'Problem in Sending Password Recovery Email';
} else {
    $success_message = 'Please check your email to reset password!';
}