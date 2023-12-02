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

  splitted.forEach((line) => {
    let first_num = 0;
    let last_num = 0;

    let buf = "";

    for (let i = 0; i < line.length; i++) {
      const c = line.charAt(i);
      buf += c;

      const sNum = spelledNum(buf);
      const num = parseInt(c);
      if (!isNaN(num)) {
        if (first_num == 0) {
          first_num = num;
        }
        last_num = num;
      } else if (!isNaN(sNum)) {
        buf = c;
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
