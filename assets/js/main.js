// querry selectors
var startBtn = document.querySelector(".start-btn");
var submitBtn = document.querySelector(".submit-btn");
var startPage = document.querySelector("#start-page");
var quizPage = document.querySelector("#quiz-page");
var highscoreForm = document.querySelector("#form-page");
var input = document.querySelector("#initials");
var choicesEl = document.querySelectorAll(".choice");
var currentTime = document.querySelector("#currentTime");
var scoreEl = document.querySelector("#score");
var wrongAnswer = document.querySelector(".display-wrong");
var correctAnswer = document.querySelector(".display-correct");
var highscoreBtn = document.querySelector(".highscore-btn");
var backBtn = document.querySelector(".back-btn");
var highscorePage = document.querySelector("#highscore-page");
var highscoreList = document.querySelector("#highscoreList");

// declared variables
var currentQuestion = 0;
var secondsLeft = 75;
var holdInterval = 0;
var penalty = 10;
var highScores = [];

// array of objects containing the questions and answers
var questions = [
    {
      title: "Inside which HTML element do we put the JavaScript?",
      choices: ["<scripting>", "<script>", "<js>", "<javascript>"],
      answer: 1,
    },
    {
      title: "Where is the correct place to insert a JavaScript?",
      choices: ["Both the <head> section and the <body> section are correct", "The <body> section", "The <head> section", "The <main> section"],
      answer: 1,
    },
    {
      title: "Hyper Text Markup Language Stand For?",
      choices: ["JavaScript", "XHTML", "CSS", "HTML"],
      answer: 3,
    },
    {
      title: "What is the correct syntax for referring to an external script called xxx.js?",
      choices: ["<script src='xxx.js'>", "<script href='xxx.js'>", "<script name='xxx.js'>", "<script ref='xxx.js'>"],
      answer: 0,
    },
    {
      title: "What does CSS stand for",
      choices: ["Coding Style Sheet", "Cascading Style Sheet", "CSS", "HTML"],
      answer: 1,
    },
    {
      title: "How do you write 'Hello World' in an alert box?",
      choices: ["alertBox('Hello World')", "alert('Hello World')", "msg('Hello World')", "msgBox('Hello World')"],
      answer: 1,
    },
    {
      title: "How do you create a function in JavaScript?",
      choices: ["function:myFunction()", "function myFunction()", "function = myFunction()", "function > myFunction()"],
      answer: 1,
    },
  ];

  startBtn.addEventListener("click", function () {
    if (holdInterval === 0) {
      holdInterval = setInterval(function () {
        secondsLeft--;
        currentTime.textContent = secondsLeft;
        if (secondsLeft <= 0) {
          clearInterval(holdInterval);
          currentTime.textContent = "Time's up!";
        }
      }, 1000);
    }
    startQuiz();
  });

  var startQuiz = function () {
    startPage.setAttribute("class", "hidden");
    quizPage.setAttribute("class", "active");
    showQuestion(questions);
  };


  var showQuestion = function (q) {
    var divTitle = document.querySelector(".title");
    divTitle.textContent = q[currentQuestion].title;
    choicesEl.forEach((element, index) => {
      element.textContent = q[currentQuestion].choices[index];
    });
  };

  
  