import { readFile, writeFile, appendFile, mkdir } from "fs/promises";

// Read File
const read_file = async (fileName) => {
    const data = await readFile(fileName, 'utf-8');
    console.log(data);
};
read_file('sample.txt')

// Write File
const create_file = async (fileName, content) => {
    await writeFile(fileName, content);
    console.log("File Creation Successful");
};
create_file('hello.txt', 'Testing if the file created or not');

// Append File
const append_file = async (fileName, content) => {
    await appendFile(fileName, content);
    console.log("Append File Successful");
};
append_file('hello.txt', "........... Testing if file append taking place or not");

// Create Directory
const create_dir = async (dir) => {
    // await mkdir(dir); // -> Single file
    await mkdir(dir, {recursive: true})
    console.log("Folder creation Successful");
};
// create_dir('test_folder'); // -> Single file
create_dir('parent/child/grandchild');