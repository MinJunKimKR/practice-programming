//refer : https://programmers.co.kr/learn/courses/30/lessons/42578?language=javascript

const test = {
  1: {
    input: [
      ["yellowhat", "headgear"],
      ["bluesunglasses", "eyewear"],
      ["green_turban", "headgear"],
    ],
    output: 5,
  },
  2: {
    input: [
      ["crow_mask", "face"],
      ["blue_sunglasses", "face"],
      ["smoky_makeup", "face"],
    ],
    output: 3,
  },
  3: {
    input: [
      ["yellowhat", "headgear"],
      ["bluesunglasses", "eyewear"],
      ["green_turban", "headgear"],
      ["crow_mask", "face"],
      ["blue_sunglasses", "face"],
      ["smoky_makeup", "face"],
    ],
    output: 3,
  },
};

function solution(clothes) {
  let answer = 1;
  const clotheCate = {};
  clothes.forEach((clothe) => {
    clotheCate.hasOwnProperty(clothe[1])
      ? clotheCate[clothe[1]].push(clothe[0])
      : (clotheCate[clothe[1]] = ["", clothe[0]]);
  });

  for (const [key, value] of Object.entries(clotheCate)) {
    answer = answer * value.length;
  }

  return answer - 1;
}

// function solution(clothes) {
//   let answer = 1;
//   const clotheList = {};
//   for (let i = 0; i < clothes.length; i++) {
//     const clotheInfo = clothes[i];
//     if (!clotheList[clotheInfo[1]]) {
//       clotheList[clotheInfo[1]] = [];
//     }
//     clotheList[clotheInfo[1]].push(clotheInfo[0]);
//   }
//   for (const type in clotheList) {
//     if (clotheList.hasOwnProperty(type)) {
//       const items = clotheList[type];
//       answer = answer * (items.length + 1); //+1을 하는 이유는 안입는 경우도 포함하기 떄문이다.
//     }
//   }
//   return answer - 1; //모든부위를 안입는 경우가 1개 존재하기 때문에 제거한다
// }

console.log(solution(test["2"].input));
