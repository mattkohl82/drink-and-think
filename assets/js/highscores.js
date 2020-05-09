const highScoresList = document.getElementById("highScoresList");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
var clearHighScores = document.getElementById("clear");

// mobile nav
$(document).ready(function() {
    $(".sidenav").sidenav();
});
//change navbar to solid on scroll
$(window).scroll(function() {
	$("nav").toggleClass("scrolled", $(this).scrollTop() > 50);
});
//take array of highScores and retun as list items on highscore html page
highScoresList.innerHTML = 
    highScores.map(score => {
    return `<li class="high-score">${score.initials} - ${score.score}</li>`;
    }).join("");
//clear highscores/local storage
function clearAll() {
    localStorage.clear();
    document.getElementById("highScoresList").style.display = "none";
}
