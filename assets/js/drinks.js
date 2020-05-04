$("#searchBtn1").on("click", function() {
    $("#searchTerm").val("");
    //$("#response-container").empty();
const searchTerm = document.querySelector("#searchTerm1").value;;
drinkSearch(searchTerm);
});
$("#searchBtn2").on("click", function() {
    $("#searchTerm").val("");
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
        $("#response-container").empty();
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

// //display recipe name and picture based on ingredient search
// function showDrinks(drinkType, drinkPic) {
//     var div = $('<div class="response-drinks">');
//     var searchResult = $('<h3 class="" id="drink-type">').text(drinkType);
//     var img =  $('<img class="imgIng">').attr("src", drinkPic).attr('id', 'drinkPic').click(function() {
//         var searchTerm = drinkType
//         drinkSearch(searchTerm);
//         $("#response-container").append(div);
//         $(".response-drinks").append(searchResult, img);
//     });
//     $("#response-container").append(div);
//     $(".response-drinks").append(searchResult);
//     $(".response-drinks").append((img));
// }

//display recipe name and picture based on ingredient search
function showDrinks(drinkType, drinkPic) {
    var contResults = $("<div>").addClass("drink-card");
    //var div = $('<div class="response-drinks">');
    var searchResult = $('<p class="" id="drink-type">').text(drinkType);
    var img =  $('<img class="imgIng">').attr("src", drinkPic).attr('id', 'drinkPic').click(function() {
        var searchTerm = drinkType
        drinkSearch(searchTerm);
        //$("#response-container").append(div);
        //$("#response-drinks").append(searchResult, img);
        
    });
    contResults.append(searchResult, img);
    $("#response-container").append(contResults);
    //$("#response-container").append(div);
    //$(".response-drinks").append(searchResult);
    //$(".response-drinks").append((img));
}




//search by drink name
function drinkSearch(searchTerm) {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s='+ searchTerm)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        $("#response-container").empty();//clears last searched recipe
        var drinkData = "";
            console.log(data)
        //     make them selectable, whichever one they choose should return a number for that drinks' position in the data.drinks array
        //     the number returned should be used to set drinkData, see next line
        //     drinkData = data.drinks[x]   where x relates to whichever drink they clicked
        // } else if (data.drinks.length == 1) {
        //     drinkData = data.drinks[0]
        // } else {
        //     have the user retry because their search did not return a result
        // }

        drinkData = data.drinks[0]//TO DO:define this var in the if/else if/else appropriately
        var ingredients = [];
        var measurements = [];

        //create object from JSON where ingredients are listed
        var drinkName = $("<h1 class='drink-name'>").text(data.drinks[0].strDrink);
        var ingredientsTitle = $("<h3 class='ingredients-title'>").text("Ingredients")
        var img =  $("<img>").attr("src", data.drinks[0].strDrinkThumb).attr('id', 'drinkPic')
        
        
        $("#response-container").append(img);
        $("#response-container").append(drinkName);
        $("#response-container").append(ingredientsTitle);
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
            let line = $("<li class='ingredient-list'>").text(meas + " " + ing)
            $("#response-container").append(line)
        }
        var instructions = $("<p class='drink-intructions'>").addClass().text(data.drinks[0].strInstructions);
        $("#response-container").append(instructions)
    });
}