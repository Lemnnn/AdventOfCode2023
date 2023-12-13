const fs = require("fs");

const lines = fs.readFileSync("../input.txt", "utf-8").split("\r\n");

const time = lines[0]
  .split(": ")[1]
  .trim()
  .split(" ")
  .filter((el) => el !== "");

const distance = lines[1]
  .split(": ")[1]
  .trim()
  .split(" ")
  .filter((el) => el !== "");

const result = time.map((time, index) => {
  let ways = 0;

  for (let i = 0; i < time; i++) {
    const speed = i;
    const timeRemaining = time - i;
    const tempDistance = speed * timeRemaining;

    if (tempDistance > distance[index]) ways += 1;
  }

  return ways;
});

console.log(result.reduce((sum, curr) => sum * curr));
