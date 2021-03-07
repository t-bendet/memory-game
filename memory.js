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
  cardColor: [
    "#FF6633",
    "#FFB399",
    "#FF33FF",
    "#FFFF99",
    "#00B3E6",
    "#E6B333",
    "#3366E6",
    "#999966",
    "#99FF99",
    "#B34D4D",
    "#80B300",
    "#809900",
    "#E6B3B3",
    "#6680B3",
    "#66991A",
    "#FF99E6",
    "#CCFF1A",
    "#FF1A66",
    "#E6331A",
    "#33FFCC",
    "#66994D",
  ],
};
// each btn contains the data about the game
startMenu.addEventListener("click", gameOptions);
function gameOptions(e) {
  if (e.target.dataset.load) {
    let size = e.target.dataset.size;
    let theme = e.target.dataset.theme;
    let type = e.target.dataset.type;
    initGame(size, theme, type);
  }
}
//recives the data from random function and deals the cards
function initGame(num, deckTheme, Decktype) {
  let deck = randomizeCardData(num, deckTheme, Decktype);
  body.firstElementChild.remove();
  for (const card of deck) {
    let div = document.createElement("div");
    div.setAttribute("data-id", card.id);
    div.setAttribute("data-theme", card.fill);
    div.setAttribute("data-type", card.cardType);
    if (card.cardType == "color") {
      div.style.backgroundColor = card.fill;
    } else {
      div.style["background-image"] = card.fill;
    }
    div.classList.add("card");
    boardSelector.appendChild(div);
  }

  //timerSelector init
  //countrSelector init
}

//randomized array of card objects with matching id's
function randomizeCardData(setNumber, setTheme, setType) {
  let cardType = setType == "color" ? "color" : "img";
  let cardImg = [...gameThemes[setTheme]];
  let cardsArr = [];
  for (let i = 0; i < setNumber; i++) {
    let imgArrIndex = Math.floor(Math.random() * cardImg.length);
    let cardObj = { fill: cardImg[imgArrIndex], id: i, cardType: cardType };
    cardsArr.push(cardObj);
    cardsArr.push(cardObj);
    cardImg.splice(imgArrIndex, 1);
  }
  //randomizing array
  console.log(cardsArr);
  for (let i = cardsArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cardsArr[i], cardsArr[j]] = [cardsArr[j], cardsArr[i]];
  }
  return cardsArr;
}
