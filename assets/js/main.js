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
var backBtn = document.querySelector('.back-btn')

// declared variables
var currentQuestion = 0;
var secondsLeft = 75;
var holdInterval = 0;
var penalty = 10;
var highScores = [];

// array of objects containing the questions and answers
var questions = [{
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

//   will begin quiz when start button is clicked
startBtn.addEventListener("click", function () {
    //   decreases timer once quiz starts
    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            secondsLeft--;
            currentTime.textContent = secondsLeft;
            // if time reaches 0 then we clear interval and quiz will end
            if (secondsLeft <= 0) {
                clearInterval(holdInterval);
                currentTime.textContent = "Your Time is Up!";
            }
        }, 1000);
    }
    startQuiz();
});


var startQuiz = function () {
    // hides the start page
    startPage.setAttribute("class", "hidden");
    // shows quiz page
    quizPage.setAttribute("class", "active");
    // function that will loop through questions array and display question and choices
    showQuestion(questions);
};

// displays current question
var showQuestion = function (question) {
    var divTitle = document.querySelector(".title");
    divTitle.textContent = question[currentQuestion].title;
    choicesEl.forEach((element, index) => {
        element.textContent = question[currentQuestion].choices[index];
    });
};


// loops through every choice and creates an event listener
choicesEl.forEach((question) => {
    question.addEventListener("click", function (event) {
      var targetEl = event.target;
    //   targets the button containing the class choice and gets the data-id attribute
      if (targetEl.matches(".choice")) {
        var dataId = targetEl.getAttribute("data-id");
        dataId = parseInt(dataId);
        // compares the data-id of the user's choice with the answer from the questions array
        if (dataId == questions[currentQuestion].answer) {
        // displays correct if the user's choice is correct
          correctAnswer.setAttribute("class", "active");
        } else {
        // displays wrong if the user's choice is wrong
        // deducts 10 seconds when answer is wrong
          secondsLeft = secondsLeft - penalty;
          wrongAnswer.setAttribute("class", "active");
        }
      }

    // once answered the question will move to the next question after 1 second  
      setTimeout(function () {
        resetQuestion();
      }, 1000);
    });
  });

//   function that resets the question
  var resetQuestion = function () {
    // hides the wrong and correct words from bottom of page
    wrongAnswer.setAttribute("class", "hidden");
    correctAnswer.setAttribute("class", "hidden");
    // increments through questions
    currentQuestion++;

    if (currentQuestion >= questions.length) {
    // once you reach the end of quiz it will direct you to save your score
      saveHighScore();
    } else {
        // else continue to finish the quiz
      showQuestion(questions);
    }
  };

//   function that saves the score to local storage
  function saveHighScore() {
    highscoreForm.setAttribute("class", "active");
    quizPage.setAttribute("class", "hidden");
    // the seconds that are left will equal to your score
    if (secondsLeft >= 0) {
      var timeRemaining = secondsLeft;
      clearInterval(holdInterval);
      scoreEl.textContent = timeRemaining;
    }

    // grabbing the value from input
    var initials = input.value;

    // validating if input has a value
    if (!initials) {
      console.log("You must enter your initials.");
    } else {
        // creating an object to save the score and initials
      let newScore = {
        initials: initials,
        highScore: timeRemaining,
      };
    //   pushing the object into the array
      highScores.push(newScore);
    //   saving the array into local storage
      localStorage.setItem("scores", JSON.stringify(highScores));
    }

    // function that loads the saved scores
    loadScores()
  }
  
//   function that allows us to view scores
  var viewScores = function(){
    //   function that loads the saved scores
    loadScores()
    startPage.setAttribute("class", "hidden");
    quizPage.setAttribute("class", "hidden");
    highscoreForm.setAttribute("class", "hidden");
    highscorePage.setAttribute("class", "active");

    // creates the buttons for score list
    for (var i = 0; i < highScores.length; i++) {
      var createBtn = document.createElement("button");
      createBtn.className = "btn score-btn";
      createBtn.innerHTML = `<span class="initials">Initials:${highScores[i].initials}</span>
      <span class="scores">Score:${highScores[i].highScore}</span>`;
      highscoreList.appendChild(createBtn);
    }
  }
  

  var loadScores = function(){
      //   grabs the scores from local storage
    var savedHighscore = JSON.parse(localStorage.getItem("scores"));

    // validates if there are any saved scores in local storage
    if (!savedHighscore) {
      highScores = [];
    } else {
      highScores = JSON.parse(localStorage.getItem("scores"));
    }
  }
  
// Event listeners for buttons
  submitBtn.addEventListener("click", saveHighScore);
  
  highscoreBtn.addEventListener("click", viewScores);

  backBtn.addEventListener('click', function(){
    // shows the start page
    startPage.setAttribute("class", "active");
    // hides quiz page
    quizPage.setAttribute("class", "hidden");
    // hides highscore form page
    highscoreForm.setAttribute("class", "hidden");
    // hides highscore list page
    highscorePage.setAttribute("class", "hidden");
  })