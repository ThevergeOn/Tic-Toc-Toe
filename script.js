const X_CLASS = 'fill-x';
const CIRCLE_CLASS = 'fill-o';
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
const tileElements = document.querySelectorAll('[data-tile]');
const board = document.getElementById('board');
const winningMessageElement = document.getElementById('winningMessage');
const restartButton = document.getElementById('restartButton');
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
let circleTurn;
startGame()
restartButton.addEventListener('click', startGame);



function startGame() {
  circleTurn = false
  tileElements.forEach(tile => {
    tile.classList.remove(X_CLASS)
    tile.classList.remove(CIRCLE_CLASS)
    tile.removeEventListener('click', handleClick)
    tile.addEventListener('click', handleClick, { once: true })
  })
  winningMessageElement.classList.remove('show')
}

function handleClick(e) {
  const tile = e.target
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
  placeMark(tile, currentClass)
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true)
  } else {
    swapTurns()
  }
}
function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = "It's a Draw!";
    
  } else {
    winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`;
  }
  winningMessageElement.classList.add('show');
}
function isDraw() {
  return [...tileElements].every(tile => {
    return tile.classList.contains(X_CLASS) || tile.classList.contains(CIRCLE_CLASS)
  })
}
function placeMark(tile, currentClass) {
  tile.classList.add(currentClass)
}
function swapTurns() {
  circleTurn = !circleTurn
}
function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return tileElements[index].classList.contains(currentClass)
    })
  })
}
const setBack=WINNING_COMBINATIONS.some(combination => {})