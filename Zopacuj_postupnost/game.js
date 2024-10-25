let sequence = [];
let playerSequence = [];
let level = 1;
let score = 0;
let clickable = false;
let isPaused = false;

const gridContainer = document.getElementById('grid-container');
const levelText = document.getElementById('level');
const scoreText = document.getElementById('score');
const restartBtn = document.getElementById('restart-btn');
const pauseBtn = document.getElementById('pause-btn');
const gameOverMessage = document.getElementById('game-over-message'); 
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
    resetGame();
    nextLevel();
}
function resetGame() {
    sequence = [];
    playerSequence = [];
    level = 1;
    score = 0;
    clickable = false;
    gameOverMessage.style.display = "none"; // Hide game-over message
    clearGrid();
    updateScoreAndLevel();
}

function nextLevel() {
    playerSequence = [];
    clickable = false;
    sequence.push(Math.floor(Math.random() * 16)); // Random tile
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
        clickable = true; // Allow player to click after sequence is shown
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
        displayGameOver(); 
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

function togglePause() {
    isPaused = !isPaused;
    pauseBtn.innerText = isPaused ? "Resume" : "Pause";
}

function restartGame() {
    resetGame();
    startGame();
}
function displayGameOver() {
    gameOverMessage.innerText = `Game Over! You reached level ${level} with a score of ${score}`;
    gameOverMessage.style.display = "block";
}
