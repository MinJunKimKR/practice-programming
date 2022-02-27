//refer : https://programmers.co.kr/learn/courses/30/lessons/42895?language=javascript

const test = {
  1: {
    input: {
      N: 5,
      number: 12,
    },
    output: 4,
  },
  2: {
    input: {
      N: 2,
      number: 11,
    },
    output: 3,
  },
};

function solution(N, number) {
  var answer = 0;
  function bfs(N, number, count) {
    if (count >= 8) {
      return -1;
    }
  }
  return answer;
}

const testCase = test["1"].input;
console.log(solution(testCase.N, testCase.number));
