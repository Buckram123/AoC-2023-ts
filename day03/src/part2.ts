import * as fs from "fs";

const isDigit = (character: string): boolean => {
  return character >= "0" && character <= "9";
};

type Boundaries = {
  i: number;
  start_j: number;
  end_j: number;
};

// Gets j boundaries
const getBoundaries = (
  input: string[],
  i: number,
  position_j: number
): Boundaries => {
  let j = position_j;

  while (isDigit(input[i][j])) {
    j--;
  }
  const start_j = j + 1;

  j = position_j;
  while (isDigit(input[i][j])) {
    j++;
  }
  const end_j = j;

  return { i, start_j, end_j };
};

// Found asterisk - need to check if there is exactly 2 numbers around and multiply them
const partAsterisk = (input: string[], i: number, j: number): number => {
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

  let numbers_around: Boundaries[] = [];

  // Find numbers around this asterisk
  // and if it's unique "number" push to the "numbers_around"
  check_positions.forEach((positions: number[]) => {
    const [check_i, check_j] = [positions[0] + i, positions[1] + j];
    if (isDigit(input[check_i][check_j])) {
      const boundaries = getBoundaries(input, check_i, check_j);
      // imagine having PartialEq/Eq LMAO
      if (
        !numbers_around.some((obj) => {
          return obj.i == boundaries.i && obj.start_j == boundaries.start_j;
        })
      ) {
        numbers_around.push(boundaries);
      }
    }
  });

  // If 2 numbers - multiply them
  if (numbers_around.length == 2) {
    const num1 = parseInt(
      input[numbers_around[0].i].substring(
        numbers_around[0].start_j,
        numbers_around[0].end_j
      )
    );
    const num2 = parseInt(
      input[numbers_around[1].i].substring(
        numbers_around[1].start_j,
        numbers_around[1].end_j
      )
    );
    return num1 * num2;
  } else {
    return 0;
  }
};

function main() {
  const splitted = fs.readFileSync("./input.txt", "ascii").split("\n");
  let sum = 0;

  for (let i = 0; i < splitted.length; i++) {
    for (let j = 0; j < splitted[i].length; j++) {
      if (splitted[i][j] === "*") {
        sum += partAsterisk(splitted, i, j);
      }
    }
  }
  console.log(sum);
}

main();
