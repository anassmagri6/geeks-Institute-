                  //Exercise 1 : Select a kind of Music
const y = document.getElementById("genres");

console.log("Selected music genre:", y.value);

const x = new Option("Classic", "classic", true, true);
y.add(x);

//                Exercise 2: Delete colors
function removecolor() {
  const nas = document.getElementById("nas");
  if (nas.selectedIndex !== -1) {
    ans.remove(nas.selectedIndex);
  }
}
               //Exercise 3 : Create a shopping list
let shoppingList = [];
const rootDiv = document.getElementById("root");

// Form elements
const form = document.createElement("form");
const input = document.createElement("input");
input.type = "text";
input.placeholder = "Enter item name";

const addButton = document.createElement("button");
addButton.type = "button";
addButton.textContent = "AddItem";
addButton.addEventListener("click", addItem);

const clearButton = document.createElement("button");
clearButton.type = "button";
clearButton.textContent = "ClearAll";
clearButton.addEventListener("click", clearAll);

form.appendChild(input);
form.appendChild(addButton);
rootDiv.appendChild(form);
rootDiv.appendChild(clearButton);

function addItem() {
  const itemText = input.value.trim();
  if (itemText !== "") {
    shoppingList.push(itemText);
    console.log("Current Shopping List:", shoppingList);
    input.value = "";
  }
}

function clearAll() {
  shoppingList = [];
  console.log("Shopping List cleared:", shoppingList);
}