// Main File
const http = require("http");
// Built In Node js module

const fs = require("fs");
const url = require("url");
const express = require("express");


// const myServer = http.createServer((req, res) => {
//     if (req.url === '/favicon.ico')
//         return res.end();

//     const log = `${Date.now()}: ${req.method} ${req.url} New Req Received\n`;

//     const myUrl = url.parse(req.url, true);

//     fs.appendFile("log.txt", log, (err, data) => {
//         // Multi Route 
//         switch (myUrl.pathname) {
//             case "/":
//                 res.end("HomePage");
//                 break;
//             case "/About":
//                 const username = myUrl.query.myname;
//                 res.end(`Hi ${username}`);
//                 break;
//             default:
//                 res.end("404 Not Found");
//         }
//     });
// console.log("New Req Rec");
// res.end("Hello From Server");
// });

// --------------------------------
const app = express();
// App is handler function for creating server
app.get('/', (req, res) => {

    return res.send("Hello From Home Page");
});
app.get('/about', (req, res) => {

    return res.send("Hello From About Page");
});

const myServer = http.createServer(app)


myServer.listen(8000, () => console.log("Server Running"));