const fs = require("fs");

function readFile (fileName){
const content = fs.readFileSync(fileName, "utf-8");
return content;
}
 function writeFile (fileName, content){
    fs.writeFileSync(fileName, content);}

module.exports={readFile,writeFile};