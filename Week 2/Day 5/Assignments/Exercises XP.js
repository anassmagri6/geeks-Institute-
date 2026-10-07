              //🌟 Exercise 1 : Change the article
let x = document.getElementById('name');
console.log(x);

let deleat = document.getElementById('deleat');
deleat.remove();

let h2 = document.querySelector('h2');
h2.addEventListener('click',function(){
    h2.style.backgroundColor='red';
}   
)
let h3 = document.querySelector('h3');
h3.addEventListener('click',function(){
   h3.style.display='none'
})

let  button = document.getElementById('button');
let  paragraphs = document.querySelectorAll('p');

button.addEventListener('click', function() {
    paragraphs.forEach(function(p) {
        p.style.fontWeight = 'bold';
    });
});
let h1 = document.querySelector('h1');
h1.addEventListener('mouseover',function() {
const randomSize = Math.floor(Math.random()*100) 
h1.style.fontSize=`${randomSize}px`;
})
                //🌟 Exercise 2 : Work with forms
let Form = document.querySelector('form');
console.log(Form);

let  fname = document.getElementById('fname');
let lname = document.getElementById('lname');
console.log(fname);
console.log(lname);

let firstname= document.getElementsByName('firstname');
let lastname= document.getElementsByName('lastname');
console.log(firstname);
console.log(lastname);

let formm = document.querySelector('form');
const usersAnswer = document.querySelector('.usersAnswer');
formm.addEventListener('submit',function(event){
     event.preventDefault();
let  fname = document.getElementById('fname').value;
let lname = document.getElementById('lname').value;

if (fname.trim() !== '' && lname.trim() !== '') {
        const liFirst = document.createElement('li');
        liFirst.textContent = fname;

        const liLast = document.createElement('li');
        liLast.textContent = lname;

        ulContainer.appendChild(liFirst);
        ulContainer.appendChild(liLast);
    }
});
              //🌟 Exercise 3 : Transform the sentence
let allBoldItems;

function getBoldItems(){
allBoldItems =document.querySelectorAll('strong');
}

function highlight(){
getBoldItems();
 for (let item of  allBoldItems){
    item.style.color = 'blue';
 }
}
function returnItemsToDefault(){
  for (let x of allBoldItems){
    x.style.color = 'black';
  }  
}

getBoldItems();
let p = document.querySelector('p');
p.addEventListener('mouseover', highlight);
p.addEventListener('mouseout', returnItemsToDefault);
                //🌟 Exercice 4 : Volume of a sphere
const form = document.getElementById('MyForm');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const radiusValue = Number(document.getElementById('radius').value);

    const volume = (4 / 3) * Math.PI * Math.pow(radiusValue, 3);

    document.getElementById('volume').value = volume.toFixed(2);
});