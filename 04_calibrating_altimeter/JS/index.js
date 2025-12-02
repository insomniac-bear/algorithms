const fs = require('fs');

let fileContent = fs.readFileSync("input.txt", "utf8");

const nums = fileContent.toString().replace(/\r/g, '').split('\n').map((it) => parseInt(it, 10));
const dp = new Array(201).fill(false);
dp[0] = true;

nums.forEach(num => {
  for (let i = 200; i >= num; i--) {
    if (dp[i - num]) {
      dp[i] = true;
    }
  }
});

let bestSum = 0;
let bestDiff = 100;

for (let i = 0; i <= 200; i++) {
  if (dp[i]) {
    const diff = Math.abs(i - 100);
    if (diff <= bestDiff) {
      bestDiff = diff;
      bestSum = i;
    }
  }
}

const res = bestSum.toString();

fs.writeFileSync("output.txt", res);
