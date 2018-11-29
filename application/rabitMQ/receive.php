<?php
require_once '/var/www/html/code1/codeigniter/application/vendor/autoload.php';
use PhpAmqpLib\Connection\AMQPStreamConnection;

class Receiver
{
    /*
    name: hello
    type: direct
    passive: false
    durable: true // the exchange will survive server restarts
    auto_delete: false //the exchange won't be deleted once the channel is closed.
     */

    public function receiverMail()
    {

        $connection = new AMQPStreamConnection('localhost', 5672, 'guest', 'guest');
        $channel = $connection->channel();

        $channel->queue_declare('hello', false, false, false, false);

        // echo "\nReceiving the Message ....\n";

        // echo "[*] Waiting for messages. To exit press CTRL+C\n";

        $callback = function ($msg) {

            // echo " * Message received", "\n";
            $data = json_decode($msg->body, true);

            $from = $data['from'];
            $from_email = $data['from_email'];
            $to_email = $data['to_email'];
            $subject = $data['subject'];
            $message = $data['message'];

            /**
             * Create the Transport
             */
            $transport = (new Swift_SmtpTransport('smtp.gmail.com', 587, 'tls'))
                ->setUsername('simransande.a@gmail.com')
                ->setPassword('simrangmail');
            /**
             * Create the Mailer using your created Transport
             */
            $mailer = new Swift_Mailer($transport);

            /**
             * Create a message
             */
            $message = (new Swift_Message($subject))
                ->setFrom([$data['from_email'] => 'simran sande'])
                ->setTo([$to_email])
                ->setBody($message);
            /**
             * Send the message
             */
            $result = $mailer->send($message);

            $msg->delivery_info['channel']->basic_ack($msg->delivery_info['delivery_tag']);
        };

        $channel->basic_qos(null, 1, null);
        $channel->basic_consume('hello', '', false, false, false, false, $callback);
 return "abc";

    }
}