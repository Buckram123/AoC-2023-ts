import * as fs from "fs";

const maxRed = 12;
const maxGreen = 13;
const maxBlue = 14;

function main() {
  const splitted = fs.readFileSync("./input.txt").toString().split("\n");
  let sum = 0;

  splitted.forEach((line: string) => {
    const game_and_sets = line.split(":");
    const game = game_and_sets[0].split(" ");
    if (game[0] !== "Game") {
      return;
    }
    let possible_game = true;
    const game_num = parseInt(game[1]);
    const sets = game_and_sets[1].split(";");
    sets.forEach((set: string) => {
      const colors = set.split(",");
      colors.forEach((color: string) => {
        const color_and_name = color.trim().split(" ");
        const color_num = parseInt(color_and_name[0]);
        const color_name = color_and_name[1];
        if (
          (color_name === "red" && color_num > maxRed) ||
          (color_name === "green" && color_num > maxGreen) ||
          (color_name === "blue" && color_num > maxBlue)
        ) {
          possible_game = false;
        }
      });
    });
    if (possible_game) {
      sum += game_num;
    }
  });
  console.log(sum);
}

main();
