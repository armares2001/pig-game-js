'use strict';

const score0EL = document.getElementById('score--0');
const score1EL = document.getElementById('score--1');
const currentScore0 = document.getElementById('current--0');
const currentScore1 = document.getElementById('current--1');
const displayActive0 = document.querySelector('.player--0');
const displayActive1 = document.querySelector('.player--1');
const namePlayer0 = document.querySelector('.name--0');
const namePlayer1 = document.querySelector('.name--1');

const dice = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let playerNow = score0EL;
let playerScoreNow = currentScore0;
let playerActiveNow = displayActive0;

score0EL.textContent = 0;
score1EL.textContent = 0;
dice.classList.add('hidden');

const switchPlayer = (switchedPlayer, switchedScorePlayer, switchedDisplay) => {
  playerNow.textContent = +playerNow.textContent + +playerScoreNow.textContent;
  playerScoreNow.textContent = 0;
  if (isWinner(100)) {
    // resetGame();
    return;
  }
  playerNow = switchedPlayer;
  playerScoreNow = switchedScorePlayer;
  playerActiveNow.classList.remove('player--active');
  playerActiveNow = switchedDisplay;
  playerActiveNow.classList.add('player--active');
};

const isWinner = limit => {
  if (Number(playerNow.textContent) < limit) {
    return false;
  }
  if (playerNow === score0EL) {
    console.log('Player 1 winner');
  }
  if (playerNow === score1EL) {
    console.log('Player 2 winner');
  }
  playerActiveNow.classList.add('player--winner');
  return true;
};

const rollDiceHandler = () => {
  if (playerActiveNow.classList.contains('player--winner')) {
    return;
  }

  const randomDiceNum = Math.trunc(Math.random() * 6) + 1;
  dice.classList.remove('hidden');

  for (let i = 1; i < 7; i++) {
    if (randomDiceNum === i) {
      dice.src = `dice-${i}.png`;
      break;
    }
  }

  if (randomDiceNum === 1 && playerNow === score0EL) {
    switchPlayer(score1EL, currentScore1, displayActive1);
    return;
  }

  if (randomDiceNum === 1 && playerNow === score1EL) {
    switchPlayer(score0EL, currentScore0, displayActive0);
    return;
  }

  playerScoreNow.textContent = +playerScoreNow.textContent + randomDiceNum;
};

const holdScoreHandler = () => {
  if (playerScoreNow.textContent === '0') {
    return;
  }
  if (playerNow === score0EL) {
    switchPlayer(score1EL, currentScore1, displayActive1);
    return;
  }
  if (playerNow === score1EL) {
    switchPlayer(score0EL, currentScore0, displayActive0);
  }
};

const resetGame = () => {
  playerNow = score1EL;
  playerNow.textContent = 0;

  playerNow = score0EL;
  playerNow.textContent = 0;

  playerScoreNow = currentScore1;
  playerScoreNow.textContent = 0;

  playerScoreNow = currentScore0;
  playerScoreNow.textContent = 0;

  playerActiveNow.classList.remove('player--winner');
  playerActiveNow.classList.remove('player--active');
  playerActiveNow = displayActive0;
  playerActiveNow.classList.add('player--active');
  playerActiveNow.classList.remove('player--winner');
};

btnRoll.addEventListener('click', rollDiceHandler);
btnHold.addEventListener('click', holdScoreHandler);
btnNew.addEventListener('click', resetGame);
