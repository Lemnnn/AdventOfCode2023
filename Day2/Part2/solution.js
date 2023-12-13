const fs = require("fs");

const input = fs.readFileSync("../input.txt", "utf-8").split(/\r?\n/);

const result = input.map((line) => {
  const maxNumbers = {
    red: 0,
    green: 0,
    blue: 0,
  };

  line
    .split(": ")[1]
    .split("; ")
    .map((set) => {
      const cubes = set.split(", ");

      return cubes.forEach((cube) => {
        const [number, color] = cube.split(" ");

        if (maxNumbers[color] < Number(number))
          maxNumbers[color] = Number(number);
      });
    });

  console.log(maxNumbers);

  return maxNumbers.red * maxNumbers.green * maxNumbers.blue;
});

const final = result.reduce((sum, curr) => sum + curr);

console.log(final);
