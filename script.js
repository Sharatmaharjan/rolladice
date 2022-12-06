'use strict';
//Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const playerOneTotalScoreEl = document.querySelector('#score--0');
const playerTwoTotalScoreEl = document.querySelector('#score--1');
const playerOneCurrentScoreEl = document.querySelector('#current--0');
const playerTwoCurrentScoreEl = document.querySelector('#current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const resultMessage = document.querySelector('#result');

//Starting Condition

playerOneTotalScoreEl.textContent = 0;
playerTwoTotalScoreEl.textContent = 0;
playerOneCurrentScoreEl.textContent = 0;
playerTwoCurrentScoreEl.textContent = 0;
diceEl.classList.add('hidden');
let currentScore = 0,
  activePlayer = 0;
let playing = true;
//returns object
// let playerTotalScoreEl = document.getElementById(`score--${activePlayer}`);
// let playerCurrentScoreEl = document.getElementById(`current--${activePlayer}`);

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0; //switch player
  currentScore = 0;
  player0El.classList.toggle('player--active'); //html css
  player1El.classList.toggle('player--active');
};

//Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1. Generate random number
    const diceNumber = Math.trunc(Math.random() * 6) + 1;

    //2. Diplay hidden dice image according to above random number from 1
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${diceNumber}.png`;

    //3. Check dice rolled: if 1 (switch player,current score reset to 0) else add it to current score
    if (diceNumber !== 1) {
      currentScore += diceNumber;
      //getCurrentScore = String(currentScore);
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      //activePlayer===0?playerOneCurrentScoreEl.textContent=currentScore:playerTCSEL.tC=cS
      //playerOneCurrentScoreEl.textContent = currentScore;

      //switching active player and front end change
    } else {
      switchPlayer();
    }
  }
});

//handling hold button event
btnHold.addEventListener('click', function () {
  if (playing) {
    //1. Add currentScore to totalScore of current Active Player, reset currentScore, reset score area
    // document.getElementById(`score--${activePlayer}`).textContent =   Number(document.getElementById(`score--${activePlayer}`).textContent) +currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      Number(document.getElementById(`score--${activePlayer}`).textContent) +
      currentScore; //self done
    //console.log(playerOneTotalScoreEl.textContent);

    //diplay continuous  results until finish
    let player1 = Number(playerOneTotalScoreEl.textContent);
    let player2 = Number(playerTwoTotalScoreEl.textContent);
    if (player1 >= 10 || player2 >= 10) {
      diceEl.classList.add('hidden');
      resultMessage.textContent =
        player1 >= 10
          ? `Player 1 Won by ${player1 - player2} points. 🎉🎉🎉 🙌🙌🙌`
          : `Player 2 Won by ${player2 - player1} points. 🎉🎉🎉 🙌🙌🙌`;
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else if (player1 === player2) {
      resultMessage.textContent = `Both players have same score: ${playerOneTotalScoreEl.textContent}. 🤪`;
    } else {
      resultMessage.textContent =
        player1 > player2
          ? `Player 1 is leading by  ${player1 - player2} points. ╰(*°▽°*)╯`
          : `Player 2 is leading by ${player2 - player1} points. ^_____^ `;
    }

    //Number(document.getElementById(`score--${activePlayer}`).textContent) >= 100;

    //check totalScore with highScore: if true declare winner, else do nothing

    //2.Switch Player

    switchPlayer();
    // playerCurrentScoreEl.textContent = 0;
    // activePlayer = activePlayer === 0 ? 1 : 0;
    // currentScore = 0;
    // player0El.classList.toggle('player--active'); //html css
    // player1El.classList.toggle('player--active');
  }
});
// const getCurrentActivePlayerEl = function (activePlayer) {
//   return document.getElementById(`current--${activePlayer}`);
// };

//new button functionality

btnNew.addEventListener('click', function () {
  document.querySelector(`.player--0`).classList.remove('player--winner');
  document.querySelector(`.player--1`).classList.remove('player--winner');

  playerOneTotalScoreEl.textContent = 0;
  playerTwoTotalScoreEl.textContent = 0;
  playerOneCurrentScoreEl.textContent = 0;
  playerTwoCurrentScoreEl.textContent = 0;

  diceEl.classList.add('hidden');

  player1El.classList.remove('player--active');
  player0El.classList.add('player--active');

  activePlayer = 0;
  playing = true;

  //display draw, who is winning or who won
});
