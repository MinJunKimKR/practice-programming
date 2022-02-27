// refer : https://programmers.co.kr/learn/courses/30/lessons/42839

/*
한자리 숫자가 적힌 종이 조각이 흩어져있습니다. 
흩어진 종이 조각을 붙여 소수를 몇 개 만들 수 있는지 알아내려 합니다.

각 종이 조각에 적힌 숫자가 적힌 문자열 numbers가 주어졌을 때, 
종이 조각으로 만들 수 있는 소수가 몇 개인지

제한사항
numbers는 길이 1 이상 7 이하인 문자열입니다.
numbers는 0~9까지 숫자만으로 이루어져 있습니다.
"013"은 0, 1, 3 숫자가 적힌 종이 조각이 흩어져있다는 의미입니다.
입출력 예
numbers	return
"17"	3
"011"	2
입출력 예 설명
예제 #1
[1, 7]으로는 소수 [7, 17, 71]를 만들 수 있습니다.

예제 #2
[0, 1, 1]으로는 소수 [11, 101]를 만들 수 있습니다.

11과 011은 같은 숫자로 취급합니다.

*/
const test = {
  1: {
    input: "17",
    output: 3,
  },

  2: {
    input: "011",
    output: 2,
  },

  3: {
    input: "123",
    output: 2,
  },

  4: {
    input: "7843",
    output: 12,
  },
};

//재귀함수
/*
  baseNum : 맨앞에 마킹될 숫자
  cuttedNum : 
*/
function makeNumbers(baseNum, cuttedNums, resultNums) {
  const thisTermCount = cuttedNums.length;
  if (thisTermCount === 0) return;
  for (let i = 0; i < thisTermCount; i++) {
    const firstNum = cuttedNums.shift();
    const thisTermNum = `${baseNum}${firstNum}`;
    resultNums.push(Number(thisTermNum));
    makeNumbers(thisTermNum, cuttedNums, resultNums);
    cuttedNums.push(firstNum);
  }
}

//소수구하기
function isDecimalNumbers(num) {
  const harfOfNum = Math.ceil(num / 2);
  if (num < 2) {
    return false;
  }
  for (let i = 2; i <= harfOfNum; i++) {
    if (num % i === 0) return false;
  }
  return true;
}

function solution(numbers) {
  const arrNumber = numbers.split(""); //전달받은 숫자 분해
  const numCollector = []; //숫자조합을 입력받을 배열
  makeNumbers("", arrNumber, numCollector);
  const uniqueNumCollector = [...new Set(numCollector)]; //중복제거
  const decimalNums = uniqueNumCollector.filter((num) => isDecimalNumbers(num)); //중복제거된 숫자조합에서 소수만 뽑아내기
  return decimalNums.length; //소수집합의 수
}

const testCase = 4;
const result = solution(test[testCase].input);
console.log(result);
