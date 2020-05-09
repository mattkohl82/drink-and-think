const numberQ = document.getElementById("trivia-questions");
const searchTerm1  = document.getElementById("searchTerm1")
const searchTerm2  = document.getElementById("searchTerm2")
const searchBtn1  = document.getElementById("searchBtn1")
const searchBtn2  = document.getElementById("searchBtn2")

toTopBtn = document.getElementById("myBtn");
// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        toTopBtn.style.display = "block";
    } else {
        toTopBtn.style.display = "none";
    }
}
// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
//change navbar to solid on scroll
$(window).scroll(function() {
	$("nav").toggleClass("scrolled", $(this).scrollTop() > 50);
});

//disable search buttons unless something is entered
function preventSearch() {
    searchTerm1.addEventListener("keyup", function() {
        searchBtn1.disabled = !searchTerm1.value;
    }); 
    searchTerm2.addEventListener("keyup", function() {
        searchBtn2.disabled = !searchTerm2.value;
    });
}
$(document).ready(function() {
    //side navigation
    $(".sidenav").sidenav();
    $("input").on("click", function() {
        $("#searchTerm1").val("");
        $("#searchTerm2").val("");
    });
    preventSearch()
    // search when search button clicked
    $("#searchBtn1").on("click", function() {  
        $("#searchTerm2").val("");
        $("#response-container").empty();
        const searchTerm = document.querySelector("#searchTerm1").value;;
        drinkSearch(searchTerm);
    });
    $("#searchBtn2").on("click", function() {
        $("#searchTerm1").val("");
        $("#response-container").empty();
        const searchTerm = document.querySelector("#searchTerm2").value;;
        ingredientSearch(searchTerm);
    });
    // search when enter key pressed
    $("#searchTerm1").on("keyup", function(e) {
        $("#response-container").empty();
        if (e.keyCode === 13) {
            e.preventDefault();
            const searchTerm = document.querySelector("#searchTerm1").value;
            // prevent enter button from submitting unless search value entered
            if (searchTerm === "" || searchTerm === null || searchTerm === undefined) {
                return false;
            } else {
            drinkSearch(searchTerm);
            }
        }
    });
    $("#searchTerm2").on("keyup", function(e) {
        $("#response-container").empty();
        if (e.keyCode === 13) {
            e.preventDefault();
            const searchTerm = document.querySelector("#searchTerm2").value;
            // prevent enter button from submitting unless search value entered
            if (searchTerm === "" || searchTerm === null || searchTerm === undefined) {
                return false;
            } else {
            ingredientSearch(searchTerm);
            }
        }
    });
    // search by ingredient
    function ingredientSearch(searchTerm) {

        // clear search value and disable button again to prevent empty searches
        $("#searchTerm2").val("");
        searchBtn2.disabled = !searchTerm2.value;

        fetch("https://www.thecocktaildb.com/api/json/v1/1/filter.php?i="+ searchTerm)
        .then((response) => {
            return response.json();
            
        })
        .then((data) => {
            $("#response-container-2").empty();
            var drinkData = "";
            if (data.drinks.length > 1){
                drinkData = data.drinks[i]
                // show the user all of the drinks
                for (var i = 0; i < data.drinks.length; i++) {// display each drink stored in local storage
                    var drinkType = data.drinks[i].strDrink;
                    var drinkPic = data.drinks[i].strDrinkThumb;
                    showDrinks(drinkType, drinkPic);
                }
            }
        })
        // advise user their search did not return results and offer a random drink recipe
        .catch((error) => {
            drinkSearch(searchTerm);
        });
    }
    // display recipe name and picture based on ingredient search
    function showDrinks(drinkType, drinkPic) {
        var contResults = $("<div>").addClass("drink-card");
        var searchResult = $("<p>").addClass("drink-type").attr("id", "drink-type").text(drinkType);
        var img =  $('<img class="imgIng">').attr("src", drinkPic).attr("id", "drinkPic").click(function() {
            var searchTerm = drinkType
            drinkSearch(searchTerm);  
            //scroll back to top of page
            document.body.scrollTop = 0; // For Safari
            document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        });
        contResults.append(img, searchResult);
        $("#response-container").append(contResults);
    }
    // search by drink name
    function drinkSearch(searchTerm) {
        // clear search value and disable button again to prevent empty searches
        $("#searchTerm1").val("");
        searchBtn1.disabled = !searchTerm1.value;
        fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s="+ searchTerm)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            $("#response-container").empty();
            $("#response-container-2").empty();
            // clears last searched recipe
            $(".search").empty();
            var drinkData = "";
            if (data.drinks == null) {
                // advise user their search did not return results and offer a random drink recipe
                fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    drinkData = data.drinks[0]
                    var ingredients = [];
                    var measurements = [];
                    // create object from JSON where ingredients are listed
                    var drinkName = $("<h1>").addClass("recipe-text").text(data.drinks[0].strDrink);
                    var ingredientsTitle = $("<h3>").addClass("recipe-text").text("Ingredients")
                    var img =  $("<img>").attr("src", data.drinks[0].strDrinkThumb).attr("id", "drinkPic")
                    var directionsTitle = $("<h3>").addClass("recipe-text").text("Directions")
                    var triviaBtn = $("<button>").addClass("btn").text("Trivia Time!")
                    
                    $("#response-container-2").append("<p>").addClass("drink-instructions recipe-text").text("We're sorry we couldn't what you were looking for. Please try a new search or this drink instead!")     
                    $("#response-container-2").append(drinkName);
                    $("#response-container-2").append(img);
                    $("#response-container-2").append(ingredientsTitle);
                    
                    // iterate over each key/value in dictionary
                    Object.entries(drinkData).forEach(([key, value]) => {
                        if (value === "" || value === null) {
                            //do nothing
                            // this code skips over null values !== logic will not work
                        } else {// if it has a value
                            // if the item is an ingredient
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
                        if (meas === "" || meas === null || meas === undefined) {
                            //do nothing
                            //this code skips over null values !== logic will not work
                            let line = $("<li>").addClass("drink-instructions recipe-text").text(ing)
                            $("#response-container-2").append(line)
                        } else {
                        let line = $("<li>").addClass("drink-instructions recipe-text").text(meas + " " + ing)
                        $("#response-container-2").append(line)
                        }
                    }
                    $("#response-container-2").append(directionsTitle);
                    var instructions = $("<p>").addClass("drink-instructions recipe-text").attr("id", "directions").text(data.drinks[0].strInstructions);
                    $("#response-container-2").append(instructions);
                    $(".search").append(triviaBtn).on("click", function(){
                        window.location = "./trivia.html";    
                    });
                });
            // if valid search display recipe    
            } else {
                drinkData = data.drinks[0]
                var ingredients = [];
                var measurements = [];
                // create object from JSON where ingredients are listed
                var drinkName = $("<h1>").addClass("recipe-text").text(data.drinks[0].strDrink);
                    var ingredientsTitle = $("<h3>").addClass("recipe-text").text("Ingredients")
                    var img =  $("<img>").attr("src", data.drinks[0].strDrinkThumb).attr("id", "drinkPic")
                    var directionsTitle = $("<h3>").addClass("recipe-text").text("Directions")
                    var triviaBtn = $("<button>").addClass("btn").text("Trivia Time!")
                            
                    $("#response-container-2").append(drinkName);
                    $("#response-container-2").append(img);
                    $("#response-container-2").append(ingredientsTitle);
                    
                //iterate over each key/value in dictionary
                Object.entries(drinkData).forEach(([key, value]) => {
                    if (value === "" || value === null) {
                        //do nothing
                        //this code skips over null values !== logic will not work
                    } else {// if it has a value
                        // if the item is an ingredient
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
                // display list with measurement and ingredients
                for (var i = 0; i < ingredients.length; i++) {
                    var meas = measurements[i];
                    var ing = ingredients[i];
                    if (meas === "" || meas === null || meas === undefined) {
                        //do nothing
                        //this code skips over null values !== logic will not work
                        let line = $("<li>").addClass("drink-instructions recipe-text").text(ing)
                        $("#response-container-2").append(line)
                    } else {
                    let line = $("<li>").addClass("drink-instructions recipe-text").text(meas + " " + ing)
                    $("#response-container-2").append(line)
                    }
                }
                $("#response-container-2").append(directionsTitle);
                var instructions = $("<p>").addClass("drink-instructions recipe-text").attr("id", "directions").text(data.drinks[0].strInstructions);
                $("#response-container-2").append(instructions);
                $(".search").append(triviaBtn).on("click", function(){
                    window.location = "./trivia.html";    
                });
            }
        });
    }   
});