// let a = [1, 2, 3, 4];
// let b = a;
// b[2] = 100;
// console.log(a); // 1,2,3,4
// console.log(b); // 1,2,100,4

// const deepCopy = (obj) => {
//   //common
//   return JSON.parse(JSON.stringify(obj));
// };

// let a = [1, 2, 3, 4];
// let b = deepCopy(a); //array, object ->string
// b[2] = 100;
// console.log(a); // 1,2,3,4
// console.log(b); // 1,2,100,4

//자바스크립트 - call reference, call value

// const title = req.body.title ?? null;
// const description = req.body.description ?? null;
// const from_date = req.body.from_date ?? null;
// const to_date = req.body.to_date ?? null;

const a = {
  title: "11",
  description: "123",
  from_date: "321",
  to_date: "231",
};
console.log({ ...a });
