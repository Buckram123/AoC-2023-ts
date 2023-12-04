import * as fs from "fs";

const isDigit = (character: string): boolean => {
  return character >= "0" && character <= "9";
};

const insideNum = (
  start_i: number,
  start_j: number,
  end_j: number,
  i: number,
  j: number
): boolean => {
  return i == start_i && j >= start_j && j < end_j;
};

// After part 2 I realized we could have seeked for "symbols" instead
// after that check [0, -1], [0, 1], [1, 0] and [1, 1] (if no "symbol" on [0, 1]) positions
// and saving those numbers. That would have been much faster
const partNum = (
  input: string[],
  start_i: number,
  start_j: number,
  end_j: number
): number => {
  const check_positions = [
    [-1, -1],
    [-1, 0],
    [0, -1],
    [-1, 1],
    [1, -1],
    [1, 1],
    [1, 0],
    [0, 1],
  ];

  let part_number = false;

  for (let j = start_j; j < end_j; j++) {
    check_positions.forEach((positions: number[]) => {
      const [check_i, check_j] = [positions[0] + start_i, positions[1] + j];
      if (
        check_i >= 0 &&
        check_j >= 0 &&
        check_i < input.length &&
        check_j < input[check_i].length &&
        !insideNum(start_i, start_j, end_j, check_i, check_j)
      ) {
        if (input[check_i][check_j] !== ".") {
          part_number = true;
        }
      }
    });
  }
  if (part_number) {
    return parseInt(input[start_i].substring(start_j, end_j));
  } else {
    return 0;
  }
};

function main() {
  const splitted = fs.readFileSync("./input.txt", "ascii").split("\n");
  let sum = 0;

  for (let i = 0; i < splitted.length; i++) {
    for (let j = 0; j < splitted[i].length; j++) {
      if (isDigit(splitted[i][j])) {
        const start_i = i;
        const start_j = j;
        while (isDigit(splitted[i][j])) {
          j++;
        }
        sum += partNum(splitted, start_i, start_j, j);
      }
    }
  }
  console.log(sum);
}

main();
