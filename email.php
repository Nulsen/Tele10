<?php
    require 'phpmailer/PHPMailerAutoload.php';

    $name = $_POST['name'];
    $email = $_POST['email'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];
    $response = $_POST['g-recaptcha-response'];

    $json = testRobot($response);
    $res = json_decode($json);
    $success = $json->success;

    echo 'json: ' . $json . "\n";
    echo 'res: ' . $res . "\n";
    echo 'success: ' . $success . "\n";

    if ($success) {
        echo 'Success!';
    } else {
        header("HTTP/1.0 500 Internal Server Error");
        echo 'Error!';
        exit(500);
    }

    // if ($res.err) {
    //     header("HTTP/1.0 500 Internal Server Error");
    //     exit()
    // }

    // $mail = new PHPMailer;

    // //$mail->SMTPDebug = 3;                               // Enable verbose debug output

    // $mail->isSMTP();                                      // Set mailer to use SMTP
    // $mail->Host = 'smtp1.example.com;smtp2.example.com';  // Specify main and backup SMTP servers
    // $mail->SMTPAuth = true;                               // Enable SMTP authentication
    // $mail->Username = 'user@example.com';                 // SMTP username
    // $mail->Password = 'secret';                           // SMTP password
    // $mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
    // $mail->Port = 587;                                    // TCP port to connect to

    // $mail->setFrom('from@example.com', 'Mailer');
    // $mail->addAddress('joe@example.net', 'Joe User');     // Add a recipient
    // $mail->addAddress('ellen@example.com');               // Name is optional
    // $mail->addReplyTo('info@example.com', 'Information');
    // $mail->addCC('cc@example.com');
    // $mail->addBCC('bcc@example.com');

    // $mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
    // $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
    // $mail->isHTML(true);                                  // Set email format to HTML

    // $mail->Subject = 'Here is the subject';
    // $mail->Body    = 'This is the HTML message body <b>in bold!</b>';
    // $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

    // if(!$mail->send()) {
    //     echo 'Message could not be sent.';
    //     echo 'Mailer Error: ' . $mail->ErrorInfo;
    // } else {
    //     echo 'Message has been sent';
    // }

    function getRealIpAddr() {
        if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
            $ip = $_SERVER['HTTP_CLIENT_IP'];
        } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
            $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
        } else {
            $ip = $_SERVER['REMOTE_ADDR'];
        }

        return $ip;
    }

    function testRobot($response) {
        $url = 'https://www.google.com/recaptcha/api/siteverify';
        $secret = '6LeboCAUAAAAABEtpDeF7F5AOvT-cG3HzerFaMqB';
        $remoteip = getRealIpAddr();

        $vars = 'secret=' . $secret . '&response=' . $response . '&remoteip=' . $remoteip;

        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $vars);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

        return curl_exec($ch);
    }
?>
