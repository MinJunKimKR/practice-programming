//refer : https://programmers.co.kr/learn/courses/30/lessons/67259

const test = {
  1: {
    input: [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ],
    output: 900,
  },
  2: {
    input: [
      [0, 0, 0, 0, 0, 0, 0, 1],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0, 1],
      [0, 0, 1, 0, 0, 0, 1, 0],
      [0, 1, 0, 0, 0, 1, 0, 0],
      [1, 0, 0, 0, 0, 0, 0, 0],
    ],
    output: 3800,
  },
  3: {
    input: [
      [0, 0, 1, 0],
      [0, 0, 0, 0],
      [0, 1, 0, 1],
      [1, 0, 0, 0],
    ],
    output: 2100,
  },
  4: {
    input: [
      [0, 0, 0, 0, 0, 0],
      [0, 1, 1, 1, 1, 0],
      [0, 0, 1, 0, 0, 0],
      [1, 0, 0, 1, 0, 1],
      [0, 1, 0, 0, 0, 1],
      [0, 0, 0, 0, 0, 0],
    ],
    output: 3200,
  },
};
function solution(board) {
  var answer = 0;
  return answer;
}

const testCase = test["1"].input;
console.log(solution(testCase));
