import * as fs from "fs";

function main() {
  const splitted = fs.readFileSync("./input.txt").toString().split("\n");

  let sum = 0;
  splitted.forEach((line) => {
    let first_num = 0;
    let last_num = 0;

    for (let i = 0; i < line.length; i++) {
      const num = parseInt(line.charAt(i));
      if (!isNaN(num)) {
        if (first_num == 0) {
          first_num = num;
        }
        last_num = num;
      }
    }
    sum += first_num * 10 + last_num;
  });

  console.log(sum);
}

main();
