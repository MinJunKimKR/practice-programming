const test = {
  1: {
    names: ["azad", "andy", "louis", "will", "edward"],
    homes: [
      [3, 4],
      [-1, 5],
      [-4, 4],
      [3, 4],
      [-5, 0],
    ],
    grades: [4.19, 3.77, 4.41, 3.65, 3.58],
    result: [2, 3, 1, 5, 4],
  },
  2: {
    names: ["ab", "ac", "ba", "be", "c"],
    homes: [
      [1, 1],
      [1, 1],
      [2, 2],
      [2, 3],
      [1, 1],
    ],
    grades: [2, 2, 3, 3, 4],
    result: [2, 3, 1, 5, 4],
  },
  3: {
    names: ["ab", "dc"],
    homes: [
      [9999, -9999],
      [-300, -100],
    ],
    grades: [2.0, 1.9],
    result: [1, 2],
  },
};

function solution(names, homes, grades) {
  var answer = [];
  if (names.length === 1) return [1];

  const studentsInfo = names.map((value, index) => {
    const destance =
      Math.pow(Math.abs(homes[index][0]), 2) +
      Math.pow(Math.abs(homes[index][1]), 2);
    return [value, destance, Math.floor(grades[index]), index];
  });
  console.log(studentsInfo);
  studentsInfo.sort((a, b) => {
    if (a[2] > b[2]) {
      //학점이 높다면
      return -1;
    }
    if (a[2] < b[2]) {
      //학점이 낮다면
      return 1;
    }
    if (a[1] > b[1]) {
      //거리가 멀다면
      return -1;
    }
    if (a[1] < b[1]) {
      //거리가 더 가깝다면
      return 1;
    }
    if (a[0] < b[0]) return -1; //이름이 더 앞선다면
    return 1; //더 뒤라면
  });
  console.log("=================");
  console.log(studentsInfo);
  studentsInfo.forEach((value, index) => {
    answer[value[3]] = index + 1;
  });

  return answer;
}

const testCase = test[3];
console.log(solution(testCase.names, testCase.homes, testCase.grades));
