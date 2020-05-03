const highScoresList = document.getElementById('highScoresList');
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
var clearHighScores = document.getElementById('clear');

//take array of highScores and retun as list items on highscore html page
highScoresList.innerHTML = 
    highScores.map(score => {
    return `<li class="high-score">${score.initials} - ${score.score}</li>`;
    }).join("");

function clearAll() {
    localStorage.clear();
    document.getElementById('highScoresList').style.display = "none";
}