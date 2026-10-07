const products = require('./products.js');

function findProductByCategory(productName) {
  const product = products.find(function(p) {
    return p.name.toLocaleLowerCase() === productName.toLocaleLowerCase();
  });
  if (product) {
    console.log('is here', product);
  } else {
    console.log('not found');
  }
}
findProduct("watch");
findProduct("Phone");
