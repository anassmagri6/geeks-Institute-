const chalk = require('chalk');

function displayColorfulMessage() {
  console.log(chalk.blue.bold('This is a colorful message using chalk!'));
}
module.exports = displayColorfulMessage;