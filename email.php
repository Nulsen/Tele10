<?php
    iconv_set_encoding("internal_encoding", "UTF-8");

    require 'phpmailer/PHPMailerAutoload.php';

    $name = $_POST['name'];
    $email = $_POST['email'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];

    $body = '<p>Hej!</p>
            <p>En förfrågan har kommit in via kontaktformuläret på hemsidan.</p>
            <ul>
                <li><b>Namn</b>: ' . $name . '</li>
                <li><b>E-post</b>: ' . $email . '</li>
                <li><b>Ämne</b>: ' . $subject . '</li>
            </ul>
            <b>Meddelande</b>:
            <br />
            ' . $message;

    $mail = new PHPMailer;

    // $mail->SMTPDebug = 3; // Enable verbose debug output

    $mail->isSMTP(); // Set mailer to use SMTP
    $mail->Host = 'smtp01.binero.se'; // Specify main and backup SMTP servers
    $mail->SMTPAuth = true; // Enable SMTP authentication
    $mail->Username = 'contact@tele10.se'; // SMTP username
    $mail->Password = '1egYnzpZDV'; // SMTP password
    $mail->CharSet = 'UTF-8'; 
    $mail->SMTPSecure = 'ssl'; // Enable TLS encryption, `ssl` also accepted - tls / ssl
    $mail->Port = 465; // TCP port to connect to - 587 / 465

    $mail->isHTML(true);    

    $mail->setFrom($email, 'Kontaktformulär');
    $mail->addAddress('info@tele10.se', 'Tele10'); // Add a recipient

    $mail->Subject = 'Tele10 kontaktformulär - ' . $service;
    $mail->Body = $body;

    if (!$mail->send()) {
        header("HTTP/1.0 500 Internal Server Error");
        die ("Meddelandet kunde tyvärr inte skickas för tillfället. Skicka istället ditt ärende direkt till <a href=\"mailto:info@tele10.se\">info@tele10.se</a>");
    } else {
        echo 'Tack! Ditt meddelande har skickats, vi återkommer så fort som möjligt.';
    }
?>
