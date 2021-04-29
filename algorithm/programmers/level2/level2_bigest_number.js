// refer : https://programmers.co.kr/learn/courses/30/lessons/42746?language=javascript

const test = {
  1: {
    input: [6, 10, 2],
    output: '6210',
  },
  2: {
    input: [3, 30, 34, 5, 9],
    output: '9534330',
  },
  3: {
    input: [0, 0, 0, 0],
    output: '0',
  },
  4: {
    input: [15, 151],
    output: '15151',
  },
};

function solution(numbers) {
  const sortedNumber = numbers
    .sort((a, b) => {
      const stringA = String(a);
      const stringB = String(b);
      return Number(stringB + stringA) - Number(stringA + stringB);
    })
    .join('');
  return Number(sortedNumber) === 0 ? '0' : sortedNumber;
}

const testCase = test['3'];

console.log(solution(testCase.input));
