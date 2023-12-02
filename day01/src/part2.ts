import * as fs from "fs";

/**
 * Tries to find spelled digit in a string, returning corresponding number for example "oeightp" => 8
 * Supports digits from "one" to "nine"
 *
 * In case of a failure it will return zero
 */
const parseSpelledDigit = (s: string): number => {
  const spelled_digits = [
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
  const index = spelled_digits.findIndex((num) => s.includes(num));
  return index + 1;
};

function main() {
  const splitted = fs.readFileSync("./input.txt").toString().split("\n");

  let sum = 0;

  splitted.forEach((line: string) => {
    let first_digit = 0;
    let last_digit = 0;

    // Buffer for spelled digit
    let spelled_buf = "";

    for (let i = 0; i < line.length; i++) {
      const character = line.charAt(i);
      spelled_buf += character;

      const spelled_digit = parseSpelledDigit(spelled_buf);
      const digit = parseInt(character);
      // If we found digit character or spelled number - update last number
      // and assign first number if it was not assigned yet
      if (!isNaN(digit)) {
        if (first_digit == 0) {
          first_digit = digit;
        }
        last_digit = digit;
      } else if (spelled_digit !== 0) {
        // Reset buffer to current character to cover cases like "zerone"
        spelled_buf = character;
        if (first_digit == 0) {
          first_digit = spelled_digit;
        }
        last_digit = spelled_digit;
      }
    }
    sum += first_digit * 10 + last_digit;
  });

  console.log(sum);
}

main();
