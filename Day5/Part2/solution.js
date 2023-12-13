import fs from "fs";

const input = fs.readFileSync("./input.txt", "utf-8").split("\n\r");

const lines = input.map((l) =>
  l.replaceAll("\n", " ").replaceAll("\r", " ").trim()
);

let min = 999999999999999;

let seeds = [];

const adventMap = new Map();

lines.map((l, index) => {
  const [map, numbers] = l.split(":");

  const chunks = [];

  const tempNum = numbers.trim().replaceAll("  ", " ");
  const parsedNumbers = tempNum.split(" ");

  for (let i = 0; i < parsedNumbers.length; i += 3) {
    chunks.push(parsedNumbers.slice(i, i + 3));
  }

  if (index === 0) {
    let tempInput = numbers.trim().split(" ");

    for (let i = 0; i < tempInput.length; i++) {
      if (i % 2 !== 0) {
        seeds.push([
          parseInt(tempInput[i - 1]),
          parseInt(tempInput[i]) + parseInt(tempInput[i - 1]),
        ]);
      }
    }
  }

  if (index !== 0) adventMap.set(map, chunks);
});

seeds.forEach((interval) => {
  for (let i = interval[0]; i < interval[1]; i++) {
    let currentSeed = i;
    let ans = 0;

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

        if (currentSeed >= sourceRangeStart && currentSeed <= sourceRangeEnd) {
          found = parseInt(currentSeed) - parseInt(sourceRangeStart);
          currentSeed = parseInt(found) + parseInt(destinationRangeStart);

          check = true;
        }
      });
    });

    if (min > currentSeed) min = currentSeed;
  }

  console.log(min);
});
