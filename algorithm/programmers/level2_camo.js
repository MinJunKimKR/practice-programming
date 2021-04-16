//refer : https://programmers.co.kr/learn/courses/30/lessons/42578?language=javascript

const test = {
  1: {
    input: [
      ['yellowhat', 'headgear'],
      ['bluesunglasses', 'eyewear'],
      ['green_turban', 'headgear'],
    ],
    output: 5,
  },
  2: {
    input: [
      ['crow_mask', 'face'],
      ['blue_sunglasses', 'face'],
      ['smoky_makeup', 'face'],
    ],
    output: 3,
  },
  3: {
    input: [
      ['yellowhat', 'headgear'],
      ['bluesunglasses', 'eyewear'],
      ['green_turban', 'headgear'],
      ['crow_mask', 'face'],
      ['blue_sunglasses', 'face'],
      ['smoky_makeup', 'face'],
    ],
    output: 3,
  },
};

function solution(clothes) {
  let answer = 1;
  const clotheList = {};
  for (let i = 0; i < clothes.length; i++) {
    const clotheInfo = clothes[i];
    if (!clotheList[clotheInfo[1]]) {
      clotheList[clotheInfo[1]] = [];
    }
    clotheList[clotheInfo[1]].push(clotheInfo[0]);
  }
  console.log(clotheList);
  for (const type in clotheList) {
    if (clotheList.hasOwnProperty(type)) {
      const items = clotheList[type];
      answer = answer * (items.length + 1);
    }
  }
  return answer - 1;
}
// function solution(clothes) {
//   var answer = 0;
//   const clotheList = {};
//   for (let i = 0; i < clothes.length; i++) {
//     const clothe = clothes[i];
//     if (!clotheList[clothe[1]]) {
//       clotheList[clothe[1]] = [];
//     }
//     clotheList[clothe[1]].push(clothe[0]);
//   }
//   let combination = 1;
//   for (const kind in clotheList) {
//     combination = combination * clotheList[kind].length;
//   }
//   return (
//     answer +
//     combination +
//     (Object.keys(clotheList).length === 1 ? 0 : clothes.length)
//   );
// }

console.log(solution(test['3'].input));
