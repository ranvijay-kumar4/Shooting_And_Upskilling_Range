// console.log("Hello World");

// Need of including the below line to access the prompt function
// from NPM prompt sync 
// var prompt = require('prompt-sync')();
// ans = prompt("Hello! This is a Prompt, Need a value : ");
// console.log(ans);



// -----------Callback Function--------------

function add(a, b) {
    return a + b;
}
result = add(2, 3);
console.log(result);

// ---------------------------------
// Import and Export of Module

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
    addFn: add,
    subFn: sub,
};

// Both are same

// Multiple Exports

exports.add = (a, b) => a + b;
exports.sub = (a, b) => a - b;


// Import
const math = require("path");
console.log(math.add(2, 3), math.sub(5, 3));
console.log(math.add(2, 3), mathFn.subFn(5, 3));

// By Destructuring
const { add, sub } = require("./file_name");
console.log(add(2, 3), sub(5, 3));

require("./fs");
// This will search in the current directory

require("fs");
// This will search in the node directory

// ------------------------------------------

// File Handling in Node Js