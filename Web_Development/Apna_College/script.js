

// Word vs Keyword ✅

// var let const ✅

// Hoisting (using variable before decleration : shifts to the top and provides undefined as output)✅

// Undefined (Existing but unknown) vs Not Defined(Non-existing)✅

// Hosting vs Hoisting ✅

// data types in js ✅

// primitive and reference {having brackets (), {}, [] } ✅

// conditionals - if else ✅

// Loop - for while ✅

// Functions arguments are real values and parameters are containers ✅

// Arrays ✅

// Push @ending, Pop @ending, Shift removes @beginning, Unshift adds @beginning, Splice from any index to number of deletions ✅

// Objects holds details in key value pair ✅


// ------------------------------------------------------






















// -------------------CHAPTER 1-------------------
console.log(" Hello World ");
console.log('Ranvijay Kumar');

Fname = "Ranvijay";
console.log(Fname);

ag = 23;
console.log(ag);

let a = 24;
console.log(a);
typeof a;

let b = "Hello";
console.log(b);
typeof b;

let c = 'True';
console.log('c');
typeof c;

let d = undefined;
console.log(d);
typeof d;

let e = null;
console.log(e);
typeof e;

let f = BigInt("123");
console.log(f);
typeof f;

let g = Symbol("Hello");
console.log(g);
typeof g;


const student = {
    fullname: "Ranvijay",
    age: 23,
    CGPA: 8.2,
    ispass: true
};

console.log(student)

// -------------------CHAPTER 2-------------------

// Single Line Comment
/**Multi Line Comment*/
let p = 2;
let q = 3;
console.log("p + q :", p + q);
console.log("p - q :", p - q);
console.log("p * q :", p * q);
console.log("p / q :", p / q);
console.log("p ** q :", p ** q);
console.log("p++ :", p++);
console.log("q-- :", q--);
console.log("p == q :", p == q);
console.log("p === q :", p === q);
console.log("p != q :", p != q);
console.log("p !== q :", p !== q);

// Conditional Statements
// If Statement
let mode = "darkmode";
let color;
if (mode === "darkmode") {
    color = "black";
}
console.log(color);

// If - else Statement
if (mode === "darkmode") {
    color = "black";
}
else {
    color = "white";
}
console.log(color);

// Else - if Statement
let age = 20;
if (age < 18) {
    console.log("Junior");
}
else if (age > 60) {
    console.log("Senior");
}
else {
    console.log("middle");
}

let gotit = age > 18 ? "Adult" : "Not Adult";
console.log(gotit);

// prompt("Hello");

// let nme = prompt("Hello");
// console.log(nme);

/** Get User to input a number using prompt ("Enter a Number").
* Check if the number is a multiple of 5 or not.*/
// let value = prompt("Enter the Number to check whether the number is multiple of 5 or not");

// if(value % 5 == 0)
// {
//     console.log(value, "is multiple of 5");
// }
// else
// {
//     console.log(value, "is not a multiple of 5");
// }

// -------------------CHAPTER 3-------------------
// console.log("0");
// For Loop
// for (let i = 0; i < 5; i++) 
// {
//     console.log(i);
// }

// Calculate Sum of 1 to 5;
// let sum = 0;
// for (let u = 0; u < 6; u++) 
// {
//     sum = sum + u
// }
// console.log(sum);

// Print all even numbers from 0 - 100.

// for (let i = 0; i <= 100; i++) 
// {
//     if (i % 2 == 0) 
//     {
//         console.log(i);
//     }

// }

/** Create a game where you start with any random game number.
* Ask the user to keep guessing the game number untill the user enter correct value */

// var num = 20;
// var user_num = prompt("Enter the Number : ");

// while (num != user_num) {
//     user_num = prompt("Enter the Number again : ");
// }
// console.log("Congratulations");

const obj = {
    item: "Mouse",
    price: 200
};

console.log("The Cost of", obj.item, "is", obj.price, "rupees");
// By using template literals.
// ${expression} called String Interpolation.
console.log(`The Cost of ${obj.item} is ${obj.price} rupees`);

let btr = '  Ranvijay';
let str = 'Kumar';
console.log(btr.toUpperCase(btr));
console.log(btr.toLowerCase(btr));
console.log(btr.trim(btr));
console.log(btr[2], btr[5]);
console.log(btr.slice(5, 7));
console.log(btr.concat(str));
console.log(btr.replace('a', 'v'));
console.log(btr.charAt(5));
console.log(btr.replaceAll('a', 'j'));

/** Prompt the user to enter their full name. Generate a username for them based on the input. 
* Start username with @, followed by their fullname $ ending with the fullname Length. */
// user_name = prompt("Enter the Full Name : ");
// console.log("@", user_name, user_name.length);

// -------------------CHAPTER 4-------------------
// Arrays and its method

var marks = [96, 75, 84, 83, 66];
console.log(typeof (marks));
console.log(marks[5]);

for (let index = 0; index < marks.length; index++) {
    console.log(marks[index]);
}

/**For a given array with marks of student - [85, 97, 44, 37, 76, 60]
* Find the average marks of the entire class */

var marks = [85, 97, 44, 37, 76, 60];
var sum = 0;
for (let index = 0; index < marks.length; index++) {
    sum += marks[index];
}

var avg = sum / marks.length;

console.log(`The Average marks of the provided marks ${marks} is ${avg}`);

/**For a given array with prices of 5 Items - [250, 645, 300, 900, 50]
* all items have an offer of 10% off on them. Change the array to store final price after applying offer. */

var price = [250, 645, 300, 900, 50];
for (let index = 0; index < price.length; index++) {
    var disc = price[index] / 10;
    var nprice = price[index] - disc;
    console.log(nprice);
}

var array = [1, 2, 3, 4, 5];
var brray = [7, 2, 3, 4, 6];
console.log(array);
array.push(6);
console.log(array);
console.log(brray.pop(), brray);
console.log(array.toString());
console.log(array.concat(brray));
console.log(array.unshift(9), array);
console.log(array.shift(), array);
console.log(array.slice(1, 3));
console.log(array, array.splice(1, 2, 4), array);

/**Create an array to store Companies - "Bloomberg", "Microsoft", "Uber" 
* a) Remove the first company from the array.
* b) Remove Uber & add "Ola" in its place
* c) Add "Amazon" at the end*/
var array = ['Blomberg', "Microsoft", "Uber"];
console.log(array.shift(), array);
console.log(array.splice(1, 1, "Ola"), array)
console.log(array.unshift('Amazon'), array);

// -------------------CHAPTER 5-------------------
// Functions and its methods.

function hello() {
    console.log("Hello");
};

hello();
var val1, val2;
var sum = (val1, val2) => {
    return val1 + val2;
}
sum(2, 3);

/**Create a function using the "Function" keyword 
* thet takes a string as an argument & returns the number of vowels in the string */

var word = "Ranvijay Kumar Upadhyay";
vowels(word);
function vowels(word) {
    let count = 0;
    for (let index = 0; index < word.length; index++) {
        if (word[index] == 'a' || word[index] == 'e' || word[index] == 'i' || word[index] == 'o' || word[index] == 'u') {
            count++;
        }
        if (word[index] == 'A' || word[index] == 'E' || word[index] == 'I' || word[index] == 'O' || word[index] == 'U') {
            count++;
        }

    }
    console.log("The Count is ", count);
}

/** Create an arrow function to perform the same task */

var vowel = (word) => {
    let count = 0;
    for (let index = 0; index < word.length; index++) {
        if (word[index] == 'a' || word[index] == 'e' || word[index] == 'i' || word[index] == 'o' || word[index] == 'u') {
            count++;
        }
        if (word[index] == 'A' || word[index] == 'E' || word[index] == 'I' || word[index] == 'O' || word[index] == 'U') {
            count++;
        }

    }
    console.log("The Next Count is ", count);
};
vowel(word);

// For Each Func.
// print(val) is a callback function
let arr = [1, 2, 3, 4, 5];
arr.forEach(function print(val) {
    console.log(val);
})

arr.forEach((val, pdx, arr) => {
    console.log(val, pdx, arr);
});

/**For a given array of numbers, 
 * Print the square of each value using the foreach loop */

let brr = [1, 2, 3, 4, 5];
brr.forEach((val, idx) => {
    console.log(val * val, idx);
});

var crr = brr.map((val) => {
    return val * 2;
});
console.log(crr);

var crr = [1, 2, 3, 4, 5, 6, 7];
let evencrr = crr.filter((val) => {
    return val % 2 === 0;
});
console.log(evencrr);

/**We are given array of marks of students. 
 * Filter out of the marks of student that scored 90. */

var crr = [87, 88, 94, 96, 56, 95, 99];
trr = crr.filter((val) => {
    return val > 90;
});
console.log(trr);

/**Take a number n as input from user.
 * Create an array of numbers from 1 to n.
 *
 * Use the reduce method to calculate sum of all numbers in the array.
 * use the reduce method to calcuate product of all numbers in the array*/

// n = prompt("Enter the numbers : ");
// var crr =[];
// for (let I = 0; I < n; I++) {
//     crr[I-1] = I;
// }
// console.log(crr);

// sum = crr.reduce((res, curr) => {
//     return res + curr;
// });
// console.log(sum);

// mul = crr.reduce((res, curr) => {
//     return res * curr;
// });
// console.log(mul);

// -------------------CHAPTER 6-------------------
// Document Object Model (DOM)