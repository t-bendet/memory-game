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
const cardImg = [];
const cardColor = [
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
  "#B366CC",
  "#4D8000",
  "#B33300",
  "#CC80CC",
  "#66664D",
  "#991AFF",
  "#E666FF",
  "#4DB3FF",
  "#1AB399",
  "#E666B3",
  "#33991A",
  "#CC9999",
  "#B3B31A",
  "#00E680",
  "#4D8066",
  "#809980",
  "#E6FF80",
  "#1AFF33",
  "#999933",
  "#FF3380",
  "#CCCC00",
  "#66E64D",
  "#4D80CC",
  "#9900B3",
  "#E64D66",
  "#4DB380",
  "#FF4D4D",
  "#99E6E6",
  "#6666FF",
];

// each btn contains the data about the game
startMenu.addEventListener("click", gameOptions);
function gameOptions(e) {
  if (e.target.dataset.load) {
    let size = e.target.dataset.size;
    initGame(size);
  }
}
//recives the data from random function and deals the cards
function initGame(num) {
  body.firstElementChild.remove();
  // timerSelector init
  // countrSelector init
  // for (let i = 0; index < num; i++) {
  //   card = document.createElement("div")
  //   boardSelector.
  // }
}

function randomizeCardData(setNumber, setType) {
  const cardImg = [...setType];
  let cardsArr = [];
  for (let i = 0; i < setNumber; i++) {
    let imgArrIndex = Math.floor(Math.random() * cardImg.length);
    //TODO change color to something else
    let cardObj = { color: cardImg[imgArrIndex], id: i };
    cardImg.splice(imgArrIndex, 1);
    cardsArr.push(cardObj);
    cardsArr.push(cardObj);
    console.log(imgArrIndex);
  }
  //randomizing array
  for (let i = cardsArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cardsArr[i], cardsArr[j]] = [cardsArr[j], cardsArr[i]];
  }
  console.log(cardsArr);
  return cardsArr;
}

randomizeCardData(9, cardColor);
