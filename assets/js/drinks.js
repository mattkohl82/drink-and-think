$(document).ready(function(){

    $("input").on("click", function() {
        $("#searchTerm1").val("");
        $("#searchTerm2").val("");
    });
    $("#searchBtn1").on("click", function() {
        $("#searchTerm2").val("");
        $("#response-container").empty();
        //$("input").empty();
    const searchTerm = document.querySelector("#searchTerm1").value;;
    drinkSearch(searchTerm);
    });
    $("#searchBtn2").on("click", function() {
        $("#searchTerm1").val("");
        $("#response-container").empty();


    const searchTerm = document.querySelector("#searchTerm2").value;;
    ingredientSearch(searchTerm);
    });


    function ingredientSearch(searchTerm) {
        console.log(searchTerm)
        fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i='+ searchTerm)
            
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data)
            $("#response-container-2").empty();
            var drinkData = "";
            if (data.drinks.length > 1){
                drinkData = data.drinks[i]
                //show the user all of the drinks
                for (var i = 0; i < data.drinks.length; i++) {// display each drink stored in local storage
                    var drinkType = data.drinks[i].strDrink;
                    var drinkPic = data.drinks[i].strDrinkThumb;
                    console.log (data.drinks[i].strDrink)
                    showDrinks(drinkType, drinkPic);
                }
            }
        })
    }

    //display recipe name and picture based on ingredient search
    function showDrinks(drinkType, drinkPic) {
        var contResults = $("<div>").addClass("drink-card");
        //var div = $('<div class="response-drinks">');
        var searchResult = $('<p class="drink-type" id="drink-type">').text(drinkType);
        var img =  $('<img class="imgIng">').attr("src", drinkPic).attr('id', 'drinkPic').click(function() {
            var searchTerm = drinkType
            drinkSearch(searchTerm);
            //$("#response-container").append(div);
            //$("#response-drinks").append(searchResult, img);
            
        });
        contResults.append(img, searchResult);
        $("#response-container").append(contResults);
    }


    //search by drink name
    function drinkSearch(searchTerm) {
    
        fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s='+ searchTerm)
        .then((response) => {
                return response.json();
        })
        .then((data) => {
            $("#response-container").empty();
            $("#response-container-2").empty();
            //clears last searched recipe
            $(".search").empty();
            var drinkData = "";
                console.log(data)
            //var resultsArray = [data];
                console.log(data.drinks)
            if (data.drinks == null) {
                //advise user their search did not return results and offer a random drink recipe
                console.log("array is empty/null")
                fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    drinkData = data.drinks[0]
                    var ingredients = [];
                    var measurements = [];
                    //create object from JSON where ingredients are listed
                    var drinkName = $("<h1>").addClass("recipe-text").text(data.drinks[0].strDrink);
                    var ingredientsTitle = $("<h3>").addClass("recipe-text").text("Ingredients")
                    var img =  $("<img>").attr("src", data.drinks[0].strDrinkThumb).attr('id', 'drinkPic')
                    var directionsTitle = $("<h3>").addClass("recipe-text").text("Directions")
                    var triviaBtn = $("<button>").addClass("btn grey").text("Trivia Time!")
                    
                    $("#response-container-2").append("<p>").addClass("drink-instructions recipe-text").text("We're sorry we couldn't what you were looking for. Please try a new search or this drink instead!")     
                    $("#response-container-2").append(drinkName);
                    $("#response-container-2").append(img);
                    $("#response-container-2").append(ingredientsTitle);
                    
                    //iterate over each key/value in dictionary
                    Object.entries(drinkData).forEach(([key, value]) => {
                        if (value === "" || value === null) {
                            //do nothing
                            //this code skips over null values !== logic will not work
                        } else {//if it has a value
                            //if the item is an ingredient
                            if (key.startsWith("strMeasure")) {
                                    // add measurement to array
                                    measurements.push(value)
                            }
                            if (key.startsWith("strIngredient")) {
                                // add ingredient to array 
                                ingredients.push(value)
                            }
                        }
                    });
                    // display list with measurement and  ingredient 
                    for (var i = 0; i < ingredients.length; i++) {
                        var meas = measurements[i];
                        var ing = ingredients[i];
                        let line = $("<li>").addClass("drink-instructions recipe-text").text(meas + " " + ing)
                        $("#response-container-2").append(line)
                    }
                    $("#response-container-2").append(directionsTitle);
                    var instructions = $("<p>").addClass("drink-instructions recipe-text").text(data.drinks[0].strInstructions);
                    //$(instructions).text().replace(/\.\s/g, '.<br>');
                    $("#response-container-2").append(instructions);
                    $(".search").append(triviaBtn).on('click', function(){
                        window.location = "./trivia.html";    
                    });
                });
                
            } else {
                console.log("array is not empty");
                drinkData = data.drinks[0]
                var ingredients = [];
                var measurements = [];

                //create object from JSON where ingredients are listed
                var drinkName = $("<h1>").addClass("recipe-text").text(data.drinks[0].strDrink);
                    var ingredientsTitle = $("<h3>").addClass("recipe-text").text("Ingredients")
                    var img =  $("<img>").attr("src", data.drinks[0].strDrinkThumb).attr('id', 'drinkPic')
                    var directionsTitle = $("<h3>").addClass("recipe-text").text("Directions")
                    var triviaBtn = $("<button>").addClass("btn grey").text("Trivia Time!")
                            
                $("#response-container-2").append(drinkName);
                $("#response-container-2").append(img);
                $("#response-container-2").append(ingredientsTitle);
                
                //iterate over each key/value in dictionary
                Object.entries(drinkData).forEach(([key, value]) => {
                    if (value === "" || value === null) {
                        //do nothing
                        //this code skips over null values !== logic will not work
                    } else {//if it has a value
                        //if the item is an ingredient
                        if (key.startsWith("strMeasure")) {
                                // add measurement to array
                                measurements.push(value)
                        }
                        if (key.startsWith("strIngredient")) {
                            // add ingredient to array 
                            ingredients.push(value)
                        }
                    }
                });
                // display list with measurement and  ingredient 
                for (var i = 0; i < ingredients.length; i++) {
                    var meas = measurements[i];
                    var ing = ingredients[i];
                    let line = $("<li>").addClass("drink-instructions recipe-text").text(meas + " " + ing)
                    $("#response-container-2").append(line)
                }
                $("#response-container-2").append(directionsTitle);
                var instructions = $("<p>").addClass("drink-intructions").text(data.drinks[0].strInstructions);
                $('p').html($('p').text().replace('.', '.<br>'));
                $("#response-container-2").append(instructions);
                $(".search").append(triviaBtn).on('click', function(){
                    window.location = "./trivia.html";    
                });
                
            }
            
        });
    }
});