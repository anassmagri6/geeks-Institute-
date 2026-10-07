const express = require('express');
const router = express.Router();

const triviaQuestions = [
  {
    question: "What is the capital of France?",
    answer: "Paris",
  },
  {
    question: "Which planet is known as the Red Planet?",
    answer: "Mars",
  },
  {
    question: "What is the largest mammal in the world?",
    answer: "Blue whale",
  },
];
var currentIndex = 0
router.get('/', (req, res) => {
if (currentIndex < triviaQuestions.length){
res.json({ question: triviaQuestions[currentIndex].question });    
}else{
   res.json({ message: "Quiz completed!" });
}
})

router.post('/', (req, res) => {
    if (currentIndex >= triviaQuestions.length){
        return res.json({ message: "Quiz completed!" });
    }

    const {answer} = req.body;
    const correctAnswer = triviaQuestions[currentIndex].answer;

    var iscorrect=false;
    if(answer===correctAnswer){
        score++;
        iscorrect=true;
    }
    currentIndex++;

    res.json({
        iscorrect: iscorrect,
        message: iscorrect ? "Correct!" : "Incorrect!"
    });
})
res.json({
    feedback: isCorrect ? "Correct!" : `Incorrect! The answer was: ${correctAnswer}`,
    nextQuestion: currentIndex < triviaQuestions.length ? triviaQuestions[currentIndex].question : null
  });
-

router.get('/score', (req, res) => {
  res.json({
    finalScore: score,
    totalQuestions: triviaQuestions.length
  });
});

module.exports = router;