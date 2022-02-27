/**
 * @param {number[]} nums
 * @return {number}
 */
const majorityElement = function (nums) {
  const objNum = {};
  nums.map((num) => {
    objNum[num] = ++objNum[num] || 1;
  });
  for (const num in objNum) {
    if (objNum.hasOwnProperty(num)) {
      if (objNum[num] > nums.length / 2) {
        return objNum[num];
      }
    }
  }
  console.log(objNum);
};

// /**
//  * @param {number[]} nums
//  * @return {number}
//  */
// const majorityElement = function (nums) {
//   let maxCount = 0;
//   let arrElement = [];

//   nums.map((num) => {
//     if (arrElement[num]) {
//       arrElement[num]++;
//     } else {
//       arrElement[num] = 1;
//     }
//     if (arrElement[num] > maxCount) {
//       maxCount = arrElement[num];
//     }
//   });
//   const majorityNum = arrElement.indexOf(maxCount);
//   return majorityNum;
// };
