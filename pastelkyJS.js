
// crayon = pasteky

const gameContainer = document.getElementById('game-container');
const levelDisplay = document.getElementById('level');
const timerDisplay = document.getElementById('timer');
const statusDisplay = document.getElementById('status');
const resetButton = document.createElement('button');

resetButton.textContent = "Restart";
resetButton.style.position = 'absolute';
resetButton.style.bottom = '10px';
resetButton.style.backgroundColor = 'green';
resetButton.style.right = '10px';
resetButton.style.fontWeight = 'bold';
resetButton.style.padding = '10px 20px';
resetButton.style.fontSize = '20px';
gameContainer.appendChild(resetButton);

resetButton.addEventListener('click', resetGame); //klik = resetgame

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

function updateLVLdisplay() {levelDisplay.textContent = `Level: ${LVL}`;}
function updateTimerDisplay(timer) {timerDisplay.textContent = `Cas: ${timer}`;}

function spawnPastelky()
{
    //===CLEAR holders
    gameContainer.innerHTML = ''; 
    gameContainer.appendChild(levelDisplay);
    gameContainer.appendChild(timerDisplay);
    gameContainer.appendChild(statusDisplay);
    gameContainer.appendChild(resetButton); 
    
    origPos = []; 
    holders = []; 

    //--------------------------------------------

    for (let i = 0; i < crayonCount; i++) 
    {
        const holder = document.createElement('div');
        holder.classList.add('holder');

        const posX = 50 + (i * 100); // space 
        const posY = gameContainer.clientHeight / 2 - 50; 

        holder.style.left = `${posX}px`;
        holder.style.top = `${posY}px`;

        gameContainer.appendChild(holder);

        holders.push({ x: posX, y: posY });
    }

    const colors = getDistinctColors(crayonCount);
    
    let randomizedPositions = [...holders];
    randomizedPositions.sort(() => Math.random() - 0.5); // after mem phase rand pos 

    for (let i = 0; i < crayonCount; i++) 
        {
        const crayon = document.createElement('div');
        crayon.classList.add('crayon');
        crayon.style.backgroundColor = colors[i];
        const holderX = randomizedPositions[i].x;
        const holderY = randomizedPositions[i].y;

        const crayonX = holderX + (57 - 44) / 2; // doleposun
        const crayonY = holderY + (107 - 94) / 2; // 

        crayon.style.left = `${crayonX}px`;
        crayon.style.top = `${crayonY}px`;
        gameContainer.appendChild(crayon);

        origPos.push({ x: crayonX, y: crayonY }); //orig pos store
    }

    startMemorizationPhase(); //start5 mem 
}

function startMemorizationPhase() 
{
    memorizationTimer = 5; 
    gameActive = false; 
    updateTimerDisplay(memorizationTimer);
    statusDisplay.textContent = 'Zapamataj si usporiadanie pasteliek!';

    clearInterval(memorizationInterval); //fix2 
    
    memorizationInterval = setInterval(() => 
    {
        memorizationTimer--;
        updateTimerDisplay(memorizationTimer);

        if (memorizationTimer <= 0) // aftr 5sec
            { 
            clearInterval(memorizationInterval);
            shuffleCrayons(); 
            startAlignmentTimer(); 
        }
    }, 1000);
}

function startAlignmentTimer() 
{
    alignmentTimer = 15; // reset time
    gameActive = true; 
    updateTimerDisplay(alignmentTimer);
    statusDisplay.textContent = 'Usporiadaj pastelky';

    clearInterval(alignmentInterval);
    
    alignmentInterval = setInterval(() => {
        alignmentTimer--;
        updateTimerDisplay(alignmentTimer);

        if (alignmentTimer <= 0)
        {
            clearInterval(alignmentInterval);
            statusDisplay.textContent = 'Cas uplinul';
            gameActive = false; 
            setTimeout(resetGame, 2000); // reset after 2s
        }
    }, 1000);

    enableDrag();
}
function shuffleCrayons() 
{
    const crayons = document.querySelectorAll('.crayon');
    shuffledPos = [...holders];

    do 
    {//till distinct from orig pos
        shuffledPos.sort(() => Math.random() - 0.5);
    } while (positionsAreEqual(shuffledPos, origPos)); // mmust be false to exit loop 

    crayons.forEach((crayon, index) => {
        const posX = shuffledPos[index].x + 5;
        const posY = shuffledPos[index].y + 150; 

        crayon.style.left = `${posX}px`;
        crayon.style.top = `${posY}px`; 
    });
}

function positionsAreEqual(positions1, positions2) 
{
    for (let i = 0; i < positions1.length; i++) 
        {
        if (positions1[i].x === positions2[i].x && positions1[i].y === positions2[i].y)return true; 
        }
    return false; 
}

function enableDrag() 
{
    const crayons = document.querySelectorAll('.crayon');
    
    crayons.forEach(crayon => {
        crayon.style.position = 'absolute'; 
        crayon.addEventListener('mousedown', dragStart);
    });
}

let selectedCrayon = null;
let offsetX = 0;
let offsetY = 0;

function dragStart(e) 
{
    if (!gameActive) return; //no draggingd when mem phase

    selectedCrayon = e.target;
    offsetX = e.clientX - parseInt(selectedCrayon.style.left);
    offsetY = e.clientY - parseInt(selectedCrayon.style.top);

    document.addEventListener('mousemove', dragMove);
    document.addEventListener('mouseup', dragEnd);
}

function dragMove(e)
 {
    if (!selectedCrayon) return;

    selectedCrayon.style.left = `${e.clientX - offsetX}px`;
    selectedCrayon.style.top = `${e.clientY - offsetY}px`;
}

function dragEnd() 
{
    if (!selectedCrayon) return;

    document.removeEventListener('mousemove', dragMove);
    document.removeEventListener('mouseup', dragEnd);

    checkCrayonPosition(selectedCrayon); 
    selectedCrayon = null;
}

function checkCrayonPosition(crayon) // check if crayon on correctt holder-------------------------------------
{ 
    const crayonX = parseFloat(crayon.style.left);
    const crayonY = parseFloat(crayon.style.top);
    let correctPlacement = false; 

    origPos.forEach((pos, index) => {
        const originalX = pos.x;
        const originalY = pos.y;
        if (Math.abs(crayonX - originalX) < 10 && Math.abs(crayonY - originalY) < 10) {
            crayon.style.left = `${originalX}px`;
            crayon.style.top = `${originalY}px`;
            correctPlacement = true; 
        }
    });

    if (correctPlacement) 
        {
        if (isLevelCompleted()) {
            gameActive = false; 
            clearInterval(alignmentInterval); 
            statusDisplay.textContent = 'Spravne';
            setTimeout(nextLevel, 2000); 
        }
    } else 
    {
        statusDisplay.textContent = 'Usporiadaj pastelky';
    }
}


//----------------------------------------------------------------------------------------------------------------

// pastelky ci su usporiadane ok
function isLevelCompleted() 
{
    return origPos.every((pos, index) => {
        const crayon = document.querySelectorAll('.crayon')[index];
        const crayonX = parseFloat(crayon.style.left);
        const crayonY = parseFloat(crayon.style.top);
        return Math.abs(crayonX - pos.x) < 10 && Math.abs(crayonY - pos.y) < 10;
    });
}
function nextLevel() 
{
    LVL++;
    crayonCount = Math.min(7, crayonCount + 1); // Max crayons = 7
    updateLVLdisplay();
    spawnPastelky(); // Spawn new crayons for next lvl
}

function resetGame() 
{
    LVL = 1;
    crayonCount = 3; // min 3 pastelky
    clearInterval(memorizationInterval);
    clearInterval(alignmentInterval);
    gameActive = false; 
    updateLVLdisplay();
    updateTimerDisplay(0);
    statusDisplay.textContent = 'restatuj hru';
    spawnPastelky(); // Restart game
}

function getDistinctColors(count) {
    const colors = ['#FF0000', '#FFFF00', '#FFA500', '#008000', '#0000FF', '#FFC0CB', '#8B4513']; // Red yellow orange green blue pinkbrown
    return colors.slice(0, count); 
}

spawnPastelky(); // Staart


/*
function trackP(pastelky) {
    pastelky.forEach((pastelky, index) => 
        {
        p.addEventListener('mouseup', () => 
            {
            if (!gameActive) return;

            const pX = parseFloat(pastelky.style.left);
            const pY = parseFloat(pastelky.style.top);

            const originalX = originalPositions[index].x;
            const originalY = originalPositions[index].y;

            if (Math.abs(pX - originalX) < 10 && Math.abs(pY - originalY) < 10) 
            {
                pastelky.style.left = `${originalX}px`;
                pastelky.style.top = `${originalY}px`;
            }if (isLevelCompleted())
             {
                gameActive = false; 
                statusDisplay.textContent = 'daco rozjebem';
                setTimeout(nextLevel, 2000); 
            }
        });
    });
}*/
