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

let occupiedSquares = [];
let battleship = [];
let destroyer1 = [];
let destroyer2 = [];

const makeSelection = () => {
  const input = document.getElementById("coordinates").value.toUpperCase();
  const square = document.getElementById(input);

  if (
    destroyer1.includes(input) ||
    destroyer2.includes(input) ||
    battleship.includes(input)
  ) {
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

const highlightShips = () => {
  occupiedSquares.map((square) => {
    let x = document.getElementById(square);
    x.classList.add("ship");
  });
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

const setShipLocation = (length) => {
  const shipSquares = [];
  let shipHead = `${getRandomLetter()}${getRandomNum()}`;
  const x = shipHead.slice(0, 1);
  const y = shipHead.slice(1, 2);
  let direction = getRandomDir();

  //   console.log("Ship head square: ", shipHead);
  //   console.log("Direction:", direction);
  //   console.log("X:", x, "Y:", y);

  if (direction === "up") {
    if (y >= length) {
      for (let i = y; i > y - length; i--) {
        shipSquares.push(`${x}${i}`);
      }
    } else {
      // switches the direction if boat will go off grid
      for (let i = 0; i < length; i++) {
        let newY = Number(y) + i;
        shipSquares.push(`${x}${newY}`);
      }
    }
  } else if (direction === "down") {
    if (y <= 10 - length) {
      for (let i = 0; i < length; i++) {
        let newY = Number(y) + i;
        shipSquares.push(`${x}${newY}`);
      }
    } else {
      // switches the direction if boat will go off grid
      for (let i = y; i > y - length; i--) {
        shipSquares.push(`${x}${i}`);
      }
    }
  } else if (direction === "right") {
    if (letters[x] <= 10 - length) {
      let num = letters[x];
      let upper = num + length;
      for (let i = num; i < upper; i++) {
        shipSquares.push(`${letters[i]}${y}`);
      }
    } else {
      // switches the direction if boat will go off grid
      let num = letters[x];
      let lower = num - length;
      for (let i = num; i > lower; i--) {
        shipSquares.push(`${letters[i]}${y}`);
      }
    }
  } else if (direction === "left") {
    if (letters[x] >= length - 1) {
      let num = letters[x];
      let lower = num - length;
      for (let i = num; i > lower; i--) {
        shipSquares.push(`${letters[i]}${y}`);
      }
    } else {
      // switches the direction if boat will go off grid
      let num = letters[x];
      let upper = num + length;
      for (let i = num; i < upper; i++) {
        shipSquares.push(`${letters[i]}${y}`);
      }
    }
  }

  console.log("Occupied squares: ", occupiedSquares);
  //   console.log("this ship's squares: ", shipSquares);

  if (shipSquares.some((square) => occupiedSquares.includes(square))) {
    console.log("A square is doubled");
    return undefined;
  } else {
    shipSquares.forEach((location) => occupiedSquares.push(location));
    console.log("All good");
    return shipSquares;
  }
};

window.onload = () => {
  console.log("page is fully loaded");
  battleship = setShipLocation(5);
  destroyer1 = setShipLocation(4);
  destroyer2 = setShipLocation(4);
  console.log("battleship: ", battleship);
  console.log("destroyer1: ", destroyer1);
  console.log("destroyer2: ", destroyer2);
  highlightShips(occupiedSquares);
};
