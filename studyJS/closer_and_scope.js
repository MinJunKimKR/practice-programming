// // console.log(exit);
// // console.log(bbb);
// const exit = 123;
// var bbb = 'under';

// function scope() {
//   const aaa = '123456';
//   console.log(aaa);
//   console.log(exit);
// }
// const cc = '123';

// scope();

// console.log(aaa);

// const closer = () => {
//   const step1 = 'one';
//   console.log(step2);
//   return () => {
//     const step2 = 'two';
//     return 'dones';
//   };
// };

// function closer() {
//   const step1 = 'one';
//   console.log(step2);
//   return function () {
//     const step2 = 'two';
//     return 'done';
//   };
// }

function closer() {
  const step1 = 'one';
  //   const aa = 'abcd';
  return function (step1) {
    console.log(step1);
    // console.log(aa);
    const step2 = 'two';
    return 'done';
  };
}

const innerFunction = closer()(12);

console.log(innerFunction);
