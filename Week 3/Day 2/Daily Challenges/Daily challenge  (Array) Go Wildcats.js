const gameInfo = [
 {
   username: "john",
   team: "red",
   score: 5,
   items: ["ball", "book", "pen"]
 },
 {
   username: "becky",
   team: "blue",
   score: 10,
   items: ["tape", "backpack", "pen"]
 },
 {
   username: "susy",
   team: "red",
   score: 55,
   items: ["ball", "eraser", "pen"]
 },
 {
   username: "tyson",
   team: "green",
   score: 1,
   items: ["book", "pen"]
 },
];

// 1. Exercise 
const usernames = [];
gameInfo.forEach(function(player) {
  usernames.push(player.username + "!");
});
console.log(usernames);

// 2. Exercise 
const winners = [];
gameInfo.forEach(function(names){
    if (names.score > 5){
        winners.push(names.username);
    }
});
console.log(winners);

// 3. Exercise 
let totalScore = 0;
gameInfo.forEach(function(player){
    totalScore += player.score;
});
console.log(totalScore);