const fs = require('fs');

let fileContent = fs.readFileSync("input.txt", "utf8");

const content = fileContent.toString().replace(/\r/g, '').split('\n');
let res = '';

const a = content[1].split(' ');
const dict = {};

for (let i = 0; i < a.length - 1; i++) {
  for (let j = i + 1; j < a.length; j++) {
    dict[`${i + 1} ${j + 1}`] = a[i] - a[j];
  }
}

let min, max;

for (let key in dict) {
  if (!min && !max) {
    min = max = key;
  }
  
  if (dict[key] < dict[min]) {
    min = key;
  }
  
  if (dict[key] > dict[max]) {
    max = key;
  }
}

res += min + '\n' + max;

fs.writeFileSync("output.txt", res);
