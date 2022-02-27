// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

const test = [
  ["abc", "bca", "dbe"],
  ["zzzz", "ferz", "zdsr", "fgtd"],
  ["gr", "sd", "rg"],
  ["bdafg", "ceagi"],
];

function solution(S) {
  // write your code in JavaScript (Node.js 8.9.4)
  const SLength = S[0].length;
  console.log("SLength", SLength);
  const arrS = S.map((value) => value.split(""));
  console.log(arrS);
  for (let i = 0; i < arrS.length; i++) {
    const splitedS = arrS[i];
    console.log(splitedS);
    for (let j = 0; j < splitedS.length; j++) {
      const singleS = splitedS[j];
      //   console.log(singleS);
      for (let z = i + 1; z < arrS.length; z++) {
        const compare = arrS[z][j];
        console.log(compare);
        if (compare === singleS) return [i, z, j];
      }
    }
  }
  return [];
}

test.map((value) => console.log(solution(value)));
