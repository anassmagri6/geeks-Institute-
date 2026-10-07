import { people } from './data.js';

function calculateAverageAge(persons) {
  const totalAge = persons.reduce((sum, person) => sum + person.age, 0);
  const average = totalAge / persons.length;
  console.log(`Average Age: ${average}`);
  return average;
}
calculateAverageAge(people);//64 ÷ 3 = 21.333333333333332



