const $ = (x) => document.querySelector(x);
const body = $("body");
const startMenu = $(".start-menu");
const gameSelector = $(".game");
const timerSelector = $(".timer");
const countrSelector = $(".counter");
const boardSelector = $(".board");
// game data //
const gameData = {
  dataCounter: 0,
  dataWrong: 0,
  dataRight: 0,
  dataDeckSize: 0,
  dataCardFlip: {
    count: 0,
    firstCard: {
      cardClass: undefined,
      cardLocator: undefined,
    },
    secondCard: {
      cardClass: undefined,
      cardLocator: undefined,
    },
  },
};
const gameThemes = {
  smileTheme: ["smile1", "smile2", "smile3", "smile4", "smile5", "smile6"],
};
// each btn contains the data about the game//
startMenu.addEventListener("click", gameOptions);
function gameOptions(e) {
  if (e.target.dataset.load) {
    let size = e.target.dataset.size;
    let theme = e.target.dataset.theme;
    initGameBoard(size, theme);
  }
}
//recives the data from random function and deals the cards//
function initGameBoard(num, deckTheme) {
  let deck = randomizeCardData(num, deckTheme);
  body.firstElementChild.remove();
  for (const card of deck) {
    let div = document.createElement("div");
    div.setAttribute("data-cls", card.cardClass);
    div.setAttribute("data-clickable", "true");
    div.classList.add(`${card.cardClass}`);
    div.classList.add("card");
    div.classList.add("card-back");
    boardSelector.appendChild(div);
    div.classList.toggle(`${card.cardClass}`);
  }
  gameSelector.style.height = "100%";
  gameSelector.style.gap = "1rem";
  gameSelector.style["grid-template-rows"] = "150px 1fr";
  gameData.dataDeckSize = deck.length / 2;
  initGamePlay(gameData);
  // return deck;
  //TODO timerSelector init
  //TODO countrSelector init
}

//randomized array of card objects with matching id's and class for image background
function randomizeCardData(setNumber, setTheme) {
  let cardImg = [...gameThemes[setTheme]];
  let cardsArr = [];
  for (let i = 0; i < setNumber; i++) {
    let imgArrIndex = Math.floor(Math.random() * cardImg.length);
    let cardObj = {
      cardClass: cardImg[imgArrIndex],
    };
    cardsArr.push(cardObj);
    cardsArr.push(cardObj);
    cardImg.splice(imgArrIndex, 1);
  }
  //randomizing array//
  for (let i = cardsArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cardsArr[i], cardsArr[j]] = [cardsArr[j], cardsArr[i]];
  }
  return cardsArr;
}
// game in play //
function initGamePlay(gameData) {}

boardSelector.addEventListener("click", cardListner);
function cardListner(e) {
  if (
    e.target.dataset.clickable === "true" &&
    e.target != gameData.dataCardFlip.firstCard.cardLocator
  ) {
    let cls = e.target.dataset.cls;
    let card = e.target;
    switch (gameData.dataCardFlip.count) {
      case 0:
        card.classList.toggle(cls);
        gameData.dataCardFlip.count += 1;
        gameData.dataCardFlip.firstCard.cardClass = cls;
        gameData.dataCardFlip.firstCard.cardLocator = card;
        break;
      case 1:
        card.classList.toggle(cls);
        gameData.dataCardFlip.count += 1;
        gameData.dataCardFlip.secondCard.cardClass = cls;
        gameData.dataCardFlip.secondCard.cardLocator = card;
        if (
          gameData.dataCardFlip.firstCard.cardClass ==
          gameData.dataCardFlip.secondCard.cardClass
        ) {
          gameData.dataCardFlip.firstCard.cardLocator.dataset.clickable =
            "false";
          gameData.dataCardFlip.secondCard.cardLocator.dataset.clickable =
            "false";
          gameData.dataRight += 1;
          if (gameData.dataRight == gameData.dataDeckSize) {
            console.log("game won");
            //TODO add ending
          }
        } else {
          gameData.dataWrong += 1;
          setTimeout(() => {
            let c1 = gameData.dataCardFlip.firstCard.cardClass;
            gameData.dataCardFlip.firstCard.cardLocator.classList.toggle(c1);
            let c2 = gameData.dataCardFlip.secondCard.cardClass;
            gameData.dataCardFlip.secondCard.cardLocator.classList.toggle(c2);
            boardSelector.style["z-index"] = "10";
          }, 2000);
          boardSelector.style["z-index"] = "-20";
        }
        setTimeout(() => {
          gameData.dataCardFlip.count = 0;
          gameData.dataCardFlip.secondCard.cardClass = undefined;
          gameData.dataCardFlip.secondCard.cardLocator = undefined;
          gameData.dataCardFlip.secondCard.cardClass = undefined;
          gameData.dataCardFlip.secondCard.cardLocator = undefined;
        }, 2000);
    }
  }
}
