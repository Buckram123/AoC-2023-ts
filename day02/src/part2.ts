import * as fs from "fs";

function main() {
  const splitted = fs.readFileSync("./input.txt").toString().split("\n");
  let sum = 0;

  splitted.forEach((line: string) => {
    const game_and_sets = line.split(":");
    const game = game_and_sets[0].split(" ");
    if (game[0] !== "Game") {
      return;
    }
    const sets = game_and_sets[1].split(";");

    let min_red = 0;
    let min_green = 0;
    let min_blue = 0;

    sets.forEach((set: string) => {
      const colors = set.split(",");
      colors.forEach((color: string) => {
        const color_and_name = color.trim().split(" ");
        const color_num = parseInt(color_and_name[0]);
        const color_name = color_and_name[1];
        if (color_name === "red" && min_red < color_num) {
          min_red = color_num;
        } else if (color_name === "green" && min_green < color_num) {
          min_green = color_num;
        } else if (color_name === "blue" && min_blue < color_num) {
          min_blue = color_num;
        }
      });
    });
    sum += min_red * min_green * min_blue;
  });
  console.log(sum);
}

main();
