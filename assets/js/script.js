// const question = document.querySelector('#quesiton')

console.log("show something!")

const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');
const timing = document.querySelector('#time')
const incorrectAnswer = document.querySelectorAll('.incorrect')
const selectedAnswer = ""
const selectedChoice = ""
var classToApply = ""


let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []


//Questions listed below

var questions = [
    {
    question: "JavaScript is a ___ -side programming language.",
    choice1: "Client",
    choice2:"Server",
    choice3:"Both",
    choice4: "None",
    answer: 3,
     },
    {
    question: "Which of the following will write the message “Hello DataFlair!” in an alert box?",
    choice1:  "alertBox(“Hello DataFlair!”);",
    choice2:  "alert(Hello DataFlair!);",
    choice3:  "msgAlert(“Hello DataFlair!”);",
    choice4:  "alert(“Hello DataFlair!”);",
    answer: 4,
    
  },
    {
    question: "Which are the correct “if” statements to execute certain code if “x” is equal to 2?",
    choice1:  "if(x 2)",
    choice2:  "if(x = 2)",
    choice3:  "if(x == 2)",
    choice4:  "if(x != 2 )",
    answer: 3,
    
  },
    {
    question: "Which is the correct JavaScript syntax to change the HTML content given below?",
    choice1:  "document.getElementById(“test”).innerHTML = “Hello DataFlair!”;",
    choice2:  "document.getElementsById(“test”).innerHTML = “Hello DataFlair!”;",
    choice3:  "document.getElementById(test).innerHTML = “Hello DataFlair!”;",
    choice4:  "document.getElementByTagName(“p”)[0].innerHTML = “Hello DataFlair!”;",
    answer: 1,
    
  },
    {
    question: "What is the correct JavaScript syntax to print “DataFlair” in the console?",
    choice1:  "print(“DataFlair”);",
    choice2:  "console.print(“DataFlair”);",
    choice3:  "log.console(“DataFlair”);",
    choice4:  "console.log(“DataFlair”);",
    answer: 4,
    
  },
]

//every time an answer is correct +100 points
const SCORE_POINTS = 100
// sets max number of questions for question counter
const MAX_QUESTIONS = 5

startGame = () => {

    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

//If there are no more questions, redirect to results page to enter highscore

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('../../assets/results/results.html')
    }

// question counter - lists current question out of total amount of questions ex: 1 out of 5
    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}


//Lists choice options, and also turns selected answer green = corrext / red = incorrect

choices.forEach(choice => {
    choice.addEventListener('click', e => {

        if(!acceptingAnswers) return

        
        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        var classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }
        
        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout (() => {
           selectedChoice.parentElement.classList.remove(classToApply)
           getNewQuestion()
        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}




//timer

(function  () {
    var sec = 60;
    function startTimer(){
        console.log('timer suppose to go')
        var timer = setInterval(function(){
            sec--;
            timing.innerHTML='00:'+sec;
            if (sec < 0) {
                clearInterval(timer);
                alert("Time is up!")
                window.location.assign('../../assets/results/results.html');
            }
             
        }, 1000);

    }


    //Cannot get time -10 seconds on wrong answer to work ???

    // document.querySelector('#game, .choice-text').addEventListener('click', userChoice)
    
    // var userChoice = currentQuestion.answer != 'correct'
    // if (userChoice){  
    //     sec-=10;
    //     timing.innerHTML='00:'+sec;
    // };

    startTimer();
})();

//declaring the game to run
startGame()
