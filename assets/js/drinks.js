//const APIKey = "1";
//video is not showing if you switch to drink search after using the ingredient serach
var fetchChoice = "";
$("#dropdown").change(function(){
    $("#searchTerm").val("");
    $("#response-container").empty();
    //$("#video-container").hide();
    $("iframe").attr("src","about:blank").attr("style","display:none");
    var selected = $(this).val(); //get selected option
    if (selected === "1") {//Ingredient search
        $("#searchBtn").on("click", function() {
            const searchTerm = document.querySelector("#searchTerm").value;
            ingredientSearch(searchTerm);//run ingredient search function
            //console.log(searchTerm)
        });
    }    
    if (selected === "2") {//Drink name
        $("#searchBtn").on("click", function() {
            const searchTerm = document.querySelector("#searchTerm").value;
            drinkSearch(searchTerm);//run ingredient search function
            //console.log(searchTerm)
        });
    }
});
function ingredientSearch(searchTerm) {
    //hide video
    fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i='+ searchTerm)
        
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        $("#response-container").empty();
        //$("#video-container").hide();
        $("iframe").attr("src","about:blank").attr("style","display:none");
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
    var searchResult = $("<li>").addClass().text(drinkType);
    var img =  $("<img>").attr("src", drinkPic).attr('id', 'drinkPic').click(function() {
        var searchTerm = drinkType
        drinkSearch(searchTerm);
    });
    $("#response-container").append(searchResult);
    $("#response-container").append(img);
}

//search by drink name
function drinkSearch(searchTerm) {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s='+ searchTerm)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        $("#response-container").empty();//clears last searched recipe
        //$("iframe").attr("src","about:blank").attr("style","display:none");
        var drinkData = "";
            /* 
            //make them selectable, whichever one they choose should return a number for that drinks' position in the data.drinks array
            //the number returned should be used to set drinkData, see next line
            //drinkData = data.drinks[x]   where x relates to whichever drink they clicked
        } else if (data.drinks.length == 1) {
            //drinkData = data.drinks[0]
        } else {
            //have the user retry because their search did not return a result
        }*/
        console.log(data)
        //console.log(data.drinks[0])
        drinkData = data.drinks[0]//TO DO:define this var in the if/else if/else appropriately
        var ingredients = [];
        var measurements = [];
        //create object from JSON where ingredients are listed
        var drinkName = $("<h1>").addClass().text(data.drinks[0].strDrink);
        var ingredientsTitle = $("<h3>").addClass().text("Ingredients")
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
            let line = $("<li>").text(meas + " " + ing)
            $("#response-container").append(line)
        }
        var instructions = $("<p>").addClass().text(data.drinks[0].strInstructions);
        $("#response-container").append(instructions)
    });
}
