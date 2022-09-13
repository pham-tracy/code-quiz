// Variable for timer element
var timerEl = document.getElementById("timer");

// Time at the start of the game
var timeLeft = 75;

// Variables for the different divs
var startPage = document.getElementById("startPage");
var questionsPage = document.getElementById("questions");
var addScorePage = document.getElementById("addScore");
var highScoresPage = document.getElementById("highScores");
var askQuestion = document.getElementById("questionDisplay");
var answersEl = document.getElementById("answers");
var finalScore = document.getElementById("final-score");

// Variables for adding scores when quiz ends
var scores = document.querySelector("#scoreList");
var userInitials = document.querySelector("#initials");
var addInitials = document.querySelector("#add-initials");
var scoreListEl = document.querySelector("#score-list");
const addScore = document.forms["add-score"];

// Variable to display whether question is correct or incorrect
var answerFeedback = document.getElementById("answerFeedback");

// Variables for displaying the questions
var questionIndex = 0;
var shuffledQuestions;

// Variables for answer choice buttons
var answerOp1 = document.getElementById("op1");
var answerOp2 = document.getElementById("op2");
var answerOp3 = document.getElementById("op3");
var answerOp4 = document.getElementById("op4");

// Variables for page buttons
var highScoresBtn = document.querySelector("#highScoresBtn");
var ansBtn = document.querySelectorAll(".answer-options");
var goBackBtn = document.getElementById("goBackBtn");
var startBtn = document.getElementById("startBtn");
var clearScoresBtn = document.getElementById("clearScoresBtn");

// Questions key with answer choices and correct answer
const questionsKey = [
  {
    question: "What does HTML stand for?",
    answers: [
      "1. HighText Markup Language",
      "2. HighTech Markup Language",
      "3. HyperText Markup Language",
      "4. HelpText Markup Language",
    ],
    correctAnswer: "3. HyperText Markup Language",
  },
  {
    question: "What data type returns a true or false value?",
    answers: ["1. Boolean", "2. String", "3. Number", "4. None of the above"],
    correctAnswer: "1. Boolean",
  },
  {
    question: "How do you print to the console?",
    answers: [
      "1. log.console",
      "2. console.log",
      "3. print.console",
      "4. console.print",
    ],
    correctAnswer: "2. console.log",
  },
  {
    question: "Which of the following is not a way to declare a variable?",
    answers: ["1. let", "2. var", "3. const", "4. make"],
    correctAnswer: "4. make",
  },
  {
    question: "What must strings be enclosed by when assigning variables?",
    answers: [
      "1. exclamation marks",
      "2. quotes",
      "3. question marks",
      "4. back slashes",
    ],
    correctAnswer: "2. quotes",
  },
];

// Start page with quiz information
questionsPage.style.display = "none";
addScorePage.style.display = "none";
highScoresPage.style.display = "none";

// Event Listeners
// Starts quiz
startBtn.addEventListener("click", startQuiz);

// Views high scores
highScoresBtn.addEventListener("click", viewHighScores);
highScoresPage.addEventListener("click", viewHighScores);

// Goes back to the start page
goBackBtn.addEventListener("click", function (event) {
  event.preventDefault();
  startPage.style.display = "block";
  highScoresPage.style.display = "none";
  questionsPage.style.display = "none";
  addScorePage.style.display = "none";
  location.reload();
});

// Clears high scores
clearScoresBtn.addEventListener("click", function () {
  localStorage.clear();
});

// Saves score information and displays the high scores page
addInitials.addEventListener("click", function (event) {
  event.preventDefault();
  addScorePage.style.display = "none";
  startPage.style.display = "none";
  highScoresPage.style.display = "block";
  questionsPage.style.display = "none";
  saveScore();
});

// Starts the quiz
function startQuiz() {
  // Randomizes questions
  shuffledQuestions = questionsKey.sort(() => Math.random() - 0.5);
  // Hides start page when game starts
  startPage.style.display = "none";
  // Displays questions page
  questionsPage.style.display = "block";

  // Creates timer
  var timeInterval = setInterval(function () {
    timeLeft--;
    timerEl.textContent = "Time: " + timeLeft;
    // Stops the game if time left is less than or equal to 0, or if all questions have been answered
    if (timeLeft <= 0 || questionIndex === questionsKey.length) {
      clearInterval(timeInterval);
      endQuiz();
      timerEl.textContent = "Time: " + timeLeft;
    }
  }, 1000);
  // If time left is greater than 0, it displays the next question
  showQuestion();
}

// Displays question and answer choices
function showQuestion() {
  askQuestion.textContent = questionsKey[questionIndex].question;
  answerOp1.textContent = questionsKey[questionIndex].answers[0];
  answerOp2.textContent = questionsKey[questionIndex].answers[1];
  answerOp3.textContent = questionsKey[questionIndex].answers[2];
  answerOp4.textContent = questionsKey[questionIndex].answers[3];
}

// For each answer button clicked, it checks if it is correct
ansBtn.forEach((answer) => {
  answer.addEventListener("click", checkAnswer);
});

// Checks whether answer is correct
function checkAnswer(event) {
  event.preventDefault();
  // If correct, displays correct message
  if (questionsKey[questionIndex].correctAnswer == event.target.textContent) {
    answerFeedback.textContent = "Correct!";
  } else {
    // if incorrect, deducts 10 seconds from timer and displays wrong message
    timeLeft -= 10;
    answerFeedback.textContent = "Wrong!";
  }
  // Goes to the next question
  questionIndex++;
  showQuestion();
}

// Ends the game and displays the final score
function endQuiz() {
  addScorePage.style.display = "block";
  highScores.style.display = "none";
  questionsPage.style.display = "none";
  finalScore.textContent = "Your final score is " + timeLeft;
}

// Views high scores
function viewHighScores() {
  startPage.style.display = "none";
  questionsPage.style.display = "none";
  addScorePage.style.display = "none";
  highScoresPage.style.display = "block";
  addScores();
}

// Retrieves score data from local storage
function getScore() {
  var currentList = localStorage.getItem("ScoreList");
  if (currentList !== null) {
    newList = JSON.parse(currentList);
    return newList;
  } else {
    newList = [];
  }
  return newList;
}

// Adds scores to the high scores list
function addScores() {
  scores.innerHTML = "";
  scores.style.display = "block";
  var highScores = sort();
  // Displays the top ten high scores
  var topTen = highScores.slice(0, 10);
  for (var i = 0; i < topTen.length; i++) {
    var item = topTen[i];
    // Creates list item for each score added and appends it to the high scores list
    var li = document.createElement("li");
    li.textContent = item.user + " - " + item.score;
    li.setAttribute("data-index", i);
    scores.appendChild(li);
  }
}

// Ranks high scores from highest to lowest
function sort() {
  var unsortedList = getScore();
  if (getScore == null) {
    return;
  } else {
    unsortedList.sort(function (a, b) {
      return b.score - a.score;
    });
    return unsortedList;
  }
}

// Adds high score to local storage
function addItem(n) {
  var addedList = getScore();
  addedList.push(n);
  localStorage.setItem("ScoreList", JSON.stringify(addedList));
}

// Saves score
function saveScore() {
  var scoreItem = {
    user: userInitials.value,
    score: timeLeft,
  };
  addItem(scoreItem);
  addScores();
}
