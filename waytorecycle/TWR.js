const imageOverlay = document.getElementById('image-overlay');
const overlayImage = document.getElementById('overlay-image');
const titleScreen = document.getElementById('title-screen');
const startButton = document.getElementById('start-button');

const resetButton = document.createElement('button');

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
//* go--------------------------------------*/

const gameOverscreen = document.getElementById('GOscreen');
//const finalScoreDisplay = document.getElementById('final-score');
const GOrestartButton = document.getElementById('restart-button');

const backgroundImage = new Image();
const arrow = new Image();
const gStickman = new Image();
const yStickman = new Image();
const bStickman = new Image();
const blStickman = new Image();

let imagesLoaded = 0;
const totalImages = 5;

const stickmen = [];
const crossroads = [
    { x: 325, y: 220, radius: 55, arrowDirection: "down" },
    { x: 600, y: 390, radius: 55, arrowDirection: "down" },
    { x: 800, y: 390, radius: 55, arrowDirection: "up" }
];



/*FIXFIXFIX=========FIXFIXFIXFIXFIXFIXFIXFIXFIXFIXFIXFIXFIXFIXFIXFIXFIXFIXFIXFIXFIXFIXFIXFIXFIXFIXFIXFIXFIXFIXFIXFIXFIXFIXFIXFIX
const scoreLabel = document.createElement('div');
scoreLabel.textContent = `Score: ${score}`; // Replace `currentScore` with your score variable
scoreLabel.style.position = 'absolute';
scoreLabel.style.fontFamily = 'Comic Sans MS';

scoreLabel.style.bottom = '1031px';
scoreLabel.style.backgroundColor = 'white';
scoreLabel.style.right = '1031px';
//scoreLabel.style.top = '50%'; 
//scoreLabel.style.left = '50%';
//scoreLabel.style.transform = 'translate(-50%, -50%)'; // Center the text
scoreLabel.style.fontWeight = 'bold';
//scoreLabel.style.padding = '12px 20px';
//scoreLabel.style.fontSize = '33px';
scoreLabel.style.zIndex =1;
//scoreLabel.style.borderRadius = '12px';
scoreLabel.style.boxShadow = '0px 4px 6px rgba(0, 0, 0, 0.1)';
scoreLabel.style.textAlign = 'center';

// Append the score label to the game container
gameOverscreen.appendChild(scoreLabel);
*/











let correctBinTimer = null;
let incorrectBinTimer = null;


let score = 0;

/*
let checkImagesLoaded = null;
backgroundImage.onload = checkImagesLoaded;
arrow.onload = checkImagesLoaded;
gStickman.onload = checkImagesLoaded;
yStickman.onload = checkImagesLoaded;
bStickman.onload = checkImagesLoaded;
*/




function gameOver() {
//gameActive = false;
// clearInterval(alignmentInterval);
//clearInterval(memorizationInterval);
//console.log('kkoniec');
   //gameContainer.style.display = 'none';
   gameOverscreen.style.display = 'flex';
   finalScoreDisplay.style.display = 'relative';
   finalScoreDisplay.textContent = `Skóre: ${score}`;


    //ctx.fillStyle = "black";
    //ctx.font = "33px Comic Sans MS";
    //ctx.fillText(`Skóre: ${score} / 50`, 215, 42);
    
}

/*
GOrestartButton.addEventListener('click', () => {
    // Reset all game variables
    stickmen.length = 0; // Clear the stickmen array
    score = 0; // Reset the score
    stickmanCount = 0; // Reset stickman count
    spawnCooldown = 4000; // Reset spawn cooldown
    correctBinMessage = null;
    incorrectBinMessage = null;
    clearTimeout(correctBinTimer);
    clearTimeout(incorrectBinTimer);

    // Hide the game over screen
    gameOverscreen.style.display = 'none';
    gameContainer.style.display = 'flex';
    // Restart the game loop
    //gameStart();
});*/



function restartGame() {
    gameOverscreen.style.display = 'none'; 
    titleScreen.style.display = 'none'; 
    gameOverscreen.offsetHeight;

    gameContainer.style.display = 'block'; 
    score=0; 
   // LVL=1;
    gameStart(); 
}
GOrestartButton.addEventListener('click', restartGame);


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

resetButton.addEventListener('click', restartGame);//=-----------------RESTART B

/*no */

//------------------------------------------------uvod

startButton.addEventListener('click', () => {
    titleScreen.style.display = 'none'; 
    //gameOverscreen.style.display='none';
    gameContainer.style.display = 'block'; 
    checkImagesLoaded();
    score=0;
    gameStart();
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
    //gameStart();
    restartGame();
});

//---help
//--------------------------------------------------gui

backgroundImage.src = "TTRmapa1M.jpg";
arrow.src = "arrow.png";
gStickman.src = "panak1g.png";
yStickman.src = "panak2y.png";
bStickman.src = "panak3b.png";
blStickman.src = "panak4bl.png";

function checkImagesLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        gameStart();
    }
}

function gameStart() {
    const colors = ["g", "y", "b","bl"];
    const stickmanImages = {
        g: gStickman,
        y: yStickman,
        b: bStickman,
        bl: blStickman
    };

    const trashBins = {
        g: { x: 577, y: 170 },
        y: { x: 785, y: 160 },
        b: { x: 715, y: 460 },
        bl: { x: 1025, y: 340 } 
    };

    const stickmen = [];
    const crossroads = [
        { x: 325, y: 220, radius: 55, arrowDirection: "down" },
        { x: 600, y: 390, radius: 55, arrowDirection: "down" },
        { x: 800, y: 390, radius: 55, arrowDirection: "up" }
    ];
    

    const speed = 1;
    let stickmanCount = 0;
    const maxP = 50; //===========================jakooooooooooooooooooooooooooooooooooooooooooooooooooooooouy
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

                    if (stickman.currentCrossroad === 0) {
                        if (crossroads[0].arrowDirection === "down") {
                            stickman.targetX = 580;
                            stickman.targetY = 340;
                            stickman.currentCrossroad = 1;
                        } else if (crossroads[0].arrowDirection === "straight") {
                            stickman.targetX = trashBins.g.x;
                            stickman.targetY = trashBins.g.y;
                            stickman.finalTargetColor = "g";
                        }
                    } else if (stickman.currentCrossroad === 1) {
                        if (crossroads[1].arrowDirection === "down") {
                            stickman.targetX = trashBins.b.x;
                            stickman.targetY = trashBins.b.y;
                            stickman.finalTargetColor = "b";
                        } else if (crossroads[1].arrowDirection === "straight") {
                            stickman.targetX = crossroads[2].x - 10;
                            stickman.targetY = crossroads[2].y - 50;
                            stickman.currentCrossroad = 2;
                        }
                    } else if (stickman.currentCrossroad === 2) {
                        if (crossroads[2].arrowDirection === "up") {
                            stickman.targetX = trashBins.y.x;
                            stickman.targetY = trashBins.y.y; // Adjust Y offset
                            stickman.finalTargetColor = "y";
                        } else if (crossroads[2].arrowDirection === "straight") {
                            stickman.targetX = trashBins.bl.x;
                            stickman.targetY = trashBins.bl.y; // Adjust Y offset
                            stickman.finalTargetColor = "bl";
                        }
                       // stickman.currentCrossroad = 3;
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
                                correctBinTimer = setTimeout(() => {
                                    correctBinMessage = null;
                                }, 500);
                            } else {
                                incorrectBinMessage = { text: "nespravny kos", x: stickman.x, y: stickman.y };
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
                ctx.rotate(Math.PI / 2); // 90 degrees down
            } else if (crossroad.arrowDirection === "up") {
                ctx.rotate(-Math.PI / 2); // 90 degrees up
            } else if (crossroad.arrowDirection === "straight") {
                // No rotation for straight
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
           gameOver();
        }
             
        requestAnimationFrame(gameLoop);
    }

 canvas.addEventListener("click", (event) => {
    const rect = canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    crossroads.forEach((crossroad, index) => {
        const distance = Math.sqrt((clickX - crossroad.x) ** 2 + (clickY - crossroad.y) ** 2);
        if (distance < crossroad.radius) {
            if (index === 0 || index === 1) { // Crossroads 1 and 2
                if (crossroad.arrowDirection === "straight") {
                    crossroad.arrowDirection = "down";
                } else {
                    crossroad.arrowDirection = "straight";
                }
            } else if (index === 2) { // Crossroad 3
                if (crossroad.arrowDirection === "up") {
                    crossroad.arrowDirection = "straight";
                } else {
                    crossroad.arrowDirection = "up";
                }
            }
        }
    });
});

    setTimeout(spawnStickman, 2000);
    gameLoop();


    


}
