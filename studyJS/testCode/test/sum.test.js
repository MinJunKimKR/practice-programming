const fn = require("../src/sum");

test("1은 1이야", () => {
  expect(1).toBe(1);
});
test("2더하기 3은 5야", () => {
  expect(fn.add(2, 3).tobe(5));
});
test("3더하기 3은 5야", () => {
  expect(fn.add(3, 3).tobe(5));
});
