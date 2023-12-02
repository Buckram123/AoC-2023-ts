import * as fs from "fs";

function main() {
  const splitted = fs.readFileSync("./input.txt").toString().split("\n");

  let sum = 0;
  splitted.forEach((line: string) => {
    let first_digit = 0;
    let last_digit = 0;

    for (let i = 0; i < line.length; i++) {
      const digit = parseInt(line.charAt(i));
      if (!!digit) {
        if (first_digit == 0) {
          first_digit = digit;
        }
        last_digit = digit;
      }
    }
    sum += first_digit * 10 + last_digit;
  });

  console.log(sum);
}

main();
