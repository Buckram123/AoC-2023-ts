import * as fs from "fs";

const maxRed = 12;
const maxGreen = 13;
const maxBlue = 14;

function main() {
  const splitted = fs.readFileSync("./input.txt").toString().split("\n");
  let sum = 0;

  splitted.forEach((line: string) => {
    if (line === "") {
      return;
    }
    const [game, sets] = line.split(":", 2);
    const [_, game_num_str] = game.split(" ", 2);
    const game_num = parseInt(game_num_str);
    const sets_splitted = sets.split(";");

    let possible_game = true;

    sets_splitted.forEach((set: string) => {
      const colors = set.split(",");
      colors.forEach((color: string) => {
        const [color_num_str, color_name] = color.trim().split(" ", 2);
        const color_num = parseInt(color_num_str);
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
