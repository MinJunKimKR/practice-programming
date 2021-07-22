class TestClass {
  private name: string;
  private readonly id: string;
  constructor() {
    this.name = "MJ";
    this.id = "1";
  }
  getName(): string {
    return this.name;
  }
}

class Test {
  constructor(private readonly testClass: TestClass) {
    console.log(this);
  }
  getInfo(): string {
    return testClass.getName();
  }
}
const testClass = new TestClass();
const test = new Test(testClass);

console.log(test.getInfo());
