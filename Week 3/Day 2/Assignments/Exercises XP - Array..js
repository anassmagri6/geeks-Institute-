               // 🌟 Exercise 1 : Colors
const colors = ["Blue", "Green", "Red", "Orange", "Violet", "Indigo", "Yellow"];

colors.forEach((color, index) => {
  console.log(`${index + 1}# choice is ${color}.`);
});

if (colors.includes('Violet')) {
    console.log("Yeah");
} else {
    console.log("No...");
}

              // 🌟 Exercise 2 : Colors #2
const ordinal = ["th", "st", "nd", "rd"]; 

colors.forEach((color, index) => {
  const number = index + 1;
  let fic;
  if (number <= 3) {
    fic = ordinal[number];
  } else {
    fic = ordinal[0];      
  }
  console.log(`${number}${fic} choice is ${color}.`);
});


                     // 🌟 Exercise 3 : Analyzing
const fruits = ["apple", "orange"];
const vegetables = ["carrot", "potato"];

const result = ['bread', ...vegetables, 'chicken', ...fruits];
console.log(result);
//["bread", "carrot", "potato", "chicken", "apple", "orange"]

const country = "USA";
console.log([...country]);
//["U", "S", "A"]

let newArray = [...[,,]];
console.log(newArray);
//[undefined, undefined]

                     //🌟 Exercise 4 : Employees
const users = [{ firstName: 'Bradley', lastName: 'Bouley', role: 'Full Stack Resident' },
             { firstName: 'Chloe', lastName: 'Alnaji', role: 'Full Stack Resident' },
             { firstName: 'Jonathan', lastName: 'Baughn', role: 'Enterprise Instructor' },
             { firstName: 'Michael', lastName: 'Herman', role: 'Lead Instructor' },
             { firstName: 'Robert', lastName: 'Hajek', role: 'Full Stack Resident' },
             { firstName: 'Wes', lastName: 'Reid', role: 'Instructor'},
             { firstName: 'Zach', lastName: 'Klabunde', role: 'Instructor'}];
const welcomeStudents  = users.map((user) => {
    return `Hello ${user.firstName}, welcome!`;
});
console.log(welcomeStudents);

const fullStackResidents = users.filter(function(user){
     return user.role === "Full Stack Resident";
})
console.log(fullStackResidents);

const lastNames = users
    .filter(function(user) {

        return user.role === "Full Stack Resident";
    })
    .map(function(user) {

        return user.lastName;
    });
console.log(lastNames);


                       //🌟 Exercise 5 : Star Wars

const epic = ['a', 'long', 'time', 'ago', 'in a', 'galaxy', 'far far', 'away'];

const too = epic.reduce(function(total, word) {
    return total + " " + word;

});
console.log(too);
                        ///🌟 Exercise 6 : Employees #2
const students = [{name: "Ray", course: "Computer Science", isPassed: true}, 
               {name: "Liam", course: "Computer Science", isPassed: false}, 
               {name: "Jenner", course: "Information Technology", isPassed: true}, 
               {name: "Marco", course: "Robotics", isPassed: true}, 
               {name: "Kimberly", course: "Artificial Intelligence", isPassed: false}, 
               {name: "Jamie", course: "Big Data", isPassed: false}];

const passedStudents = students
    .filter(function(student) {

        return student.isPassed === true;

    })
    .forEach(function(student) {

        console.log(
            `Good job ${student.name}, you passed the course in ${student.course}`
        );

    });

                     