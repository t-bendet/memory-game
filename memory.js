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
      cardClass: null,
      cardLocator: null,
    },
    secondCard: {
      cardClass: null,
      cardLocator: null,
    },
  },
};
const gameThemes = {
  smileTheme: ["smile1", "smile2", "smile3", "smile4", "smile5", "smile6"],
  covidTheme: [
    "covid1",
    "covid2",
    "covid3",
    "covid4",
    "covid5",
    "covid6",
    "covid7",
    "covid8",
    "covid9",
    "covid10",
  ],
  randomTheme: [
    "random1",
    "random2",
    "random3",
    "random4",
    "random5",
    "random6",
    "random7",
    "random8",
    "random9",
    "random10",
    "random11",
    "random12",
    "random13",
    "random14",
    "random15",
    "random16",
    "random17",
    "random18",
    "random19",
    "random20",
  ],
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
  countrSelector.innerText = "failed attempts : 0";
  // timerCycle();
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
        gameData.dataCardFlip.count = 0;
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
          if (gameData.dataRight === gameData.dataDeckSize) {
            stoptime = false;
            // TODO add win
            alert("you won!");
          }
        } else {
          gameData.dataWrong += 1;
          setTimeout(() => {
            console.log("heloooooooooooooooooooo");
            let c1 = gameData.dataCardFlip.firstCard.cardClass;
            gameData.dataCardFlip.firstCard.cardLocator.classList.toggle(c1);
            let c2 = gameData.dataCardFlip.secondCard.cardClass;
            gameData.dataCardFlip.secondCard.cardLocator.classList.toggle(c2);

            // boardSelector.style["z-index"] = "10";
          }, 500);
        }

      // setTimeout(() => {
      //   gameData.dataCardFlip.count = 0;
      //   // gameData.dataCardFlip.secondCard.cardClass = undefined;
      //   // gameData.dataCardFlip.secondCard.cardLocator = undefined;
      //   // gameData.dataCardFlip.secondCard.cardClass = undefined;
      //   // gameData.dataCardFlip.secondCard.cardLocator = undefined;
      //   // boardSelector.style["z-index"] = "10";
      // }, 1000);

      // boardSelector.style["z-index"] = "-20";
    }
  }
  gameData.dataCardFlip.count = 0;
  countrSelector.innerText = `failed attempts : ${gameData.dataWrong}`;
}
// let h = 00;
// let m = 0;
// let s = 0;
// let stoptime = true;

// function timerCycle() {
//   if (stoptime) {
//     s = parseInt(s);
//     m = parseInt(m);
//     h = parseInt(h);
//     s = s + 1;
//     if (s == 60) {
//       m = m + 1;
//       s = 0;
//     }
//     if (s < 10 || s == 0) {
//       s = "0" + s;
//     }
//     if (m < 10 || m == 0) {
//       m = "0" + m;
//     }
//     if (h < 10 || h == 0) {
//       h = "0" + h;
//     }
//     timerSelector.innerHTML = `${h}:${m}:${s}`;
//     setTimeout("timerCycle()", 1000);
//   }
// }
