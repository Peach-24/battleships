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
let shipsNestedArr = [];
let battleship = [];
let destroyer1 = [];
let destroyer2 = [];
let successfulHits = [];

// Useful random functions - used to generate ship locations
function getRandomNum() {
  return Math.floor(Math.random() * Math.floor(10));
}
function getRandomLetter() {
  return letters[Math.floor(Math.random() * Math.floor(10))];
}
function getRandomDir() {
  return direction[Math.floor(Math.random() * Math.floor(4))];
}

const makeSelection = (input) => {
  const formInput = document.getElementById("coordinates").value.toUpperCase();
  const letterReg = /[A-Z]/g;
  const numReg = /[0-9]/g;
  const inputErr = document.getElementById("err-input");

  if (formInput !== "") {
    if (
      letterReg.test(formInput[0]) === false ||
      numReg.test(formInput[1]) === false
    ) {
      inputErr.style.display = "block";
    } else {
      inputErr.style.display = "none";
    }
  }

  const square = document.getElementById(input || formInput);
  const battle = document.getElementById("battleship");
  const dest1 = document.getElementById("destroyer1");
  const dest2 = document.getElementById("destroyer2");

  if (occupiedSquares.includes(input || formInput)) {
    square.classList.add("hit");
    let feedback = document.getElementById("feedback");
    successfulHits.push(input || formInput);
    feedback.innerText = "HIT!";
  } else {
    let feedback = document.getElementById("feedback");
    square.classList.add("selected");
    feedback.innerText = "MISS!";
  }

  if (battleship.every((el) => successfulHits.indexOf(el) > -1)) {
    battle.classList.add("ship-sunk");
    feedback.innerText = "SINK!";
  }
  if (destroyer1.every((el) => successfulHits.indexOf(el) > -1)) {
    dest1.classList.add("ship-sunk");
    feedback.innerText = "SINK!";
  }
  if (destroyer2.every((el) => successfulHits.indexOf(el) > -1)) {
    dest2.classList.add("ship-sunk");
    feedback.innerText = "SINK!";
  }

  if (successfulHits.length === 13) {
    const message = document.getElementById("success-message");
    message.style.display = "block";
  }
};

const setShipLocation = (length) => {
  const shipSquares = [];
  let shipHead = `${getRandomLetter()}${getRandomNum()}`;
  const x = shipHead.slice(0, 1);
  const y = shipHead.slice(1, 2);
  let direction = getRandomDir();

  // Positions ships, changes the direction if boat will go off grid
  if (direction === "up") {
    if (y >= length) {
      for (let i = y; i > y - length; i--) {
        shipSquares.push(`${x}${i}`);
      }
    } else {
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
      for (let i = y; i > y - length; i--) {
        shipSquares.push(`${x}${i}`);
      }
    }
  } else if (direction === "right") {
    let num = letters[x];
    if (num <= 10 - length) {
      let upper = num + length;
      for (let i = num; i < upper; i++) {
        shipSquares.push(`${letters[i]}${y}`);
      }
    } else {
      let lower = num - length;
      for (let i = num; i > lower; i--) {
        shipSquares.push(`${letters[i]}${y}`);
      }
    }
  } else if (direction === "left") {
    let num = letters[x];
    if (num >= length - 1) {
      let lower = num - length;
      for (let i = num; i > lower; i--) {
        shipSquares.push(`${letters[i]}${y}`);
      }
    } else {
      let upper = num + length;
      for (let i = num; i < upper; i++) {
        shipSquares.push(`${letters[i]}${y}`);
      }
    }
  }

  // checks to see if ship overlaps/shares squares with existing ship
  if (shipSquares.some((square) => occupiedSquares.includes(square))) {
    return undefined;
  } else {
    shipSquares.forEach((location) => occupiedSquares.push(location));
    shipsNestedArr.push(shipSquares);
    return shipSquares;
  }
};

const initGame = () => {
  battleship = setShipLocation(5);
  destroyer1 = setShipLocation(4);
  if (destroyer1 === undefined) {
    destroyer1 = setShipLocation(4);
  }
  destroyer2 = setShipLocation(4);
  if (destroyer2 === undefined) {
    destroyer2 = setShipLocation(4);
  }
  if (destroyer1 === undefined || destroyer2 === undefined) {
    window.location.reload();
  }
};

window.onload = () => {
  console.log("Page is fully loaded.");
  initGame();
  console.log("Ship locations:", shipsNestedArr);
};
