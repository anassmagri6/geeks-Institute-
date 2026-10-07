                            // 1st daily challenge
function makeAllCaps(words) {
    return new Promise((resolve, reject) => {
        if (words.every(word => typeof word === 'string')) {
            resolve(words.map(word => word.toUpperCase()));
        } else {
            reject('Not all items are strings');
        }
    });
}

function sortWords(words) {
    return new Promise((resolve, reject) => {
        if (words.length > 4) {
            resolve(words.sort());
        } else {
            reject('Array must be longer than 4 items');
        }
    });
}

                         // ⭐ 2nd daily challenge

function toJs(morse) {
    return new Promise((resolve, reject) => {
        const object = JSON.parse(morse);
        if (Object.keys(object).length === 0) {
            reject('Error: The morse code is empty');
        } else {
            resolve(object);
        }
    });
}

function toMorse(morseJS) {
    return new Promise((resolve, reject) => {
        const userInput = prompt('Enter a word to convert to morse code or sentence');
        const morseObject = userInput.toLowerCase().split('');
        const morseTranslation = [];

        for (let x of morseObject) {
            if (x in morseJS) {
                morseTranslation.push(morseJS[x]);
            } else {
                return reject(`Error: Character "${x}" does not exist in morse object`);
            }
        }
        resolve(morseTranslation); 
    }); 
}

function joinWords(morseTranslation) {
    const joinedString = morseTranslation.join("\n");
    document.body.innerText = joinedString;
}

toJs(morse)
    .then(morseJS => toMorse(morseJS))
    .then(morseTranslation => joinWords(morseTranslation))
    .catch(error => console.log(error));