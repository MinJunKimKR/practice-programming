//refer : https://programmers.co.kr/learn/courses/30/lessons/60057
class Stack {
  constructor(items) {
    if (items) {
      this._arr = items;
      this.top = items.length;
    } else {
      this._arr = [];
      this.top = 0;
    }
  }
  pop() {
    if (this.top > 0) {
      const lastItem = this._arr[this.top - 1];
      this.top -= 1;
      this._arr.splice(this.top, 1);
      return lastItem;
    }
    return false;
  }

  push(item) {
    this._arr.push(item);
    this.top += 1;
  }
  top() {
    return this.top;
  }
  peek() {
    if (this._arr.length > 0) {
      return this._arr[this.top - 1];
    }
    return false;
  }
  size() {
    return this._arr.length;
  }
  get() {
    return this._arr;
  }
}
class Queue {
  constructor(items) {
    if (items) {
      this.inbox = new Stack(items);
    } else {
      this.inbox = new Stack();
    }
    this.outbox = new Stack();
  }

  enqueue(item) {
    this.inbox.push(item);
    this.top = this._inbox.top();
  }
  dequeue() {
    const inboxSize = this.inbox.size();
    for (let i = 0; i < inboxSize; i++) {
      this.outbox.push(this.inbox.pop());
    }
    const firstItem = this.outbox.pop();
    for (let i = 0; i < inboxSize - 1; i++) {
      this.inbox.push(this.outbox.pop());
    }
    return firstItem;
  }
  peek() {
    return this.inbox.peek();
  }
  get() {
    return this.inbox.get();
  }
  size() {
    return this.inbox.size();
  }
}

const testCase = {
  1: {
    q: "aabbaccc",
    a: 7,
  },
  2: { q: "ababcdcdababcdcd", a: 9 },
  3: { q: "abcabcdede", a: 8 },
  4: { q: "abcabcabcabcdededededede", a: 14 },
  5: { q: "xababcdcdababcdcd", a: 17 },
};

function solution(s) {
  var answer = 0;
  const halfLegnth = Math.ceil(s.length / 2);
  console.log(halfLegnth);
  let minimumLength = 0;
  for (let cuttingSize = 1; cuttingSize <= halfLegnth; cuttingSize++) {
    let previousStr = "";
    let overlapCount = 1;
    let strZip = "";
    for (let i = 0; i < s.length; i += cuttingSize) {
      const strPart = s.substr(i, cuttingSize);
      console.log(strPart);
      if (previousStr === "") {
        previousStr = strPart;
        continue;
      }
      if (previousStr === strPart) {
        overlapCount++;
        continue;
      }
      strZip += `${overlapCount === 1 ? "" : overlapCount}${previousStr}`;
      overlapCount = 1;
      previousStr = strPart;
    }
    strZip += `${overlapCount === 1 ? "" : overlapCount}${previousStr}`;
    console.log(`strZip : ${strZip}`);
    if (minimumLength === 0 || minimumLength > strZip.length) {
      minimumLength = strZip.length;
    }
  }
  console.log(`minimumLength : ${minimumLength}`);
  return minimumLength;
}

const testNum = 5;
const result = solution(testCase[testNum].q);
console.log(testCase[testNum].a);
console.log(result == testCase[testNum].a);

// function solution(s) {
//   var answer = 0;
//   let minimumLength = 0;
//   const stack = new Stack();
//   const halfLegnth = Math.ceil(s.length / 2);
//   //1부터 중간 값까지.

//   for (let cuttingSize = 1; cuttingSize < halfLegnth; cuttingSize++) {
//     const arrString = [];

//     for (let i = 0; i < s.length; i += cuttingSize) {
//       arrString.push(s.substr(i, cuttingSize));
//     }
//     console.log(arrString);
//     let overlapNum = 0;
//     let overlapStr = "";
//     let zipStr = "";
//     const queue = new Queue(arrString);
//     while (queue.size() > 0) {
//       console.log("----------------------");
//       const stringPart = queue.dequeue();
//       console.log(`stringPart : ${stringPart}`);
//       console.log(`overlapStr : ${overlapStr}`);
//       if (overlapStr === "") {
//         console.log("===set overlapStr ===");
//         overlapNum++;
//         overlapStr = stringPart;
//         continue;
//       }
//       if (stringPart === overlapStr) {
//         overlapNum++;
//         console.log(`===count number ${overlapNum}===`);
//         continue;
//       }
//       zipStr += `${overlapNum === 1 ? "" : overlapNum}${overlapStr}`;
//       console.log(`zipStr : ${zipStr}`);
//       overlapNum = 1;
//       overlapStr = stringPart;
//     }
//     zipStr += `${overlapNum === 1 ? "" : overlapNum}${overlapStr}`;
//     console.log(`zipStr : ${zipStr}`);
//     if (minimumLength > zipStr.length || minimumLength === 0) {
//       minimumLength = zipStr.length;
//     }
//   }
//   return minimumLength;
// }
