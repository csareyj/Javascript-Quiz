console.log("results!")

const username = document.querySelector('#username')
const saveScoreBtn = document.querySelector('#saveScoreBtn')
const finalScore = document.querySelector('#finalScore')
const mostRecentScore = localStorage.getItem('mostRecentScore')

//Sores your high score for this round to local storage

const highScores = JSON.parse(localStorage.getItem('highScores')) || []

//page can list to 4 high scores
const MAX_HIGH_SCORES = 5

//lists your scre for this round
finalScore.innerText = mostRecentScore

//disables the save button until something is entered in
username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value
})


saveHighScore = e => {
    e.preventDefault()

    const score = {
        score: mostRecentScore,
        name: username.value
    }
    highScores.push(score)

    highScores.sort((a,b) => {
        return b.score - a.score
    })

    highScores.splice(5)

    //After high score entry it saved, returns you to beginning of the quiz 
    localStorage.setItem('highScores', JSON.stringify(highScores))
    window.location.assign('../../index.html')
}