//refer : https://programmers.co.kr/learn/courses/30/lessons/72411?language=javascript

//GG

/* 
[문제]
각 손님들이 주문한 단품메뉴들이 문자열 형식으로 담긴 배열 orders, 
"스카피"가 추가하고 싶어하는 코스요리를 구성하는 단품메뉴들의 갯수가 담긴 배열 course가 매개변수로 주어질 때, 
"스카피"가 새로 추가하게 될 코스요리의 메뉴 구성을 문자열 형태로 배열에 담아 return 하도록 solution 함수를 완성해 주세요.

[제한사항]
- orders 배열의 크기는 2 이상 20 이하입니다.
- orders 배열의 각 원소는 크기가 2 이상 10 이하인 문자열입니다.
    각 문자열은 알파벳 대문자로만 이루어져 있습니다.
    각 문자열에는 같은 알파벳이 중복해서 들어있지 않습니다.
- course 배열의 크기는 1 이상 10 이하입니다.
    course 배열의 각 원소는 2 이상 10 이하인 자연수가 오름차순으로 정렬되어 있습니다.
    course 배열에는 같은 값이 중복해서 들어있지 않습니다.
- 정답은 각 코스요리 메뉴의 구성을 문자열 형식으로 배열에 담아 사전 순으로 오름차순 정렬해서 return 해주세요.
    배열의 각 원소에 저장된 문자열 또한 알파벳 오름차순으로 정렬되어야 합니다.
    만약 가장 많이 함께 주문된 메뉴 구성이 여러 개라면, 모두 배열에 담아 return 하면 됩니다.
    orders와 course 매개변수는 return 하는 배열의 길이가 1 이상이 되도록 주어집니다.
*/

const test = [
  //   [
  //     ["ABCFG", "AC", "CDE", "ACDE", "BCFG", "ACDEH"],
  //     [2, 3, 4],
  //     ["AC", "ACDE", "BCFG", "CDE"],
  //   ],
  //   [
  //     ["ABCDE", "AB", "CD", "ADE", "XYZ", "XYZ", "ACD"],
  //     [2, 3, 5],
  //     ["ACD", "AD", "ADE", "CD", "XYZ"],
  //   ],
  [
    ["XYZ", "XWY", "WXA"],
    [2, 3, 4],
    ["WX", "XY"],
  ],
];

function solution(orders, course) {
  const combinationMaker = (size, order, str) => {
    if (str.length === size) return;
  };
  let answer = [];
  let maxOrderSize = 0;
  orders = orders.map((order) => {
    if (order.length > maxOrderSize) maxOrderSize = order.length;
    return order.split("").sort().join("");
  });
  console.log(maxOrderSize);
  console.log(orders);

  course.forEach((size) => {
    if (size > maxOrderSize) return;
    const coursePopulationArr = [];
    orders.forEach((order) => {
      combinationMaker(size, order, "");
    });
  });
  return answer;
}

test.forEach((teseCase, index) => {
  console.log(
    `test case[${index + 1}] result : ${
      JSON.stringify(teseCase[2]) ==
      JSON.stringify(solution(teseCase[0], teseCase[1]))
    }`
  );
});
