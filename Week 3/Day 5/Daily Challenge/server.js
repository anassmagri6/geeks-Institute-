const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

const emojis = [
    { emoji: '😀', name: 'Smile' },
    { emoji: '🐶', name: 'Dog' },
    { emoji: '🌮', name: 'Taco' },
    { emoji: '🍕', name: 'Pizza' },
    { emoji: '🚀', name: 'Rocket' }
];

let score = 0;
let leaderboard = [];

app.get('/api/game/next', (req, res) => {
    const randomIndex = Math.floor(Math.random() * emojis.length);
    const correctEmoji = emojis[randomIndex];

    let options = [correctEmoji.name];

    while (options.length < 4) {
        const randomOption = emojis[Math.floor(Math.random() * emojis.length)].name;
        if (!options.includes(randomOption)) {
            options.push(randomOption);
        }
    }

    options = options.sort(() => Math.random() - 0.5);

    res.json({ emoji: correctEmoji.emoji, options });
});

app.post('/api/game/guess', (req, res) => {
    const { emoji, guess, player } = req.body;
    const target = emojis.find(e => e.emoji === emoji);

    if (target && target.name === guess) {
        score += 10;
        res.json({ correct: true, score, message: 'Correct answer!' });
    } else {
        if (player) {
            leaderboard.push({ player, score });
        }
        const finalScore = score;
        score = 0;
        res.json({ correct: false, score: finalScore, message: `Wrong! Correct answer was: ${target ? target.name : ''}` });
    }
});

app.get('/api/leaderboard', (req, res) => {
    const sorted = leaderboard.sort((a, b) => b.score - a.score).slice(0, 5);
    res.json(sorted);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});