const letters = {
  0: "A",
  1: "B",
  2: "C",
  3: "D",
  4: "E",
  5: "F",
  6: "G",
  7: "H",
  8: "I",
  9: "J",
  A: 0,
  B: 1,
  C: 2,
  D: 3,
  E: 4,
  F: 5,
  G: 6,
  H: 7,
  I: 8,
  J: 9,
};
const direction = {
  0: "up",
  1: "right",
  2: "down",
  3: "left",
};

let battleship = [];
let destroyer1 = [];
let destroyer2 = [];

const makeSelection = () => {
  const input = document.getElementById("coordinates").value.toUpperCase();
  const square = document.getElementById(input);

  if (destroyer1.includes(input)) {
    console.log();
    square.classList.add("hit");
    let feedback = document.getElementById("feedback");
    feedback.innerText = "HIT!";
  } else {
    console.log("MISS!");
    square.classList.add("selected");
    let feedback = document.getElementById("feedback");
    feedback.innerText = "MISS!";
  }
};

function getRandomNum() {
  return Math.floor(Math.random() * Math.floor(10));
}

function getRandomLetter() {
  return letters[Math.floor(Math.random() * Math.floor(10))];
}

function getRandomDir() {
  return direction[Math.floor(Math.random() * Math.floor(4))];
}

const setDestroyer1 = () => {
  const ship1Squares = [];
  let shipHead = `${getRandomLetter()}${getRandomNum()}`;
  const x = shipHead.slice(0, 1);
  const y = shipHead.slice(1, 2);
  let direction = getRandomDir();

  //   console.log("Ship head square: ", shipHead);
  //   console.log("Direction:", direction);
  //   console.log("X:", x, "Y:", y);

  if (direction === "up") {
    if (y >= 4) {
      for (let i = y; i > y - 4; i--) {
        ship1Squares.push(`${x}${i}`);
      }
    } else {
      // switches the direction if boat will go off grid
      for (let i = 0; i < 4; i++) {
        let newY = Number(y) + i;
        ship1Squares.push(`${x}${newY}`);
      }
    }
  } else if (direction === "down") {
    if (y <= 6) {
      for (let i = 0; i < 4; i++) {
        let newY = Number(y) + i;
        ship1Squares.push(`${x}${newY}`);
      }
    } else {
      // switches the direction if boat will go off grid
      for (let i = y; i > y - 4; i--) {
        ship1Squares.push(`${x}${i}`);
      }
    }
  } else if (direction === "right") {
    if (letters[x] <= 6) {
      let num = letters[x];
      let upper = num + 4;
      for (let i = num; i < upper; i++) {
        ship1Squares.push(`${letters[i]}${y}`);
      }
    } else {
      // switches the direction if boat will go off grid
      let num = letters[x];
      let lower = num - 4;
      for (let i = num; i > lower; i--) {
        ship1Squares.push(`${letters[i]}${y}`);
      }
    }
  } else if (direction === "left") {
    if (letters[x] >= 3) {
      let num = letters[x];
      let lower = num - 4;
      for (let i = num; i > lower; i--) {
        ship1Squares.push(`${letters[i]}${y}`);
      }
    } else {
      // switches the direction if boat will go off grid
      let num = letters[x];
      let upper = num + 4;
      for (let i = num; i < upper; i++) {
        ship1Squares.push(`${letters[i]}${y}`);
      }
    }
  }
  destroyer1 = ship1Squares;
};

window.onload = () => {
  console.log("page is fully loaded");
  setDestroyer1();
};
