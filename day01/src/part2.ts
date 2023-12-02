import * as fs from "fs";

const nums = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

const spelledNum = (s: string): number => {
  const found = nums.findIndex((num) => s.includes(num));

  if (found != -1) {
    return found + 1;
  } else {
    return NaN;
  }
};

function main() {
  const splitted = fs.readFileSync("./input.txt").toString().split("\n");

  let sum = 0;

  splitted.forEach((line: string) => {
    let first_num = 0;
    let last_num = 0;

    let buf = "";

    for (let i = 0; i < line.length; i++) {
      const character = line.charAt(i);
      buf += character;

      const sNum = spelledNum(buf);
      const digit = parseInt(character);
      if (!isNaN(digit)) {
        if (first_num == 0) {
          first_num = digit;
        }
        last_num = digit;
      } else if (!isNaN(sNum)) {
        buf = character;
        if (first_num == 0) {
          first_num = sNum;
        }
        last_num = sNum;
      }
    }
    sum += first_num * 10 + last_num;
  });

  console.log(sum);
}

main();
