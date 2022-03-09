const N = 5; //11475

// const solution = (N) => {
//   //N -> N:59:59
//   let count = 0;
//   let h = 0;
//   let m = 0;
//   let s = 0;
//   while (true) {
//     if (h === N && m === 59 && s === 59) break;
//     s++;
//     if (s >= 60) {
//       s = 0;
//       m++;
//     }
//     if (m >= 60) {
//       m = 0;
//       h++;
//     }
//     const time = `${h}${m}${s}`;
//     if (time.includes("3")) count++;
//   }
//   return count;
// };

const solution = (N) => {
  let count = 0;
  for (let h = 0; h <= N; h++) {
    for (let m = 0; m < 60; m++) {
      for (let s = 0; s < 60; s++) {
        const time = `${h}${m}${s}`;
        if (time.includes("3")) {
          count++;
        }
      }
    }
  }
  return count;
};

console.log(solution(N));
