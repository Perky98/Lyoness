const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let gridSize = 5;
let cellSize = canvas.width / gridSize;
let startCell = null;
let paths = [];
let level = 0;
let startTime;
let timerInterval;
let completedConnections = [];

const levelDisplay = document.getElementById("levelDisplay");
const timeDisplay = document.getElementById("timeDisplay");
const messageDisplay = document.getElementById("messageDisplay");

const fixedLevel = [
    [
        { y: 0, x: 0, color: "#784EEE" },
        { y: 1, x: 0, color: "#1E9F25" },
        { y: 0, x: 1, color: "#784EEE" },
        { y: 1, x: 1, color: "#1E9F25" }
    ]
];

const randomLevels = [
    [
        { y: 0, x: 0, color: "#784EEE" },
        { y: 2, x: 0, color: "#784EEE" },
        { y: 1, x: 1, color: "#1E9F25" },
        { y: 2, x: 1, color: "#7DD0F6" },
        { y: 1, x: 2, color: "#7DD0F6" },
        { y: 0, x: 2, color: "#1E9F25" }
    ],
    [
        { y: 0, x: 0, color: "#784EEE" },
        { y: 1, x: 2, color: "#784EEE" },
        { y: 1, x: 1, color: "#1E9F25" },
        { y: 2, x: 1, color: "#7DD0F6" },
        { y: 2, x: 2, color: "#7DD0F6" },
        { y: 2, x: 0, color: "#1E9F25" }
    ],
    [
        { y: 0, x: 0, color: "#784EEE" },
        { y: 1, x: 2, color: "#784EEE" },
        { y: 1, x: 1, color: "#1E9F25" },
        { y: 2, x: 0, color: "#7DD0F6" },
        { y: 2, x: 2, color: "#7DD0F6" },
        { y: 1, x: 0, color: "#1E9F25" }
    ],
    [
        { y: 0, x: 0, color: "#784EEE" },
        { y: 0, x: 1, color: "#784EEE" },
        { y: 2, x: 0, color: "#7DD0F6" },
        { y: 1, x: 1, color: "#1E9F25" },
        { y: 0, x: 2, color: "#7DD0F6" },
        { y: 1, x: 0, color: "#1E9F25" }
    ],
    [
        { y: 0, x: 0, color: "#784EEE" },
        { y: 2, x: 0, color: "#7DD0F6" },
        { y: 0, x: 2, color: "#784EEE" },
        { y: 1, x: 0, color: "#1E9F25" },
        { y: 2, x: 2, color: "#7DD0F6" },
        { y: 1, x: 2, color: "#1E9F25" }
    ]
];

// 3 level 
const randomLevels3 = [
    [
        { y: 1, x: 3, color: "#784EEE" },
        { y: 3, x: 1, color: "#784EEE" },
        { y: 2, x: 2, color: "#1E9F25" },
        { y: 0, x: 3, color: "#1E9F25" },
        { y: 1, x: 1, color: "#F6E87D" },
        { y: 2, x: 1, color: "#F6E87D" },
        { y: 0, x: 1, color: "#7DD0F6" },
        { y: 3, x: 0, color: "#7DD0F6" } 
    ],
   [
        { y: 3, x: 3, color: "#784EEE" },
        { y: 3, x: 1, color: "#784EEE" },
        { y: 2, x: 1, color: "#1E9F25" },
        { y: 0, x: 3, color: "#1E9F25" },
        { y: 0, x: 0, color: "#F6E87D" },
        { y: 1, x: 2, color: "#F6E87D" },
        { y: 1, x: 1, color: "#7DD0F6" },
        { y: 3, x: 0, color: "#7DD0F6" } 
    ],
   [
        { y: 0, x: 0, color: "#784EEE" },
        { y: 2, x: 1, color: "#784EEE" },
        { y: 1, x: 3, color: "#1E9F25" },
        { y: 0, x: 1, color: "#1E9F25" },
        { y: 1, x: 1, color: "#F6E87D" },
        { y: 2, x: 3, color: "#F6E87D" },
        { y: 3, x: 3, color: "#7DD0F6" },
        { y: 3, x: 0, color: "#7DD0F6" } 
    ],
   
    [
        { y: 0, x: 0, color: "#784EEE" },
        { y: 1, x: 1, color: "#1E9F25" },
        { y: 2, x: 1, color: "#784EEE" },
        { y: 2, x: 3, color: "#1E9F25" },
        { y: 1, x: 2, color: "#7DD0F6" },
        { y: 3, x: 3, color: "#7DD0F6" } 
    ],
    [
        { y: 0, x: 0, color: "#784EEE" },
        { y: 1, x: 1, color: "#1E9F25" },
        { y: 2, x: 1, color: "#784EEE" },
        { y: 0, x: 3, color: "#1E9F25" },
        { y: 3, x: 2, color: "#7DD0F6" },
        { y: 3, x: 3, color: "#7DD0F6" } 
    ]
];
//4 level
const randomLevels4 = [
    [
        { y: 0, x: 3, color: "#4EEE90" },
        { y: 4, x: 3, color: "#4EEE90" },
        { y: 1, x: 3, color: "#1E9F25" },
        { y: 2, x: 2, color: "#1E9F25" },
        { y: 3, x: 3, color: "#F6E87D" },
        { y: 4, x: 2, color: "#F6E87D" },
        { y: 0, x: 2, color: "#7DD0F6" },
        { y: 4, x: 0, color: "#7DD0F6" },
        { y: 0, x: 1, color: "#784EEE" }, 
        { y: 0, x: 0, color: "#784EEE" } 
    ],
     [
        { y: 0, x: 4, color: "#4EEE90" },
        { y: 1, x: 1, color: "#4EEE90" },
        { y: 1, x: 4, color: "#1E9F25" },
        { y: 0, x: 1, color: "#1E9F25" },
        { y: 3, x: 3, color: "#F6E87D" },
        { y: 3, x: 1, color: "#F6E87D" },
        { y: 3, x: 0, color: "#784EEE" }, 
        { y: 2, x: 4, color: "#784EEE" } 
    ],
[
        { y: 0, x: 4, color: "#1E9F25" },
        { y: 4, x: 2, color: "#1E9F25" },
        { y: 2, x: 1, color: "#F6E87D" },
        { y: 4, x: 1, color: "#F6E87D" },
        { y: 2, x: 2, color: "#7DD0F6" },
        { y: 4, x: 0, color: "#7DD0F6" },
        { y: 3, x: 2, color: "#784EEE" }, 
        { y: 0, x: 0, color: "#784EEE" } 
    ],
[
        { y: 0, x: 1, color: "#1E9F25" },
        { y: 4, x: 2, color: "#1E9F25" },
        { y: 1, x: 2, color: "#F6E87D" },
        { y: 4, x: 1, color: "#F6E87D" },
        { y: 2, x: 0, color: "#7DD0F6" },
        { y: 4, x: 0, color: "#7DD0F6" },
        { y: 2, x: 2, color: "#784EEE" }, 
        { y: 0, x: 0, color: "#784EEE" } 
    ],
[
        { y: 0, x: 3, color: "#1E9F25" },
        { y: 4, x: 2, color: "#1E9F25" },
        { y: 1, x: 3, color: "#F6E87D" },
        { y: 4, x: 1, color: "#F6E87D" },
        { y: 1, x: 2, color: "#7DD0F6" },
        { y: 4, x: 0, color: "#7DD0F6" },
        { y: 2, x: 2, color: "#784EEE" }, 
        { y: 1, x: 1, color: "#784EEE" } 
    ],
    [
        { y: 1, x: 4, color: "#1E9F25" },
        { y: 3, x: 1, color: "#1E9F25" },
        { y: 0, x: 2, color: "#F6E87D" },
        { y: 4, x: 4, color: "#F6E87D" },
        { y: 0, x: 4, color: "#7DD0F6" },
        { y: 1, x: 1, color: "#7DD0F6" },
        { y: 2, x: 1, color: "#784EEE" }, 
        { y: 2, x: 3, color: "#784EEE" } 
    ],
];


function initGame() {
    paths = [];
    completedConnections = [];
    startTime = Date.now();
    clearInterval(timerInterval);
    timerInterval = setInterval(updateTime, 1000);

    gridSize = 2 + level; // e.g., 2x2 for level 0, 3x3 for level 1, etc.
    cellSize = canvas.width / gridSize;

    if (level === 0) {
        levels = fixedLevel[0];
    } else if (level === 1) {
        levels = getRandomLevel(randomLevels);
    } else if (level === 2) {
        levels = getRandomLevel(randomLevels3);
    } else if (level === 3) {
        levels = getRandomLevel(randomLevels4);
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
    timeDisplay.textContent = `${elapsedTime} sec`;
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
    for (const point of levels) {
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
    startCell = levels.find(p => p.x === cell.x && p.y === cell.y);

    if (startCell && !completedConnections.includes(`${startCell.x}-${startCell.y}-${startCell.color}`)) {
        paths.push({ color: startCell.color, path: [{ x: cell.x, y: cell.y }] });
    } else {
        startCell = null;
    }
}

function handleMouseMove(event) {
    if (!startCell) return;
    const cell = getCell(event.offsetX, event.offsetY);
    const lastPath = paths[paths.length - 1];
    const lastCell = lastPath.path[lastPath.path.length - 1];

    if ((lastCell.x !== cell.x || lastCell.y !== cell.y) && isValidMove(lastCell, cell)) {
        if (isIntersecting(cell, lastPath)) {
            showMessage("Path intersects with an existing path or point.");
            paths.pop();
            drawGrid();
            drawPoints();
            drawPaths();
            startCell = null;
            return;
        }

        lastPath.path.push(cell);
        drawGrid();
        drawPoints();
        drawPaths();
    }
}

function handleMouseUp() {
    if (!startCell) return;
    const lastPath = paths[paths.length - 1];
    const startColor = lastPath.color;

    if (checkConnectionComplete(lastPath, startColor)) {
        for (const cell of lastPath.path) {
            completedConnections.push(`${cell.x}-${cell.y}-${startColor}`);
        }
    } else {
        showMessage("Path not complete!");
        paths.pop();
        drawGrid();
        drawPoints();
        drawPaths();
    }

    startCell = null;

    if (checkWin()) {
       // alert("Level complete!");
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

function isIntersecting(cell, currentPath) {
    for (const path of paths) {
        if (path !== currentPath) {
            if (path.path.some(p => p.x === cell.x && p.y === cell.y && path.color !== currentPath.color)) {
                return true;
            }
        }
    }
    for (const point of levels) {
        if (point.x === cell.x && point.y === cell.y && point.color !== currentPath.color) {
            return true;
        }
    }
    return false;
}

function checkConnectionComplete(path, color) {
    const pointsOfColor = levels.filter(p => p.color === color);
    return pointsOfColor.every(point => path.path.some(cell => cell.x === point.x && cell.y === point.y));
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
    return levels.every(point => paths.some(path => {
        return path.color === point.color && path.path.some(p => p.x === point.x && p.y === point.y);
    }));
}

function showCompletionMessage() {
    messageDisplay.textContent = "Congratulations! You've completed all levels.";
    messageDisplay.style.display = "block";
    resetGame();
}

function showMessage(text) {
    messageDisplay.textContent = text;
    messageDisplay.style.display = "block";
    setTimeout(hideMessage, 2000);
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

function getRandomLevel(levels) {
    const randomIndex = Math.floor(Math.random() * levels.length);
    return levels[randomIndex];
}

initGame();




