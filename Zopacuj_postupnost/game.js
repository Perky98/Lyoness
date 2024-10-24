let sequence = [];
let playerSequence = [];
let level = 1;
let score = 0;
let clickable = false;
let timer; 
let timeLeft = 60; 
let isPaused = false; 

const gridContainer = document.getElementById('grid-container');
const levelText = document.getElementById('level');
const scoreText = document.getElementById('score');
const timerText = document.getElementById('timer'); 
const restartBtn = document.getElementById('restart-btn');
const pauseBtn = document.getElementById('pause-btn');


for (let i = 0; i < 16; i++) {
    const square = document.createElement('div');
    square.classList.add('grid-item');
    square.setAttribute('data-id', i);
    square.addEventListener('click', handlePlayerClick);
    gridContainer.appendChild(square);
}


startGame();


restartBtn.addEventListener('click', restartGame);


pauseBtn.addEventListener('click', togglePause);

function startGame() {
    if (timeLeft <= 0) {
        alert('The game is over. Please restart.');
        return;
    }
    resetGame();
    nextLevel();
    startTimer(); 
}

function resetGame() {
    sequence = [];
    playerSequence = [];
    level = 1;
    score = 0;
    clickable = false;
    timeLeft = 60; 
    clearInterval(timer); 
    timerText.innerText = timeLeft;
    clearGrid();
    updateScoreAndLevel();
}

function nextLevel() {
    playerSequence = [];
    clickable = false;
    sequence.push(Math.floor(Math.random() * 16)); 
    flashSequence();
}

function flashSequence() {
    let delay = 500;

    sequence.forEach((tile, index) => {
        setTimeout(() => {
            flashTile(tile);
        }, delay * (index + 1));
    });

    setTimeout(() => {
        clickable = true; 
    }, delay * (sequence.length + 1));
}

function flashTile(tileId) {
    const tile = document.querySelector(`[data-id='${tileId}']`);
    tile.classList.add('active');
    setTimeout(() => {
        tile.classList.remove('active');
    }, 500);
}

function handlePlayerClick(e) {
    if (!clickable || isPaused) return; 

    const tileId = parseInt(e.target.getAttribute('data-id'));
    playerSequence.push(tileId);

   
    e.target.classList.add('clicked');
    setTimeout(() => {
        e.target.classList.remove('clicked');
    }, 300);

    
    if (playerSequence[playerSequence.length - 1] !== sequence[playerSequence.length - 1]) {
        alert('Game Over! You reached level ' + level + ' with a score of ' + score);
        restartGame();
        return;
    }

    
    if (playerSequence.length === sequence.length) {
        score += 10 * level;
        level++;
        updateScoreAndLevel();
        setTimeout(nextLevel, 1000); 
    }
}

function updateScoreAndLevel() {
    levelText.innerText = level;
    scoreText.innerText = score;
}

function clearGrid() {
    document.querySelectorAll('.grid-item').forEach(item => {
        item.classList.remove('active', 'clicked');
    });
}


function startTimer() {
    clearInterval(timer); 
    timer = setInterval(() => {
        if (!isPaused) {
            timeLeft--;
            timerText.innerText = timeLeft;

            if (timeLeft <= 0) {
                alert('Time is up! Game Over. You reached level ' + level + ' with a score of ' + score);
                clearInterval(timer);
                restartGame();
            }
        }
    }, 1000); 
}

function togglePause() {
    if (isPaused) {
        isPaused = false;
        pauseBtn.innerText = "Pause";
    } else {
        isPaused = true;
        pauseBtn.innerText = "Resume";
    }
}

function restartGame() {
    resetGame();
    startGame();
}
