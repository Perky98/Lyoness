let previousImage = null;
let currentImage = null;
let score = 0;
let timeLeft = 60;
let timerInterval;

const images = [
    "image1.jpg", 
    "image2.jpg",
    "image3.jpg",
    "image4.jpg"
];

function loadInitialImage() {
    currentImage = images[Math.floor(Math.random() * images.length)];
    document.getElementById('imageContainer').innerHTML = `<img src="${currentImage}" alt="obrázok">`;
}

function generateImage() {
    previousImage = currentImage;
    
    
    if (Math.random() < 0.35) {
        
        currentImage = previousImage;
    } else {
        
        const remainingImages = images.filter(img => img !== previousImage);
        currentImage = remainingImages[Math.floor(Math.random() * remainingImages.length)];
    }

    document.getElementById('imageContainer').innerHTML = `<img src="${currentImage}" alt="obrázok">`;
}

function checkSame(isSame) {
    const isActuallySame = previousImage === currentImage;

    if (isSame === isActuallySame) {
        score++;
        document.getElementById('result').innerText = "Správne!";
    } else {
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

function startGame() {
    score = 0;
    timeLeft = 60;
    document.getElementById('score').innerText = score;
    document.getElementById('timer').innerText = timeLeft;
    document.getElementById('result').innerText = "";

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
    document.getElementById('result').innerText = "Čas vypršal! Tvoj výsledok: " + score;
}

window.onload = loadInitialImage;
