/**
 * @param {number[]} nums
 * @return {number}
 */
const singleNumber = function (nums) {
  const objNumberCount = {};
  nums.map((num) => {
    objNumberCount[num] = ++objNumberCount[num] || 1;
  });
  for (const number in objNumberCount) {
    if (objNumberCount.hasOwnProperty(number)) {
      if (objNumberCount[number] == 1) return number;
    }
  }
};

const testCase = [1, 2, 3, 2, 3];

console.log(singleNumber(testCase));
