              //🌟 Exercise 1 : Comparison
function compareToTen(num) {
  return new Promise((resolve, reject) => {
    if (num <= 10) {
      resolve(`${num} is less than 10`);
    } else {
      reject(`${num} is greater than 10`);
    }
  });
}
//In the example, the promise should reject
compareToTen(15)
  .then(result => console.log(result))
  .catch(error => console.log(error))

//In the example, the promise should resolve
compareToTen(8)
  .then(result => console.log(result))
  .catch(error => console.log(error))

                         //🌟 Exercise 2 : Promises
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("success");
    }, 4000);
});
promise.then((result) => console.log(result)); 

                     //🌟 Exercise 3 : Resolve & Reject

const promise1 = Promise.resolve(3);
pomise1.then(result => console.log(result));

const promise2 = Promise.reject('boom');
promise2.catch(error => console.log(error));


