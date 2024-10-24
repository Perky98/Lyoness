const grid = document.getElementById('grid');
const scoreElement = document.getElementById('score');
const levelElement = document.getElementById('level');
const timerElement = document.getElementById('timer');
const nextLevelButton = document.createElement('button');
const restartButton = document.createElement('button');

let score = 0;
let level = 1;
let timeLeft = 60;
let gridSize = 3;
let tiles = [];
let selectedColor = null;
let currentTileIndex = null;
let timerInterval = null;
let colors = ['green', 'yellow', 'purple'];


function generateGrid() {
    grid.innerHTML = '';
    tiles = Array(gridSize * gridSize).fill(null);

    if (level === 1) {
        grid.classList.remove('level-2');
        gridSize = 3;
        tiles[0] = 'green'; tiles[2] = 'green';
        tiles[3] = 'yellow'; tiles[5] = 'yellow';
        tiles[6] = 'purple'; tiles[8] = 'purple';
    } else if (level === 2) {
        grid.classList.add('level-2');
        gridSize = 4;
        tiles[0] = 'green'; tiles[3] = 'green';
        tiles[4] = 'yellow'; tiles[7] = 'yellow';
        tiles[8] = 'purple'; tiles[11] = 'purple';
        tiles[12] = 'green'; tiles[15] = 'green';
    }


    for (let i = 0; i < tiles.length; i++) {
        const tile = document.createElement('div');
        tile.classList.add('tile');
        if (tiles[i]) {
            tile.setAttribute('data-color', tiles[i]);
            tile.style.backgroundColor = tiles[i];
        }
        tile.addEventListener('click', () => handleTileClick(i));
        grid.appendChild(tile);
    }


    nextLevelButton.textContent = 'New level';
    nextLevelButton.style.display = 'none';
    nextLevelButton.addEventListener('click', nextLevel);
    document.body.appendChild(nextLevelButton);

    restartButton.textContent = 'Restart';
    restartButton.style.display = 'none';
    restartButton.addEventListener('click', restartGame);
    document.body.appendChild(restartButton);
}


function handleTileClick(index) {
    const tileElement = grid.children[index];


    if (index === currentTileIndex) {
        clearHighlights();
        selectedColor = null;
        currentTileIndex = null;
        return;
    }


    if (tiles[index] && !selectedColor) {
        selectedColor = tiles[index];
        currentTileIndex = index;
        highlightNeighbors(index);
    }

    else if (selectedColor && tileElement.classList.contains('highlight')) {
        tiles[index] = selectedColor;
        tileElement.style.backgroundColor = selectedColor;
        tileElement.removeAttribute('data-color');
        tileElement.classList.remove('highlight');
        currentTileIndex = index;


        if (checkForWin()) {
            stopTimer();
            alert('U win!');
            nextLevelButton.style.display = 'block';
            restartButton.style.display = 'block';
            return;
        }


        highlightNeighbors(index);
    }
}


function highlightNeighbors(index) {
    clearHighlights();
    const neighbors = getNeighbors(index);

    neighbors.forEach(neighborIndex => {
        if (tiles[neighborIndex] === null) {
            grid.children[neighborIndex].classList.add('highlight');
        }
    });
}


function clearHighlights() {
    const allTiles = Array.from(grid.children);
    allTiles.forEach(tile => tile.classList.remove('highlight'));
}


function getNeighbors(index) {
    const row = Math.floor(index / gridSize);
    const col = index % gridSize;
    const neighbors = [];

    if (row > 0) neighbors.push(index - gridSize);
    if (row < gridSize - 1) neighbors.push(index + gridSize);
    if (col > 0) neighbors.push(index - 1);
    if (col < gridSize - 1) neighbors.push(index + 1);

    return neighbors;
}


function checkForWin() {

    for (let color of colors) {
        if (!checkColorConnection(color)) {
            return false;
        }
    }
    return true;
}


function checkColorConnection(color) {

    const indices = tiles.map((tile, index) => tile === color ? index : -1).filter(index => index !== -1);


    if (indices.length < 2) return false;


    for (let i = 1; i < indices.length; i++) {
        if (!areNeighbors(indices[i - 1], indices[i])) {
            return false;
        }
    }
    return true;
}


function areNeighbors(index1, index2) {
    const neighbors = getNeighbors(index1);
    return neighbors.includes(index2);
}


function startTimer() {
    timerElement.textContent = `time: ${timeLeft}с`;
    timerInterval = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `time: ${timeLeft}с`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert('Game over! time out.');
            restartButton.style.display = 'block';
        }
    }, 1000);
}


function stopTimer() {
    clearInterval(timerInterval);
}


function nextLevel() {
    score += 10;
    scoreElement.textContent = `Point: ${score}`;
    level++;
    levelElement.textContent = `Level: ${level}`;


    timeLeft = 60;
    selectedColor = null;
    currentTileIndex = null;
    nextLevelButton.style.display = 'none';
    restartButton.style.display = 'none';
    generateGrid();
    startTimer();
}

// Функція для рестарту гри
function restartGame() {
    score = 0;
    level = 1;
    timeLeft = 60;
    scoreElement.textContent = `Point: ${score}`;
    levelElement.textContent = `Level: ${level}`;

    selectedColor = null;
    currentTileIndex = null;
    restartButton.style.display = 'none';
    generateGrid();
    startTimer();
}


generateGrid();
startTimer();

