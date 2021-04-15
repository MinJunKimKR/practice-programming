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
};

function makeNumbers(baseNum, cuttedNums, resultNums) {
  const thisTermCount = cuttedNums.length;
  if (thisTermCount === 0) return;
  for (let i = 0; i < thisTermCount; i++) {
    const firstNum = cuttedNums.shift();
    const thisTermNum = `${baseNum}${firstNum}`;
    resultNums.push(Number(thisTermNum));
    // resultNums.push(thisTermNum);
    makeNumbers(thisTermNum, cuttedNums, resultNums);
    cuttedNums.push(firstNum);
  }
}

function isDecimalNumbers(num) {
  const harfOfNum = Math.ceil(num / 2);
  if (num < 2) {
    return false;
  }
  for (let i = 2; i < harfOfNum; i++) {
    if (num % i === 0) return false;
  }
  return true;
}

function solution(numbers) {
  const arrNumber = numbers.split("");
  const numCollector = [];
  makeNumbers("", arrNumber, numCollector);
  const uniqueNumCollector = [...new Set(numCollector)];
  console.log(uniqueNumCollector);
  console.log(isDecimalNumbers(41));
  console.log(uniqueNumCollector.filter((num) => isDecimalNumbers(num)));
  const decimalNums = uniqueNumCollector.filter((num) => isDecimalNumbers(num));
  return decimalNums.length;
}

// function solution(numbers) {
//   console.log(`numbers : ${numbers}`);
//   const allNumbers = getAllNumbers(numbers.split(""));
//   console.log(allNumbers);
//   return allNumbers.filter((v) => isPrime(v)).length;
// }

// function makeNumbers(numString, numsArr, arr) {
//   console.log("=======start make number=======");
//   const length = numsArr.length; //2  1
//   console.log(length);
//   if (length === 0) return; //23
//   for (let i = 0; i < length; i++) { //2  1
//     const target = numsArr.shift();  2 / 31
//     console.log(`target : ${target}`);// 2
//     const newNumString = numString + target;  2
//     console.log(`newNumString : ${newNumString}`); //12
//     const num = Number(newNumString);
//     arr.push(num);//[12,13,3,2,2]
//     makeNumbers(newNumString, numsArr, arr);//2, 31
//     numsArr.push(target);231 312 3 12
//     console.log(`numsArr : ${numsArr}`);
//   }
//   console.log("=======done=======");
// }
// function getAllNumbers(numsArr) {
//   const arr = [];
//   makeNumbers("", numsArr, arr);
//   return Array.from(new Set(arr));
// }

// function isPrime(num) {
//   for (let i = 2, s = Math.sqrt(num); i <= s; i++) {
//     if (num % i === 0) return false;
//   }
//   return num > 1;
// }
const testCase = 2;
const result = solution(test[testCase].input);
console.log(result);
// console.log(result === solution(test[testCase].output));
