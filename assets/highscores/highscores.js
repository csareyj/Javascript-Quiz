console.log("high scores!!")

//Stores highschore to local storage

const highScoresList = document.querySelector('#highScoresList')
const highScores = JSON.parse(localStorage.getItem('highScores')) || []

//lists high scores under Leaderboard header
highScoresList.innerHTML =
highScores.map(score =>{
    return `<li class="high-score">${score.name} - ${score.score}</li>`
}).join('')