               //🌟 Exercise 1 : Find the numbers divisible by 23
function displayNumbersDivisible() {
  let x = 0;

  for (let i = 0; i <= 500; i++) {
    if (i % 23 === 0) { 
      console.log(i);
      x += i; 
    }                   
  }

  console.log("Sum :", x); 
}
displayNumbersDivisible();
              //🌟 Exercise 2 : Shopping List
const stock = { 
    "banana": 6, 
    "apple": 0,
    "pear": 12,
    "orange": 32,
    "blueberry":1
}  

const prices = {    
    "banana": 4, 
    "apple": 2, 
    "pear": 1,
    "orange": 1.5,
    "blueberry":10
} 
let shoppingList = ["banana","apple","orange"];
let total  = 0;

function myBill(){
for( let item  of shoppingList){
if (item  in stock && stock[item]>0)
total += prices[item];
}
stock[item]--;
}
console.log(myBill());
console.log(stock);
                  //🌟Exercise 3 : What’s in my wallet ?
function changeEnough(itemPrice, amountOfChange){

let totalChange = (amountOfChange[0]*0.25)+(amountOfChange[1]*0.10)+
                   (amountOfChange[2]*0.05)+(amountOfChange[3]*0.01)
return totalChange >=itemPrice
}
console.log(changeEnough(4.25, [25, 20, 5, 0]));
console.log(changeEnough(14.11, [1, 10, 5, 59]));
console.log(changeEnough(0.75, [0, 0, 20, 5]));


             //🌟 Exercise 4 : Vacations Costs
function hotelCost() {
  let nights;  

  while (true) {
    let x = prompt('How many nights would you like to stay in the hotel?');
    if (x !== null && x.trim() !== '' && !isNaN(x)) {
      nights = Number(x);
      break;
    }
  }
  return nights * 140; 
}

function planeRideCost() {
  let destination;
  while (true) {
    let y = prompt("What is your destination?");
    if (y !== null && y.trim() !== "" && isNaN(y)) {
      destination = y.trim().toLowerCase();
      break;
    }
  }

  if (destination === "london") {
    return 183;
  } else if (destination === "paris") {
    return 220;
  } else {
    return 300;
  }
}
function rentalCarCost() {
  let days;
  while (true) {
    let input = prompt("How many days would you like to rent the car?");
    if (input !== null && input.trim() !== "" && !isNaN(input)) {
      days = Number(input);
      break;
    }
  }
let totalCost = days * 40;

if (days > 10) {
    totalCost = totalCost * 0.95;
  }

  return totalCost;
}

function totalVacationCost() {
  let carPrice = rentalCarCost();
  let hotelPrice = hotelCost();
  let planePrice = planeRideCost();

  let total = carPrice + hotelPrice + planePrice;

  console.log(`The car cost: $${carPrice}, the hotel cost: $${hotelPrice}, the plane tickets cost: $${planePrice}.`);
  console.log(`Total vacation cost: $${total}`);

  return total;
}
totalVacationCost();

                           //🌟 Exercise 5 : Users
const div = document.getElementById('container');
console.log(div);

const Richard = document.querySelectorAll('ul.list')[0].children[1];
Richard.textContent = 'Richard';

const Sarah = document.querySelectorAll('ul.list')[1].children[1];
Sarah.remove();

const anas = document.querySelectorAll('ul.list');
for (const x of anas) {
  x.firstElementChild.innerHTML = 'anas';
}

const ul = document.querySelectorAll('ul.list');
for (const y of ul) {
  y.classList.add('student_list');
}

const university = document.querySelectorAll('ul')[0];
university.classList.add('university');
university.classList.add('attendance');

div.style.backgroundColor = 'lightblue';
div.style.padding = '20px';

const dan = document.querySelectorAll('ul.list')[1].children[1];
dan.style.display = 'none';

Richard.style.border = '2px solid black';

document.body.style.fontSize = '10px';

if (div.style.backgroundColor === 'lightblue') {
  const users = document.querySelectorAll('ul.list')[0].children;
  alert(`Hello ${users[0].textContent} and ${users[1].textContent}`);
}

                          //🌟 Exercise 6 : Change the navbar
const div = document.getElementById('navBar');
div.setAttribute('id', 'socialNetworkNavigation');

const createElement  =document.createElement('li');
createElement.textContent='Logout';

const uul = document.querySelector('ul');
uul.appendChild(createElement);

const firstElementChild  =uul.firstElementChild;
const lastElementChild  = ull.lastElementChild;

console.log(firstElementChild);
console.log(lastElementChild);

                    //🌟Exercise 7 : My Book List
const allBooks = [{title: "The Alchemist",
    author: "Paulo Coelho",
    image: "https://m.media-amazon.com/images/I/71aFt4+OTOL._AC_UF1000,1000_QL80_.jpg",
    alreadyRead: true},
  {
    title: "Atomic Habits",
    author: "James Clear",
    image: "https://m.media-amazon.com/images/I/81YkqyaFVEL._AC_UF1000,1000_QL80_.jpg",
    alreadyRead: false
  }
];
const section = document.querySelector('.listBooks');
allBooks.forEach(function(book){
const div =document.querySelectorAll('div');
div.innerHTML = `
    <p>${book.title} written by ${book.author}</p>
    <img src="${book.image}" style="width: 100px;">
  `;
if (book.alreadyRead){
  div.style.color='red';
}
section.appendChild(div);














});
  






                   













  
      








