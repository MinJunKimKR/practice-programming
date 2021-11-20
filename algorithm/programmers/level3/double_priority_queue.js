//refer : https://programmers.co.kr/learn/courses/30/lessons/42628?language=javascript

const test = {
  1: {
    input: ["I 16", "D 1"],
    output: [0, 0],
  },
  2: {
    input: ["I 7", "I 5", "I -5", "D -1"],
    output: [7, 5],
  },
  3: {
    input: ["I 7"],
    output: [7, 7],
  },
  4: {
    input: ["D 1"],
    output: [7, 7],
  },
  5: {
    input: ["I 7", "I 7", "I 5", "I -5", "D -1", "D 1"],
    output: [7, 5],
  },
  6: {
    input: ["I 7", "I 7", "I 500", "I -5", "I -350", "D -1", "D 1"],
    output: [7, 5],
  },
};

function solution(operations) {
  const answer = [];
  const doubleQueue = [];

  operations.forEach((operation) => {
    const arrOperation = operation.split(" ");
    if (arrOperation[0] === "I") {
      doubleQueue.push(arrOperation[1]);
      doubleQueue.sort((a, b) => {
        if (Number(a) > Number(b)) return -1;
        if (Number(a) < Number(b)) return 1;
        return 0;
      });
      return;
    }
    if (arrOperation[1] === "1") {
      doubleQueue.shift();
      return;
    }
    doubleQueue.pop();
    return;
  });
  if (doubleQueue.length === 0) {
    answer.push(0);
    answer.push(0);
    return answer;
  }
  if (doubleQueue.length === 1) {
    answer.push(Number(doubleQueue[0]));
    answer.push(Number(doubleQueue[0]));
    return answer;
  }
  answer.push(Number(doubleQueue.shift()));
  answer.push(Number(doubleQueue.pop()));
  return answer;
}

const testCase = test["6"].input;
console.log(solution(testCase));
