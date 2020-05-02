
var selectedAmount;
var selectedCategory;
var selectedDifficulty;
const question = document.getElementById("question");
const choices = Array.from($(".choice-text"));
console.log(choices)
let currentQuestion = {};
let questionCounter = 0;
let availableQuestions = [];

let questions = [];
$("#game-container").hide();
//Build Game Parameters
//get number of questions selected to put in APIUrl
$("#trivia-questions").on("input", function(){
    selectedAmount = $(this).val();
    //console.log("number of questions - " + selectedAmount);
});
//get value of category selected to put in APIUrl
$('[name="trivia-category"]').change(function(){
    selectedCategory = ('&category=' + $(this).children("option:selected").val());
    //console.log("category value - " + selectedCategory);
});
//get value of difficulty selected to put in APIUrl
$('[name="trivia-difficulty"]').change(function(){
    selectedDifficulty = ('&difficulty=' + $(this).children("option:selected").val());
    //console.log("difficulty - " + selectedDifficulty);
//});
    //Generate API Key based on options user selects
    //if both random category and random is selected: each question will be a random category/level of difficulty
    if (selectedCategory === "&category=any" && selectedDifficulty === "&difficulty=any") {
        fetch('https://opentdb.com/api.php?amount=' + selectedAmount + '&type=multiple')
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            
            console.log(data.results);
            //convert questions from array to new form
            //var results = JSON.parse(data.results.replace(/&quot;/g,'"'));
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
            /*$("#playBtn").on("click", function(e) {
                e.preventDefault();
                startGame();
            });*/
        })
    // if only random category is selected
    } else if (selectedCategory === "&category=any") {
        fetch('https://opentdb.com/api.php?amount=' + selectedAmount + selectedDifficulty + '&type=multiple')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data.results);
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
            /*$("#playBtn").on("click", function(e) {
                    e.preventDefault();
                    startGame();
                });*/
    })
    // if only random difficulty is selected
    } else if (selectedDifficulty === "&difficulty=any") {
        fetch('https://opentdb.com/api.php?amount=' + selectedAmount + selectedCategory + '&type=multiple')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            
            console.log(data.results);
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
            /*$("#playBtn").on("click", function(e) {
                e.preventDefault();
                startGame();
            });*/
        })
    //if all options selected other than random
    } else {
        fetch('https://opentdb.com/api.php?amount=' + selectedAmount + selectedCategory + selectedDifficulty + '&type=multiple')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data.results);
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
            /*$("#playBtn").on("click", function(e) {
                e.preventDefault();
                startGame();
            });*/
        })
    }
});
/*$("#playBtn").on("click", function(e) {
    e.preventDefault();
    $("#game-container").show();
    startGame();
});*/

