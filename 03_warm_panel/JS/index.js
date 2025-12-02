const fs = require('fs');

let fileContent = fs.readFileSync("input.txt", "utf8");

const content = fileContent.toString().replace(/\r/g, '').split(' ');
const R = parseInt(content[0]);
const B = parseInt(content[1]);

const a = 1;
const b = 2 - R / 2;

const D = (2 - R / 2)**2 - (4 * B);

let W2 = 0;

if (D > 0) {
  const x1 = (Math.sqrt(D) - (2 - R / 2)) / 2;
  const x2 = (-Math.sqrt(D) - (2 - R / 2)) / 2;
  if (x1 > 0) {
    W2 = x1;
  } else if (x2 > 0) {
    W2 = x2;
  }
} else if (D === 0) {
  W2 = (R / 2 - 2) / 2;
}

const H2 = B / W2;

const H1 = H2 + 2;
const W1 = W2 + 2;

let res = `${W1} ${H1}`;


fs.writeFileSync("output.txt", res);
