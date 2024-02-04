const questions = [
  {
    question: "What's my stage name?",
    answer: [
      { Text: "Davido", correct: false },
      { Text: "Chris brown", correct: false },
      { Text: "Tajufresh", correct: true },
      { Text: "Mc voltage", correct: false },
    ],
  },
  {
    question: "What is my major?",
    answer: [
      { Text: "History", correct: false },
      { Text: "Law", correct: false },
      { Text: "Aviation", correct: false },
      { Text: "Computer-Sc", correct: true },
    ],
  },
  {
    question: "What's my favorite hobby?",
    answer: [
      { Text: "Programmer", correct: true },
      { Text: "fishing", correct: false },
      { Text: "Netflix & Chill", correct: false },
      { Text: "Shooter", correct: false },
    ],
  },
  {
    question: "Where is my country of origin?",
    answer: [
      { Text: "Usa", correct: false },
      { Text: "Italy", correct: false },
      { Text: "Nigeria", correct: true },
      { Text: "Uk", correct: false },
    ],
  },
  {
    question: "What is my girlfriend name?",
    answer: [
      { Text: "Selena", correct: false },
      { Text: "Bernise", correct: true },
      { Text: "kim", correct: false },
      { Text: "Nickminaj", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answer.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.Text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});
startQuiz();
