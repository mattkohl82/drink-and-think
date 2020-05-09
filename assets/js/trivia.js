//USE THIS CODE WHEN API IS RESTORED

var selectedAmount;
var selectedCategory;
var selectedDifficulty;
var mainPage = "start";
var timeLeft = 120;
var totalScore = 0;
const timerEl = document.getElementById("countdown");
const timerElzero = document.getElementById("countdown-0");
const scoreText = document.getElementById("score");
const question = document.getElementById("question");
const triviaEl = document.getElementById("game-container");
const gameEl = document.getElementById("game");
const choices = Array.from($(".choice-text"));
const numberQ = document.getElementById("trivia-questions");
const playBtn = document.getElementById("playBtn")
const scorePage = document.getElementById("score-container");
const displayScoreVal = document.getElementById("total-score");
const submitScore = document.getElementById("submit-btn");
const initials = document.getElementById("initials");
const initialsEntered = document.getElementById("initials-entered");
var highScores = JSON.parse(localStorage.getItem("highScores")) || []; // get the score, or the initial value if empty 
const MAX_HIGH_SCORES = 5;
let currentQuestion = {};
let questionCounter = 0;
let availableQuestions = [];

let questions = [];

// mobile nav
$(document).ready(function() {
    $(".sidenav").sidenav();
});
//change navbar to solid on scroll
$(window).scroll(function() {
	$("nav").toggleClass("scrolled", $(this).scrollTop() > 50);
});


//Build Game Parameters
    //get number of questions selected to put in APIUrl  
    $("#trivia-questions").on("input", function() {
        selectedAmount = $(this).val();
    });
    //get value of category selected to put in APIUrl
    $('[name="trivia-category"]').change(function() {
        selectedCategory = ("&category=" + $(this).children("option:selected").val());
    });
    //get value of difficulty selected to put in APIUrl
    $('[name="trivia-difficulty"]').change(function(){
        selectedDifficulty = ("&difficulty=" + $(this).children("option:selected").val());
        $("#playBtn").prop("disabled", false);
    });
//disable play button unless number of questions is entered, category selected, AND difficulty selected
$(function() {
    
    $(".options").on("keyup change", function() {
        if ($("#trivia-questions").val() == "" || $("#trivia-category").val() == "" || $("#trivia-difficulty").val() == "") {
            $("#playBtn").prop("disabled", true);
    } else {
        buildArray();
        //$("#playBtn").prop("disabled", false);
    }
    });
});

function buildArray () {
    //Generate API Key based on options user selects
    //if both random category and random is selected: each question will be a random category/level of difficulty
    if (selectedCategory === "&category=any" && selectedDifficulty === "&difficulty=any") {
        fetch("https://opentdb.com/api.php?amount=" + selectedAmount + "&type=multiple")
        .then((response) => {
            if (!response.ok) {
            //disable play button unless array builds for game
            $("#playBtn").prop("disabled", true);
            } else {
                $("#playBtn").prop("disabled", false);
                return response.json()
            }
        })
        .then((data) => {
            //convert questions from array to new form
            questions = data.results.map(currQuestion => {
                //get each individual question change to format needed to display in game
                const formattedQuestion = {
                    question: currQuestion.question
                };
                //get the 3 incorrect answers from array 
                const answerChoices = [ ... currQuestion.incorrect_answers];
                //put correct answer in random position
                formattedQuestion.answer = Math.floor(Math.random() * 3) + 1;
                answerChoices.splice(
                    formattedQuestion.answer - 1,
                    0, //don't remove any element
                    currQuestion.correct_answer //correct answer
                );
                //iterate through answer choices and make them Choice 1-4
                answerChoices.forEach((choice, index) => {
                    formattedQuestion["choice" + (index + 1)] = choice;
                });
                //
                return formattedQuestion;
            });
        })
    // if only random category is selected
    } else if (selectedCategory === "&category=any") {
        fetch("https://opentdb.com/api.php?amount=" + selectedAmount + selectedDifficulty + "&type=multiple")
        .then((response) => {
            if (!response.ok) {
            //disable play button unless array builds for game
            $("#playBtn").prop("disabled", true);
            } else {
                $("#playBtn").prop("disabled", false);
                return response.json()
            }
        })
        .then((data) => {;
            questions = data.results.map(currQuestion => {
                //get each individual question change to format needed to display in game
                const formattedQuestion = {
                    question: currQuestion.question
                };
                //get the 3 incorrect answers from array 
                const answerChoices = [ ... currQuestion.incorrect_answers];
                //put correct answer in random position
                formattedQuestion.answer = Math.floor(Math.random() * 3) + 1;
                answerChoices.splice(
                    formattedQuestion.answer - 1,
                    0, //don't remove any element
                    currQuestion.correct_answer //correct answer
                );
                //iterate through answer choices and make them Choice 1-4
                answerChoices.forEach((choice, index) => {
                    formattedQuestion["choice" + (index + 1)] = choice;
                });
                //
                return formattedQuestion;
            });
    })
    // if only random difficulty is selected
    } else if (selectedDifficulty === "&difficulty=any") {
        fetch("https://opentdb.com/api.php?amount=" + selectedAmount + selectedCategory + "&type=multiple")
        .then((response) => {
            //disable play button unless array builds for game
            if (!response.ok) {
            $("#playBtn").prop("disabled", true);
            } else {
                $("#playBtn").prop("disabled", false);
                return response.json()
            }
        })
        .then((data) => {
            questions = data.results.map(currQuestion => {
                //get each individual question change to format needed to display in game
                const formattedQuestion = {
                    question: currQuestion.question
                };
                //get the 3 incorrect answers from array 
                const answerChoices = [ ... currQuestion.incorrect_answers];
                //put correct answer in random position
                formattedQuestion.answer = Math.floor(Math.random() * 3) + 1;
                answerChoices.splice(
                    formattedQuestion.answer - 1,
                    0, //don't remove any element
                    currQuestion.correct_answer //correct answer
                );
                //iterate through answer choices and make them Choice 1-4
                answerChoices.forEach((choice, index) => {
                    formattedQuestion["choice" + (index + 1)] = choice;
                });
                //
                return formattedQuestion;
            });
        })
    //if all options selected other than random
    } else {
        fetch("https://opentdb.com/api.php?amount=" + selectedAmount + selectedCategory + selectedDifficulty + "&type=multiple")
        .then((response) => {
            //disable play button unless array builds for game
            if (!response.ok) {
            $("#playBtn").prop("disabled", true);
            } else {
                $("#playBtn").prop("disabled", false);
                return response.json()
            }
        })
        .then((data) => {
            questions = data.results.map(currQuestion => {
                //get each individual question change to format needed to display in game
                const formattedQuestion = {
                    question: currQuestion.question
                };
                //get the 3 incorrect answers from array 
                const answerChoices = [ ... currQuestion.incorrect_answers];
                //put correct answer in random position
                formattedQuestion.answer = Math.floor(Math.random() * 3) + 1;
                answerChoices.splice(
                    formattedQuestion.answer - 1,
                    0, //don't remove any element
                    currQuestion.correct_answer //correct answer
                );
                //iterate through answer choices and make them Choice 1-4
                answerChoices.forEach((choice, index) => {
                    formattedQuestion["choice" + (index + 1)] = choice;
                });
                return formattedQuestion;
            });
        })
    }
//});
}
// start game when play button is clicked
$("#playBtn").on("click", function(e) {
    e.preventDefault();
    document.getElementById(mainPage).style.display = "none";
    triviaEl.classList.remove("hide");
    //$("#game-container").show();
    playGame();
});
//convert html Characters in array back to text before displaying
function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}
// start game with score reset to 0
// if timer runs out 
playGame = () => {
    totalScore = 0;
    availableQuestions = [...questions];
    
    var timeInterval = setInterval(function () {
        timeLeft--;
        timerEl.textContent = timeLeft;

    if (timeLeft <= 0) {
            clearInterval(timeInterval);
            displayScoreVal.textContent = totalScore;
            endGame();
        }
    }, 1000);
getQuestion();
};
getQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= selectedAmount) {
        //save score to local storage
        localStorage.setItem("mostRecentScore", totalScore);
        //go to the end to have user enter initials
        displayScoreVal.textContent = totalScore;
        endGame();
    } else {
    //display question and answer choices
    questionCounter++;
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    var questionInput = currentQuestion.question;
    var questionOutput = decodeHtml(questionInput);
    question.innerText = questionOutput;
    
    choices.forEach(choice => {
        const number = choice.dataset["number"];
        var answerInput = currentQuestion["choice" + number]
        var answerOutput = decodeHtml(answerInput);
        choice.innerText = answerOutput;
        });
    
        availableQuestions.splice(questionIndex, 1);
        acceptingAnswers = true;
    }   
};
//add 10 points if correct answer selected, remove 5 points and 15 seconds if wrong answer selected, show selected answer as red/green based on corrent/wrong  
choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if (!acceptingAnswers) return;
        acceptingAnswers = false;

        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        const answerStatus =
            selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
    
        if (answerStatus === "correct") {
            totalScore += 10;
        } else {
            if(timeLeft >= 15) {
                timeLeft -= 15;
            } else {
                timeLeft = 0;
            }
            if(totalScore >= 5) {
                totalScore -= 5;
            } else {
                totalScore = 0;
            }
        }
        scoreText.innerText = totalScore;
        selectedChoice.parentElement.classList.add(answerStatus);       
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(answerStatus);
            getQuestion();
        }, 1000);
    });
});

function endGame () {
    gameEl.classList.add("hide");
    scorePage.classList.remove("hide");

var mostRecentScore = localStorage.getItem("mostRecentScore");
    //disable submit button to prevent empty initials (user must enter something)
    initials.addEventListener("keyup", () => {
    submitScore.disabled = !initials.value
    });
    submitScore.addEventListener("click", function(e) {
        e.preventDefault();
        
        const score = {
            score: mostRecentScore,
            initials: initials.value
        };

            highScores.push(score);

            highScores.sort((a, b) => b.score - a.score); //sorts highscores in order
            highScores.splice(5); //keeps top 5 scores in highscore local storage
            
            localStorage.setItem("highScores", JSON.stringify(highScores));
            window.location.assign("highscores.html")
        //}
    });
}

/*
//THIS CODE IS FOR THE HARD CODED QUESTIONS ONLY WHEN API NOT WORKING
var selectedAmount;
var selectedCategory;
var selectedDifficulty;
var mainPage = 'start';
var timeLeft = 120;
var totalScore = 0;
const timerEl = document.getElementById("countdown");
const timerElzero = document.getElementById("countdown-0");
const scoreText = document.getElementById("score");
const question = document.getElementById("question");
const triviaEl = document.getElementById("game-container");
const gameEl = document.getElementById("game");
const choices = Array.from($(".choice-text"));
const scorePage = document.getElementById("score-container");
const displayScoreVal = document.getElementById("total-score");
const submitScore = document.getElementById("submit-btn");
const initials = document.getElementById("initials");
const initialsEntered = document.getElementById('initials-entered');
var highScores = JSON.parse(localStorage.getItem("highScores")) || []; // get the score, or the initial value if empty 
const MAX_HIGH_SCORES = 5;
let currentQuestion = {};
let questionCounter = 0;
let availableQuestions = [];
let acceptingAnswers = false;//
const MAX_QUESTIONS = 5;//

//$("#game-container").hide();
// mobile nav
$(document).ready(function() {
    $('.sidenav').sidenav();
});
//change navbar to solid on scroll
$(window).scroll(function() {
	$('nav').toggleClass('scrolled', $(this).scrollTop() > 50);
});
// start game when play button is clicked
$("#playBtn").on("click", function(e) {
    e.preventDefault();
    document.getElementById(mainPage).style.display = "none";
    triviaEl.classList.remove('hide');
    //$("#game-container").show();
    playGame();
});
//convert html Characters in array back to text before displaying
function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}
// start game with score reset to 0
// if timer runs out 
playGame = () => {
    questionCounter = 0;
    totalScore = 0;
    availableQuestions = [...questions];
    
    var timeInterval = setInterval(function () {
        timeLeft--;
        timerEl.textContent = timeLeft;

    if (timeLeft === 0) {
            clearInterval(timeInterval);
        }
    }, 1000);
getQuestion();
};
getQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        //save score to local storage
        localStorage.setItem("mostRecentScore", totalScore);
        //go to the end to have user enter initials
        displayScoreVal.textContent = totalScore;
        endGame();
    }
    //display question and answer choices
    questionCounter++;
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    var questionInput = currentQuestion.question;
    var questionOutput = decodeHtml(questionInput);
    question.innerText = questionOutput;
    
    choices.forEach(choice => {
        const number = choice.dataset["number"];
        var answerInput = currentQuestion["choice" + number]
        var answerOutput = decodeHtml(answerInput);
        choice.innerText = answerOutput;
        });
    
        availableQuestions.splice(questionIndex, 1);
        acceptingAnswers = true;
};
//add 10 points if correct answer selected, remove 5 points and 15 seconds if wrong answer selected, show selected answer as red/green based on corrent/wrong  
choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if (!acceptingAnswers) return;
        acceptingAnswers = false;

        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        const answerStatus =
            selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
    
        if (answerStatus === "correct") {
            totalScore += 10;
        } else {
            if(timeLeft >= 15) {
                timeLeft -= 15;
            } else {
                timeLeft = 0;
            }
            if(totalScore >= 5) {
                totalScore -= 5;
            } else {
                totalScore = 0;
            }
        }
        scoreText.innerText = totalScore;
        selectedChoice.parentElement.classList.add(answerStatus);       
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(answerStatus);
            getQuestion();
        }, 1000);
    });
});

function endGame () {
    gameEl.classList.add('hide');
    scorePage.classList.remove('hide');

var mostRecentScore = localStorage.getItem('mostRecentScore');

    submitScore.addEventListener('click', function(e) {
        e.preventDefault();
        
        const score = {
            score: mostRecentScore,
            initials: initials.value
        };
        if (initials.value === "") {
            //window.alert("Initials cannot be blank");
        } else {
            highScores.push(score);

            highScores.sort((a, b) => b.score - a.score); //sorts highscores in order
            highScores.splice(5); //keeps top 5 scores in highscore local storage
            
            localStorage.setItem("highScores", JSON.stringify(highScores));
            window.location.assign("highscores.html")
        }
    });
}
let questions = [
    {
        question: "Who was the first president of the United States?",
        choice1: "Abraham Lincoln",
        choice2: "George Washington",
        choice3: "Truman",
        choice4: "Thomas Jefferson",
        answer: 2
    },
    {
        question:
        "Which one is the largest animal in the world?",
        choice1: "Blue Whale",
        choice2: "Rhinoceros",
        choice3: "Hippopotamus",
        choice4: "Elephant",
        answer: 1
    },
    {
        question: "The planet near to the earth is?",
        choice1: "Mercury",
        choice2: "Jupiter",
        choice3: "Mars",
        choice4: "Saturn",
        answer: 3
    },
    {
        question: "The largest continent (Area wise) is?",
        choice1: "Asia",
        choice2: "Australia",
        choice3: "North America",
        choice4: "Africa",
        answer: 1
    },
    {
        question: "The USA consists of how many states?",
        choice1: "52",
        choice2: "50",
        choice3: "48",
        choice4: "53",
        answer: 2
    },
];
//END OF CODE FOR HARDCODED QUESTIONS WHEN API IS WORKING
*/

