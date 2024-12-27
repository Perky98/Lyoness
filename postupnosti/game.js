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
const finalLevel = document.getElementById('final-level');
const finalScore = document.getElementById('final-score');

for (let i = 0; i < 16; i++) {
    const square = document.createElement('div');
    square.classList.add('grid-item');
    square.setAttribute('data-id', i);
    square.addEventListener('click', handlePlayerClick);
    gridContainer.appendChild(square);
}

document.getElementById('start-btn').addEventListener('click', () => {
    document.getElementById('start-screen').style.display = 'none';
    document.querySelector('.game-container').style.display = 'block';
    startGame();
});

document.getElementById('exit-btn').addEventListener('click', () => {
    alert('Hra bola ukončená.');
});

document.getElementById('help-icon').addEventListener('click', toggleHelpImageVisibility);
document.getElementById('fullscreen-image').addEventListener('click', toggleHelpImageVisibility);
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
    gameOverMessage.style.display = 'none';
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
    const delay = 500;

    sequence.forEach((tile, index) => {
        setTimeout(() => flashTile(tile), delay * (index + 1));
    });

    setTimeout(() => { clickable = true; }, delay * (sequence.length + 1));
}

function flashTile(tileId) {
    const tile = document.querySelector(`[data-id='${tileId}']`);
    tile.classList.add('active');
    setTimeout(() => tile.classList.remove('active'), 500);
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
    setTimeout(() => e.target.classList.remove('clicked'), 300);

    if (playerSequence.length === sequence.length) {
        score += 10 * level;
        level++;
        updateScoreAndLevel();
        setTimeout(nextLevel, 1000);
    }
}

function displayGameOver() {
    gameOverMessage.style.display = 'block';
    finalLevel.textContent = level - 1;
    finalScore.textContent = score;
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
    levelText.textContent = level;
    scoreText.textContent = score;
}

function clearGrid() {
    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach(item => {
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

function toggleHelpImageVisibility() {
    const gameContainer = document.querySelector('.game-container');
    const fullscreenImage = document.getElementById('fullscreen-image');
    const isFullscreenVisible = fullscreenImage.style.display === 'block';

    gameContainer.style.display = isFullscreenVisible ? 'block' : 'none';
    fullscreenImage.style.display = isFullscreenVisible ? 'none' : 'block';
}
