// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

const test = [213, 553, 11111, 598756, 7897987897989879, 789456789];

const RESULT_LIMIT = 1000000000;

function solution(N) {
  // write your code in JavaScript (Node.js 8.9.4)
  const maxSibling = N.toString()
    .split("")
    .sort((a, b) => b - a)
    .join("");
  if (Number(maxSibling) > RESULT_LIMIT) return -1;
  return Number(maxSibling);
}
const testcase = "4";
test.map((value) => console.log(solution(value)));
