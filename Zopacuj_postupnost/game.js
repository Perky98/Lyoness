let sequence = [];
let playerSequence = [];
let level = 1;
let score = 0;
let clickable = false;

const gridContainer = document.getElementById('grid-container');
const levelText = document.getElementById('level');
const scoreText = document.getElementById('score');
const restartBtn = document.getElementById('restart-btn');
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
    gameOverMessage.style.display = "none"; 
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
    if (!clickable) return;

    const tileId = parseInt(e.target.getAttribute('data-id'));
    playerSequence.push(tileId);

    
    if (playerSequence[playerSequence.length - 1] !== sequence[playerSequence.length - 1]) {
        showMistake(tileId); 
        displayGameOver();
        return;
    }

    e.target.classList.add('clicked');
    setTimeout(() => {
        e.target.classList.remove('clicked');
    }, 300);


    if (playerSequence.length === sequence.length) {
        score += 10 * level;
        level++;
        updateScoreAndLevel();
        setTimeout(nextLevel, 1000); 
    }
}

function showMistake(wrongTileId) {
   
    const wrongTile = document.querySelector(`[data-id='${wrongTileId}']`);
    wrongTile.classList.add('wrong');

    
    const correctTileId = sequence[playerSequence.length - 1]; 
    const correctTile = document.querySelector(`[data-id='${correctTileId}']`);
    
   
    const number = document.createElement('div');
    number.classList.add('number-overlay');
    number.innerText = playerSequence.length; 
    correctTile.appendChild(number);
}

function updateScoreAndLevel() {
    levelText.innerText = level;
    scoreText.innerText = score;
}

function clearGrid() {
    document.querySelectorAll('.grid-item').forEach(item => {
        item.classList.remove('active', 'clicked', 'wrong');
       
        const numberOverlay = item.querySelector('.number-overlay');
        if (numberOverlay) {
            numberOverlay.remove();
        }
    });
}

function restartGame() {
    resetGame();
    startGame();
}

function displayGameOver() {
    gameOverMessage.innerText = `Uncorect answer! You pass  ${level} with ${score} points.`;
    gameOverMessage.style.display = "block";
}
