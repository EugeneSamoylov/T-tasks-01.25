var readline = require("readline");
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

process.stdin.on("end", () => {
  process.exit(0);
});

let lineOne, lineTwo;
rl.on("line", function (data) {
  if (!lineOne) {
    lineOne = data.split(" ").map(Number);
  } else {
    lineTwo = data.split(" ").map(Number);

    goodSchedule(lineOne, lineTwo);
  }
});

function goodSchedule(lineOne, lineTwo) {
  let left, right, n, m, arr, counter;
  let sum = Infinity;

  [n, m] = [...lineOne];
  [left, right, ...arr] = [...lineTwo];
  arr.sort((a, b) => a - b);

  if (arr[arr.length - 1] < left) {
    sum = left - arr[arr.length - m];
  } else if (arr[0] > right) {
    sum = arr[m - 1] - right;
  } else {
    let counterArray = arr.filter((a) => a >= left && a <= right);

    counter = counterArray.length;
    if (counter === 0) {
      counterArray[0] = arr.find((a) => a > right);
      counterArray[1] = arr.findLast((a) => a < left);
    }
    let residue = m - counter;
    if (residue > 0) {
      let indexInsideFirst = arr.findIndex((a) => a === counterArray[0]);
      let indexInsideLast = arr.findLastIndex(
        (a) => a === counterArray[counterArray.length - 1]
      );
      let nearArray = arr
        .slice(
          indexInsideFirst - residue >= 0 ? indexInsideFirst - residue : 0,
          indexInsideLast + residue + 1
        )
        .filter((a) => a < left || a > right);
      let l = 0;
      let r = residue - 1;

      while (l <= residue && r < nearArray.length) {
        let leftSum = left - nearArray[l] > 0 ? left - nearArray[l] : 0;
        let rightSum = nearArray[r] - right > 0 ? nearArray[r] - right : 0;

        let newSum = leftSum + rightSum;

        if (newSum < sum) {
          sum = newSum;
        }
        l++;
        r++;
      }
    } else {
      sum = 0;
    }
  }

  console.log(sum);
}
