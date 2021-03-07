const $ = (x) => document.querySelector(x);
const body = $("body");
const startMenu = $(".start-menu");
// each btn contains the data about the game
startMenu.addEventListener("click", gameOptions);
function gameOptions(e) {
  let gameRows = e.target.dataset.rows;
  let gameColumns = e.target.dataset.columns;
  initGame(gameRows, gameColumns);
}
function initGame(row, col) {
  body.firstElementChild.remove();
}
