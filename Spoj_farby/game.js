const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 5;
const cellSize = canvas.width / gridSize;
let startCell = null;
let paths = [];
let level = 0;
let startTime;
let timerInterval;

const levelDisplay = document.getElementById("levelDisplay");
const timeDisplay = document.getElementById("timeDisplay");
const messageDisplay = document.getElementById("messageDisplay");
const levels = [];
function generateRandomLevel(level) {
    const points = [];
    const colors = ["red", "blue", "green", "yellow", "purple"];
    const pairs = level + 2; 

    while (points.length < pairs * 2) {
        const color = colors[Math.floor(points.length / 2)];
        const point = { x: Math.floor(Math.random() * gridSize),
            y: Math.floor(Math.random() * gridSize),
            color,
        };
        if (!points.some(p => p.x === point.x && p.y === point.y)) {
            points.push(point);
        }
    }
    return points;
}


function initGame() {
    paths = [];
    startTime = Date.now();
    clearInterval(timerInterval);
    timerInterval = setInterval(updateTime, 1000);

  
    if (level < 4) { 
        levels[level] = generateRandomLevel(level); 
    }
    drawGrid();
    drawPoints();
    updateLevelDisplay();
    hideMessage(); 

    
    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);
}

function updateTime() {
    const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    timeDisplay.textContent = `${elapsedTime} `;
}
function updateLevelDisplay() {
    levelDisplay.textContent = `Level: ${level + 1}`;
}

function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#ddd";
    for (let i = 0; i <= gridSize; i++) {
        ctx.beginPath();
        ctx.moveTo(i * cellSize, 0);
        ctx.lineTo(i * cellSize, canvas.height);
        ctx.moveTo(0, i * cellSize);
        ctx.lineTo(canvas.width, i * cellSize);
        ctx.stroke();
    }
}

function drawPoints() {
    for (const point of levels[level]) {
        ctx.fillStyle = point.color;
        ctx.beginPath();
        ctx.arc(
            point.x * cellSize + cellSize / 2,
            point.y * cellSize + cellSize / 2,
            cellSize / 4, 0, 2 * Math.PI
        );
        ctx.fill();
    }
}

function getCell(x, y) {
    return { x: Math.floor(x / cellSize), y: Math.floor(y / cellSize) };
}

function handleMouseDown(event) {
    const cell = getCell(event.offsetX, event.offsetY);
    startCell = levels[level].find(p => p.x === cell.x && p.y === cell.y);
    if (startCell) {
        paths.push({ color: startCell.color, path: [{ x: cell.x, y: cell.y }] });
    }
}

function handleMouseMove(event) {
    if (!startCell) return;
    const cell = getCell(event.offsetX, event.offsetY);
    const lastPath = paths[paths.length - 1];
    const lastCell = lastPath.path[lastPath.path.length - 1];
    if ((lastCell.x !== cell.x || lastCell.y !== cell.y) && isValidMove(lastCell, cell)) {
        lastPath.path.push(cell);
        drawGrid();
        drawPoints();
        drawPaths();
    }
}

function handleMouseUp() {
    startCell = null; 
    if (checkWin()) {
        alert("level pased");
        level++; 
 if (level < 4) {
            initGame();
        } else {
            showCompletionMessage(); 
            clearInterval(timerInterval); 
        }
    }
}

function isValidMove(from, to) {
    return Math.abs(from.x - to.x) + Math.abs(from.y - to.y) === 1;
}

function drawPaths() {
    for (const { color, path } of paths) {
        ctx.strokeStyle = color;
        ctx.lineWidth = cellSize / 6;
        ctx.beginPath();
        ctx.moveTo(
            path[0].x * cellSize + cellSize / 2,
            path[0].y * cellSize + cellSize / 2
        );
        for (const point of path) {
            ctx.lineTo(
                point.x * cellSize + cellSize / 2,
                point.y * cellSize + cellSize / 2
            );
        }
        ctx.stroke();
    }
}
function checkWin() {
    return levels[level].every(point => paths.some(path => {
        return path.color === point.color && path.path.some(p => p.x === point.x && p.y === point.y);
    }));
}
function showCompletionMessage() {
    messageDisplay.textContent = "Congrat! You complete all level";
    messageDisplay.style.display = "block"; 
    resetGame(); 
}
function hideMessage() {
    messageDisplay.style.display = "none"; 
}
function resetGame() {
    setTimeout(() => {
        level = 0; 
        initGame(); 
    }, 3000); 
}


initGame();

