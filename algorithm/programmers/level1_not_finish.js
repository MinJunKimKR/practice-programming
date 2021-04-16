//refer : https://programmers.co.kr/learn/courses/30/lessons/42576

const test = {
  input: {
    participant: ["mislav", "stanko", "mislav", "ana"],
    completion: ["stanko", "ana", "mislav"],
  },
  output: "mislav",
};

function solution(participant, completion) {
  participant.sort();
  completion.sort();

  for (let i in participant) {
    if (participant[i] !== completion[i]) return participant[i];
  }
}

// function solution(participant, completion) {
//   for (let i = 0; i < participant.length; i++) {
//     const name = participant[i];
//     const nameLocation = completion.indexOf(name);
//     if (nameLocation > -1) {
//       completion.splice(nameLocation, 1);
//     } else {
//       return name;
//     }
//   }
// }

// function solution(participant, completion) {
//   participant.map((name) => {
//     const nameLocation = completion.indexOf(name);
//     if (nameLocation > -1) {
//       completion.splice(nameLocation, 1);
//     } else {
//       answer = name;
//     }
//   });
//   return answer;
// }

console.log(solution(test.input.participant, test.input.completion));
