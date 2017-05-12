<?php
    require 'phpmailer/PHPMailerAutoload.php';

    $name = $_POST['name'];
    $email = $_POST['email'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];
    $response = $_POST['g-recaptcha-response'];

    $res = testRobot($response);
    $json = json_decode($res, true);
    $success = $json['success'];

    if ($success != 1) {
        die ("Du har fyllt i captcha-koden felaktigt, försök igen.");
    }

    $mail = new PHPMailer;

    // $mail->SMTPDebug = 3; // Enable verbose debug output

    $mail->isSMTP(); // Set mailer to use SMTP
    $mail->Host = 'smtp01.binero.se'; // Specify main and backup SMTP servers
    $mail->SMTPAuth = true; // Enable SMTP authentication
    $mail->Username = 'kristina.westerberg@allsite.se'; // SMTP username
    $mail->Password = 'sommar17'; // SMTP password
    $mail->SMTPSecure = 'ssl'; // Enable TLS encryption, `ssl` also accepted - ttl / ssl
    $mail->Port = 465; // TCP port to connect to - 587 / 465

    $mail->isHTML(false);

    $mail->setFrom($email, $name);
    $mail->addAddress('jonathan.nielsen93@gmail.com', 'Tele10'); // Add a recipient

    $mail->Subject = 'Tele10 webite form - ' . $subject;
    $mail->Body = $message;

    if (!$mail->send()) {
        die ("Meddelandet kunde inte tyvärr inte skickas för tillfället. Skicka istället ditt ärende direkt till <a href=\"mailto:info@tele10.se\">info@tele10.se</a>");
    } else {
        echo 'Ditt meddelande har skickats, vi återkommer så fort som möjligt.';
    }

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
