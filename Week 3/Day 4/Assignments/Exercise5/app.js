const _ = require('lodash');
const math = require('./math');

console.log('Sum:', math.add(5, 10));
console.log('Product:', math.multiply(4, 3));

const numbers = [7, 19, 30, 40];
console.log('Max number:', _.max(numbers));