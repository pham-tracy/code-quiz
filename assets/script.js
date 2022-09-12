var timerEl = document.getElementById("timer");
var askQuestion = document.getElementById("questionDisplay");
var answersEl = document.getElementById("answers");

var questionIndex = 0;
var shuffledQuestions;

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

// Variables for the different divs
var startPage = document.getElementById("startPage");
var questionsPage = document.getElementById("questions");
var highScores = document.getElementById("highScores");
var addScoreEl = document.getElementById("addScore");

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

  // Creates timer
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
  addScores();
}

var goBackBtn = document.getElementById("goBackBtn");

// When go back button is pressed, it goes back to the start page.
goBackBtn.addEventListener("click", function (event) {
  event.preventDefault();
  startPage.style.display = "block";
  highScores.style.display = "none";
  questionsPage.style.display = "none";
  addScoreEl.style.display = "none";
  location.reload();
});

var clearScoresBtn = document.getElementById("clearScoresBtn");

// Clears high scores when Clear High Scores button is pressed
clearScoresBtn.addEventListener("click", function () {
  // alert("is this working");
  localStorage.clear();
});

var highscoresPageBtn = document.querySelector("#highscoresBtn");
highscoresPageBtn.addEventListener("click", viewHighScores);

var Scores = document.querySelector("#scoreList");
var userInitials = document.querySelector("#initials");
var addInitials = document.querySelector("#add-initials");

// Saves score information and displays the high scores page
addInitials.addEventListener("click", function (event) {
  event.preventDefault();
  addScoreEl.style.display = "none";
  startPage.style.display = "none";
  highScores.style.display = "block";
  questionsPage.style.display = "none";
  saveScore();
});

// get current score and initials from local storage
function getScore() {
  var currentList = localStorage.getItem("ScoreList");
  if (currentList !== null) {
    freshList = JSON.parse(currentList);
    return freshList;
  } else {
    freshList = [];
  }
  return freshList;
}

// add scores to the score board
function addScores() {
  Scores.innerHTML = "";
  Scores.style.display = "block";
  var highScores = sort();
  //show the top five high scores.
  var topFive = highScores.slice(0, 5);
  for (var i = 0; i < topFive.length; i++) {
    var item = topFive[i];
    // Show the score list on score board
    var li = document.createElement("li");
    li.textContent = item.user + " - " + item.score;
    li.setAttribute("data-index", i);
    Scores.appendChild(li);
  }
}

// sort score and ranking the highscore list
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

// push new score and initial to local storage
function addItem(n) {
  var addedList = getScore();
  addedList.push(n);
  localStorage.setItem("ScoreList", JSON.stringify(addedList));
}

function saveScore() {
  var scoreItem = {
    user: userInitials.value,
    score: timeLeft,
  };
  addItem(scoreItem);
  addScores();
}
