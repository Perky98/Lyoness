
const imageOverlay = document.getElementById('image-overlay');
const overlayImage = document.getElementById('overlay-image');
const titleScreen = document.getElementById('title-screen');
const startButton = document.getElementById('start-button');

const resetButton = document.createElement('button');

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
//* go--------------------------------------*/
const gameOverscreen = document.getElementById('gameOver-screen');
const finalScoreDisplay = document.getElementById('final-score');
const restartButton = document.getElementById('restart-button');







const backgroundImage = new Image();
const arrow = new Image();
const gStickman = new Image();
const yStickman = new Image();
const bStickman = new Image();

let imagesLoaded = 0;
const totalImages = 5;

function gameOver() {
    gameActive = false;
    clearInterval(alignmentInterval);
    clearInterval(memorizationInterval);
//console.log('kkoniec');
    gameContainer.style.display = 'none';
    gameOverscreen.style.display = 'flex';
    finalScoreDisplay.textContent = `Skóre: ${score}`;
}

restartButton.addEventListener('click', () => {
    gameOverscreen.style.display = 'none'; 
    score = 0; 
    LVL = 1; 
    startGame(); 
});
function restartGame() {
    //console.log('reeestart');
    titleScreen.style.display = 'flex'; 
    gameContainer.style.display = 'none'; 
    score=0;
    startGame();
}
//* go--------------------------------------*/


/*jakoou */
resetButton.textContent = "Restart";
resetButton.style.position = 'absolute';
resetButton.style.fontFamily = 'Comic Sans MS';
resetButton.style.bottom = '10px';
resetButton.style.backgroundColor = 'white';
resetButton.style.right = '10px';
resetButton.style.fontWeight = 'bold';
resetButton.style.padding = '10px 20px';
resetButton.style.fontSize = '20px';
resetButton.style.borderRadius = '11px';
gameContainer.appendChild(resetButton);

resetButton.addEventListener('click', gameStart);//=-------------------==-=-=--=rgffds

/*no */

//------------------------------------------------uvod

startButton.addEventListener('click', () => {
    titleScreen.style.display = 'none'; 
    gameContainer.style.display = 'block'; 
    checkImagesLoaded();
});
/*
startButton.addEventListener('click', startGame);
function startGame() {//fghsgh===============
    titleScreen.style.display = 'none';
    gameContainer.style.display = 'block';}
    
    function startGame() {//fghsgh===============
        titleScreen.style.display = 'none';
        gameContainer.style.display = 'block';
        resetGame(); 
    }*/
//--------------------------------------------------gui

const levelIcon = document.createElement('img');
    levelIcon.id = 'level-icon';
    levelIcon.src = 'helpB.png'; // 100x100 im
    levelIcon.style.width = '85px';
    levelIcon.style.height = '85px';
    levelIcon.style.marginRight = '10px';
    levelIcon.style.cursor = 'pointer';
gameContainer.appendChild(levelIcon);


//----heeelp
levelIcon.addEventListener('click', () => {
    imageOverlay.style.display = 'flex'; 
});

overlayImage.addEventListener('click', () => {
    imageOverlay.style.display = 'none'; 
    startGame(); 
});

//---help
//--------------------------------------------------gui

backgroundImage.src = "TTRmapa1.jpg";
arrow.src = "arrow.png";
gStickman.src = "panak1g.png";
yStickman.src = "panak2y.png";
bStickman.src = "panak3b.png";

function checkImagesLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        gameStart();
    }
}

backgroundImage.onload = checkImagesLoaded;
arrow.onload = checkImagesLoaded;
gStickman.onload = checkImagesLoaded;
yStickman.onload = checkImagesLoaded;
bStickman.onload = checkImagesLoaded;

function gameStart() {
    const colors = ["g", "y", "b"];
    const stickmanImages = {
        g: gStickman,
        y: yStickman,
        b: bStickman
    };

    const trashBins = {
        g: { x: 577, y: 170 },
        y: { x: 755, y: 345 },
        b: { x: 715, y: 460 }
    };

    const stickmen = [];
    const crossroads = [
        { x: 325, y: 220, radius: 55, arrowDirection: "down" },
        { x: 600, y: 390, radius: 55, arrowDirection: "down" }
    ];

    let score = 0;
    const speed = 1;
    let stickmanCount = 0;
    const maxP = 50;
    let spawnCooldown = 4000;
    const spawnReductionRate = 100;
    let correctBinMessage = null;
    let incorrectBinMessage = null;
    let correctBinTimer = null;
    let incorrectBinTimer = null;

    function calculateDirection(fromX, fromY, toX, toY) {
        const dx = toX - fromX;
        const dy = toY - fromY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return { unitX: dx / distance, unitY: dy / distance };
    }

    function updateStickmanDirection(stickman, targetX, targetY) {
        const direction = calculateDirection(stickman.x, stickman.y, targetX, targetY);
        stickman.unitX = direction.unitX;
        stickman.unitY = direction.unitY;
    }

    function spawnStickman() {
        if (stickmanCount >= maxP) return;

        const color = colors[Math.floor(Math.random() * colors.length)];
        const stickman = {
            x: 115,
            y: 75,
            color: color,
            targetX: 295,
            targetY: 170,
            finalTargetX: trashBins[color].x,
            finalTargetY: trashBins[color].y,
            finalTargetColor: color,
            reached: false,
            currentCrossroad: 0
        };
        updateStickmanDirection(stickman, stickman.targetX, stickman.targetY);
        stickmen.push(stickman);
        stickmanCount++;

        spawnCooldown = Math.max(1000, spawnCooldown - spawnReductionRate);

        setTimeout(spawnStickman, spawnCooldown);
    }

    function gameLoop() {
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

        for (let i = stickmen.length - 1; i >= 0; i--) {
            const stickman = stickmen[i];

            if (!stickman.reached) {
                stickman.x += stickman.unitX * speed;
                stickman.y += stickman.unitY * speed;

                if (Math.abs(stickman.x - stickman.targetX) < 2 && Math.abs(stickman.y - stickman.targetY) < 2) {
                    stickman.reached = true;

                    if (stickman.targetX === 295 && stickman.targetY === 170) {
                        if (crossroads[0].arrowDirection === "down") {
                            stickman.targetX = 580;
                            stickman.targetY = 340;
                            stickman.currentCrossroad = 1;
                        } else if (crossroads[0].arrowDirection === "straight") {
                            stickman.targetX = trashBins.g.x;
                            stickman.targetY = trashBins.g.y;
                            stickman.finalTargetColor = "g";
                        }
                    } else if (stickman.targetX === 580 && stickman.targetY === 340) {
                        if (crossroads[1].arrowDirection === "down") {
                            stickman.targetX = trashBins.b.x;
                            stickman.targetY = trashBins.b.y;
                            stickman.finalTargetColor = "b";
                        } else if (crossroads[1].arrowDirection === "straight") {
                            stickman.targetX = trashBins.y.x;
                            stickman.targetY = trashBins.y.y;
                            stickman.finalTargetColor = "y";
                        }
                    }

                    for (const color in trashBins) {
                        const trashBin = trashBins[color];
                        if (
                            Math.abs(stickman.x - trashBin.x) < 5 &&
                            Math.abs(stickman.y - trashBin.y) < 5
                        ) {
                            if (color === stickman.color) {
                                score++;
                                correctBinMessage = { text: "spravny kos", x: stickman.x, y: stickman.y };
                                clearTimeout(correctBinTimer);
                                correctBinTimer = setTimeout(() => {
                                    correctBinMessage = null;
                                }, 500);
                            } else {
                                incorrectBinMessage = { text: "nespravny kos", x: stickman.x, y: stickman.y };
                                clearTimeout(incorrectBinTimer);
                                incorrectBinTimer = setTimeout(() => {
                                    incorrectBinMessage = null;
                                }, 500);
                            }
                            stickmen.splice(i, 1);
                            break;
                        }
                    }

                    stickman.reached = false;
                    updateStickmanDirection(stickman, stickman.targetX, stickman.targetY);
                }
            }

            const stickmanImage = stickmanImages[stickman.color];
            ctx.drawImage(stickmanImage, stickman.x, stickman.y, 30, 60);
        }

        crossroads.forEach(crossroad => {
            ctx.fillStyle = "rgba(22, 188, 22, 0.3)";
            ctx.beginPath();
            ctx.arc(crossroad.x, crossroad.y, crossroad.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.closePath();

            ctx.save();
            ctx.translate(crossroad.x, crossroad.y);
            if (crossroad.arrowDirection === "down") {
                ctx.rotate(Math.PI / 2);
            }
            ctx.drawImage(arrow, -20, -20, 40, 40);
            ctx.restore();
        });

        if (correctBinMessage) {
            ctx.fillStyle = "yellow";
            ctx.font = "20px Comic Sans MS";
            ctx.fillText(correctBinMessage.text, correctBinMessage.x, correctBinMessage.y - 10);
        }

        if (incorrectBinMessage) {
            ctx.fillStyle = "red";
            ctx.font = "20px Comic Sans MS";
            ctx.fillText(incorrectBinMessage.text, incorrectBinMessage.x, incorrectBinMessage.y - 10);
        }

        ctx.fillStyle = "black";
        ctx.font = "33px Comic Sans MS";
        ctx.fillText(`Skóre: ${score} / 50`, 215, 42);

        if (stickmanCount >= maxP) {
            ctx.fillStyle = "red";
            ctx.font = "28px Comic Sans MS";
           /* ctx.fillText("Koniec hry", 400, 70);=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-*/
           gameOver();
        }

        requestAnimationFrame(gameLoop);
    }

    function gameOver() {
       //console.log('kkoniec');
        gameContainer.style.display = 'none';
        gameOverscreen.style.display = 'flex';
        finalScoreDisplay.textContent = `Skóre: ${score}`;
    }

    canvas.addEventListener("click", (event) => {
        const rect = canvas.getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        const clickY = event.clientY - rect.top;

        crossroads.forEach(crossroad => {
            const distance = Math.sqrt((clickX - crossroad.x) ** 2 + (clickY - crossroad.y) ** 2);
            if (distance < crossroad.radius) {
                crossroad.arrowDirection = crossroad.arrowDirection === "straight" ? "down" : "straight";
            }
        });
    });

    setTimeout(spawnStickman, 2000);
    gameLoop();
}