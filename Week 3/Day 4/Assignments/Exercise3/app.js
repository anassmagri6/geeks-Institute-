const fileManager = require("./fileManager");
const content = fileManager.readFile("Hello World.txt");

console.log("Content of Hello World.txt:");
console.log(content);

fileManager.writeFile("Bye World.txt", "Writing to the file");
console.log("Content written successfully to Bye World.txt");


