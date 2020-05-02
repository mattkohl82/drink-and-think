//Generate API Key based on options user selects
    //get number of questions selected to put in APIUrl
    $("#trivia-questions").on("input", function(){
        var selectedAmount = $(this).val();
        console.log("number of questions - " + selectedAmount);
    });
    //get value of category selected to put in APIUrl
    $('[name="trivia-category"]').change(function(){
        var selectedCategory = $(this).children("option:selected").val();
        console.log("category value - " + selectedCategory);
    });
    //get value of difficulty selected to put in APIUrl
    $('[name="trivia-difficulty"]').change(function(){
        var selectedDifficulty = $(this).children("option:selected").val();
        console.log("difficulty - " + selectedDifficulty);
    });