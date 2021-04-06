// preogresses : 작업도가 적힌 배열
// speeds : 각 progresses 배열의 작업속도
// 배포는 앞의 작업이 배포가 될때 이루어진다
// 뒤에서 부터 서칭한다음에, 100 이상의 processes가 채워진 배열을
// refer :https://programmers.co.kr/learn/courses/30/lessons/42586?language=javascript
/*
제한 사항
작업의 개수(progresses, speeds배열의 길이)는 100개 이하입니다.
작업 진도는 100 미만의 자연수입니다.
작업 속도는 100 이하의 자연수입니다.
배포는 하루에 한 번만 할 수 있으며, 하루의 끝에 이루어진다고 가정합니다. 예를 들어 진도율이 95%인 작업의 개발 속도가 하루에 4%라면 배포는 2일 뒤에 이루어집니다.
몇 개의 기능이 배포되는지를 return
*/

/**
 * 입출력 예 #1
첫 번째 기능은 93% 완료되어 있고 하루에 1%씩 작업이 가능하므로 7일간 작업 후 배포가 가능합니다.
두 번째 기능은 30%가 완료되어 있고 하루에 30%씩 작업이 가능하므로 3일간 작업 후 배포가 가능합니다. 하지만 이전 첫 번째 기능이 아직 완성된 상태가 아니기 때문에 첫 번째 기능이 배포되는 7일째 배포됩니다.
세 번째 기능은 55%가 완료되어 있고 하루에 5%씩 작업이 가능하므로 9일간 작업 후 배포가 가능합니다.

따라서 7일째에 2개의 기능, 9일째에 1개의 기능이 배포됩니다.

입출력 예 #2
모든 기능이 하루에 1%씩 작업이 가능하므로, 작업이 끝나기까지 남은 일수는 각각 5일, 10일, 1일, 1일, 20일, 1일입니다. 어떤 기능이 먼저 완성되었더라도 앞에 있는 모든 기능이 완성되지 않으면 배포가 불가능합니다.

따라서 5일째에 1개의 기능, 10일째에 3개의 기능, 20일째에 2개의 기능이 배포됩니다.
 *
 */
const job1 = {
  progresses: [93, 30, 55],
  speeds: [1, 30, 5],
};
// [2, 1]
const job2 = {
  progresses: [95, 90, 99, 99, 80, 99],
  speeds: [1, 1, 1, 1, 1, 1],
};
// [1, 3, 2]
const solution = (progresses, speeds) => {
  const answer = [];
  const remain = progresses.map((process) => {
    return 100 - process;
  });
  const remainTerm = [];
  for (const key in progresses) {
    if (progresses.hasOwnProperty(key)) {
      const process = progresses[key];
      remainTerm.push(Math.ceil((100 - process) / speeds[key]));
    }
  }

  console.log('remainTerm :', remainTerm);

  return answer;
};

console.log(solution(job1.progresses, job1.speeds));

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

  inqueue(item) {
    this.inbox.push(item);
    return true;
  }
  deqeue() {
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
}

const stack = new Stack([1, 2]);
stack.push('123');

console.log(stack);
console.log(stack.peek());
console.log(stack.pop());
console.log(stack.size());
console.log(stack);
console.log('==========');
const queue = new Queue([1, 2, 3]);
console.log(queue.inqueue(213));
console.log(queue);
console.log(queue.deqeue());
console.log(queue);
