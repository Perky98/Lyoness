let previousImage = null;
let currentImage = null;
let score = 0;
let totalAttempts = 0;
let incorrectAttempts = 0;
let timeLeft = 60;
let timerInterval;
let incorrectAnswers = [];
let timePerDecision = 3000; 
let decisionTimeout;

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
        incorrectAnswers.push(`Obrázky boli ${previousImage === currentImage ? "rovnaké" : "rôzne"}, ale hráč nereagoval.`);
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
        incorrectAnswers.push(`Obrázky boli ${isActuallySame ? "rovnaké" : "rôzne"}, ale hráč odpovedal nesprávne.`);
        document.getElementById('result').innerText = "Nesprávne!";
    }

    document.getElementById('score').innerText = score;

    timePerDecision = Math.max(1000, timePerDecision - 100);
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

function startGame() {
    score = 0;
    totalAttempts = 0;
    incorrectAttempts = 0;
    timeLeft = 60;
    timePerDecision = 3000;
    incorrectAnswers = [];
    document.getElementById('score').innerText = score;
    document.getElementById('timer').innerText = timeLeft;
    document.getElementById('result').innerText = "";
    document.getElementById('incorrectAnswers').innerText = "";

    document.getElementById('sameBtn').disabled = false;
    document.getElementById('diffBtn').disabled = false;
    document.getElementById('startBtn').disabled = true;

    generateImage();
    startTimer();
}

function endGame() {
    document.getElementById('sameBtn').disabled = true;
    document.getElementById('diffBtn').disabled = true;
    document.getElementById('startBtn').disabled = false;

    document.getElementById('result').innerText = `Čas vypršal! Tvoj výsledok: ${score}`;
    document.getElementById('incorrectAnswers').innerHTML = `
        <h3>Štatistika:</h3>
        <p>Správne odpovede: ${score}</p>
        <p>Nesprávne odpovede: ${incorrectAttempts} z ${totalAttempts}</p>
        <h3>Nesprávne odpovede:</h3>
        <ul>${incorrectAnswers.map(answer => `<li>${answer}</li>`).join('')}</ul>
    `;
}

window.onload = loadInitialImage;
