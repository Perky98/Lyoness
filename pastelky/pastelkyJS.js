const gameContainer = document.getElementById('game-container');
const titleScreen = document.getElementById('title-screen');
const startButton = document.getElementById('start-button');
const canvas = document.getElementById('gameCanvas');
const imageOverlay = document.getElementById('image-overlay');
const overlayImage = document.getElementById('overlay-image');
const koniecButton = document.getElementById('koniec-button');


let alignmentStartPositions = [];


let score = 0; 
const gameOverscreen = document.getElementById('gameOver-screen');
const finalScoreDisplay = document.getElementById('final-score');
const restartButton = document.getElementById('restart-button');

startButton.addEventListener('click', () => {
    titleScreen.style.display = 'none'; 
    gameContainer.style.display = 'block'; 
    spawnPastelky(); 
});

function startGame() {//fghsgh===============
    titleScreen.style.display = 'none';
    gameContainer.style.display = 'block';
    resetGame(); 
}

startButton.addEventListener('click', () => {
    
});


function quitGame() {
    titleScreen.style.display = 'block';
    gameContainer.style.display = 'none';
    clearInterval(memorizationInterval);
    clearInterval(alignmentInterval);
  //  statusDisplay.textContent = ''; 
}

startButton.addEventListener('click', startGame);

const levelDisplay = document.getElementById('level');
//const statusDisplay = document.getElementById('status');
const resetButton = document.createElement('button');

const progressBar = document.querySelector('.progress-bar');
const progressFill = document.querySelector('.progress-fill');

resetButton.textContent = "Restart";
resetButton.style.position = 'absolute';
resetButton.style.fontFamily = 'Comic Sans MS';
resetButton.style.bottom = '10px';
resetButton.style.backgroundColor = 'white';
resetButton.style.right = '10px';
resetButton.style.fontWeight = 'bold';
resetButton.style.padding = '8px 14px';
resetButton.style.fontSize = '13px';
resetButton.style.borderRadius = '11px';
gameContainer.appendChild(resetButton);

resetButton.addEventListener('click', resetGame);

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

const scoreDisplay = document.createElement('div');
scoreDisplay.id = 'score';
scoreDisplay.style.position = 'relative';
scoreDisplay.style.top = '-32px';
scoreDisplay.style.right = '-690px';
scoreDisplay.style.black = 'white';
scoreDisplay.style.fontSize = '24px';
scoreDisplay.style.fontWeight = 'bold';
gameContainer.appendChild(scoreDisplay);


const levelIcon = document.createElement('img');
    levelIcon.id = 'level-icon';
    levelIcon.src = 'helpB.png'; // 100x100 im
    levelIcon.style.width = '85px';
    levelIcon.style.height = '85px';
    levelIcon.style.marginRight = '10px';
    levelIcon.style.cursor = 'pointer';
gameContainer.appendChild(levelIcon);



function gameOver() {
    gameActive = false;
    clearInterval(alignmentInterval);
    clearInterval(memorizationInterval);
//console.log('kkoniec');
    gameContainer.style.display = 'none';
    gameOverscreen.style.display = 'block';
    finalScoreDisplay.textContent = `Skóre: ${score}`;
}


restartButton.addEventListener('click', () => {
    gameOverscreen.style.display = 'none'; 
    score = 0; 
    LVL = 1; 
    startGame(); 
});
function updateScore(points) {
    score += points;
    scoreDisplay.textContent = `Skóre: ${score}`;
}

//=================================================================================-----Heeelp
levelIcon.addEventListener('click', () => {
    imageOverlay.style.display = 'block'; 

    //imageOverlay.style.position = 'relative';
   // imageOverlay.style.padding = '10px 20px';
});
overlayImage.addEventListener('click', () => {
    imageOverlay.style.display = 'none'; 
    startGame(); 
});
function restartGame() {
    //console.log('reeestart');
    titleScreen.style.display = 'block'; 
    gameContainer.style.display = 'none'; 
    resetGame();
}
//=================================================================================-----

//let score = 0; 

function updateLVLdisplay() {
    levelDisplay.textContent = `Level: ${LVL}`;
}


/*
function updateProgressBar(remainingTime, maxTime) {
    const percentage = Math.max((remainingTime / maxTime) * 100, 0); 
    progressFill.style.width = `${percentage}%`;
}
*/













function spawnPastelky() {
    updateProgressBar(5, 5);
    gameContainer.innerHTML = '';
    gameContainer.appendChild(levelIcon);
    gameContainer.appendChild(levelDisplay);
   // gameContainer.appendChild(statusDisplay);
    gameContainer.appendChild(resetButton);
    gameContainer.appendChild(progressBar);
    gameContainer.appendChild(scoreDisplay); 
   

    origPos = [];
    holders = [];

    const screenWidth = gameContainer.clientWidth;
    const screenHeight = gameContainer.clientHeight;

    const holderCenterY = screenHeight / 2 - 50; 

    // pastelky horz usp
    for (let i = 0; i < crayonCount; i++) {
        const holder = document.createElement('img');
        holder.classList.add('holder');
        holder.src = 'c0.png';

        const posX = (screenWidth / 2) - (crayonCount * 50) + (i * 100); 
        const posY = holderCenterY;

        holder.style.position = 'absolute';
        holder.style.left = `${posX}px`;
        holder.style.top = `${posY}px`;

        gameContainer.appendChild(holder);

        holders.push({ x: posX, y: posY });
    }

    // rand poz pasteliek
    let randomizedPositions = [...holders];
    randomizedPositions.sort(() => Math.random() - 0.5);

    for (let i = 0; i < crayonCount; i++) {
        const crayon = document.createElement('img');
        crayon.classList.add('crayon');
        crayon.src = `crayon${i + 1}.png`;
        crayon.style.position = 'absolute';
        crayon.draggable = false;

        const holderX = randomizedPositions[i].x;
        const holderY = randomizedPositions[i].y;

        const crayonX = holderX; //+ (2) / 2;//-----------------------------------------------------------------------------------------------------
        const crayonY = holderY + (-50);

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

function startMemorizationPhase() {
    memorizationTimer = 5; 
    gameActive = false;
    updateProgressBar(memorizationTimer, memorizationTimer); 
    //statusDisplay.textContent = 'Zapamataj si usporiadanie pasteliek!';

    clearInterval(memorizationInterval);
    memorizationInterval = setInterval(() => {
        memorizationTimer -= 0.1; 
      //  console.log(`Timer: ${memorizationTimer.toFixed(1)}`); 

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
    updateProgressBar(alignmentTimer, 15);
    enableHoverEffect();

    alignmentStartPositions = [];
    const crayons = document.querySelectorAll('.crayon');
    crayons.forEach(crayon => {
        alignmentStartPositions.push({
            x: parseFloat(crayon.style.left),
            y: parseFloat(crayon.style.top)
        });
    });

    clearInterval(alignmentInterval);

    alignmentInterval = setInterval(() => {
        alignmentTimer -= 0.1; // kkk
        updateProgressBar(alignmentTimer, 15);

        if (alignmentTimer <= 0) {
            clearInterval(alignmentInterval);
            gameActive = false;
            gameOver();
        }
    }, 100); 

    enableDrag();
}

function updateProgressBar(remainingTime, maxTime) {
    const percentage = Math.max((remainingTime / maxTime) * 100, 0);
    progressFill.style.width = `${percentage}%`;

    const green = Math.min(255, Math.floor((remainingTime / maxTime) * 255));
    const red = Math.min(255, 255 - green);
    const color = `rgb(${red}, ${green}, 0)`;

    progressFill.style.backgroundColor = color;
}

function shuffleCrayons() {
    const crayons = document.querySelectorAll('.crayon');
    shuffledPos = [...holders];

    do {
        shuffledPos.sort(() => Math.random() - 0.5);
    } while (positionsAreEqual(shuffledPos, origPos));

    alignmentStartPositions = []; 
    crayons.forEach((crayon, index) => {
        const posX = shuffledPos[index].x + 5;
        const posY = shuffledPos[index].y + 190;

        crayon.style.left = `${posX}px`;
        crayon.style.top = `${posY}px`;

        alignmentStartPositions.push({ x: posX, y: posY });
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

function enableHoverEffect() {
    const crayons = document.querySelectorAll('.crayon');

    crayons.forEach(crayon => {
        crayon.addEventListener('mouseenter', () => {
            if (gameActive) {
                crayon.style.transform = 'translateY(-20px)';
               // crayon.style.boxShadow = '0px 10px 20px rgba(0, 0, 0, 0.3)';
            }
        });

        crayon.addEventListener('mouseleave', () => {
            crayon.style.transform = 'translateY(0)';
            crayon.style.boxShadow = 'none';
        });
    });
}




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
      
                    if (Math.abs(otherCrayonX - holderX) < 50 && Math.abs(otherCrayonY - (holderY - 50)) < 50) {
                        holderOccupied = true;
                    }
                }
            });

      
            if (!holderOccupied) {
                crayon.style.left = `${holderX + 2}px`;
                crayon.style.top = `${holderY - 50}px`;
                placedOnHolder = true;
            }
        }
    });

  
    if (holderOccupied || !placedOnHolder) {
        const crayonIndex = Array.from(document.querySelectorAll('.crayon')).indexOf(crayon);
        crayon.style.left = `${alignmentStartPositions[crayonIndex].x}px`;
        crayon.style.top = `${alignmentStartPositions[crayonIndex].y}px`;
    }

  
    if (placedOnHolder && !holderOccupied && isLevelCompleted()) {
        gameActive = false;
        clearInterval(alignmentInterval);
        setTimeout(nextLevel, 500);
    }
}
function increaseScore() {
    score += 100; 
    updateScoreDisplay();
}

function updateScoreDisplay() {
    scoreDisplay.textContent = `Skóre: ${score}`;
}

function isLevelCompleted() {
    return origPos.every((pos, index) => {
        const crayon = document.querySelectorAll('.crayon')[index];
        const crayonX = parseFloat(crayon.style.left);
        const crayonY = parseFloat(crayon.style.top);
        //const crayonX = -200; 
        //const crayonY = holderY;

        return Math.abs(crayonX - pos.x) < 10 && Math.abs(crayonY - pos.y) < 10;
    });
}

function nextLevel() {
    LVL++;
    crayonCount = Math.min(8, crayonCount + 1);
    updateLVLdisplay();
    increaseScore(); 
    spawnPastelky();
}

function resetGame() {
    LVL = 1;
    crayonCount = 3;
    score = 0; // 
    updateScoreDisplay(); 
    clearInterval(memorizationInterval);
    clearInterval(alignmentInterval);
    gameActive = false;
    updateLVLdisplay();
    updateProgressBar(1, 1);
   // statusDisplay.textContent = 'Restatuj hru';
    spawnPastelky();
}

updateScoreDisplay();
spawnPastelky();
