const fs = require("fs");

let fileContent = fs.readFileSync("input.txt", "utf8");
const MOD = BigInt(1e9 + 7);

const data = fileContent.toString().replace(/\r/g, "").split("\n");

const M = data[0].split(" ").map(BigInt)[0];
const N = data[0].split(" ").map(BigInt)[1];
const W = data[1]
  .split(" ")
  .map(BigInt)
  .sort((a, b) => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  });

const totalNeed = W.reduce((a, b) => a + b, 0n);
let shortage = totalNeed - M;
let result = 0n;

for (let i = 0; i < N; i++) {
  const groupsLeft = N - BigInt(i);

  if (shortage === 0n) {
    break;
  }

  if (W[i] * groupsLeft <= shortage) {
    result = (result + (W[i] % MOD) * (W[i] % MOD)) % MOD;
    shortage -= W[i];
  } else {
    const base = shortage / groupsLeft; // Целочисленное деление
    const remainder = Number(shortage % groupsLeft);

    const extraGroups = remainder;
    const normalGroups = Number(groupsLeft) - extraGroups;

    const baseMod = base % MOD;
    const basePlusOneMod = (base + 1n) % MOD;

    const baseSq = (baseMod * baseMod) % MOD;
    const basePlusOneSq = (basePlusOneMod * basePlusOneMod) % MOD;

    result = (result + baseSq * BigInt(normalGroups)) % MOD;
    if (extraGroups > 0) {
      result = (result + basePlusOneSq * BigInt(extraGroups)) % MOD;
    }

    break;
  }
}
fs.writeFileSync("output.txt", `${result % MOD}`);
