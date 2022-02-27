// const Stack = () => {
//   this.dataStore = [];
//   this.top = 0;
//   this.push = push;
//   this.pop = pop;
//   this.peek = peek;
//   this.clear = clear;
//   this.length = length;
// };

// const push = (element) => {
//   this.dataStore[this.top++] = element;
// };

// const pop = () => {
//   return this.dataStore[--this.top];
// };

// const peek = () => {
//   return this.dataStore[this.top - 1];
// };

// const clear = () => {
//   this.top = 0;
// };
// const length = () => {
//   return this.top;
// };

class Stack {
  constructor() {
    this._arr = [];
  }
  push(item) {
    this._arr.push(item);
  }
  pop() {
    return this._arr.pop();
  }
  peek() {
    return this._arr[this._arr.length - 1];
  }
  clear() {
    this._arr = [];
  }
  length() {
    return this._arr.length;
  }
}
const board = [
  [0, 0, 0, 0, 0],
  [0, 0, 1, 0, 3],
  [0, 2, 5, 0, 1],
  [4, 2, 4, 4, 2],
  [3, 5, 1, 3, 1],
];

const moves = [1, 5, 3, 5, 1, 2, 1, 4];

const isSamePuppetInStack = (puppetType) => {
  return stack.peek() === puppetType;
};

function solution(board, moves) {
  const stack = new Stack();
  let disapearPuppetCount = 0;
  moves.map((pullingSpot) => {
    for (let i = 0; i < board.length; i++) {
      const pulledPuppet = board[i][pullingSpot - 1];
      if (pulledPuppet) {
        board[i][pullingSpot - 1] = 0;
        if (isSamePuppetInStack(pulledPuppet)) {
          stack.pop();
          disapearPuppetCount += 2;
          return;
        }
        stack.push(pulledPuppet);
        return;
      }
    }
  });
  return disapearPuppetCount;
}

console.log(solution(board, moves));
