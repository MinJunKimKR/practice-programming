const fs = require('fs');
const fileData =
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString()
    : ` The Curious Case of Benjamin Button `;

const input = fileData.split(' ');

const notEmptyCells = input.filter((inputCell) => inputCell);
console.log(notEmptyCells);
console.log(notEmptyCells.length);
