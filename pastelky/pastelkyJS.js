const gameContainer = document.getElementById('game-container');
const titleScreen = document.getElementById('title-screen');
const startButton = document.getElementById('start-button');
const quitButton = document.getElementById('quit-button');


startButton.addEventListener('click', () => {
    titleScreen.style.display = 'none'; // Hide title screen
    gameContainer.style.display = 'block'; // Show game container
    spawnPastelky(); // Start the game
});

// Function to show the game screen and hide the title screen
function startGame() {
    titleScreen.style.display = 'none';
    gameContainer.style.display = 'block';
    resetGame(); // Start the game at level 1
}

// Function to quit the game and return to the title screen
function quitGame() {
    titleScreen.style.display = 'flex';
    gameContainer.style.display = 'none';
    clearInterval(memorizationInterval);
    clearInterval(alignmentInterval);
    statusDisplay.textContent = ''; // Clear game status text
}

// Event listeners for start and quit buttons
startButton.addEventListener('click', startGame);

const levelDisplay = document.getElementById('level');
const statusDisplay = document.getElementById('status');
const resetButton = document.createElement('button');

const progressBar = document.querySelector('.progress-bar');
const progressFill = document.querySelector('.progress-fill');

resetButton.textContent = "Restart";
resetButton.style.position = 'absolute';
resetButton.style.bottom = '10px';
resetButton.style.backgroundColor = 'orange';
resetButton.style.right = '10px';
resetButton.style.fontWeight = 'bold';
resetButton.style.padding = '10px 20px';
resetButton.style.fontSize = '20px';
resetButton.style.borderRadius = '11px';
gameContainer.appendChild(resetButton);

resetButton.addEventListener('click', resetGame);

quitButton.textContent = "Quit Game";
quitButton.style.position = 'absolute';
quitButton.style.bottom = '440px';
quitButton.style.backgroundColor = 'orange';
quitButton.style.right = '10px';
quitButton.style.fontWeight = 'bold';
quitButton.style.padding = '13px 13px';
quitButton.style.fontSize = '13px';
quitButton.style.borderRadius = '13px';
gameContainer.appendChild(quitButton);

quitButton.addEventListener('click', quitGame);

let crayonCount = 3;
let origPos = [];
let shuffledPos = [];
let LVL = 1;
let memorizationTimer = 5;
let alignmentTimer = 15;
let gameActive = false;
let holders = [];
let memorizationInterval;
let alignmentInterval;

/////////////////////////////////////////////////////////////////////
function updateLVLdisplay() {
    levelDisplay.textContent = `Level: ${LVL}`;
   // levelDisplay.style.color = orange;
}
//function updateProgressBar(timer, maxTime) {
 //   if (timer < 0) timer = 0; // Ensure timer does not go negative
   // progressFill.style.width = `${(timer / maxTime) * 100}%`;
//}
function updateProgressBar(remainingTime, maxTime) {
    const percentage = Math.max((remainingTime / maxTime) * 100, 0); 
    progressFill.style.width = `${percentage}%`;
}


/////////////////////////////////////////////////////////////////////////
function spawnPastelky() {
    updateProgressBar(5, 5);
    gameContainer.innerHTML = '';
    gameContainer.appendChild(levelDisplay);
    gameContainer.appendChild(statusDisplay);
    gameContainer.appendChild(resetButton);
    gameContainer.appendChild(quitButton);
    gameContainer.appendChild(progressBar);

    origPos = [];
    holders = [];

    for (let i = 0; i < crayonCount; i++) {
        const holder = document.createElement('img'); 
        holder.classList.add('holder');
        holder.src = 'c0.png'; 

        const posX = 50 + (i * 100);
        const posY = gameContainer.clientHeight / 2 - 50;

        holder.style.position = 'absolute';
        holder.style.left = `${posX}px`;
        holder.style.top = `${posY}px`;

        gameContainer.appendChild(holder);

        holders.push({ x: posX, y: posY });
    }
    /*for (let i = 0; i < crayonCount; i++) {
        const holder = document.createElement('div');
        holder.classList.add('holder');

        const posX = 50 + (i * 100);
        const posY = gameContainer.clientHeight / 2 - 50;

        holder.style.left = `${posX}px`;
        holder.style.top = `${posY}px`;

        gameContainer.appendChild(holder);

        holders.push({ x: posX, y: posY });
    }*/

    // Place crayons in random initial positions
    let randomizedPositions = [...holders];
    randomizedPositions.sort(() => Math.random() - 0.5);

    for (let i = 0; i < crayonCount; i++) {
        const crayon = document.createElement('img');
        crayon.classList.add('crayon');
        crayon.src = `crayon${i + 1}.png`; 
        crayon.style.position = 'absolute';
        crayon.draggable = false; //ez

        const holderX = randomizedPositions[i].x;
        const holderY = randomizedPositions[i].y;

        const crayonX = holderX + (21) / 2;
        const crayonY = holderY + (-80) / 2;

        crayon.style.left = `${crayonX}px`;
        crayon.style.top = `${crayonY}px`;
        gameContainer.appendChild(crayon);


        origPos.push({ x: crayonX, y: crayonY });
    }

    startMemorizationPhase();
}

window.addEventListener('resize', () => {
    spawnPastelky(); 
});




/*function spawnPastelky() {
    updateProgressBar(5, 5);
    gameContainer.innerHTML = '';
    gameContainer.appendChild(levelDisplay);
    gameContainer.appendChild(statusDisplay);
    gameContainer.appendChild(resetButton);
    gameContainer.appendChild(progressBar);
    
    origPos = [];
    holders = [];

    for (let i = 0; i < crayonCount; i++) {
        const holder = document.createElement('div');
        holder.classList.add('holder');

        const posX = 50 + (i * 100);
        const posY = gameContainer.clientHeight / 2 - 50;

        holder.style.left = `${posX}px`;
        holder.style.top = `${posY}px`;

        gameContainer.appendChild(holder);

        holders.push({ x: posX, y: posY });
    }

    const colors = getDistinctColors(crayonCount);
    
    let randomizedPositions = [...holders];
    randomizedPositions.sort(() => Math.random() - 0.5);

    for (let i = 0; i < crayonCount; i++) {
        const crayon = document.createElement('div');
        crayon.classList.add('crayon');
        crayon.style.backgroundColor = colors[i];
        const holderX = randomizedPositions[i].x;
        const holderY = randomizedPositions[i].y;

        const crayonX = holderX + (57 - 44) / 2;
        const crayonY = holderY + (107 - 94) / 2;

        crayon.style.left = `${crayonX}px`;
        crayon.style.top = `${crayonY}px`;
        gameContainer.appendChild(crayon);

        origPos.push({ x: crayonX, y: crayonY });
    }

    startMemorizationPhase();
}*/

function startMemorizationPhase() {
    memorizationTimer = 5; 
    gameActive = false;
    updateProgressBar(memorizationTimer, memorizationTimer); 
    statusDisplay.textContent = 'Zapamataj si usporiadanie pasteliek!';

    clearInterval(memorizationInterval);
    memorizationInterval = setInterval(() => {
        memorizationTimer -= 0.1; 
        console.log(`Timer: ${memorizationTimer.toFixed(1)}`); 

        updateProgressBar(memorizationTimer, 5); 

        if (memorizationTimer <= 0) {
            clearInterval(memorizationInterval);
            memorizationTimer = 0; 
            updateProgressBar(memorizationTimer, 5);
            shuffleCrayons();
            startAlignmentTimer();
        }
    }, 100); 
}

function startAlignmentTimer() {
    alignmentTimer = 15;
    gameActive = true;
    updateProgressBar(15, 15);
    statusDisplay.textContent = 'Usporiadaj pastelky';

    clearInterval(alignmentInterval);

    alignmentInterval = setInterval(() => {
        alignmentTimer--;
        updateProgressBar(alignmentTimer, 15);

        if (alignmentTimer <= 0) {
            clearInterval(alignmentInterval);
            statusDisplay.textContent = 'Cas uplynul';
            gameActive = false;
            setTimeout(resetGame, 2000);
        }
    }, 1000);

    enableDrag();
}

function shuffleCrayons() {
    const crayons = document.querySelectorAll('.crayon');
    shuffledPos = [...holders];

    do {
        shuffledPos.sort(() => Math.random() - 0.5);
    } while (positionsAreEqual(shuffledPos, origPos));

    crayons.forEach((crayon, index) => {
        const posX = shuffledPos[index].x + 5;
        const posY = shuffledPos[index].y + 150;

        crayon.style.left = `${posX}px`;
        crayon.style.top = `${posY}px`;
    });
}

function positionsAreEqual(positions1, positions2) {
    for (let i = 0; i < positions1.length; i++) {
        if (positions1[i].x === positions2[i].x && positions1[i].y === positions2[i].y) return true;
    }
    return false;
}

function enableDrag() {
    const crayons = document.querySelectorAll('.crayon');

    crayons.forEach(crayon => {
        crayon.style.position = 'absolute';
        crayon.style.cursor = 'pointer';

        crayon.removeEventListener('mousedown', dragStart);
        crayon.addEventListener('mousedown', dragStart);
    });
}

let selectedCrayon = null;
let offsetX = 0;
let offsetY = 0;

function dragStart(e) {
   
    if (!gameActive || e.button !== 0) return;

    selectedCrayon = e.target;
    offsetX = e.clientX - parseFloat(selectedCrayon.style.left);
    offsetY = e.clientY - parseFloat(selectedCrayon.style.top);

    document.addEventListener('mousemove', dragMove);
    document.addEventListener('mouseup', dragEnd);
}

function dragMove(e) {
    if (!selectedCrayon) return;

    selectedCrayon.style.left = `${e.clientX - offsetX}px`;
    selectedCrayon.style.top = `${e.clientY - offsetY}px`;
}

function dragEnd() {
    if (!selectedCrayon) return;

    document.removeEventListener('mousemove', dragMove);
    document.removeEventListener('mouseup', dragEnd);

    checkCrayonPosition(selectedCrayon);

    selectedCrayon = null;
}


/*
function dragMove(e) {
    if (!selectedCrayon) return;
    selectedCrayon.style.left = `${e.clientX - offsetX}px`;
    selectedCrayon.style.top = `${e.clientY - offsetY}px`;
}

function dragStart(e) {
    if (!gameActive) return;

    selectedCrayon = e.target;
    prevPosition = {
        x: parseFloat(selectedCrayon.style.left),
        y: parseFloat(selectedCrayon.style.top)
    };

    offsetX = e.clientX - parseInt(selectedCrayon.style.left);
    offsetY = e.clientY - parseInt(selectedCrayon.style.top);

    document.addEventListener('mousemove', dragMove);
    document.addEventListener('mouseup', dragEnd);
}

function dragEnd() {
    if (!selectedCrayon) return;

    document.removeEventListener('mousemove', dragMove);
    document.removeEventListener('mouseup', dragEnd);

    checkCrayonPosition(selectedCrayon);
    selectedCrayon = null;
}*/

function checkCrayonPosition(crayon) {
    const crayonX = parseFloat(crayon.style.left);
    const crayonY = parseFloat(crayon.style.top);
    let placedOnHolder = false;
    let holderOccupied = false;

    holders.forEach((holder, index) => {
        const holderX = holder.x;
        const holderY = holder.y;

        if (Math.abs(crayonX - holderX) < 50 && Math.abs(crayonY - holderY) < 50) {
            const crayons = document.querySelectorAll('.crayon');
            crayons.forEach(otherCrayon => {
                if (otherCrayon !== crayon) {
                    const otherCrayonX = parseFloat(otherCrayon.style.left);
                    const otherCrayonY = parseFloat(otherCrayon.style.top);
                    if (Math.abs(otherCrayonX - holderX) < 10 && Math.abs(otherCrayonY - holderY) < 10) holderOccupied = true;
                }
            });

            if (!holderOccupied) {
                crayon.style.left = `${holderX + (21) / 2}px`;
                crayon.style.top = `${holderY + (-80) / 2}px`;

                // const crayonX = holderX + (21) / 2;
                // const crayonY = holderY + (-80) / 2; 

                placedOnHolder = true;
            }
        }
    });

    if (holderOccupied) {
        crayon.style.left = `${prevPosition.x}px`;
        crayon.style.top = `${prevPosition.y}px`;
    }

    if (placedOnHolder && !holderOccupied && isLevelCompleted()) {
        gameActive = false;
        clearInterval(alignmentInterval);
        statusDisplay.textContent = 'Spravne';
        setTimeout(nextLevel, 2000);
    } else if (!holderOccupied) {
        statusDisplay.textContent = 'Usporiadaj pastelky';
    }
}

function isLevelCompleted() {
    return origPos.every((pos, index) => {
        const crayon = document.querySelectorAll('.crayon')[index];
        const crayonX = parseFloat(crayon.style.left);
        const crayonY = parseFloat(crayon.style.top);
        return Math.abs(crayonX - pos.x) < 10 && Math.abs(crayonY - pos.y) < 10;
    });
}

function nextLevel() {
    LVL++;
    crayonCount = Math.min(7, crayonCount + 1);
    updateLVLdisplay();
    spawnPastelky();
}

function resetGame() {
    LVL = 1;
    crayonCount = 3;
    clearInterval(memorizationInterval);
    clearInterval(alignmentInterval);
    gameActive = false;
    updateLVLdisplay();
    updateProgressBar(1, 1);
    statusDisplay.textContent = 'restatuj hru';
    spawnPastelky();
}

/*function getDistinctColors(count) {
    const colors = ['#FF0000', '#FFFF00', '#FFA500', '#008000', '#0000FF', '#FFC0CB', '#8B4513'];
    return colors.slice(0, count);
}*/

spawnPastelky();
