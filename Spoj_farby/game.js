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
        { y: 1, x: 2, color: "#4EEE90" },
        { y: 3, x: 0, color: "#4EEE90" },
        { y: 1, x: 3, color: "#7DD0F6" },
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

const randomLevels5 = [
    [
        { y: 0, x: 2, color: "#4EEE90" },
        { y: 2, x: 5, color: "#4EEE90" },
        { y: 3, x: 5, color: "#1E9F25" },
        { y: 4, x: 1, color: "#1E9F25" },
        { y: 3, x: 4, color: "#F6E87D" },
        { y: 5, x: 0, color: "#F6E87D" },
        { y: 3, x: 3, color: "#7DD0F6" },
        { y: 1, x: 0, color: "#7DD0F6" },
        { y: 2, x: 4, color: "#784EEE" }, 
        { y: 0, x: 0, color: "#784EEE" } 
    ],
     [
        { y: 4, x: 2, color: "#4EEE90" },
        { y: 2, x: 5, color: "#4EEE90" },
        { y: 4, x: 4, color: "#1E9F25" },
        { y: 2, x: 2, color: "#1E9F25" },
        { y: 3, x: 5, color: "#F6E87D" },
        { y: 5, x: 0, color: "#F6E87D" },
        { y: 4, x: 3, color: "#7DD0F6" },
        { y: 1, x: 1, color: "#7DD0F6" },
        { y: 0, x: 5, color: "#784EEE" }, 
        { y: 0, x: 3, color: "#784EEE" } 
    ],
[       { y: 4, x: 2, color: "#4EEE90" },
        { y: 1, x: 5, color: "#4EEE90" },
        { y: 2, x: 5, color: "#1E9F25" },
        { y: 4, x: 4, color: "#1E9F25" },
        { y: 5, x: 0, color: "#F6E87D" },
        { y: 0, x: 5, color: "#F6E87D" },
        { y: 1, x: 1, color: "#7DD0F6" },
        { y: 5, x: 5, color: "#7DD0F6" },
        { y: 3, x: 4, color: "#784EEE" }, 
        { y: 4, x: 5, color: "#784EEE" } 
    ],
[
        { y: 4, x: 3, color: "#4EEE90" },
        { y: 1, x: 5, color: "#4EEE90" },
        { y: 5, x: 1, color: "#1E9F25" },
        { y: 2, x: 5, color: "#1E9F25" },
        { y: 0, x: 2, color: "#F6E87D" },
        { y: 5, x: 0, color: "#F6E87D" },
        { y: 1, x: 1, color: "#7DD0F6" },
        { y: 0, x: 5, color: "#7DD0F6" },
        { y: 3, x: 2, color: "#784EEE" }, 
        { y: 4, x: 4, color: "#784EEE" } 
    ],
 
    [
        { y: 2, x: 4, color: "#4EEE90" },
        { y: 5, x: 4, color: "#4EEE90" },
        { y: 5, x: 5, color: "#1E9F25" },
        { y: 0, x: 3, color: "#1E9F25" },
        { y: 2, x: 2, color: "#F6E87D" },
        { y: 4, x: 1, color: "#F6E87D" },
        { y: 4, x: 0, color: "#7DD0F6" },
        { y: 3, x: 1, color: "#7DD0F6" }
     
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
    }else if (level === 4) {
        levels = getRandomLevel(randomLevels5);
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
    ctx.strokeStyle = "#F9B2B3";
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
    if (startCell) {
        const connectionKey = `${startCell.x}-${startCell.y}-${startCell.color}`;
        if (completedConnections.includes(connectionKey)) {
            // Remove the connection from completedConnections array
            completedConnections = completedConnections.filter(key => key !== connectionKey);

        
            const pathIndex = paths.findIndex(path => path.color === startCell.color && path.path.some(cell => cell.x === startCell.x && cell.y === startCell.y));
            if (pathIndex !== -1) {
                paths.splice(pathIndex, 1);
            }

            drawGrid();
            drawPoints();
            drawPaths();
        } else {
            paths.push({ color: startCell.color, path: [{ x: cell.x, y: cell.y }] });
        }
    } else {
        startCell = null;
    }
}
function handleMouseMove(event) {
    if (!startCell) return; // If no starting cell, exit the function

    const cell = getCell(event.offsetX, event.offsetY);
    
    // Ensure there is at least one path before proceeding
    if (paths.length === 0) return; // Exit if there are no paths

    const lastPath = paths[paths.length - 1]; // Get the last path

    // Ensure lastPath is defined and has a path propert
    if (!lastPath || !lastPath.path) return;

    const lastCell = lastPath.path[lastPath.path.length - 1]; // Get the last cell in the path

    // Check if the current cell is the same as the start cell or the last cell
    if ((cell.x === startCell.x && cell.y === startCell.y) || 
        (cell.x === lastCell.x && cell.y === lastCell.y)) {
        return; // Prevent movement if it's on the start or last cell
    }

    if ((lastCell.x !== cell.x || lastCell.y !== cell.y) && isValidMove(lastCell, cell)) {
        // Check if the last path's color matches the current cell's color
        const currentPoint = levels.find(p => p.x === cell.x && p.y === cell.y);
        if (currentPoint && lastPath.color === currentPoint.color) {
            // Allow movement if the colors match
        } else if (currentPoint) {
            // Block movement if the colors do not match
            return; 
        }

        if (isIntersecting(cell, lastPath)) {
            return; // Prevent intersection
        }

        lastPath.path.push(cell); // Add the current cell to the path
        drawGrid();
        drawPoints();
        drawPaths();
    }
}
function handleMouseUp() {
    if (!startCell) return; // If there's no starting cell, exit the function

    const lastPath = paths[paths.length - 1];
    if (!lastPath) return; // Ensure there's a path to work with

    const startColor = lastPath.color;

    // Check if the connection is complete
    if (checkConnectionComplete(lastPath, startColor)) {
        // Lock the path by adding it to completed connections
        for (const cell of lastPath.path) {
            completedConnections.push(`${cell.x}-${cell.y}-${startColor}`);
        }
        drawGrid();
        drawPoints(levels);
        drawPaths();

        // Show a message indicating successful connection
        showMessage(`Connected ${startColor} dots!`);

        // End the path drawing session
        startCell = null; // Clear the start cell to lock the line drawing
    } else {
        showMessage("Path not complete!");
        paths.pop(); // Remove the last path if not complete
        drawGrid();
        drawPoints(levels);
        drawPaths();
    }

    // Check for win condition
    if (checkWin()) {
        level++;
        if (level < 5) {
            initGame(); // Initialize the next level
        } else {
            showCompletionMessage(); // Show completion message if all levels are done
            clearInterval(timerInterval);
        }
    }
}
function isValidMove(from, to) {
    // Check if the move is adjacent
    const isAdjacent = Math.abs(from.x - to.x) + Math.abs(from.y - to.y) === 1;

    // Check if the target cell is within bounds
    const isInBounds = to.x >= 0 && to.x < gridSize && to.y >= 0 && to.y < gridSize;

    // Check if there is at least one path to check against
    if (paths.length > 0) {
        const lastPath = paths[paths.length - 1]; // Get the last path
        const secondPoint = lastPath.path[lastPath.path.length - 1]; // Get the last cell in the path

        // Check if the target cell is the second point of the same color
        const currentPoint = levels.find(p => p.x === to.x && p.y === to.y);
        if (currentPoint && currentPoint.color === lastPath.color && 
            (to.x === secondPoint.x && to.y === secondPoint.y)) {
            return false; // Prevent moving to the second point of the same color
        }
    }

    return isAdjacent && isInBounds; // Return true if the move is valid
}


function isIntersecting(cell, currentPath) {
    for (let i = 0; i < paths.length; i++) {
        const path = paths[i];
        if (path !== currentPath) {
            if (path.path.some(p => p.x === cell.x && p.y === cell.y)) {
               
                paths.splice(i, 1);
                drawGrid();
                drawPoints();
                drawPaths();
                return false; 
            }
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
