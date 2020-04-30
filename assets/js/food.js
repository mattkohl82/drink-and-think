//const APIKey = "1";
var fetchChoice = "";
$("#dropdown").change(function(){
    var selected = $(this).val(); //get selected option
    if (selected === "1") {//Ingredient search
        $("#searchTerm").val("");
        $("#searchBtn").on("click", function() {
            const searchTerm = document.querySelector("#searchTerm").value;
            ingredientSearch(searchTerm);//run ingredient search function
            //console.log(searchTerm)
        });
    }    
    if (selected === "2") {//Meal name
        $("#searchTerm").val("");
        $("#searchBtn").on("click", function() {
            const searchTerm = document.querySelector("#searchTerm").value;
            mealSearch(searchTerm);//run ingredient search function
            //console.log(searchTerm)
        });
    }
});
function ingredientSearch(searchTerm) {
    fetch('https://www.themealdb.com/api/json/v1/1/filter.php?i='+ searchTerm)
        
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        //console.log(data)
        //console.log(data.meals.length)
    
        $("#response-container").empty();//clears last searched recipe
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
        //console.log(typeof searchTerm);
        //console.log(searchTerm);
        mealSearch(searchTerm);
    });
    $("#response-container").append(searchResult);
    $("#response-container").append(img);
}
//search by meal name
function mealSearch(searchTerm) {
    console.log("this is the value from click " + searchTerm)
    console.log("this is the fetch" + 'https://www.themealdb.com/api/json/v1/1/'+ searchTerm)
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s='+ searchTerm)
    
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        console.log(data)
        $("#response-container").empty();//clears last searched recipe
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
        
        //console.log(mealData);
        var mealName = $("<h1>").text(data.meals[0].strMeal);
        var ingredientsTitle = $("<h3>").text("Ingredients")
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
        var instructions = $("<p>").text(data.meals[0].strInstructions);
        $("#response-container").append(instructions)
        //fetch youtube video
        var videolink = data.meals[0].strYoutube//will need to update index 
        var videoID = videolink.split("=").pop()//this gets the video id, will need to pass this variable into the iframeAPI to play the video
        //console.log(videolink.split("=").pop())
            //display video, needs to only work for meal name
            //if user selects ingredient search it will bring a list of meals by the ingredient and once selected run the name through the name search
        function getVideo() {
            $.ajax({
            type: 'GET',
            url: 'https://www.googleapis.com/youtube/v3/search',
            data: {
                key: 'AIzaSyAO8LBX4G-XXCvMN6MUI5J-_iDoVEYILms',
                //q: searchTerm,//this can be used if no video provided in array
                q: videoID,
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
        getVideo();
    });
    
}









/*

$("#searchBtn").on("click", function() {
    const searchTerm = document.querySelector("#searchTerm").value;
    //console.log(searchTerm)
    fetch('https://www.themealdb.com/api/json/v1/1/' + fetchChoice + searchTerm)

    .then((response) => {
        return response.json();
    })


    .then((data) => {
        console.log(data)
        $("#response-container").empty();//clears last searched recipe
        var mealData = "";
        if (data.meals.length > 1){
            //show the user all of the meals
            //make them selectable, whichever one they choose should return a number for that meals' position in the data.meals array
            //the number returned should be used to set mealData, see next line
            //mealData = data.meals[x]   where x relates to whichever meal they clicked

        } else if (data.meals.length == 1) {
            //mealData = data.meals[0]
        } else {
            //have the user retry because their search did not return a result
        }
        //console.log(data)
        //console.log(data.meals[0])

        
        mealData = data.meals[0]//TO DO:define this var in the if/else if/else appropriately
        
        var ingredients = [];
        var measurements = [];
        
        //create object from JSON where ingredients are listed
        
        //console.log(mealData);
        var mealName = $("<h1>").text(data.meals[0].strMeal);
        var ingredientsTitle = $("<h3>").text("Ingredients")
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
        var instructions = $("<p>").text(data.meals[0].strInstructions);
        $("#response-container").append(instructions)
        //fetch youtube video
        var videolink = data.meals[0].strYoutube//will need to update index 
        var videoID = videolink.split("=").pop()//this gets the video id, will need to pass this variable into the iframeAPI to play the video
        //console.log(videolink.split("=").pop())
            //display video, needs to only work for meal name
            //if user selects ingredient search it will bring a list of meals by the ingredient and once selected run the name through the name search
        function getVideo() {
            $.ajax({
            type: 'GET',
            url: 'https://www.googleapis.com/youtube/v3/search',
            data: {
                key: 'AIzaSyAO8LBX4G-XXCvMN6MUI5J-_iDoVEYILms',
                //q: searchTerm,//this can be used if no video provided in array
                q: videoID,
                part: 'snippet',
                maxResults: 1,
                type: 'video',
                videoEmbeddable: true,
            },
            
            success: function(data){
                embedVideo(data)
                //console.log(data);
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
    getVideo();
    });
});*/