let previousNumber = null;
let currentNumber = null;
let score = 0;
let timeLeft = 60;
let timerInterval;
let attempt = 0;
generateNumber()

function generateNumber() {
  previousNumber = currentNumber;
  currentNumber = (Math.random() * 4 | 0) + 1; 
  numberDisplay.innerText = currentNumber;
}

function checkSame(isSame) {
 const isActuallySame =
  previousNumber === currentNumber;

 if (isSame === isActuallySame) {
  score++;
  document.getElementById('result')
   .innerText = "Správne!";
 } else {
  document.getElementById('result')
   .innerText = "Nesprávne!";
 }
 attempt++;

 document.getElementById('score')
  .innerText = score;
 generateNumber();

}

function startTimer() {
 timerInterval = setInterval(() => {
  timeLeft--;
  document.getElementById('timer')
   .innerText = timeLeft;

  if (timeLeft <= 0) {
   clearInterval(timerInterval);
   endGame();
  }
 }, 1000);
}

function startGame() {
 score = 0;
 timeLeft = 60;
 attempt = 0;

 document.getElementById('score')
  .innerText = score;
 document.getElementById('timer')
  .innerText = timeLeft;
 document.getElementById('result')
  .innerText = "";

 document.getElementById('sameBtn')
  .disabled = false;
 document.getElementById('diffBtn')
  .disabled = false;
 document.getElementById('startBtn')
  .disabled = true;

 generateNumber();
 startTimer();
}

function endGame() {
 document.getElementById('sameBtn')
  .disabled = true;
 document.getElementById('diffBtn')
  .disabled = true;
 document.getElementById('startBtn')
  .disabled = false;
 document.getElementById('result')
  .innerText =
  "Čas vypršal! Tvoj výsledok: " +
  score + " Pokus: " + attempt;
}
