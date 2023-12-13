const fs = require("fs");

const input = fs.readFileSync("./input.txt", "utf-8").split(/\r?\n/);

let sum = 0;

for (let i = 0; i < input.length; i++) {
  const temp = [];

  const parsed = sanitizeInput(input[i]);

  for (let j = 0; j < parsed.length; j++) {
    if (Number.isInteger(parseInt(parsed[j]))) temp.push(parseInt(parsed[j]));
  }

  sum += temp[0] * 10 + temp[temp.length - 1];
}

console.log(sum);

function sanitizeInput(string) {
  string = string
    .replaceAll("oneight", "oneeight")
    .replaceAll("twone", "twoone")
    .replaceAll("threeight", "threeeight")
    .replaceAll("fiveight", "fiveeight")
    .replaceAll("sevenine", "sevennine")
    .replaceAll("eightwo", "eighttwo")
    .replaceAll("eighthree", "eightthree")
    .replaceAll("nineight", "nineeight")
    .replaceAll("one", "1")
    .replaceAll("two", "2")
    .replaceAll("three", "3")
    .replaceAll("four", "4")
    .replaceAll("five", "5")
    .replaceAll("six", "6")
    .replaceAll("seven", "7")
    .replaceAll("eight", "8")
    .replaceAll("nine", "9")
    .replaceAll("zero", "0");

  return string;
}
