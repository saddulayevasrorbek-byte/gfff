const questions = [
  {
    question: "What is the capital of France?",
    answers: ["Berlin", "Madrid", "Paris", "Rome"],
    correct: 2
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: ["Venus", "Mars", "Jupiter", "Saturn"],
    correct: 1
  },
  {
    question: "Who painted the Mona Lisa?",
    answers: ["Van Gogh", "Picasso", "Leonardo da Vinci", "Michelangelo"],
    correct: 2
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: ["Atlantic", "Indian", "Arctic", "Pacific"],
    correct: 3
  },
  {
    question: "How many sides does a hexagon have?",
    answers: ["5", "6", "7", "8"],
    correct: 1
  },
  {
    question: "What is the chemical symbol for Gold?",
    answers: ["Go", "Gd", "Au", "Ag"],
    correct: 2
  },
  {
    question: "Which country invented pizza?",
    answers: ["France", "Greece", "Spain", "Italy"],
    correct: 3
  },
  {
    question: "What is the fastest land animal?",
    answers: ["Lion", "Cheetah", "Horse", "Leopard"],
    correct: 1
  },
  {
    question: "In which year did World War II end?",
    answers: ["1943", "1944", "1945", "1946"],
    correct: 2
  },
  {
    question: "What is the smallest prime number?",
    answers: ["0", "1", "2", "3"],
    correct: 2
  }
];

let currentIndex = 0;
let score = 0;
let answered = false;

// Screens
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');

// Elements
const questionText = document.getElementById('question-text');
const answersContainer = document.getElementById('answers-container');
const questionCounter = document.getElementById('question-counter');
const scoreDisplay = document.getElementById('score-display');
const progressFill = document.getElementById('progress-fill');
const feedback = document.getElementById('feedback');
const nextBtn = document.getElementById('next-btn');
const finalScore = document.getElementById('final-score');
const resultMessage = document.getElementById('result-message');
const resultEmoji = document.getElementById('result-emoji');

// Buttons
document.getElementById('start-btn').addEventListener('click', startQuiz);
document.getElementById('restart-btn').addEventListener('click', restartQuiz);
nextBtn.addEventListener('click', nextQuestion);

function startQuiz() {
  startScreen.classList.add('hidden');
  quizScreen.classList.remove('hidden');
  loadQuestion();
}

function loadQuestion() {
  answered = false;
  feedback.classList.add('hidden');
  feedback.className = 'feedback hidden';
  nextBtn.classList.add('hidden');

  const q = questions[currentIndex];
  questionText.textContent = q.question;
  questionCounter.textContent = `Question ${currentIndex + 1} / ${questions.length}`;
  scoreDisplay.textContent = `Score: ${score}`;
  progressFill.style.width = `${((currentIndex) / questions.length) * 100}%`;

  answersContainer.innerHTML = '';
  q.answers.forEach((answer, index) => {
    const btn = document.createElement('button');
    btn.classList.add('answer-btn');
    btn.textContent = answer;
    btn.addEventListener('click', () => selectAnswer(index, btn));
    answersContainer.appendChild(btn);
  });
}

function selectAnswer(selectedIndex, selectedBtn) {
  if (answered) return;
  answered = true;

  const correct = questions[currentIndex].correct;
  const allBtns = answersContainer.querySelectorAll('.answer-btn');

  allBtns.forEach(btn => btn.disabled = true);

  if (selectedIndex === correct) {
    selectedBtn.classList.add('correct');
    score++;
    scoreDisplay.textContent = `Score: ${score}`;
    feedback.textContent = '✅ Correct! Well done!';
    feedback.classList.remove('hidden');
    feedback.classList.add('correct-fb');
  } else {
    selectedBtn.classList.add('wrong');
    allBtns[correct].classList.add('correct');
    feedback.textContent = `❌ Wrong! The correct answer was: "${questions[currentIndex].answers[correct]}"`;
    feedback.classList.remove('hidden');
    feedback.classList.add('wrong-fb');
  }

  nextBtn.classList.remove('hidden');

  if (currentIndex === questions.length - 1) {
    nextBtn.textContent = 'See Results 🏆';
  } else {
    nextBtn.textContent = 'Next Question →';
  }
}

function nextQuestion() {
  currentIndex++;
  if (currentIndex < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  quizScreen.classList.add('hidden');
  resultScreen.classList.remove('hidden');

  const percent = Math.round((score / questions.length) * 100);
  finalScore.textContent = `${score} / ${questions.length}`;

  if (percent === 100) {
    resultEmoji.textContent = '🏆';
    resultMessage.textContent = 'Perfect score! You are a genius!';
  } else if (percent >= 70) {
    resultEmoji.textContent = '🎉';
    resultMessage.textContent = 'Great job! You know your stuff!';
  } else if (percent >= 40) {
    resultEmoji.textContent = '😊';
    resultMessage.textContent = 'Not bad! Keep learning and try again!';
  } else {
    resultEmoji.textContent = '📚';
    resultMessage.textContent = 'Keep studying — you\'ll get better!';
  }
}

function restartQuiz() {
  currentIndex = 0;
  score = 0;
  answered = false;
  resultScreen.classList.add('hidden');
  quizScreen.classList.remove('hidden');
  loadQuestion();
}
