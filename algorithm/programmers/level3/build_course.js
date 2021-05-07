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
let minimum = 0;
function findPath(position, cost, board, marker, ahead) {
  console.log(board[0][0]);
  const x = position[0];
  const y = position[1];
  console.log("x : ", x);
  console.log("y : ", y);
  if (
    x > board.length - 1 ||
    x < 0 ||
    y > board.length - 1 ||
    y < 0 ||
    board[x][y] === 1 ||
    marker[x][y] === false
  ) {
    return;
  }
  if (x === board.length - 1 && y === board.length - 1) {
    if (minimum === 0 || minimum > cost) {
      minimum = cost;
      return;
    }
  }
  marker[x][y] = false; //현재 위치 마킹
  findPath(
    [x, y + 1],
    ahead === "x" && ahead !== "" ? cost + 600 : cost + 100,
    board,
    marker,
    "y"
  );
  findPath(
    [x, y - 1],
    ahead === "x" && ahead !== "" ? cost + 600 : cost + 100,
    board,
    marker,
    "y"
  );
  findPath(
    [x + 1, y],
    ahead === "y" && ahead !== "" ? cost + 600 : cost + 100,
    board,
    marker,
    "x"
  );
  findPath(
    [x - 1, y],
    ahead === "x" && ahead !== "" ? cost + 600 : cost + 100,
    board,
    marker,
    "x"
  );
}
function solution(board) {
  var answer = 0;
  const marker = Array(board.length)
    .fill(null)
    .map(() => Array(board.length).fill(true));
  findPath([0, 0], 0, board, marker, "");
  console.log("minimum : ", minimum);
  return answer;
}

const testCase = test["4"].input;
console.log(solution(testCase));
