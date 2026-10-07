const form = document.getElementById('libform');
const storySpan = document.getElementById('story');

const shuffleBtn = document.createElement('button');
shuffleBtn.textContent = 'Shuffle';
shuffleBtn.type = 'button';
form.appendChild(shuffleBtn);

form.addEventListener('submit', function(event) {
    event.preventDefault(); 

    const noun = document.getElementById('noun').value.trim();
    const adjective = document.getElementById('adjective').value.trim();
    const person = document.getElementById('person').value.trim();
    const verb = document.getElementById('verb').value.trim();
    const place = document.getElementById('place').value.trim();

    if (noun === '' || adjective === '' || person === '' || verb === '' || place === '') {
        alert('Please fill in all fields!');
        return;
    }

    storySpan.textContent = `Today, ${person} went to ${place} with a ${adjective} ${noun} to ${verb}.`;
});

shuffleBtn.addEventListener('click', function() {
    const noun = document.getElementById('noun').value.trim();
    const adjective = document.getElementById('adjective').value.trim();
    const person = document.getElementById('person').value.trim();
    const verb = document.getElementById('verb').value.trim();
    const place = document.getElementById('place').value.trim();

    if (noun === '' || adjective === '' || person === '' || verb === '' || place === '') {
        alert('Please fill in all fields first!');
        return;
    }

    const stories = [
        `Today, ${person} went to ${place} with a ${adjective} ${noun} to ${verb}.`,
        `In ${place}, ${person} found a ${adjective} ${noun} and decided to ${verb}.`,
        `While trying to ${verb}, ${person} saw a ${adjective} ${noun} near ${place}.`
    ];

    const randomIndex = Math.floor(Math.random() * stories.length);
    storySpan.textContent = stories[randomIndex];
});