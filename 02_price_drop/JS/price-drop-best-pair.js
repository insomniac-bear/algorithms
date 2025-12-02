const fs = require('fs');

let fileContent = fs.readFileSync("input.txt", "utf8");

const content = fileContent.toString().replace(/\r/g, '').split('\n');
let res = '';

const n = parseInt(content[0]);
const a = content[1].split(' ').map(Number);
let minIndex = 0;
let bestI1 = 0, bestJ1 = 1;
let bestDiff1 = -Infinity;

let maxIndex = 0;
let bestI2 = 0, bestJ2 = 1;
let bestDiff2 = -Infinity;

for (let i = 1; i < n; i++) {
  // Ищем максимальную разницу
  let diff1 = a[i] - a[minIndex];
  if (diff1 > bestDiff1) {
    bestDiff1 = diff1;
    bestI1 = minIndex;
    bestJ1 = i;
  }
  
  // Ищем минимальную разницу
  let diff2 = a[maxIndex] - a[i];
  if (diff2 > bestDiff2) {
    bestDiff2 = diff2;
    bestI2 = maxIndex;
    bestJ2 = i;
  }
  
  if (a[i] < a[minIndex]) {
    minIndex = i;
  }
  if (a[i] > a[maxIndex]) {
    maxIndex = i;
  }
}

res += `${bestI1 + 1} ${bestJ1 + 1}` + '\n' + `${bestI2 + 1} ${bestJ2 + 1}`;

fs.writeFileSync("output.txt", res);
