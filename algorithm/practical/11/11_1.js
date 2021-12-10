// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

const test = {
  1: [
    ["234-567-890", "444-444-444", "321-543-234"],
    ["Harry", "Nick", "Michael"],
    "444-444-444",
  ],
  2: [["123-123-123"], ["Walter"], "111-111-111"],
  3: [["123-456-123"], ["Henry T."], "123-456-123"],
  4: [
    ["111-111-112", "211-111-111"],
    ["laundry", "call center"],
    "111-111-111",
  ],
};

function solution(phone_numbers, phone_owners, number) {
  // write your code in JavaScript (Node.js 8.9.4)
  //   console.log(phone_numbers);
  //   console.log(phone_numbers.findIndex((element) => element === number));
  const ownerIndex = phone_numbers.findIndex((element) => element === number);
  if (ownerIndex === -1) return number;
  return phone_owners[ownerIndex];
}
const testcase = "4";
console.log(
  `${testcase} : ${solution(
    test[testcase][0],
    test[testcase][1],
    test[testcase][2]
  )}`
);
