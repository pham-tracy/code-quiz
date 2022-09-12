var timerEl = document.getElementById("timer");
var askQuestion = document.getElementById("questionDisplay");
var answersEl = document.getElementById("answers");

var questionIndex = 0;
var shuffledQuestions;

//when submit button to initials is clicked, run event function to log score into webpage local storage
var scoreList = [];

// Questions key with answer choices and correct answer
const questionsKey = [
  {
    question: "What does HTML stand for?",
    answers: [
      "1. High Text Markup Language",
      "2. Happy Time Markup Language",
      "3. HyperText Markup Language",
      "4. Help Text Markup Language",
    ],
    correctAnswer: "3. HyperText Markup Language",
  },
  {
    question: "What data type returns a true or false value?",
    answers: ["1. Boolean", "2. String", "3. Number", "4. None of the above"],
    correctAnswer: "1. Boolean",
  },
  {
    question: "How can you print to the console?",
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
    question: "Strings must be enclosed by what when assigning variables?",
    answers: [
      "1. exclamation marks",
      "2. quotes",
      "3. question marks",
      "4. back slashes",
    ],
    correctAnswer: "2. quotes",
  },
];

// Console.log information
console.log(questionsKey);
console.log(questionsKey.answers);
console.log(questionsKey.correctAnswer);

// Variables for the different divs
var startPage = document.getElementById("startPage");
var questionsPage = document.getElementById("Questions");
var highScores = document.getElementById("high-scores");
var addScoreEl = document.getElementById("AddScore");

// Start page with welcome information. Quiz elements are hidden
questionsPage.style.display = "none";
addScoreEl.style.display = "none";
highScores.style.display = "none";

// Starts the quiz when Start button is clicked
var startBtn = document.getElementById("startBtn");
startBtn.addEventListener("click", startQuiz);

// Buttons for answer choices
var answerOp1 = document.getElementById("op1");
var answerOp2 = document.getElementById("op2");
var answerOp3 = document.getElementById("op3");
var answerOp4 = document.getElementById("op4");

// Time remaining at start of the game
var timeLeft = 75;

function startQuiz() {
  // Randomizes questions
  shuffledQuestions = questionsKey.sort(() => Math.random() - 0.5);

  // Hides start page when game starts
  startPage.style.display = "none";

  // Displays questions page
  questionsPage.style.display = "block";

  //Creates timer
  var timeInterval = setInterval(function () {
    timeLeft--;
    timerEl.textContent = "Time: " + timeLeft;

    // Stops the game if time left is less than or equal to 0, or if all questions have been answered
    if (timeLeft <= 0 || questionIndex === questionsKey.length) {
      // if time left is less than 0, it will log the score as 0
      clearInterval(timeInterval);
      endQuiz();
      timerEl.textContent = "Time: " + timeLeft;
    }
  }, 1000);
  // If time left is greater than 0, it displays the next question
  showQuestion();
}

function showQuestion() {
  // Displays question and answer choices
  askQuestion.textContent = questionsKey[questionIndex].question;
  answerOp1.textContent = questionsKey[questionIndex].answers[0];
  answerOp2.textContent = questionsKey[questionIndex].answers[1];
  answerOp3.textContent = questionsKey[questionIndex].answers[2];
  answerOp4.textContent = questionsKey[questionIndex].answers[3];
}

var answerFeedback = document.getElementById("answerFeedback");
var ansBtn = document.querySelectorAll(".answer-options");

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
    // if wrong, deduct 10 seconds from timer. Displays wrong message
    timeLeft -= 10;
    answerFeedback.textContent = "Wrong!";
  }

  console.log(questionsKey[questionIndex].correctAnswer);
  console.log(event.target.textContent);

  // Goes to the next question
  questionIndex++;
  showQuestion();

  console.log("Q Index:" + (questionIndex + 1));
  console.log("Key length:" + questionsKey.length);
}

// list of list of  high scores when "View High Scores"

// Ordered List of scores
var scoreListEl = document.querySelector("#score-list");
const addScore = document.forms["add-score"];

addScore.addEventListener("submit", submitScore);

function submitScore(event) {
  event.preventDefault();

  addScoreEl.style.display = "none";
  highScores.style.display = "block";

  // create variable to store user inputted initials
  var initials = addScore.querySelector("#initials").value;
  scoreList.push({ initials: initials, score: timeLeft });

  // sort scores
  scoreList = scoreList.sort((a, b) => {
    if (a.score < b.score) {
      return 1;
    } else {
      return -1;
    }
  });

  scoreListEl.textContent = "";

  for (var i = 0; i < scoreList.length; i++) {
    var li = document.createElement("li");
    li.textContent = `${scoreList[i].initials}: ${scoreList[i].score}`;
    scoreListEl.append(li);
  }

  // add to local storage
  storeScores();
  showScores();
}

// Stores scores to local storage as a string
function storeScores() {
  localStorage.setItem("scoreList", JSON.stringify(scoreList));
}

function showScores() {
  // Get stored scores from localStorage

  var storedScoreList = JSON.parse(localStorage.getItem("scoreList"));

  // if scores retrieved, update the Score list array to reflect it
  if (storedScoreList !== null) {
    scoreList = storedScoreList;
  }
  console.log(storedScoreList);
}

// Ends the game and displays final score
function endQuiz() {
  addScoreEl.style.display = "block";
  highScores.style.display = "none";
  questionsPage.style.display = "none";

  document.getElementById("final-score").textContent =
    "Your final score is " + timeLeft;
}

highScores.addEventListener("click", viewHighScores);

// View High Scores
function viewHighScores() {
  startPage.style.display = "none";

  questionsPage.style.display = "none";

  addScoreEl.style.display = "none";

  highScores.style.display = "block";
}

var goBackBtn = document.getElementById("goBack");

// When go back button is pressed, it goes back to the start page.
goBackBtn.addEventListener("click", function (event) {
  event.preventDefault();
  startPage.style.display = "block";
  highScores.style.display = "none";
  questionsPage.style.display = "none";
  addScoreEl.style.display = "none";
  location.reload();
});

var clearScoresBtn = document.getElementById("clearScores");

// Clears high scores when Clear High Scores button is pressed
clearScoresBtn.addEventListener("click", function () {
  // alert("is this working");
  localStorage.clear();
  scoreListEl.textContent = "";
});
