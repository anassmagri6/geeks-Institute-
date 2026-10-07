                   ///Mini Project - Coloring Game

let canvas = document.getElementById('canvas');

for (let i = 0; i < 400; i++) {
    let square = document.createElement('div');
    square.classList.add('square');
    canvas.appendChild(square);
}
let currentColor = 'red';
let colors = document.querySelectorAll('.color');
colors.forEach(color => {
    color.addEventListener('click', function() {
     currentColor = getComputedStyle(color).backgroundColor;
    });
});
 let isDrawing=false;

window.document.addEventListener('mousedown',function(){
     isDrawing=true;
})
window.document.addEventListener('mouseup',function(){
         isDrawing=false;

})




let squares = document.querySelectorAll('.square');
squares.forEach(square => {
    square.addEventListener('mouseover', function() {
        if (isDrawing) {
          square.style.backgroundColor = currentColor;
    }
    });

});

let clearBtn = document.getElementById('clear');
clearBtn.addEventListener('click', function() {
    let squares = document.querySelectorAll('.square');
    squares.forEach(sq => {
        sq.style.backgroundColor = '';
    });

});

