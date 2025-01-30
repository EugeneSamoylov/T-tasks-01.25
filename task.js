const { NOTIMP } = require("dns");
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
    lineTwo = data.split(" ").map(BigInt);
    console.log(globalMinOperations());
  }
});

function NOK(A) {
  let n = A.length,
    a = Math.abs(A[0]);
  for (let i = 1; i < n; i++) {
    let b = Math.abs(A[i]),
      c = a;
    while (a && b) {
      a > b ? (a %= b) : (b %= a);
    }
    a = Math.abs(c * A[i]) / (a + b);
  }
  return a;
}

function minOperarionOfNum(num) {
  num = BigInt(num);
  let minOperation = Infinity,
    operations;
  lineTwo.forEach((element) => {
    if (element <= num) {
      operations = num - element;
    } else {
      let rest = element % num;
      operations = rest < Number(num) / 2 ? rest : num - rest;
    }
    minOperation = minOperation < operations ? minOperation : operations;
  });
  return minOperation;
}

function globalMinOperations() {
  let answerOperation;
  let x, y, z, nokAll, nokFirstTwo, nokLastTwo;
  let sumNokAll = Infinity,
    sumFirst = Infinity,
    sumLast = Infinity,
    sumAll = Infinity;

  [, x, y, z] = [...lineOne];

  nokAll = NOK([x, y, z]);
  nokFirstTwo = NOK([x, y]);
  nokLastTwo = NOK([y, z]);

  sumNokAll = minOperarionOfNum(nokAll);
  if (sumNokAll == 0) return 0;
  if (nokFirstTwo !== nokAll) {
    sumFirst = minOperarionOfNum(nokFirstTwo) + minOperarionOfNum(z);
    if (sumFirst == 0) return 0;
  }
  if (nokLastTwo !== nokAll) {
    sumLast = minOperarionOfNum(nokLastTwo) + minOperarionOfNum(x);
    if (sumLast == 0) return 0;
  }
  if (x !== nokAll && y !== nokAll && z !== nokAll) {
    sumAll = minOperarionOfNum(x) + minOperarionOfNum(y) + minOperarionOfNum(z);
    if (sumAll == 0) return 0;
  }
  answerOperation = [sumNokAll, sumFirst, sumLast, sumAll].reduce((a, b) =>
    b < a ? b : a
  );
  return answerOperation.toString();
}
