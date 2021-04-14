
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

// const testCase = {
//   1: {
//     q: "aabbaccc",
//     a: 7,
//   },
//   2: { q: "ababcdcdababcdcd", a: 1 },
//   3: { q: "abcabcdede", a: 8 },
//   4: { q: "abcabcabcabcdededededede", a: 14 },
//   5: { q: "xababcdcdababcdcd", a: 17 },
// };

function solution(s) {
  var answer = 0;
  let minimumLength = 0;
  const stack = new Stack();
  const halfLegnth = Math.ceil(s.length / 2);
  //1부터 중간 값까지.

  for (let cuttingSize = 1; cuttingSize < halfLegnth; cuttingSize++) {
    const arrString = [];

    for (let i = 0; i < s.length; i += cuttingSize) {
      arrString.push(s.substr(i, cuttingSize));
    }
    console.log(arrString);
    let overlapNum = 0;
    let overlapStr = "";
    let zipStr = "";
    const queue = new Queue(arrString);
    while (queue.size() > 0) {
      const stringPart = queue.dequeue();
      if (zipStr === "") {
        overlapNum = 1;
        overlapStr = stringPart;
        continue;
      }
      if (stringPart === overlapStr) {
        overlap += 1;
        continue;
      }
       zipStr=`${zipStr}${overlap}${overlapStr}` //zipstr이 overlapStr이랑 항상 같으므로 이걸 
       console.log(`zip : ${zipStr}`)
    }
    //기준 문자가 있으면 비교
    //없으면 insert
    //같으면 overlap 1증가
    //다르면 zipstr += `${overlap}${기준문자}`
    //기준문자 = '', overlap = 0'
    //zipstr.legth 가 minimumLength보다 작으면
    // minimumLength = zipstr.legnth
  }
  return answer;
}

// console.log(solution(testCase[1].q));
