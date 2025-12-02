const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

let inputLines = [];
let lineIndex = 0;

rl.on('line', (line) => {
    inputLines.push(line);
});

rl.on('close', () => {
    solve();
});

function solve() {
    const firstLine = inputLines[lineIndex++].split(' ').map(Number);
    const n = firstLine[0];
    const q = firstLine[1];
    
    const a = inputLines[lineIndex++].split(' ').map(Number);
    
    const firstOccurrence = new Map();
    
    for (let i = 0; i < n; i++) {
        if (!firstOccurrence.has(a[i])) {
            firstOccurrence.set(a[i], i + 1);
        }
    }
    
    const results = [];
    for (let i = 0; i < q; i++) {
        const x = Number(inputLines[lineIndex++]);
        results.push(firstOccurrence.get(x) || -1);
    }
    
    console.log(results.join('\n'));
}