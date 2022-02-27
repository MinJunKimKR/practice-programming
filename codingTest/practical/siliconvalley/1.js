const test = {
  1: {
    rows: 4,
    columns: 3,
    connections: [
      [1, 1, 2, 1],
      [1, 2, 1, 3],
      [1, 3, 2, 3],
      [2, 2, 2, 3],
      [2, 2, 3, 2],
      [2, 3, 3, 3],
      [3, 2, 3, 3],
      [3, 2, 4, 2],
      [4, 1, 4, 2],
    ],
    queries: [
      [2, 2, 3, 1],
      [1, 2, 4, 2],
    ],
  },
  2: {
    rows: 2,
    columns: 2,
    connections: [
      [1, 1, 1, 2],
      [2, 2, 1, 2],
      [2, 1, 1, 1],
      [2, 2, 2, 1],
    ],
    queries: [
      [1, 1, 2, 2],
      [1, 1, 2, 1],
      [2, 1, 2, 2],
      [2, 1, 2, 2],
    ],
  },
  3: {
    rows: 2,
    columns: 2,
    connections: [
      [1, 1, 1, 2],
      [2, 2, 1, 2],
      [2, 1, 1, 1],
      [2, 2, 2, 1],
    ],
    queries: [
      [1, 1, 2, 2],
      [1, 1, 2, 2],
      [1, 1, 2, 2],
    ],
  },
};

function solution(rows, columns, connections, queries) {
  var answer = [];

  queries.forEach((querie) => {
    if (connections.length === 0) {
      answer.push(0);
      return;
    }
    let cutCount = 0;
    let minX = 0;
    let maxX = 0;
    let minY = 0;
    let maxY = 0;
    //Math.min(q[0], q[2]); 등을 써서 좀 더 나이스하게 바꿀수 있을꺼 같다.
    if (querie[0] < querie[2]) {
      minX = querie[0];
      maxX = querie[2];
    } else {
      minX = querie[2];
      maxX = querie[0];
    }
    if (querie[1] < querie[3]) {
      minY = querie[1];
      maxY = querie[3];
    } else {
      minY = querie[3];
      maxY = querie[1];
    }

    const cuttingArea = [];
    for (let x = minX; x <= maxX; x++) {
      for (let y = minY; y <= maxY; y++) {
        cuttingArea.push(`${x},${y}`); //,등으로 구분을 안해서 틀린듯
      }
    }
    connections = connections.filter((connection) => {
      const firstBlock = `${connection[0]},${connection[1]}`;
      const secondBlack = `${connection[2]},${connection[3]}`;
      if (
        (cuttingArea.findIndex((el) => el === firstBlock) > -1 &&
          cuttingArea.findIndex((el) => el === secondBlack) > -1) ||
        (cuttingArea.findIndex((el) => el === firstBlock) === -1 &&
          cuttingArea.findIndex((el) => el === secondBlack) === -1)
        //별도의 함수로 구분하면 좀더 깔끔했을꺼 같다
      ) {
        return true;
      }
      cutCount++;
      return false;
    });
    answer.push(cutCount);
  });
  return answer;
}

// function solution(rows, columns, connections, queries) {
//   let newcons = [...connections];
//   let tmpIndex = [];
//   let result = [];

//   for (let i = 0; i < queries.length; i++) {
//     let q = queries[i];
//     let up = Math.min(q[0], q[2]);
//     let down = Math.max(q[0], q[2]);
//     let left = Math.min(q[1], q[3]);
//     let right = Math.max(q[1], q[3]);
//     let mapInfo = [up, left, down, right];

//     for (let j = 0; j < newcons.length; j++) {
//       if (isTarget(newcons[j], mapInfo)) {
//         tmpIndex.push(j);
//       }
//     }
//     result.push(tmpIndex.length);
//     newcons = newcons.filter((newcon, index) => !tmpIndex.includes(index));
//     tmpIndex = [];
//   }

//   function isTarget(con, mapInfo) {
//     let one = [con[0], con[1]];
//     let two = [con[2], con[3]];

//     if ((isIn(one) && !isIn(two)) || (!isIn(one) && isIn(two))) return true;

//     function isIn(point) {
//       let [up, left, down, right] = mapInfo;
//       if (
//         up <= point[0] &&
//         point[0] <= down &&
//         left <= point[1] &&
//         point[1] <= right
//       ) {
//         return true;
//       }
//       return false;
//     }
//   }

//   return result;
// }

const testCase = test[2];
console.log(
  solution(
    testCase.rows,
    testCase.columns,
    testCase.connections,
    testCase.queries
  )
);
