import * as fs from "fs";

function main() {
  const splitted = fs.readFileSync("./input.txt").toString().split("\n");
  let sum = 0;

  splitted.forEach((line: string) => {
    if (line === "") {
      return;
    }
    const [_, sets] = line.split(":", 2);
    const sets_splitted = sets.split(";");

    let min_red = 0;
    let min_green = 0;
    let min_blue = 0;

    sets_splitted.forEach((set: string) => {
      const colors = set.split(",");
      colors.forEach((color: string) => {
        const [color_num_str, color_name] = color.trim().split(" ", 2);
        const color_num = parseInt(color_num_str);
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
