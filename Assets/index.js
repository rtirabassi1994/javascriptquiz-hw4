var questions = [
    {
        question: "Inside which HTML element do we put the JavaScript?",
        choices: [
            "<scripting>", 
            "<script>", 
            "<js>", 
            "<javaScript>"],
        answer: "<script>"
    },
    {
        question: "How do you create a function in JavaScript?",
        choices: ["function = myFunction()", "function myFunction ()", "function: myFunction()", "function =myFunction []" ],
        answer: "function myFunction ()"
    },

    {
        question: "How does a FOR loop start?",
        choices: ["for (i=0; i<=5)", "for i<=5;i++", "for i=1 to 5", "for (i=0; i <=5; i++)"],
        answer: "for (i=0; i <=5; i++)",
    },

    {
        question: "How can you add a comment in a JavaScript?",
        choices: ["!This is a comment", "//This is a comment", "<!--This is a comment", "*--This is a comment"],
        answer: "//This is a comment",
    },
    {
        question: "How do you declare a JavaScript variable?",
        choices: ["var carName;", "variable carName;", "v carName;", "carName = variable"],
        answer: "var carName;",
    }

]

//make variable that will keep track of our quiz state
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

//variables to reference the document/html
var timerEl = document.getElementById('timer');
var quizQuestion = document.getElementById('quiz-question');
var quizQuestionBtns = document.getElementById("quizQuestionBtns");
var gameTime = document.getElementById ('timer');
var startScreenEl = document.getElementById("start-screen");
var start = document.getElementById('startBtn');

function startQuiz(){
    //hide our start screen
    startScreenEl.setAttribute("class", "hide");
    //unhide questions
    quizQuestion.removeAttribute("class");
    //start timer
    timerId = setInterval(clockTick, 1000);
    //show the time
    timerEl.textContent = time;

    getQuestion()
}

function getQuestion(){
    //get our current question
    var currentQuestion = questions[currentQuestionIndex];
    //update html with current question
    quizQuestion.textContent = currentQuestion.question;
    //clear out old choices
    quizQuestionBtns.innerHTML = "";
    //loop over choices
    currentQuestion.choices.forEach(function(choice, i){
        //create a new button
        var choiceNode = document.createElement("button");
        choiceNode.setAttribute("class", "choice");
        choiceNode.setAttribute("value", "choice");
        choiceNode.textContent = i+1 + ". " + choice;

        //attahc a click event listener
        choiceNode.onclick = questionClick;

        //display the button to the page
        quizQuestionBtns.appendChild(choiceNode);
    })
}

function questionClick(){
    //check if the user is wrong
    if(this.value !== questions[currentQuestionIndex].answer){
        //penalize time
        time -= 15;
        if(time < 0){
            time = 0;
        }
        //display new time to html
        timerEl.textContent = time;
        alert("This is the wrong choice");
    } else {
        alert("This is correct!")
    }

    //move on to the next question
    currentQuestionIndex++;

    //check to make sure we still have questions
    if(currentQuestionIndex === questions.length){
        quizEnd();
    } else {
        getQuestion();
    }
}

function quizEnd(){
    //stop timer
    clearInterval(timerId);
    //show your end

    //show the users final score

    //hide questions again
    quizQuestion.setAttribute("class", "hide");
}

function clockTick(){
    //update time
    time--;
    timerEl.textContent = time;
    //check if use ran out of time
    if(time <= 0){
        quizEnd();
    }
}

//save high score function

//set up click functions here
start.onclick = startQuiz;