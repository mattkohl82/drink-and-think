var selectedAmount;
var selectedCategory;
var selectedDifficulty;
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
let currentQuestion = {};
let questionCounter = 0;
let availableQuestions = [];

let questions = [];
//$("#game-container").hide();
//Build Game Parameters
//get number of questions selected to put in APIUrl
$("#trivia-questions").on("input", function(){
    selectedAmount = $(this).val();
});
//get value of category selected to put in APIUrl
$('[name="trivia-category"]').change(function(){
    selectedCategory = ('&category=' + $(this).children("option:selected").val());
});
//get value of difficulty selected to put in APIUrl
$('[name="trivia-difficulty"]').change(function(){
    selectedDifficulty = ('&difficulty=' + $(this).children("option:selected").val());
//});
    //Generate API Key based on options user selects
    //if both random category and random is selected: each question will be a random category/level of difficulty
    if (selectedCategory === "&category=any" && selectedDifficulty === "&difficulty=any") {
        fetch('https://opentdb.com/api.php?amount=' + selectedAmount + '&type=multiple')
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            //console.log(data.results);
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
        fetch('https://opentdb.com/api.php?amount=' + selectedAmount + selectedDifficulty + '&type=multiple')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            //console.log(data.results);
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
        fetch('https://opentdb.com/api.php?amount=' + selectedAmount + selectedCategory + '&type=multiple')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            //console.log(data.results);
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
        fetch('https://opentdb.com/api.php?amount=' + selectedAmount + selectedCategory + selectedDifficulty + '&type=multiple')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            //console.log(data.results);
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
});
// start game when play button is clicked
$("#playBtn").on("click", function(e) {
    e.preventDefault();
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
    if (availableQuestions.length === 0 || questionCounter >= selectedAmount) {
        //save score to local storage
        localStorage.setItem("mostRecentScore", totalScore);
        //go to the end to have user enter initials
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
            //console.log("correct answer selcted, total score "+ totalScore);
        } else {
            //console.log("wrong answer selcted, total score "+ totalScore);
            if(timeLeft >= 15) {
                timeLeft -= 15;
            } else {
                timeLeft = 0;
            }
            if(totalScore >= 5) {
                totalScore -= 5;
                //console.log("total score "+ totalScore);
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
}