<?php
$to = 'interiors@greenandyoung.in';
$subject = "Recieved Submission Form";

$from_name = $_POST['name'];
$phone = $_POST['phone'];
$from = $_POST['email'];
$htype = $_POST['htype'];
$location = $_POST['location'];

$headers = 'From: $from_name <$from>' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n"; 


$message = "
 <html>
    <head>
        <title>Green and Young - Contact Form Submission</title>
    </head>
    <body>
        <h2>Contact Form Submission</h2>
        <p><strong>NAME :</strong> $from_name</p>
        <p><strong>PHONE :</strong> $phone</p>
        <p><strong>EMAIL :</strong> $from</p>
        <p><strong>HOUSE TYPE :</strong> $htype</p>
        <p><strong>LOCATION :</strong> $location</p>
    </body>
    </html>
";


if (mail($to, $subject, $message, $headers)) {
    echo "Message sent successfully";
}
header("Location:thank_you.html");
