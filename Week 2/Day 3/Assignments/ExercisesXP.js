
             //🌟 Exercise 1 : List of people
//Part I - Review about arrays

const people = ["Greg", "Mary", "Devon", "James"];

people.shift(); 

people[2] = "Jason"; 

people.push("anas"); 

console.log(people.indexOf("Mary")); 

const x  = people.slice(1, 3);
console.log(x);

console.log(people.indexOf("Foo"));

const last = people[people.length - 1];
console.log(last);

//Part II - Loops

for (z of people){
    console.log(z);
if (z=="Devon")
    break 
};
            //🌟 Exercise 2 : Your favorite colors

let colors = ["red", "black", "green", "yellow"];
let index = 1;

for (let x of colors) {
    console.log(`My #${index} choice is ${x}`);
    index++;
}

             //🌟 Exercise 3 : Repeat the question
let number = prompt("Enter a number");
console.log(typeof number); 

while (Number(number) < 10) {
  number = prompt("Enter a number");
}

            //🌟 Exercise 4 : Building Management
const building = {
    numberOfFloors: 4,
    numberOfAptByFloor: {
        firstFloor: 3,
        secondFloor: 4,
        thirdFloor: 9,
        fourthFloor: 2,
    },
    nameOfTenants: ["Sarah", "Dan", "David"],

    numberOfRoomsAndRent:  {
        sarah: [3, 990],
        dan:  [4, 1000],
        david: [1, 500],
    },
}
console.log(building.numberOfFloors);
console.log(building.numberOfAptByFloor.firstFloor +building.numberOfAptByFloor.thirdFloor )
console.log(building.nameOfTenants[1], building.numberOfRoomsAndRent.dan[0]);


const sarahRent = building.numberOfRoomsAndRent.sarah[1];
const davidRent = building.numberOfRoomsAndRent.david[1];
const danRent = building.numberOfRoomsAndRent.dan[1];

if (sarahRent + davidRent > danRent) {
    building.numberOfRoomsAndRent.dan[1] = 1200;
}
               //🌟 Exercise 5 : Family
const family = {
   Name: "anas",
    age: 23,
    city: "Casablanca"
};

for (key in family){

    console.log(key);
}

for (key in family){

    console.log(family[key]);
}
                 //🌟Exercise 6 : Rudolf
const details = {
  my: 'name',
  is: 'Rudolf',
  the: 'reindeer'
}

for (const key in details) {
   `${key} ${details[key]} `;
}
console.log(key,details[key]);
              //🌟Exercise 7 : Secret Group
const names = ["Jack", "Philip", "Sarah", "Amanda", "Bernard", "Kyle"];
const secretSociety = names
  .map(name => name[0])
  .sort()
  .join("");

console.log(secretSociety); 

