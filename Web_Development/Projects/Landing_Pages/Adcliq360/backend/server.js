const express=require('express');

const app=express();

const nodemailer = require('nodemailer');

const bodyParser=require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));

const fs=require('fs');
const path = require('path');

const cors=require('cors');
app.use(cors());

require('dotenv').config();

app.use(express.static(path.join(__dirname, 'public')));


//multer middleware
const multer=require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      return cb(null, './upload');
    },
    filename: function (req, file, cb) {
      return cb(null, `${Date.now()}-${file.originalname}`);
    }
  })
  const upload = multer({ storage });

//node mailer
const transporter=nodemailer.createTransport({
    service:'gmail',
    host:process.env.SMTP_HOST,
    port:process.env.SMTP_PORT,
    auth:{
        user:process.env.EMAIL,
        pass:process.env.APP
    }
})

const sendOtpEmail = async (info, files) => {
    const mailOptions = {
        from: process.env.EMAIL, //'Gojoservices@gmail.com',
        to: process.env.RECIEVER,
        subject: 'YOUR DOCUMENTS',
        text: `Company Name: ${info.company_name}
        Phone Number: ${info.phone_number}
        POC Phone Number: ${info.poc_phone_number}
        POC Email: ${info.poc_email}
        Billing Address: ${info.billing_address}
        PIN: ${info.pin}
        Billing Phone Number: ${info.billing_phone_number}
        Billing Email: ${info.billing_email}
 `,
 attachments: files.map(file => ({
    filename: file[0].filename, // Use the original filename of the uploaded file
    path: path.join(__dirname,'upload',file[0].filename) // Path to the file on the server
}))
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
    } catch (err) {
        console.error('Error sending email: ' + err);
        throw new Error('Failed to send OTP email');
    }
}


app.post('/send-mail',upload.fields([{ name: 'gst_no', maxCount: 1 }, 
    { name: 'pan_no', maxCount: 1 },{name:'id_proof',maxCount: 1},
    {name:'signed_msa',maxCount: 1},{name:'other_docs',maxCount: 1}]),async(req,res)=>{
    
    
    try{
        const {gst_no,pan_no,id_proof,signed_msa,other_docs}=req.files;
        console.log(gst_no,pan_no,id_proof,signed_msa,other_docs);
       
         await sendOtpEmail(req.body,[gst_no,pan_no,id_proof,signed_msa,other_docs]);

         const remove=[gst_no,pan_no,id_proof,signed_msa,other_docs];

         
            remove.map(file=>{
                const oldFilePath=path.join(__dirname,'upload',file[0].filename);
                fs.unlink(oldFilePath, (err) => {
                    if (err) {
                        console.log('Error removing old file:', err);
                    } else {
                        console.log('Old file removed:', oldFilePath);
                    }
                });
            })

        return res.sendFile(path.join(__dirname,'response.html'));

    }catch(err)
    {
        console.log(err);
        res.end('internal server error');
    }

    
})

app.get('/home',(req,res)=>{
     res.send('hiiiii');

})

app.listen(65002,()=>{
    console.log('server is live on PORT=4000');
})

