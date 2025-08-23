## GUI vs CLI

- GUI -> Graphical User Interface
    - Easier for beginners, uses icons and menus
    - Allows interaction with mouse and touch
    - Examples: Windows, macOS, GNOME

- ClI -> Command Line Interface 
    - Text-based interface for interacting with the system  
    - Requires typing commands  
    - Preferred by advanced users for speed and automation  
    - Examples: Bash, PowerShell, Command Prompt

- CLI Commands 
    - cd .. -> Change Directory to previous Folder
    - cd folder_name -> Moves to next folder with matching name
    - mkdir folder_name -> Make Directory with the given name.
    - dir -> provides list of directories present in the folder
    - cls -> clear the interface.


# Node Js
    Node Js ia a run time environment for javascript.

Sabhi browser ke saath JS Engine aata hai jo outside browser kaam nhi krta tha,
Therefore node.js laya gya by RYAN DAHL by combining JavaScript V8 Engine of chromium Browser with C++; excluding UI Components like window Objects, DOM etc.

    Node.js is not a Library , nor a framework

- Node.js is an open-source, cross-platform runtime environment that allows you to run JavaScript code outside of a web browser.
- It uses the V8 JavaScript engine developed by Google, which is also used in the Chrome browser.
- Node.js is commonly used for building server-side applications, APIs, and real-time applications like chat applications.
- It is event-driven and non-blocking, which makes it efficient for handling multiple requests simultaneously


- Node -v -> provides Node version that is installed in system

- NPM -> node provides NPM (Node package manager)

``` JavaScript []
let a = 10;
let b = 20;

console.log(a + b); // This will output 30 on terminal and we can see it in the console.

// To run this file, use the command: node app.js
// This will execute the code and display the output in the terminal.


// Function Statement
function greet() {
    console.log("Hello, World!");
}

// When Function is called it is called Invoking a Function or Calling a function
greet();
```

-  Function are first class citizens in JavaScript, meaning they can be passed as arguments, returned from other functions, and assigned to variables.

- Function Expression - function is assigned to a variable

``` JavaScript []
const sayHello = function() {
    console.log("Hello, Function Expression!");
}
sayHello();

// Use the function expression on the fly

logGreeting (function() {
    console.log("Hello, Log Greeting!");
})
```

# Module in Node.js

-  A module is a file or a directory that contains code that can be reused in other files.

- Module is a reusable piece of JS Code that have specific functionality.

``` JavaScript []
require('./greet'); 
// Importing a module named 'greet' from the same directory or file.
// Or can be written as:
require('./greet.js'); 
```

// require is a built-in function in Node.js that allows you to include modules in your application.

``` JavaScript []
module.exports = greet;
// Exporting the greet function so it can be used in other files when greet was not getting called in the end of greet.js file.

// Then store in the current folder
const greet = require('./greet');
greet();

module.exports;
// This always return an object.
```

# JSON 
    JavaScript Object Notation (JSON) is a lightweight data interchange/exchange format that is easy for humans to read and write, and easy for machines to parse and generate. Data is represented in key-value pairs, similar to JavaScript objects.

``` JavaScript []
 greetings.json;
// To use JSON in Node.js, you can require it like a module.
const greetings = require('./greetings.json');
// But Not need to export it, as it is automatically available in the module.exports object.
```

# Emitters in Node.js
-  An EventEmitter is a class in Node.js that allows you to create and handle events.

``` JavaScript []
const EventEmitter = require('events');
const myEmitter = new EventEmitter();
// You can create an instance of EventEmitter and use it to emit and listen for events.

// Events
// In emitter.js
Emitter.prototype.emit = function(type, ...args) {
    if (this.events[type]) {
        this.events[type].forEach(listener => {
            listener.apply(this, args);
        });
    }
}
function Emitter(){
    this.events = {};
}
```

# Proto and Prototype 
- are used to define methods and properties that can be shared across all instances of a class in JavaScript.

# Listener 
    is a callback function that is called when an event is emitted.

``` JavaScript []
Emitter.prototype.on = function(type, listener) {
    this.events[type] = this.events[type] || [];
    // If the event type does not exist in the emitter func, create an empty array for it.
    this.events[type].push(listener);
};

// Emit -> is used to trigger an event, and it can take any number of arguments that will be passed to the listener function.

// on -> is used to add a callback or register a listener for a specific event type. It takes the event type and the listener function as arguments.

Emitter.prototype.on = function(type) {
    if (this.events[type]) {
        this.events[type].forEach(listener => {
            listener();
        });
    }
}

module.exports = Emitter;

// In app.js
const Emitter = require('./emitter');
const myEmitter = new Emitter();

// Bad Practise
myEmitter.on('greet', () => {
    console.log('Hello, EventEmitter!');
});

myEmitter.on('greet', () => {
    console.log('Hello, EventEmitter! 2');
});

myEmitter.on('age', () => {
    console.log('Hello, age 23!');
});

myEmitter.emit('greet'); // This will trigger the 'greet' event and call the registered listeners.
myEmitter.emit('age'); // This will trigger the 'age' event and call the registered listeners.

// Preferred Practise
// In Config.js

const obj = {
    events:{
        GREET: "greet",
        FILESAVED: "fileSaved",
        FILEDELETED: "fileDeleted",
        FILEOPEN: "fileOpen",
        FILECLOSED: "fileClosed"
    }
}
module.exports = obj;

// In app.js
const Emitter = require('./emitter');
const events = require('./config').events;
const myEmitter = new Emitter();

myEmitter.on(events.GREET, () => {
    console.log('Hello, EventEmitter!');
});
myEmitter.on(events.FILESAVED, () => {
    console.log('File has been saved!');
});
myEmitter.on(events.FILEDELETED, () => {
    console.log('File has been deleted!');
});
myEmitter.on(events.FILEOPEN, () => {
    console.log('File has been opened!');
});
myEmitter.on(events.FILECLOSED, () => {
    console.log('File has been closed!');
});

myEmitter.emit(events.GREET); // This will trigger the 'greet' event and call the registered listeners.
myEmitter.emit(events.FILESAVED); // This will trigger the 'fileSaved' event and call the registered listeners.
myEmitter.emit(events.FILEDELETED); // This will trigger the 'fileDeleted' event and call the registered listeners.
myEmitter.emit(events.FILEOPEN); // This will trigger the 'fileOpen' event and call the registered listeners.
```
- Emitter.js was not required in app.js, so it was not being used.
- Without that it will run without any issues, but it is a good practice to keep the code organized and modular.

# Import and Export of Module

## Export Of Module

``` Javascript
function add(a, b) {
    return a + b;
}
function sub(a, b) {
    return a - b;
}

module.exports = add;
module.exports = sub;

// This method of export will overlap the add Function by Sub function

// Therefore when we have to export multiple function then we will use object method as shown below are 

// single export or default export

module.exports = {
    add,
    sub,
};
// OR
module.exports = {
    addFn : add,
    subFn : sub,
};

// Both are same

// Multiple Exports

exports.add = (a, b) => a + b;
exports.sub = (a, b) => a - b;
```

## Import Of Module
<!-- By using node in built require function -->

``` Javascript
const math = require("path");
console.log(math.add(2, 3), math.sub(5, 3));
console.log(math.add(2, 3), mathFn.subFn(5, 3));

// By Destructuring
const {add, sub} = require("./file_name");
console.log(add(2, 3), sub(5, 3));
```

# File Structure 

``` Javascript

// fs -> File Structure

    require("./fs");
    // This will search in the current directory

    require("fs");
    // This will search in the node directory
```

# File Handling

``` Javascript
    const fs = require("fs");
    fs.writeFileSync('./test.txt', 'Hey There');

    // It will Create a new file test.txt with Hey there line in it.

    // Sync -> It is a synchronous Call
    // means -> Create a new file with this name in the current directory.

fs.writeFileSync("./test.txt", "Hello, This is the File Handling Video watching on Youtube from Piyush Garg Master NodeJs series playlist");

// This file will overwrite the previous Text

fs.writeFile("./test1.txt", "This is a Async file write with callback function for error handling", (err)=>{})

// Sync Task : Blocking Task / Blocking Request
// Async Task : Non-Blocking / Non-Blocking Request


fs.writeFileSync("./contacts.txt", "Ranvijay : +91 9399688140, Neha : +91 8700596764");

const result = fs.readFileSync("./contacts.txt", "utf-8");
console.log(result);

// This was a sync task, utf-8 is encoding for reading string file

fs.readFile("./contacts.txt", "utf-8", (error, result)=>{
    if(error)
        console.log(error);
    else
        console.log(result);
});

// This was a Async task, utf-8 is encoding for reading string file with callback accepting error and result as arguments


// Sync - task will always return something
// Async - task will expect a callback

fs.writeFileSync("./test2.txt", "Append File Testing using FS");

fs.appendFileSync("./test2.txt", `\n -> Hey There \n`)
fs.appendFileSync("./test2.txt", `\n -> Hey There \n`)
fs.appendFileSync("./test2.txt", `\n -> Hey There1 \n`)
fs.appendFileSync("./test2.txt", `\n -> Hey There2 \n`)
fs.appendFileSync("./test2.txt", `\n -> Hey There3 \n`)
fs.appendFileSync("./test2.txt", `\n ${Date.now()} -> Hey There4 \n`)

fs.cpSync("./test2.txt", `./copytest2.txt`, {Options})
// We can pass options too

fs.cpSync("./test2.txt", `./copytest2.txt`);
fs.cpSync("./copytest2.txt", `./copytest3.txt`);

// This will delete file copytest3.txt
fs.unlinkSync("./copytest3.txt");

console.log(fs.statSync("./test2.txt"));
// It will show various type of stats data about the file

console.log(fs.statSync("./test2.txt").isFile());
// To check is this file of not

fs.mkdirSync("my-docs")
// Will create a Folder with name my-docs
fs.mkdirSync("my-docs/a/b", {recursive : true});
// will create my-docs->a->b

```

# Architecture of Node.JS

Client -> sends request -> Node.js Server

Received Request -> event queue -> event loop

Event Loop -> continuously check for any new request arrived or not and pick it up in FIFO order

Requests are of 2 types :-
Blocking Requests / Operations / Synchronous Task
Non - Blocking Requests / Operations / Asynchronous Task

Event Loop will process the Async task and send the result to the user

If it is a Sync Task -> forwarded to thread pool where thread(worker) is present -> Result will be sent

It is always preferred to have Async Tasks to avoid server overloading due to multiple sync tasks also it will create problem for creating scalable product

``` Javascript

const fs = require("fs");
const result = fs.readFileSync("contacts.txt", "utf-8");
console.log(result);

// This will be processed line by line

const fs = require("fs");
console.log("1");
const result = fs.readFileSync("contacts.txt", "utf-8");
console.log(result);
console.log("2");

// This will also be processed line by line

const fs = require("fs");
console.log("1");
console.log("2");
fs.readFile("contacts.txt", "utf-8", (err, result)=>{
    console.log(result);
});
console.log("3");

// This will first print 1, 2, 3 after that readFile will be printed
const os = require("os");
console.log(os.cpus().length);
// This will give no of CPUs
// There is 4 threads which can be extended upto no. of CPUs in system
```

# HTTP Web Server

    npm init

create a package.json file with main key and value as index.js File which is always have to be the main file.

``` Javascript
const http = require("http");

// http : Built In Node js module

const myServer = http.createServer();
```
-  It creates Server,
- createServer() -> It accepts a callback function that process incoming request

- The callback receives (request, response) as arguments

``` Javascript
const myServer = http.createServer((req, res) => {
    console.log("New Req Rec");
    res.end("Hello From Server");
});
myServer.listen(8000, () => console.log("Server Running"));

```
- Create start script in Package.json  
- "start": "node index.js"
-  It will show Server Running on terminal and when you open LocalHost:8000 on your chrome browser it will show Hello From Server
- res.end will provide response to server and end after sending message.
-  If you change anything on file it will not be reflected on browser we have to restart the server


### Always use Non - Blocking task

``` JavaScript
const http = require("http");
const fs = require("fs");


const myServer = http.createServer((req, res) => {
    // To remove FavIcon call
    if(req.url === '/favicon.ico')
        return res.end();

    const log = `${Date.now()}: New Req Received\n`;
    fs.appendFile("log.txt", log, (err, data) => {
        res.end("Hello From Server Again")
    });
});
myServer.listen(8000, () => console.log("Server Running"));
```

- A log.txt named file will be generated automatically with date and New request received message 2 times 1 from running server and 1 from globe favicon on browser.

- On Terminal Server Running Message will appear and On Browser Hello from Server Again will be seen

- req.url -> will provide which path requested the server like /about, /contact-us


``` Javascript
    fs.appendFile("log.txt", log, (err, data) => {
        // Multi Route 
        switch (req.url) {
            case "/":
                res.end("HomePage");
                break;
            case "/About":
                res.end("This is About Page ");
                break;
            default:
                res.end("404 Not Found");
        }
    });
```
- When the link will be homepage it will show Homepage
- /About - About Page
- Otherwise - 404

- This is called multi route

## URL - Uniform Resource Locator

- Protocol : https://(encrypted using SSl Certificate) or http:// or ws:// (real time communication web socket)
- Domain : User friendly name of the server (www.google.com)
- Path : /->Home(root path), /about->About Page, contact path, nested path
- Query Parameters : Extra Information that can be passed in URL after ? e.g. -> /about?userId=1&a=2


    npm i url

This package will extract everything from URL in separate data like domain, protocol, path etc

``` Javascript
const http = require("http");
const fs = require("fs");
const url = require("url");


const myServer = http.createServer((req, res) => {
    if (req.url === '/favicon.ico')
        return res.end();

    const log = `${Date.now()}: ${req.url} New Req Received\n`;

    const myUrl = url.parse(req.url);

    fs.appendFile("log.txt", log, (err, data) => {
        // Multi Route 
        switch (myUrl.pathname) {
            case "/":
                res.end("HomePage");
                break;
            case "/About":
                res.end("This is About Page ");
                break;
            default:
                res.end("404 Not Found");
        }
    });
});

// Different Method of extracting query
const myUrl = url.parse(req.url, true);
// Accepts query parameter
  fs.appendFile("log.txt", log, (err, data) => {
        // Multi Route 
        switch (myUrl.pathname) {
            case "/":
                res.end("HomePage");
                break;
            case "/About":
                const username = myUrl.query.myname;
                res.end(`Hi ${username}`);
                break;
            default:
                res.end("404 Not Found");
        }
    });
```

# HTTP Method

- GET : To get data from server or database [Browser default search pass Get request]
- POST : When you want to send and Mutate(add or change) some data in server [Forms]
- PUT : File or Photo Upload
- PATCH : Change any existing entry
- DELETE : To Delete any preexisting data

``` Javascript
    const log = `${Date.now()}: ${req.method} ${req.url} New Req Received\n`;

    case "/signup":
        if(req.method === "GET")
            res.end("SignUp form");
        else if(req.method === "POST")
            res.end("Success");
```

# Express.JS
