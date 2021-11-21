//refer : https://programmers.co.kr/learn/courses/30/lessons/67259
// 참고 링그 : https://velog.io/@jehjong/%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%A8%B8%EC%8A%A4-%EC%B9%B4%EC%B9%B4%EC%98%A4%EC%9D%B8%ED%84%B4-%EA%B2%BD%EC%A3%BC%EB%A1%9C-%EA%B1%B4%EC%84%A4
const test = {
  1: {
    input: [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ],
    output: 900,
  },
  2: {
    input: [
      [0, 0, 0, 0, 0, 0, 0, 1],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0, 1],
      [0, 0, 1, 0, 0, 0, 1, 0],
      [0, 1, 0, 0, 0, 1, 0, 0],
      [1, 0, 0, 0, 0, 0, 0, 0],
    ],
    output: 3800,
  },
  3: {
    input: [
      [0, 0, 1, 0],
      [0, 0, 0, 0],
      [0, 1, 0, 1],
      [1, 0, 0, 0],
    ],
    output: 2100,
  },
  4: {
    input: [
      [0, 0, 0, 0, 0, 0],
      [0, 1, 1, 1, 1, 0],
      [0, 0, 1, 0, 0, 0],
      [1, 0, 0, 1, 0, 1],
      [0, 1, 0, 0, 0, 1],
      [0, 0, 0, 0, 0, 0],
    ],
    output: 3200,
  },
};
// 1:00
function solution(board) {
  var answer = 0;
  let direction = "";
  const directionArr = ["up", "down", "left", "right"];
  const maxXY = [board[0].length - 1, board.length - 1]; //x,y
  console.log("maxXY : ", maxXY);
  //상하좌우
  const nx = [0, 0, -1, 1];
  const ny = [-1, 1, 0, 0];

  const findPath = (fee, nextPosition, pathBoard, direction, preDirection) => {
    // console.log("nextPosition : ", nextPosition);
    // console.log("fee : ", fee);
    const x = nextPosition[0];
    const y = nextPosition[1];

    if (pathBoard[x][y] === 1) {
      return;
    }
    pathBoard[x][y] = 1;
    if (x === maxXY[0] && y === maxXY[1]) {
      if (fee < answer || answer === 0) answer = fee;
      // console.log("FINISH!!!!! :", fee);
      return;
    }
    // console.log("pathBoard : ", pathBoard);
    fee += 100;
    if (direction !== preDirection && preDirection !== "" && direction !== "") {
      fee += 500;
    }
    for (let i = 0; i < directionArr.length; i++) {
      if (
        x + nx[i] < 0 ||
        x + nx[i] > maxXY[0] ||
        y + ny[i] < 0 ||
        y + ny[i] > maxXY[1] ||
        pathBoard[x + nx[i]][y + ny[i]] === 1
      ) {
        // console.log(`Cant go : [${x + nx[i]},${y + ny[i]}]`);
        continue;
      }
      findPath(
        fee,
        [x + nx[i], y + ny[i]],
        JSON.parse(JSON.stringify(pathBoard)),
        directionArr[i],
        direction
      );
    }
  };
  findPath(0, [0, 0], board, "", "");
  // const queue = [[0, 0]];
  // while (queue.length !== 0) {
  //   const position = queue.shift();
  //   const x = position[0];
  //   const y = position[1];
  //   console.log(board);
  //   console.log(`[${x}, ${y}]`);
  //   console.log(direction);
  //   if (x === boardSize[0] && y === boardSize[1]) break;
  //   for (let i = 0; i < 4; i++) {
  //     if (
  //       x + nx[i] < 0 ||
  //       x + nx[i] > boardSize[0] - 1 ||
  //       y + ny[i] < 0 ||
  //       y + ny[i] > boardSize[1] - 1 ||
  //       (x + nx[i] === 0 && y + ny[i] === 0)
  //     ) {
  //       continue; //board 밖으로 넘어가 버린다면
  //     }
  //     if (board[x + nx[i]][y + ny[i]] === 0) {
  //       const nextPosition = [x + nx[i], y + ny[i]];
  //       queue.push(nextPosition);
  //       board[x + nx[i]][y + ny[i]] = 100 + board[x][y];
  //       if (directionArr[i] !== direction) {
  //         direction = directionArr[i];
  //         if (direction !== "") board[x + nx[i]][y + ny[i]] += 500;
  //       }
  //     }
  //   }
  // }

  return answer;
}

// let minimum = 0;
// function findPath(position, cost, board, marker, ahead) {
//   console.log(board[0][0]);
//   const x = position[0];
//   const y = position[1];
//   console.log("x : ", x);
//   console.log("y : ", y);
//   if (
//     x > board.length - 1 ||
//     x < 0 ||
//     y > board.length - 1 ||
//     y < 0 ||
//     board[x][y] === 1 ||
//     marker[x][y] === false
//   ) {
//     return;
//   }
//   if (x === board.length - 1 && y === board.length - 1) {
//     if (minimum === 0 || minimum > cost) {
//       minimum = cost;
//       return;
//     }
//   }
//   marker[x][y] = false; //현재 위치 마킹
//   findPath(
//     [x, y + 1],
//     ahead === "x" && ahead !== "" ? cost + 600 : cost + 100,
//     board,
//     marker,
//     "y"
//   );
//   findPath(
//     [x, y - 1],
//     ahead === "x" && ahead !== "" ? cost + 600 : cost + 100,
//     board,
//     marker,
//     "y"
//   );
//   findPath(
//     [x + 1, y],
//     ahead === "y" && ahead !== "" ? cost + 600 : cost + 100,
//     board,
//     marker,
//     "x"
//   );
//   findPath(
//     [x - 1, y],
//     ahead === "x" && ahead !== "" ? cost + 600 : cost + 100,
//     board,
//     marker,
//     "x"
//   );
// }
// function solution(board) {
//   var answer = 0;
//   const marker = Array(board.length)
//     .fill(null)
//     .map(() => Array(board.length).fill(true));
//   findPath([0, 0], 0, board, marker, "");
//   console.log("minimum : ", minimum);
//   return answer;
// }

const testCase = test["2"].input;
console.log(solution(testCase));
