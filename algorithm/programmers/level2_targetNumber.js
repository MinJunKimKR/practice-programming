// refer : https://programmers.co.kr/learn/courses/30/lessons/43165?language=javascript

const test = {
  input: {
    numbers: [1, 1, 1, 1, 1],
    target: 3,
  },
  output: 5,
};

// function solution(numbers, target) {
//   var answer = 0;
//   function calNums(idx, sumNum) {
//     if (numbers.length === idx) {
//       if (sumNum === target) {
//         answer++;
//       }
//       return;
//     }
//     calNums(idx + 1, sumNum + numbers[idx]);
//     calNums(idx + 1, sumNum - numbers[idx]);
//   }
//   calNums(0, 0);
//   return answer;
// }
function solution(numbers, target) {
  var answer = 0;

  function calNums(numbers, sumNum) {
    const newNumbers = JSON.parse(JSON.stringify(numbers));
    if (newNumbers.length === 0) {
      if (sumNum === target) {
        answer++;
      }
      return;
    }
    const firstNum = newNumbers.shift();
    calNums(newNumbers, sumNum + firstNum);
    calNums(newNumbers, sumNum - firstNum);
  }
  calNums(numbers, 0);
  return answer;
}

console.log(solution(test.input.numbers, test.input.target));
