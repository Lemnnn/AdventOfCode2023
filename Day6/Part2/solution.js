const fs = require("fs");

const lines = fs.readFileSync("../input.txt", "utf-8").split("\r\n");

const times = lines[0]
  .split(": ")[1]
  .trim()
  .split(" ")
  .filter((el) => el !== "")
  .join("");

const distances = lines[1]
  .split(": ")[1]
  .trim()
  .split(" ")
  .filter((el) => el !== "")
  .join("");

function getWays(time, distance) {
  let ways = 0;

  for (let i = 0; i < time; i++) {
    const speed = i;
    const timeRemaining = time - i;
    const tempDistance = speed * timeRemaining;

    if (tempDistance > distance) ways += 1;
  }

  return ways;
}

const res = getWays(parseInt(times), parseInt(distances));
console.log(res);
