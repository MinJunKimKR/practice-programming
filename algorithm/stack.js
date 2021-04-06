class Stack {
  constructor() {
    this._arr = [];
    this.top = 0;
  }
  push(item) {
    this._arr.push(item);
    this.top += 1;
  }
  pop() {
    this.top -= 1;
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
  getTop() {
    return this.top;
  }
}

const stack = new Stack();

console.log(stack);
console.log(stack.getTop());
stack.push(123);
console.log(stack);
console.log(stack.getTop());
