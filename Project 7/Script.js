"use strict";

// Selecting elements:
const score0El = document.getElementById("score-0");
const score1El = document.getElementById("score-1");
const currentScore0El = document.getElementById("current-0");
const currentScore1El = document.getElementById("current-1");

const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn-new");
const btnRoll = document.querySelector(".btn-roll");
const btnHold = document.querySelector(".btn-hold");

const player0El = document.querySelector(".player-0");
const player1El = document.querySelector(".player-1");

// Initialising:
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add("hidden");

let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

const init = function () {
  playing = true;
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  diceEl.classList.add("hidden");
  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;
  player0El.classList.remove("player-winner");
  player1El.classList.remove("player-winner");
  player0El.classList.add("active-player");
  player1El.classList.remove("active-player");
};

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current-${activePlayer}`).textContent = currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player-active");
  player1El.classList.toggle("player-active");
};

// Rolling the Dice:
btnRoll.addEventListener("click", function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6 + 1);
    console.log(dice);

    // Displaying the Dice:
    diceEl.classList.remove("hidden");
    diceEl.src = `Img/dice-${dice}.png`;

    // The rolled value:
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current-${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score-${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 50) {
      playing = false;
      document
        .querySelector(`.player-${activePlayer}`)
        .classList.add("player-winner");
      document
        .querySelector(`.player-${activePlayer}`)
        .classList.remove("player-active");
      diceEl.classList.add("hidden");
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", function () {
  init();
});
