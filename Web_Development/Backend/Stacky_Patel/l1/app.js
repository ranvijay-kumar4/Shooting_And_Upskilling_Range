let a = 10;
let b = 20;

console.log(a + b); // This will output 30 on terminal and we can see it in the console.

// To run this file, use the command: node app.js
// This will execute the code and display the output in the terminal.

// Function Statement
function greet() {
    console.log("Hello, World!");
}
// Invoking a Function
greet(); 

// Function are first class citizens in JavaScript, meaning they can be passed as arguments, returned from other functions, and assigned to variables.

// Function Expression - function is assigned to a variable
const sayHello = function() {
    console.log("Hello, Function Expression!");
}
sayHello();

// Use the function expression on the fly

logGreeting (function() {
    console.log("Hello, Log Greeting!");
})

// Module in Node.js

// A module is a file or a directory that contains code that can be reused in other files.

// Module is a reusable piece of JS Code that have specific functionality.

require('./greet'); 
// Importing a module named 'greet' from the same directory or file.
// Or can be written as:
require('./greet.js'); 

// require is a built-in function in Node.js that allows you to include modules in your application.

module.exports = greet;
// Exporting the greet function so it can be used in other files when greet was not getting called in the end of greet.js file.

// Then store in the current folder
const greet = require('./greet');
greet();

module.exports;
// This always return an object.

// greetings.json;
// JSON - JavaScript Object Notation (JSON) is a lightweight data interchange/exchange format that is easy for humans to read and write, and easy for machines to parse and generate. Data is represented in key-value pairs, similar to JavaScript objects.
// To use JSON in Node.js, you can require it like a module.
const greetings = require('./greetings.json');
// But Not need to export it, as it is automatically available in the module.exports object.

// Emitters in Node.js
// An EventEmitter is a class in Node.js that allows you to create and handle events.
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

// Proto and Prototype are used to define methods and properties that can be shared across all instances of a class in JavaScript.

// Listener is a callback function that is called when an event is emitted.

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

// Emitter.js was not required in app.js, so it was not being used.
// Without that it will run without any issues, but it is a good practice to keep the code organized and modular.

