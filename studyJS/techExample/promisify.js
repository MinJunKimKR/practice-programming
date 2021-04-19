// const { promisify } = require('util');

// const makePromisify = (callback) => {
//   return callback(null, 'data');
// };

// const func = promisify(makePromisify);

// async function asyncFunc() {
//   const data = await func();
//   console.log(data);
// }
// asyncFunc();

// function callbackFnc(aaaa, call) {
//   return call(
//     null,
//     ((aaaa) => {
//       return aaaa;
//     })(aaaa)
//   );
// }

// const asyncCallback = promisify(callbackFnc);

// (async (param) => {
//   const result = await asyncCallback(param);
//   console.log(result);
// })(123456798);

//자바스크립트는 비동기 -> 필요함 (모든)
//프론트 -> 리액트 -> 자바스크립트
// 백앤드 ->노드 ->자바스크립트

// function fnc(param) {
//   // console.log('fnc param : ', param);
//   param = param + 'fun';
//   return param;
// }

// console.log(fnc(123));

// function fnc2(callback) {
//   //함수
//   console.log('call back');
//   callback();
// }

// // callback  = function () {
// /*console.log('33333');
//     return 'abc';
//   }
//   */
// console.log(
//   fnc2(function () {
//     console.log('33333');
//     return 'abc';
//   })
// );

// function abc(param, callback) {
//   // console.log(param + '1');
//   return callback(param);
// }

// const test = abc('aaa', function (abc) {
//   // console.log(abc + "2")
//   return abc;
// });

// console.log(test);

async function first() {
  // Simulate a code delay
  setTimeout(function () {
    console.log(1);
  }, 500);
}

async function second() {
  console.log(2);
}
(async () => {
  await first();
  await second();
})();

function square(x, callback) {
  setTimeout(callback, 100, x * x);
}

// square(2, firstCallback);

// var firstCallback = function (number) {
//   square(number, secondCallback);
// };

// var secondCallback = function (number) {
//   square(number, thirdCallback);
// };

// var thirdCallback = function (number) {
//   console.log(number);
// };
