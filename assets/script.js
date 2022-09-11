var timerEl = document.getElementById("timer");
var askQuestion = document.getElementById("questionDisplay");
var answersEl = document.getElementById("answers");

var questionIndex = 0;
var shuffledQuestions;
console.log(shuffledQuestions);

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
    correctAnswer: "HyperText Markup Language",
  },
  {
    question: "What data type returns a true or false value?",
    answers: ["1. Boolean", "2. String", "3. Number", "4. None of the above"],
    correctAnswer: "Boolean",
  },
  {
    question: "How can you print to the console?",
    answers: [
      "1. log.console",
      "2. console.log",
      "3. print.console",
      "4. console.print",
    ],
    correctAnswer: "console.log",
  },
  {
    question: "Which of the following is not a way to declare a variable?",
    answers: ["1. let", "2. var", "3. const", "4, make"],
    correctAnswer: "4",
  },
  {
    question: "Strings must be enclosed by what when assigning variables?",
    answers: [
      "1. exclamation marks",
      "2. quotes",
      "3. question marks",
      "4. back slashes",
    ],
    correctAnswer: "quotes",
  },
];

// Console.log information
console.log(questionsKey);
console.log(questionsKey.question);
console.log(questionsKey[questionIndex].question);
console.log(questionsKey[questionIndex].answers);
console.log(questionsKey[questionIndex].correctAnswer);

console.log(JSON.stringify(questionsKey[questionIndex].questions));

console.log(timerEl);

// Start welcome page. Hides scoring, questions, high scores.
document.getElementById("AddScore").style.display = "none";
document.getElementById("Questions").style.display = "none";
document.getElementById("high-scores").style.display = "none";

// Starts game when Start button is clicked
var startBtn = document.getElementById("startBtn");
startBtn.addEventListener("click", startGame);

// Buttons for answer choices
var answerOp1 = document.getElementById("op1");
var answerOp2 = document.getElementById("op2");
var answerOp3 = document.getElementById("op3");
var answerOp4 = document.getElementById("op4");

// Variables for hiding and showing divs

var startPage = document.getElementById("startPage");
var questionsPage = document.getElementById("Questions");

function startGame() {
  // Begins countdown timer at game start
  countdown();

  // Randomizes questions
  shuffledQuestions = questionsKey.sort(() => Math.random() - 0.5);

  // Hides start page when game starts
  startPage.style.display = "none";

  // Displays questions page
  questionsPage.style.display = "block";

  // Goes to show question function
  showQuestion();
}

function showQuestion() {
  var currentQuestion = questionsKey[questionIndex].question;

  // CHANGED TO INNERHTML, might have toc change back to textContent
  // Makes the question display as the heading title
  askQuestion.innerHTML = currentQuestion;

  console.log(currentQuestion);

  // make text answers show up as options
  answerOp1.innerHTML = questionsKey[questionIndex].answers[0];
  answerOp2.innerHTML = questionsKey[questionIndex].answers[1];
  answerOp3.innerHTML = questionsKey[questionIndex].answers[2];
  answerOp4.innerHTML = questionsKey[questionIndex].answers[3];
}

// var answerBtns = document.getElementsByClassName("answer-options");
// answerBtns.addEventListener("click", checkAnswer);

var answerFeedback = document.getElementById("answerFeedback");

// add event listener to checkAnswer when button is clicked
// TODO: change it to when the individual button answer is clicked
answersEl.addEventListener("click", checkAnswer);

// Checks answers

function checkAnswer(answer) {
  answer.preventDefault();
  // Checks whether answer is correct or incorrect

  // If correct, displays Correct message
  if (questionsKey[questionIndex].correctAnswer == answer) {
    answerFeedback.textContent = "Correct!";
  } else {
    // if wrong, deduct 10 seconds from timer. Displays wrong message
    timeLeft -= 10;
    answerFeedback.textContent = "Wrong!";
  }

  // if all questions are asked, end game and show final score
  // TODO: why doesnt it display the 5th question?
  if (questionsKey.length === questionIndex + 1) {
    endGame();
    return;
  }
  console.log(questionsKey.length);
  console.log(questionIndex + 1);

  questionIndex++;
  showQuestion();
}

var timeLeft = 100;
// timer function on how much time is left. If it gets to 0, then sorry message appears.
function countdown() {
  // Sets how much time you start with

  // executes method every 1000 milliseconds
  var timeInterval = setInterval(function () {
    timeLeft--;
    timerEl.textContent = "Time: " + timeLeft;

    // if no time is left, or if all questions have been answered, stop timer and end the game\
    // TODO: if timeleft is less than 0, log the score of 0 not - score
    if (timeLeft === 0 || questionsKey.length === questionIndex + 1) {
      // clearInteval to clear the timer

      endGame();
      clearInterval(timeInterval);
      timerEl.textContent = "Time: " + timeLeft;
    }
  }, 1000);
}

// TODO: when on last question, hide question div and show the final score div

// list of list of  high scores when "View High Scores"
const list = document.querySelector("#high-scores");

var addScore = document.forms["add-score"];

console.log(addScore);

//when submit button to initials is clicked, run event function to log score into webpage local storage

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

  // add classes
  username.classList.add("name");
  score.classList.add("score");

  // append to document
  li.appendChild(username);
  li.appendChild(score);
  list.appendChild(li);
});

// TODO: Add initials as LI items, append to High score page. sort from high to low

// Ends the game and displays final score
function endGame() {
  document.getElementById("AddScore").style.display = "block";
  document.getElementById("Questions").style.display = "none";

  document.getElementById("final-score").textContent =
    "Your final score is " + timeLeft;
}

var highScores = document.getElementById("viewHighScores");

highScores.addEventListener("click", viewHighScores);

// View High Scores
function viewHighScores() {
  document.getElementById("startPage").style.display = "none";

  document.getElementById("Questions").style.display = "none";

  document.getElementById("AddScore").style.display = "none";
}

goBack = document.getElementById("goBack");

goBack.addEventListener("click", goBack1);

// TODO: how do i make it go back to the start page?
function goBack1() {
  document.getElementById("high-scores").style.display = "none";

  // document.getElementById("startPage").style.display = "block";

  // startGame();
}

// getlocal storage to dispaly scores, sort ().
