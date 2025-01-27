var readline = require("readline");
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let lineOne, lineTwo, lineThree;

process.stdin.on("end", () => {
  process.exit(0);
});

rl.on("line", function (data) {
  lineOne = data;
  if (lineOne === "RSM" || lineOne === "RMS" || lineOne === "SRM") {
    console.log("Yes");
  } else {
    console.log("No");
  }
});
