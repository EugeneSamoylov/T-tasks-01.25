var readline = require("readline");
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let lineOne;
let arrOfMoney = [];
let counter = 0;

process.stdin.on("end", () => {
  process.exit(0);
});

rl.on("line", function (data) {
  if (!lineOne) lineOne = +data;
  else {
    arrOfMoney.push(data);
    counter++;
    if (counter === lineOne) {
      arrOfMoney.forEach(maxMoney);
    }
  }
});

function maxMoney(data) {
  let money = BigInt(data);
  let binary = money.toString(2).split("");
  let sumOnes = binary.filter((a) => a === "1").length;
  let answer;
  if (money < 7) {
    answer = -1;
  } else if (sumOnes > 2) {
    let num = 0;
    answer = binary
      .map((a) => {
        if (num >= 3) {
          return "0";
        }
        if (a == "1") num++;
        return a;
      })
      .join("");
  } else if (sumOnes == 2 && binary.length - 1 - binary.lastIndexOf("1") >= 2) {
    answer =
      binary.slice(0, binary.lastIndexOf("1")).join("") +
      "011" +
      "0".repeat(binary.length - 3 - binary.lastIndexOf("1"));
  } else {
    answer = "111" + "0".repeat(binary.length - 4);
  }
  const lastIndex = answer.length - 1;
  if (answer > 0) {
    answer = Array.from(answer).reduceRight(
      (total, currValue, index) =>
        currValue === "1"
          ? total + BigInt(2) ** BigInt(lastIndex - index)
          : total,
      BigInt(0)
    );
  }
  //   answer = parseInt(answer, 2);
  console.log(answer.toString());
}
