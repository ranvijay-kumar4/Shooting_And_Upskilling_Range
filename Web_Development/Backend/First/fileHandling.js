const fs = require("fs");

// Sync -> It is a synchronous Call
// means -> Create a new file with this name in the current directory.
fs.writeFileSync("./test.txt", "Hey There");

fs.writeFileSync("./test.txt", "Hello, This is the File Handling Video watching on Youtube from Piyush Garg Master NodeJs series playlist");

// This file will overwrite the previous Text

fs.writeFile("./test1.txt", "This is a Async file write with callback function for error handling", (err)=>{})

// Sync Task : Blocking Task / Blocking Request
// Async Task : Non-Blocking / Non-Blocking Request


// fs.writeFileSync("./contacts.txt", "Ranvijay : +91 9399688140, Neha : +91 8700596764");

const result = fs.readFileSync("./contacts.txt", "utf-8");
// console.log(result);

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

// fs.cpSync("./test2.txt", `./copytest2.txt`, {Options})
// We can pass options too
fs.cpSync("./test2.txt", `./copytest2.txt`);
fs.cpSync("./copytest2.txt", `./copytest3.txt`);

// This will delete file copytest3.txt
fs.unlinkSync("./copytest3.txt");

console.log(fs.statSync("./test2.txt"));
// It will show various type of stats data about the file

console.log(fs.statSync("./test2.txt").isFile());
// To check is this file of not

// fs.mkdirSync("my-docs")
// Will create a Folder with name my-docs
fs.mkdirSync("my-docs/a/b", {recursive : true});
// will create my-docs->a->b


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