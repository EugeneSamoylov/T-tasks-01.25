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

function minOperarionOfnum(num1, num2 = 0, num3 = 0, array = [...lineTwo]) {
  let minIndex;
  num1 = BigInt(num1);
  let minOperation = Infinity,
    operations;
  array.forEach((element, index) => {
    if (element <= num1) {
      operations = num1 - element;
    } else {
      let rest = element % num1;
      operations = rest < Number(num1) / 2 ? rest : num1 - rest;
    }
    if (minOperation > operations) {
      minOperation = operations;
      minIndex = index;
    }
  });
  array.splice(minIndex, 1);
  if (num2) {
    let min2;
    [min2, array] = [...minOperarionOfnum(num2, null, null, array)];
    minOperation += min2;
  }
  if (num3) {
    let min3;
    [min3, array] = [...minOperarionOfnum(num3, null, null, array)];
    minOperation += min3;
  }
  return [minOperation, array];
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

  sumNokAll = minOperarionOfnum(nokAll)[0];
  if (sumNokAll == 0) return 0;
  if (nokFirstTwo !== nokAll) {
    // sumFirst = minOperarionOfnum(nokFirstTwo) + minOperarionOfnum(z);
    sumFirst = minOperarionOfnum(nokFirstTwo, z)[0];
    if (sumFirst == 0) return 0;
  }
  if (nokLastTwo !== nokAll) {
    // sumLast = minOperarionOfnum(nokLastTwo) + minOperarionOfnum(x);
    sumLast = minOperarionOfnum(nokLastTwo, x)[0];
    if (sumLast == 0) return 0;
  }
  if (x !== nokAll && y !== nokAll && z !== nokAll) {
    // sumAll = minOperarionOfnum(x) + minOperarionOfnum(y) + minOperarionOfnum(z);
    sumAll = minOperarionOfnum(x, y, z)[0];
    if (sumAll == 0) return 0;
  }
  answerOperation = [sumNokAll, sumFirst, sumLast, sumAll].reduce((a, b) =>
    b < a ? b : a
  );
  return answerOperation.toString();
}
