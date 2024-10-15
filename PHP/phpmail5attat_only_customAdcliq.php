<?php
if(isset($_POST['submit'])){
    // Get the submitted form data
    $companyName = $_POST['companyName'];
    $phoneNumber = $_POST['phoneNumber'];
    $pocPhoneNumber = $_POST['pocPhoneNumber'];
    $pocEmail = $_POST['pocEmail'];
    $billingAddress = $_POST['billingAddress'];
    $pinCode = $_POST['pinCode'];
    $billingPhoneNumber = $_POST['billingPhoneNumber'];
    $billingEmail = $_POST['billingEmail'];
    $email = $_POST['email'];
    $name = $_POST['name'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];

    // Validate email
    if(filter_var($email, FILTER_VALIDATE_EMAIL) === false || filter_var($pocEmail, FILTER_VALIDATE_EMAIL) === false || filter_var($billingEmail, FILTER_VALIDATE_EMAIL) === false){
        echo 'Please enter valid email addresses.';
        exit;
    }

    // Validate other required fields
    if(empty($companyName) || empty($phoneNumber) || empty($pocPhoneNumber) || empty($billingAddress) || empty($pinCode) || empty($billingPhoneNumber) || empty($email) || empty($name) || empty($subject) || empty($message)) {
        echo 'Please fill all the fields.';
        exit;
    }

    $uploadStatus = 1;
    $targetDir = "uploads/";
    $allowTypes = array('pdf', 'jpg', 'png');
    $uploadedFiles = array();
    $fileFields = array('attachment1', 'attachment2', 'attachment3', 'attachment4', 'attachment5');

    foreach($fileFields as $fileField){
        if(!empty($_FILES[$fileField]['name'])){
            $fileName = basename($_FILES[$fileField]['name']);
            $targetFilePath = $targetDir . $fileName;
            $fileType = pathinfo($targetFilePath, PATHINFO_EXTENSION);

            if(in_array($fileType, $allowTypes)){
                if(move_uploaded_file($_FILES[$fileField]['tmp_name'], $targetFilePath)){
                    $uploadedFiles[] = $targetFilePath;
                }else{
                    $uploadStatus = 0;
                    echo "Sorry, there was an error uploading your files.";
                    break;
                }
            }else{
                $uploadStatus = 0;
                echo 'Sorry, only PDF, JPG, and PNG files are allowed to upload.';
                break;
            }
        }
    }

    if($uploadStatus == 1){
        // Recipient Email
        $toEmail = 'ranvijay.upadhyay@adcliq360.com';

        // Sender Data
        $from = 'no-reply@adcliq360.com'; // Use a legitimate sender email
        $fromName = 'Your Company';

        // Subject
        $emailSubject = 'Contact Request Submitted by '.$name;

        // Message 
        $htmlContent = '<h2>Contact Request Details</h2>
            <p><b>Company Name:</b> '.$companyName.'</p>
            <p><b>Phone Number:</b> '.$phoneNumber.'</p>
            <p><b>POC Phone Number:</b> '.$pocPhoneNumber.'</p>
            <p><b>POC Email:</b> '.$pocEmail.'</p>
            <p><b>Billing Address:</b> '.$billingAddress.'</p>
            <p><b>Pin Code:</b> '.$pinCode.'</p>
            <p><b>Billing Phone Number:</b> '.$billingPhoneNumber.'</p>
            <p><b>Billing Email:</b> '.$billingEmail.'</p>
            <p><b>Name:</b> '.$name.'</p>
            <p><b>Email:</b> '.$email.'</p>
            <p><b>Subject:</b> '.$subject.'</p>
            <p><b>Message:</b> '.$message.'</p>';

        // Header for sender info
        $headers = "From: ". $fromName." <".$from.">";
        $headers .= "\r\nReply-To: ".$email;
        $headers .= "\r\nReturn-Path: ".$from;

        if(!empty($uploadedFiles)){
            $semi_rand = md5(time()); 
            $mime_boundary = "==Multipart_Boundary_x{$semi_rand}x"; 

            $headers .= "\nMIME-Version: 1.0\n" . "Content-Type: multipart/mixed;\n" . " boundary=\"{$mime_boundary}\""; 

            $message = "--{$mime_boundary}\n" . "Content-Type: text/html; charset=\"UTF-8\"\n" .
            "Content-Transfer-Encoding: 7bit\n\n" . $htmlContent . "\n\n"; 

            foreach($uploadedFiles as $uploadedFile){
                if(is_file($uploadedFile)){
                    $message .= "--{$mime_boundary}\n";
                    $fp =    @fopen($uploadedFile,"rb");
                    $data =  @fread($fp, filesize($uploadedFile));
                    @fclose($fp);
                    $data = chunk_split(base64_encode($data));
                    $message .= "Content-Type: application/octet-stream; name=\"".basename($uploadedFile)."\"\n" . 
                    "Content-Description: ".basename($uploadedFile)."\n" .
                    "Content-Disposition: attachment;\n" . " filename=\"".basename($uploadedFile)."\"; size=".filesize($uploadedFile).";\n" . 
                    "Content-Transfer-Encoding: base64\n\n" . $data . "\n\n";
                }
            }

            $message .= "--{$mime_boundary}--";
            $returnpath = "-f" . $from;

            $mail = mail($toEmail, $emailSubject, $message, $headers, $returnpath);

            foreach($uploadedFiles as $uploadedFile){
                @unlink($uploadedFile);
            }
        }else{
            $headers .= "\r\nMIME-Version: 1.0";
            $headers .= "\r\nContent-type:text/html;charset=UTF-8";

            $mail = mail($toEmail, $emailSubject, $htmlContent, $headers); 
        }

        if($mail){
            echo 'Your message was submitted successfully!';
        }else{
            echo 'Your contact request submission failed, please try again.';
        }
    }
}
?>


<!-- 

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Form with Multiple Attachments</title>
    <link rel="stylesheet" href="style.css">
    <style>
        body {
    font-family: Arial, sans-serif;
    background-color: #f2f2f2;
}

.container {
    width: 50%;
    margin: 0 auto;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
}

h2 {
    text-align: center;
}

label {
    display: block;
    margin-top: 10px;
}

input[type=text], textarea, input[type=file] {
    width: 100%;
    padding: 10px;
    margin-top: 5px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

input[type=submit] {
    width: 100%;
    background-color: #4CAF50;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

input[type=submit]:hover {
    background-color: #45a049;
}

    </style>
</head>
<body>
    <div class="container">
        <form action="send_email.php" method="post" enctype="multipart/form-data">
            <h2>Contact Form</h2>
            
            <label for="companyName">Company Name</label>
            <input type="text" id="companyName" name="companyName" placeholder="Your company name..">

            <label for="phoneNumber">Phone Number</label>
            <input type="text" id="phoneNumber" name="phoneNumber" placeholder="Your phone number..">

            <label for="pocPhoneNumber">POC Phone Number</label>
            <input type="text" id="pocPhoneNumber" name="pocPhoneNumber" placeholder="POC phone number..">

            <label for="pocEmail">POC Email</label>
            <input type="text" id="pocEmail" name="pocEmail" placeholder="POC email..">

            <label for="billingAddress">Billing Address</label>
            <input type="text" id="billingAddress" name="billingAddress" placeholder="Billing address..">

            <label for="pinCode">Pin Code</label>
            <input type="text" id="pinCode" name="pinCode" placeholder="Pin code..">

            <label for="billingPhoneNumber">Billing Phone Number</label>
            <input type="text" id="billingPhoneNumber" name="billingPhoneNumber" placeholder="Billing phone number..">

            <label for="billingEmail">Billing Email</label>
            <input type="text" id="billingEmail" name="billingEmail" placeholder="Billing email..">

            <label for="name">Name</label>
            <input type="text" id="name" name="name" placeholder="Your name..">

            <label for="email">Email</label>
            <input type="text" id="email" name="email" placeholder="Your email..">

            <label for="subject">Subject</label>
            <input type="text" id="subject" name="subject" placeholder="Subject..">

            <label for="message">Message</label>
            <textarea id="message" name="message" placeholder="Write something.." style="height:200px"></textarea>

            <label for="attachment1">Attachment 1</label>
            <input type="file" name="attachment1">

            <label for="attachment2">Attachment 2</label>
            <input type="file" name="attachment2">

            <label for="attachment3">Attachment 3</label>
            <input type="file" name="attachment3">

            <label for="attachment4">Attachment 4</label>
            <input type="file" name="attachment4">

            <label for="attachment5">Attachment 5</label>
            <input type="file" name="attachment5">

            <input type="submit" name="submit" value="Submit">
        </form>
    </div>
</body>
</html>









-->