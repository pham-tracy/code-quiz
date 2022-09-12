var timerEl = document.getElementById("timer");
var askQuestion = document.getElementById("questionDisplay");
var answersEl = document.getElementById("answers");

var questionIndex = 0;
var shuffledQuestions;

// create variables for questions
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

// Variables for hiding and showing divs

var startPage = document.getElementById("startPage");
var questionsPage = document.getElementById("Questions");

// Start welcome page. Hides scoring, questions, high scores.
var addScoreEl = document.getElementById("AddScore");

addScoreEl.style.display = "none";

questionsPage.style.display = "none";

var highScores = document.getElementById("high-scores");

highScores.style.display = "none";

// Starts game when Start button is clicked
var startBtn = document.getElementById("startBtn");
startBtn.addEventListener("click", startGame);

// Buttons for answer choices
var answerOp1 = document.getElementById("op1");
var answerOp2 = document.getElementById("op2");
var answerOp3 = document.getElementById("op3");
var answerOp4 = document.getElementById("op4");

// Beginning time left
var timeLeft = 75;

function startGame() {
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

    // Stops the game if time left is less than or equal to 0.
    if (timeLeft <= 0) {
      // if time left is less than 0, it will log the score as 0.xs
      timeLeft = 0;
      endGame();
      clearInterval(timeInterval);
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

// For each answer button pressed, it checks if it is the correct
ansBtn.forEach((answer) => {
  answer.addEventListener("click", checkAnswer);
});

// Checks whether answer is correct
function checkAnswer(event) {
  event.preventDefault();

  // If correct, displays Correct message
  if (questionsKey[questionIndex].correctAnswer == event.target.textContent) {
    answerFeedback.textContent = "Correct!";
  } else {
    // if wrong, deduct 10 seconds from timer. Displays wrong message
    timeLeft -= 10;
    answerFeedback.textContent = "Wrong!";
  }

  console.log(questionsKey[questionIndex].correctAnswer);
  console.log(event.target.textContent);

  // Checks if all questions are already asked. If so, game ends If not, continue displaying the next question

  //TODO: how do i stop timer when all questions are asked

  if (questionIndex + 1 === questionsKey.length) {
    endGame();
  } else {
    questionIndex++;
    showQuestion();
  }

  console.log(" Q Index:" + (questionIndex + 1));
  console.log("Key length:" + questionsKey.length);
}

// list of list of  high scores when "View High Scores"
const scoreListEl = document.querySelector("#score-list");

const addScore = document.forms["add-score"];

//when submit button to initials is clicked, run event function to log score into webpage local storage
scoreList = [];

addScore.addEventListener("submit", function (e) {
  e.preventDefault();

  // create variable to store user inputted initials
  var initials = addScore.querySelector('input[type="text"]').value;

  //displays initials in console.log
  console.log(initials);
  console.log(timeLeft);

  // create elements
  const li = document.createElement("li");
  const username = document.createElement("span");
  const score = document.createElement("span");

  username.textContent = initials;
  score.textContent = " " + timeLeft;

  localStorage.setItem("initials", initials);
  localStorage.setItem("score", JSON.stringify(timeLeft));

  scoreList.push({ initials, score });

  // // add classes
  // username.classList.add("name");
  // score.classList.add("score");

  // append to document
  li.appendChild(username);
  li.appendChild(score);
  scoreListEl.appendChild(li);

  storeScores();

  viewHighScores();
});

// TODO: Add initials as LI items, append to High score page. sort from high to low

function storeScores() {
  localStorage.setItem("scoreList", JSON.stringify(scoreList));
}

// Ends the game and displays final score
function endGame() {
  addScoreEl.style.display = "block";
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

  // var storedScoreList = JSON.parse(localStorage.getItem("scoreList"));

  // scoreListEl.append(storedScoreList);
}

var goBackBtn = document.getElementById("goBack");

// When go back button is pressed, it goes back to start page. doesnt necessarily need the
goBackBtn.addEventListener("click", function (event) {
  event.preventDefault();
  // startPage.style.display = "block";
  // highScores.style.display = "none";
  // addScoreEl.style.display = "none";
  // questionsPage.style.display = "block";
  location.reload();
});

var clearScoresBtn = document.getElementById("clearScores");

clearScoresBtn.addEventListener("click", function () {
  // alert("is this working");
  localStorage.clear();
  scoreListEl.innerHTML = "";

  console.log("Scores have been cleared");
});

// getlocal storage to dispaly scores, sort ().
