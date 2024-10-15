<!-- Sends Text mail -->
<?php

$headers = "MIME-Version: 1.0\r\n"; // Defining the MIME version
    $headers .= "From: no-reply@greenandyoung.in\r\n"; // Sender Email
    $headers .= "Reply-To: no-reply@greenandyoung.in\r\n"; // Email address to reach back
$headers .= "Content-type:text/html; charset=UTF-8" . "\r\n"; 

$to = 'ranvijay.upadhyay@adcliq360.com';
$subject = "Recieved Contact Submission Form";



$from_name = htmlspecialchars($_POST['name']);
$phone = htmlspecialchars($_POST['phone']);
$htype = htmlspecialchars($_POST['htype']);
$location = htmlspecialchars($_POST['location']);
$purpose = htmlspecialchars($_POST['interior_purpose']);



    $message = "
<html>
<head>
<title>Contact Us Query Form</title>
</head>
<body>
<p>Contact Us Query Form</p>
<table>
<tr>
<td>Name : </td>
<td>" . $from_name . "</td>
</tr>
<tr>
<td>Contact Number : </td>
<td>" . $phone . "</td>
</tr>
<tr>
<td>Home Type : </td>
<td>" . $htype . "</td>
</tr>
<tr>
<td>Location : </td>
<td>" . $location . "</td>
</tr>
<tr>
<td>Interior Purpose : </td>
<td>" . $purpose . "</td>
</tr>
</table>
</body>
</html>
";

echo mail($to, $subject, $message, $headers);
header("Location:thank_you.html");


