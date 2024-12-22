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

document.getElementById('start-btn').addEventListener('click', function () {
    document.getElementById('start-screen').style.display = 'none';
    document.querySelector('.game-container').style.display = 'block';
    startGame();
});

document.getElementById('exit-btn').addEventListener('click', function () {
    alert('Hra bola ukončená.');
});
// Toggle help image visibility
// Toggle help image visibility
document.getElementById('help-icon').addEventListener('click', function () {
    const gameContainer = document.querySelector('.game-container');
    const fullscreenImage = document.getElementById('fullscreen-image');

    // Hide the game container
   // gameContainer.style.display = 'none';

    // Show the full-screen image
    fullscreenImage.style.display = 'block';
});

// Close the full-screen image and show the game container again when clicked
document.getElementById('fullscreen-image').addEventListener('click', function () {
    this.style.display = 'none'; // Hide the full-screen image
    document.querySelector('.game-container').style.display = 'block'; // Show the game container again
});
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

    // Проверка правильности нажатия
    if (playerSequence[playerSequence.length - 1] !== sequence[playerSequence.length - 1]) {
        showMistake(tileId); // Покажем ошибку
        displayGameOver();
        return;
    }

    e.target.classList.add('clicked');
    setTimeout(() => {
        e.target.classList.remove('clicked');
    }, 300);

    // Если игрок правильно нажал все плитки последовательности
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
    // Покрасить неправильную плитку в красный
    const wrongTile = document.querySelector(`[data-id='${wrongTileId}']`);
    wrongTile.classList.add('wrong');

    // Найти правильную плитку и показать на ней порядковый номер
    const correctTileId = sequence[playerSequence.length - 1]; // Правильная плитка
    const correctTile = document.querySelector(`[data-id='${correctTileId}']`);
    
    // Добавить порядковый номер на правильной плитке
    const number = document.createElement('div');
    number.classList.add('number-overlay');
    number.innerText = playerSequence.length; // Порядковый номер в последовательности
    correctTile.appendChild(number);
}

function updateScoreAndLevel() {
    levelText.textContent = level;
    scoreText.textContent = score;
}

function clearGrid() {
    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach(item => {
        item.classList.remove('active', 'clicked', 'wrong'); // Скидаємо всі стилі
        const numberOverlay = item.querySelector('.number-overlay');
        if (numberOverlay) {
            numberOverlay.remove(); // Видаляємо мітку з порядковим номером
        }
    });
}

function restartGame() {
    resetGame();
    startGame();
}
