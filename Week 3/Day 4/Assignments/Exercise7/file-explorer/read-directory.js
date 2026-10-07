const fs = require("fs");

const files = fs.readdirSync(".");

console.log("Files in the directory:");

files.forEach(function(file) {
    console.log(file);
});