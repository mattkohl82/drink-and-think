var fetchChoice = "";
$("#dropdown").change(function(){
    var selected = $(this).val(); //get selected option
    $("#response-container").empty();
    $("iframe").attr("src","about:blank").attr("style","display:none");
    if (selected === "1") {//Ingredient 
        $("#searchTerm").val("");
        $("#searchBtn").on("click", function() {
            $("iframe").attr("src","about:blank").attr("style","display:none");
            const searchTerm = document.querySelector("#searchTerm").value;
            ingredientSearch(searchTerm);//run drink name search function
        });
    }
    if (selected === "2") {//Drink name
        $("#searchTerm").val("");
        $("#searchBtn").on("click", function() {
            $("iframe").attr("src","about:blank").attr("style","display:none");
            const searchTerm = document.querySelector("#searchTerm").value;
            drinkSearch(searchTerm);//run drink name search function
            //console.log(searchTerm)
            getVideo(searchTerm, 'drinks');
        });
    }
});
var drinkData = "";
function ingredientSearch(searchTerm) {
    //const searchTerm = document.querySelector("#searchTerm").value;
    //console.log(searchTerm)
    fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=' + searchTerm)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        console.log(data)
        $("#response-container").empty();//clears last searched recipe
        if (data.drinks.length > 1){
            //show the user all of the drinks
            drinkData = data.drinks[i]
            for (var i = 0; i < data.drinks.length; i++) {
                var drinkName = data.drinks[i].strDrink;
                var drinkPic = data.drinks[i].strDrinkThumb;
                console.log (data.drinks[i].strDrink)
                showDrinks(drinkName, drinkPic);
            }
            //make them selectable, whichever one they choose should return a number for that meals' position in the data.drinks array
            //the number returned should be used to set drinkData, see next line
            //drinkData = data.drinks[x]   where x relates to whichever meal they clicked
        } else if (data.drinks.length == 1) {
            drinkData = data.drinks[0]
        } else {
            //have the user retry because their search did not return a result
        }
    });
}
function showDrinks(drinkName, drinkPic) {
    var searchResult = $("<li>").addClass().text(drinkName);
    var img =  $("<img>").attr("src", drinkPic).attr('id', 'drinkPic').click(function() {
        var searchTerm = drinkName
        drinkSearch(searchTerm);
        getVideo(searchTerm, 'drinks');
    });
    $("#response-container").append(searchResult);
    $("#response-container").append(img);
}
function drinkSearch(searchTerm) {
    $("#response-container").empty();//clears last searched recipe
    //console.log(data)
    //console.log(data.meals[0])
    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + searchTerm)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
    drinkData = data.drinks[0]//TO DO:define this var in the if/else if/else appropriately
    var ingredients = [];
    var measurements = [];
    //create object from JSON where ingredients are listed
    //console.log(mealData);
    var drinkName = $("<h1>").text(data.drinks[0].strDrink);
    var ingredientsTitle = $("<h3>").text("Ingredients")
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
    var instructions = $("<p>").text(data.drinks[0].strInstructions);
    $("#response-container").append(instructions)
    });
}
function getVideo(searchTerm) {
    $.ajax({
    type: 'GET',
    url: 'https://www.googleapis.com/youtube/v3/search',
    data: {
        key: 'AIzaSyCXrLm90ax9VG8A7XtCk5gfbB_UD-vOqi4',
        q: searchTerm + 'drinks',//this can be used if no video provided in array
        //q: videoID,
        part: 'snippet',
        maxResults: 1,
        type: 'video',
        videoEmbeddable: true,
    },
    success: function(data){
        embedVideo(data)
        console.log(data);
    },
    error: function(response){
        console.log("Request Failed");
    }
});
}
function embedVideo(data) {
    $('iframe').attr('src', 'https://www.youtube.com/embed/' + data.items[0].id.videoId).show()
    //$('h3').text(data.items[0].snippet.title).show() to show title snippet
    //$('.description').text(data.items[0].snippet.description).show() to show description snippet
}
//getVideo();

