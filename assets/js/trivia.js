//Generate API Key based on options user selects
var selectedAmount;
var selectedCategory;
var selectedDifficulty;

//get number of questions selected to put in APIUrl
$("#trivia-questions").on("input", function(){
    selectedAmount = $(this).val();
    console.log("number of questions - " + selectedAmount);
});
//get value of category selected to put in APIUrl
$('[name="trivia-category"]').change(function(){
    selectedCategory = ('&category=' + $(this).children("option:selected").val());
    console.log("category value - " + selectedCategory);
});
//get value of difficulty selected to put in APIUrl
$('[name="trivia-difficulty"]').change(function(){
    selectedDifficulty = ('&difficulty=' + $(this).children("option:selected").val());
    console.log("difficulty - " + selectedDifficulty);
});

$("#playBtn").on("click", function(e) {
    e.preventDefault();
    console.log("play button was clicked")
    //console.log('https://opentdb.com/api.php?amount=' + selectedAmount + selectedCategory + selectedDifficulty + '&type=multiple')
    //fetch('https://opentdb.com/api.php?amount=' + selectedAmount + selectedCategory + selectedDifficulty + '&type=multiple')
    //if both random category and random is selected: each question will be a random category/level of difficulty
    if (selectedCategory === "&category=any" && selectedDifficulty === "&difficulty=any") {
        fetch('https://opentdb.com/api.php?amount=' + selectedAmount + '&type=multiple')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
        })
    // if only random category is selected
    } else if (selectedCategory === "&category=any") {
        fetch('https://opentdb.com/api.php?amount=' + selectedAmount + selectedDifficulty + '&type=multiple')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
        console.log(data);
    })
    // if only random difficulty is selected
    } else if (selectedDifficulty === "&difficulty=any") {
        fetch('https://opentdb.com/api.php?amount=' + selectedAmount + selectedCategory + '&type=multiple')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
        })
    //if all options selected other than random
    } else {
        fetch('https://opentdb.com/api.php?amount=' + selectedAmount + selectedCategory + selectedDifficulty + '&type=multiple')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
        })
    }
});