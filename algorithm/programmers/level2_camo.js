//refer : https://programmers.co.kr/learn/courses/30/lessons/42578?language=javascript

const test = {
  input: [
    ["yellowhat", "headgear"],
    ["bluesunglasses", "eyewear"],
    ["green_turban", "headgear"],
  ],
  output: 5,
};

function solution(clothes) {
  var answer = 0;
  const clotheList = {};
  for (let i = 0; i < clothes.length; i++) {
    const clothe = clothes[i];
    if (!clotheList[clothe[1]]) {
      clotheList[clothe[1]] = [];
    }
    clotheList[clothe[1]].push(clothe[0]);
  }
  console.log(clotheList);
  return answer;
}

console.log(solution(test.input));
