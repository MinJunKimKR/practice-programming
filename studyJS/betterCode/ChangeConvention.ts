// 1 Object의 key값을 snake case로 바꾸고 싶을떄

import has from "has";
import { snakeCase, camelCase } from "change-case";
const original: { [key: string]: any } = {
  helloWorld: "hihi",
};
const originalSnake: { [key: string]: any } = {
  hello_world: "hihi",
  hi_there: "hi there",
};

const insertObject = {
  helloWorld: originalSnake.hello_world,
  hiThere: originalSnake.hi_there,
};
// console.log(originalSnake);
// console.log(insertObject);
//{ [key :string]}을 적어주는 이유는
//key : string을 해주면 key값으로 'key'라는 string 만사용이 가능함
//하지만 우리는 여러가지 이름의 key값을 사용하고 싶음으로 []로 감싸고 :any type을 넣어준다
const converted: { [key: string]: any } = {};
for (const prop in originalSnake) {
  if (has(originalSnake, prop)) {
    converted[snakeCase(prop)] = originalSnake[prop];
  }
}
console.log(converted);

/*

3 import has from "has";
         ~~~

  node_modules/@types/has/index.d.ts:16:1
    16 export = hasOwnProperty;
       ~~~~~~~~~~~~~~~~~~~~~~~~
    This module is declared with using 'export =', and can only be used with a default import when using the 'esModuleInterop' flag.
*/
/**
 * {
  "compilerOptions": {
    "module": "commonjs",
    "esModuleInterop": true
  }
}
로 해결
 * 
 */

// const converted: { [key: string]: any } = {};
// for (const prop in original) {
//   if (has(original, prop)) {
//     //prop이 property로 존재하는지 확정하기 위해서 사용
//     converted[snakeCase(prop)] = original[prop]; //[]를 사용해서 string 겂을 key로 넣어준다
//     // ex. converted['hello_world'] = original['helloWorld']
//   }
// }
// console.log(converted);
