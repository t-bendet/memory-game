const $ = (x) => document.querySelector(x);
const body = $("body");
const startMenu = $(".start-menu");
const gameSelector = $(".game");
const timerSelector = $(".timer");
const countrSelector = $(".counter");
const boardSelector = $(".board");

const gameData = {
  rowData: 0,
  counterData: 0,
  win: false,
};
const gameThemes = {
  smileTheme: ["smile1", "smile2", "smile3", "smile4", "smile5", "smile6"],
};
// each btn contains the data about the game
startMenu.addEventListener("click", gameOptions);
function gameOptions(e) {
  if (e.target.dataset.load) {
    let size = e.target.dataset.size;
    let theme = e.target.dataset.theme;
    initGameBoard(size, theme);
  }
}
//recives the data from random function and deals the cards
function initGameBoard(num, deckTheme) {
  console.log(deckTheme);
  let deck = randomizeCardData(num, deckTheme);
  body.firstElementChild.remove();
  for (const card of deck) {
    let div = document.createElement("div");
    div.setAttribute("data-id", card.id);
    div.classList.add(`${card.cardClass}`);
    div.classList.add("card");
    div.classList.add("card-back");
    boardSelector.appendChild(div);
  }
  return deck;
  //TODO timerSelector init
  //TODO countrSelector init
}

//randomized array of card objects with matching id's
function randomizeCardData(setNumber, setTheme) {
  let cardImg = [...gameThemes[setTheme]];
  let cardsArr = [];
  for (let i = 0; i < setNumber; i++) {
    let imgArrIndex = Math.floor(Math.random() * cardImg.length);
    let cardObj = {
      id: i,
      cardClass: cardImg[imgArrIndex],
    };
    cardsArr.push(cardObj);
    cardsArr.push(cardObj);
    cardImg.splice(imgArrIndex, 1);
  }
  //randomizing array
  for (let i = cardsArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cardsArr[i], cardsArr[j]] = [cardsArr[j], cardsArr[i]];
  }
  return cardsArr;
}
