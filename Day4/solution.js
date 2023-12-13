const fs = require("fs");

const input = fs.readFileSync("./input.txt", "utf-8").split(/\r?\n/);

const part1 = [];
const part2 = Array(input.length).fill(1);

input.forEach((line, index) => {
  const numbers = line.split(":")[1];
  const wNumbers = numbers.split("|")[0].trim().split(/\s+/);
  const myNumbers = numbers.split("|")[1].trim().split(/\s+/);

  let count = 0;

  wNumbers.forEach((el) => {
    if (myNumbers.includes(el)) {
      count++;
    }
  });

  if (count) {
    part1.push(2 ** (count - 1));
  }

  for (let i = index + 1; i <= index + count; i++) {
    part2[i] += part2[index];
  }
});

console.log(part1.reduce((sum, cur) => sum + cur));
console.log(part2.reduce((sum, cur) => sum + cur));
