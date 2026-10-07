// Solution 1: Single Loop
let x = "";
for (let i = 1; i <= 6; i++) {
    x += "* ";
    console.log(x.trim());
}

// Solution 2: Nested Loops
for (let i = 1; i <= 6; i++) {
    let line = "";
    for (let y = 1; y <= i; y++) {
        line += "* ";
    }
    console.log(line.trim());
}