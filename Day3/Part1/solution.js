const fs = require("fs");

const numbers = [];

const input = fs
  .readFileSync("../input.txt", "utf-8")
  .split(/\r?\n/)
  .map((line) => line.split(""));

function findNeighbour(row, col) {
  const rows = input.length;
  const cols = input[0].length;

  function hasNeighbourSymbol(r, c) {
    return (
      r >= 0 &&
      r < rows &&
      c >= 0 &&
      c < cols &&
      input[r][c] !== "." &&
      isNaN(parseInt(input[r][c]))
    );
  }

  const neighbours = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  for (const [x, y] of neighbours) {
    const newRow = row + x;
    const newCol = col + y;

    if (hasNeighbourSymbol(newRow, newCol)) {
      return true;
    }
  }

  return false;
}

for (let i = 0; i < input.length; i++) {
  let number = "";
  let isNearSymbol = false;

  for (let j = 0; j < input[i].length; j++) {
    if (!isNaN(parseInt(input[i][j]))) {
      number += input[i][j];

      if (findNeighbour(i, j)) {
        isNearSymbol = true;
      }
    } else {
      if (number !== "" && isNearSymbol) {
        numbers.push(Number(number));
        number = "";
        isNearSymbol = false;
      } else {
        number = "";
        isNearSymbol = false;
      }
    }

    if (input[i][j + 1] === undefined) {
      if (number !== "" && isNearSymbol) {
        numbers.push(Number(number));
        number = "";
        isNearSymbol = false;
      } else {
        number = "";
        isNearSymbol = false;
      }
    }
  }
}

console.log(numbers.reduce((a, b) => a + b));
