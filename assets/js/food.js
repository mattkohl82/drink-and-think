//const APIKey = "1";
//video is not showing if you switch to meal search after using the ingredient serach
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
    if (selected === "2") {//Meal name
        $("#searchBtn").on("click", function() {
            const searchTerm = document.querySelector("#searchTerm").value;
            mealSearch(searchTerm);//run ingredient search function
            //console.log(searchTerm)
            getVideo(searchTerm);
        });
    }
});
function ingredientSearch(searchTerm) {
    //hide video
    fetch('https://www.themealdb.com/api/json/v1/1/filter.php?i='+ searchTerm)
        
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        $("#response-container").empty();
        //$("#video-container").hide();
        $("iframe").attr("src","about:blank").attr("style","display:none");
        var mealData = "";
        if (data.meals.length > 1){
            mealData = data.meals[i]
            //show the user all of the meals
            for (var i = 0; i < data.meals.length; i++) {// display each city stored in local storage
                var mealType = data.meals[i].strMeal;
                var mealPic = data.meals[i].strMealThumb;
                console.log (data.meals[i].strMeal)
                showMeals(mealType, mealPic);
            }
        }
    })
}
//display recipe name and picture based on ingredient search
function showMeals(mealType, mealPic) {
    var searchResult = $("<li>").addClass().text(mealType);
    var img =  $("<img>").attr("src", mealPic).attr('id', 'mealPic').click(function() {
        var searchTerm = mealType
        mealSearch(searchTerm);
        getVideo(searchTerm);
    });
    $("#response-container").append(searchResult);
    $("#response-container").append(img);
}

//search by meal name
function mealSearch(searchTerm) {
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s='+ searchTerm)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        $("#response-container").empty();//clears last searched recipe
        //$("iframe").attr("src","about:blank").attr("style","display:none");
        var mealData = "";
            /* 
            //make them selectable, whichever one they choose should return a number for that meals' position in the data.meals array
            //the number returned should be used to set mealData, see next line
            //mealData = data.meals[x]   where x relates to whichever meal they clicked
        } else if (data.meals.length == 1) {
            //mealData = data.meals[0]
        } else {
            //have the user retry because their search did not return a result
        }*/
        //console.log(data)
        //console.log(data.meals[0])
        mealData = data.meals[0]//TO DO:define this var in the if/else if/else appropriately
        var ingredients = [];
        var measurements = [];
        //create object from JSON where ingredients are listed
        var mealName = $("<h1>").addClass().text(data.meals[0].strMeal);
        var ingredientsTitle = $("<h3>").addClass().text("Ingredients")
        $("#response-container").append(mealName);
        $("#response-container").append(ingredientsTitle);
        //iterate over each key/value in dictionary
        Object.entries(mealData).forEach(([key, value]) => {
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
        var instructions = $("<p>").addClass().text(data.meals[0].strInstructions);
        $("#response-container").append(instructions)
    });
}
function getVideo(searchTerm) {
    $.ajax({
    type: 'GET',
    url: 'https://www.googleapis.com/youtube/v3/search',
    data: {
        key: 'AIzaSyAO8LBX4G-XXCvMN6MUI5J-_iDoVEYILms',
        q: searchTerm + "food",//this can be used if no video provided in array
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
    //$("#video-container").show();
    $('iframe').attr('src', 'https://www.youtube.com/embed/' + data.items[0].id.videoId).show()
    //$('h3').text(data.items[0].snippet.title).show() to show title snippet
    //$('.description').text(data.items[0].snippet.description).show() to show description snippet
}

//function hidevideo()
