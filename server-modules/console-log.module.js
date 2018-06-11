const colors = require('colors/safe');

module.exports.error = (message) => console.log(colors.red(message));

module.exports.succesful = (message) => console.log(colors.green(message));