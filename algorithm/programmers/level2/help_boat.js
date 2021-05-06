//refer : https://programmers.co.kr/learn/courses/30/lessons/42885?language=javascript
// https://woomin.netlify.app/Posts/2020-06-15-shift-unshift/ shift 속도차
const test = {
  1: {
    input: {
      people: [70, 50, 80, 50],
      limit: 100,
    },
    output: 3,
  },
  2: {
    input: {
      people: [70, 50, 80],
      limit: 100,
    },
    output: 3,
  },
  3: {
    input: {
      people: [80, 40, 40, 40, 40, 40, 160, 50, 120],
      limit: 200,
    },
    output: 4,
  },
  4: {
    input: {
      people: [150, 150, 150, 150, 150],
      limit: 200,
    },
    output: 6,
  },
  5: {
    input: {
      people: [40, 50, 60, 90],
      limit: 100,
    },
    output: 3,
  },
};

// function solution(people, limit) {
//     let answer = 0;

//     //리미트 - 현재 무게 < 40 이면 꽉찬거임
//     //people을 무게가 무거운 순으로 정렬
//     people.sort((a,b) =>b-a)
//     let boatSpace = 0;
//     while(people.length > 0){
//         if(limit-boatSpace < 40){
//             boatSpace = 0;
//             answer++;
//             continue
//         }
//         if(people[people.length-1]+boatSpace <= limit){
//             boatSpace+=people.pop()
//             continue;
//         }
//         boatSpace = 0;
//         answer++;
//     }
//     return answer+1;
// }

// function solution(people, limit) {
//   let answer = 0;
//   people.sort((a, b) => b - a);
//   console.log(people);

//   while (people.length > 0) {
//     if (people[0] <= limit / 2) {
//       answer += Math.ceil(people.length / 2);
//       break;
//     }
//     const first = people.shift();
//     console.log(first);
//     if (people.length === 0) {
//       answer++;
//       break;
//     }
//     if (limit - first < 40) {
//       answer++;
//       continue;
//     }
//     if (first + people[people.length - 1] <= limit) {
//       answer++;
//       people.pop();
//       continue;
//     }
//     answer++;
//   }
//   return answer;
// }

function solution(people, limit) {
  let answer = 0;
  let first = 0;
  let second = people.length - 1;
  people.sort((a, b) => b - a);
  //   console.log(people);
  while (first <= second) {
    // console.log("----------------");
    // console.log("answer : ", answer);
    // console.log("first : ", first);
    // console.log("second : ", second);
    // console.log("people[first] : ", people[first]);
    if (first == second) {
      answer++;
      break;
    }
    if (people[first] <= limit / 2) {
      answer += Math.ceil((second - first + 1) / 2);
      break;
    }
    if (limit - people[first] < 40) {
      answer++;
      first++;
      continue;
    }
    if (people[first] + people[second] <= limit) {
      answer++;
      first++;
      second--;
      continue;
    }
    answer++;
    first++;
  }
  return answer;
}
const testCase = test["3"].input;
console.log(solution(testCase.people, testCase.limit));
