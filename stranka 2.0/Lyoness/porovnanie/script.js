let previousImage = null;
let currentImage = null;
let score = 0;
let totalAttempts = 0;
let incorrectAttempts = 0;
let timeLeft = 60; 
let timerInterval;
let decisionTimeout;
let lastScore = null; 
let timePerDecision = 5000; 

const images = [
    "image1.jpg", 
    "image2.jpg",
    "image3.jpg",
    "image4.jpg"
];

function loadInitialImage() {
    currentImage = images[Math.floor(Math.random() * images.length)];
    document.getElementById('imageContainer').innerHTML = `<img class="image-square" src="${currentImage}" alt="obrázok">`;
}

function generateImage() {
    previousImage = currentImage;
    clearTimeout(decisionTimeout);

    if (Math.random() < 0.45) {
        currentImage = previousImage;
    } else {
        const remainingImages = images.filter(img => img !== previousImage);
        currentImage = remainingImages[Math.floor(Math.random() * remainingImages.length)];
    }

    document.getElementById('imageContainer').innerHTML = `<img class="image-square" src="${currentImage}" alt="obrázok">`;

    decisionTimeout = setTimeout(() => {
        totalAttempts++;
        incorrectAttempts++;
        document.getElementById('result').innerText = "Nereagoval si!";
        generateImage();
    }, timePerDecision);
}

function checkSame(isSame) {
    clearTimeout(decisionTimeout);
    totalAttempts++;
    const isActuallySame = previousImage === currentImage;

    if (isSame === isActuallySame) {
        score++;
        document.getElementById('result').innerText = "Správne!";
    } else {
        incorrectAttempts++;
        document.getElementById('result').innerText = "Nesprávne!";
    }

    document.getElementById('score').innerText = score;

    generateImage();
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').innerText = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endGame();
        }
    }, 1000);
}

function startGameWithDelay() {
    // Zobrazenie úvodného obrázka na porovnávanie
    previousImage = images[Math.floor(Math.random() * images.length)];
    document.getElementById('imageContainer').innerHTML = `<img class="image-square" src="${previousImage}" alt="úvodný obrázok">`;
    document.getElementById('result').innerText = "Hra začne o 5 sekúnd...";

    // Po 5 sekundách začni hru
    setTimeout(() => {
        startGame();
    }, 5000);
}

function startGame() {
    score = 0;
    totalAttempts = 0;
    incorrectAttempts = 0;
    timeLeft = 60; // Reset časovača na 60 sekúnd
    timePerDecision = 5000; // Reset času na rozhodnutie na 5 sekúnd
    document.getElementById('score').innerText = score;
    document.getElementById('timer').innerText = timeLeft;
    document.getElementById('result').innerText = "";

    document.getElementById('sameBtn').disabled = false;
    document.getElementById('diffBtn').disabled = false;

    generateImage();
    startTimer();
}

function endGame() {
    clearInterval(timerInterval);
    clearTimeout(decisionTimeout);

    document.getElementById('sameBtn').disabled = true;
    document.getElementById('diffBtn').disabled = true;

    document.getElementById('result').innerText = `Čas vypršal! Tvoj výsledok: ${score}`;
    lastScore = score; // Uloženie skóre pre ďalšiu hru

    setTimeout(showIntroScreen, 3000); // Počkajte 3 sekundy a zobrazte úvodnú obrazovku
}

function showIntroScreen() {
    document.getElementById("introScreen").style.display = "block";
    document.getElementById("gameScreen").style.display = "none";

    if (lastScore !== null) {
        document.getElementById("lastScoreText").innerText = `Tvoje posledné skóre: ${lastScore}`;
    }
}

function startNewGame() {
    document.getElementById("introScreen").style.display = "none";
    document.getElementById("gameScreen").style.display = "block";

    startGameWithDelay(); // Spusti hru so zobrazením úvodného obrázka
}

// Po načítaní stránky ukáž úvodnú obrazovku
window.onload = showIntroScreen;
