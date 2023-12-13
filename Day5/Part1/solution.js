const fs = require("fs");

const input = fs.readFileSync("./input.txt", "utf-8").split("\n\r");

const lines = input.map((l) =>
  l.replaceAll("\n", " ").replaceAll("\r", " ").trim()
);

const final = [];

const adventMap = new Map();
let seeds = [];

lines.map((l, index) => {
  const [map, numbers] = l.split(":");

  const chunks = [];

  const tempNum = numbers.trim().replaceAll("  ", " ");
  const parsedNumbers = tempNum.split(" ");

  for (let i = 0; i < parsedNumbers.length; i += 3) {
    chunks.push(parsedNumbers.slice(i, i + 3));
  }

  if (index === 0) seeds = numbers.trim().split(" ");

  if (index !== 0) adventMap.set(map, chunks);
});

seeds.forEach((currentSeed) => {
  let answer = parseInt(currentSeed);

  adventMap.forEach((v, k) => {
    let check = false;

    v.forEach((e) => {
      const rangeLength = e[e.length - 1];
      const destinationRangeStart = e[0];
      const sourceRangeStart = e[1];

      const sourceRangeEnd =
        parseInt(sourceRangeStart) + parseInt(rangeLength - 1);

      let found = null;

      if (check) return;

      if (answer >= sourceRangeStart && answer <= sourceRangeEnd) {
        found = parseInt(answer) - parseInt(sourceRangeStart);
        answer = parseInt(found) + parseInt(destinationRangeStart);
        check = true;
      }
    });
  });

  final.push(answer);
});

console.log(Math.min(...final));
