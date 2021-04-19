// 1 Object의 key값을 snake case로 바꾸고 싶을떄

// import has from "has";
// import { snakeCase } from "change-case";
// const original: { [key: string]: any } = {
//   helloWorld: "hihi",
// };
// const converted: { [key: string]: any } = {};
// //{ [key :string]}을 적어주는 이유는
// //key : string을 해주면 key값으로 'key'라는 string 만사용이 가능함
// //하지만 우리는 여러가지 이름의 key값을 사용하고 싶음으로 []로 감싸고 :any type을 넣어준다
// for (const prop in original) {
//   if (has(original, prop)) {
//     //prop이 property로 존재하는지 확정하기 위해서 사용
//     converted[snakeCase(prop)] = original[prop]; //[]를 사용해서 string 겂을 key로 넣어준다
//     // ex. converted['hello_world'] = original['helloWorld']
//   }
// }
// console.log(converted);

// 1. spread operator
//  console.log({
//    ...null, //아무것도 반환을안함 -> 무시하는것, null이나 undefiend return이 아니다
//    ...undefined,
//    ...false,
//    ...true,
//    ...1,
//  });

// 2. || && operator
console.log(null || undefined);
// || 의 경우 null이 아닌 값을 반환을 한다
console.log(null && "a");
//하지만 && 의 경우 앞의 인자값이 truely하지 않으면 뒤의값을 보지도 않음으로 앞의 값을 return 한다
console.log("a" || null);
console.log("a" || undefined);
console.log(true && "a");
const aaa = "bbb";
console.log({ ...{ aaa } });
//변수명이 key가 되고, 변수값이 value가 되는 object가 만들어진다 =>{aaa:'bbb'}

// null 모르는 인자값을 받을떄, key자체에 추가 안하고 싶을떄
function foo(message2?: string) {
  //null이 올수도 있음 (message2?: string | null ) 같은의미
  return { message: "hello", ...(message2 && { message2 }) };
  //먼저 message2 && {message2} 를 사용한다. 이때 message2 값이 null일경우 위와 같이
  //null&& 형태가 되기때문에 null이 반환된다 즉, message2 && { message2 } 값은 null이 되는셈.
  // 그렇다면 ...null의 형태가 되는데, 이경우에는 아예 무시가 되기 때문에 결론적으로 message 만 남게된다

  // 값이 있는 경우에는 && 특성에 따라 뒤의 값이 반황되는데, 이떄 ...{message}의 형태가 된다.
  // 따라서 { message: 'hello', message2: 'hjih' } 형태가 만들어진다
}
console.log(foo());
console.log(foo("hjih"));

//3 let을 안쓰고 조건에 따라 다른 value 넣어주는법
const condition = true;
let letVal = "";

//보통은 아래와 같이 한다
if (condition) {
  letVal = "참";
} else {
  letVal = "거짓";
}

console.log(letVal);

//하지만 몇가지 변수를 줄이고, let을 안쓰고 싶다면 아래와 같이 IIEF를 사용할수있다.
const constVal = ((condition) => {
  if (condition) return "참";
  return "거짓";
})(); //바로실행하는 익명함수

console.log(constVal);

//4 데코레이터, cross corncer

// function test(target: Object, propertyKey: string) {
//   console.log("decorator test funciton log");
// }

// class Test {
//   @test
//   hello() {
//     console.log("Test class");
//   }
// }
// Test.hello();

//cross corncer
function errorHandling2(
  target: (arg: string) => void //void를 반환하는 함수(string을 매개변수로 받는)를 매개변수로 받는다.
  //즉 target이라는 이름으로 함수를 매개변수로 받는셈
): (arg: string) => boolean {
  return (arg: string) => {
    //arg:string 을 매개변수로 하는 함수를 return 한다
    try {
      console.log(1);
      target(arg); //return 되는 함수에서 본체를 실행시킨다
      return true;
    } catch (error) {
      console.log("error ");
      console.error(error);
      return false;
    }
  };
}

function errorHandling3<T>(target: (arg: T) => void): (arg: T) => boolean {
  return (arg: T) => {
    try {
      console.log(1);
      target(arg);
      return true;
    } catch (error) {
      console.log("error ");
      console.error(error);
      return false;
    }
  };
}

function errorHandling4<T>( //같은것 일떄만 쓰도록 인식을 가지고 사용을 해야함
  //option pack을 쓰는법이있음 = json을 쓰는법
  target: (...arg: T[]) => void
): (...arg: T[]) => boolean {
  return (...arg: T[]) => {
    try {
      console.log(1);
      target(...arg);
      return true;
    } catch (error) {
      console.log("error ");
      console.error(error);
      return false;
    }
  };
}
//리플렉션 -> 문법상 한계를 런타임에 변형을 시키는것 ->메타프로그래밍
function errorHandling5<T, U>(
  target: (...arg: T[]) => void
): (arg: T) => boolean {
  return (arg: T) => {
    try {
      console.log(1);
      target(arg);
      return true;
    } catch (error) {
      console.log("error ");
      console.error(error);
      return false;
    }
  };
}

function errorHandling<T>(target: (arg: T) => void): (arg: T) => boolean {
  return (arg: T) => {
    try {
      console.log(1);
      target(arg);
      return true;
    } catch (error) {
      console.log("error ");
      console.error(error);
      return false;
    }
  };
}

export const rfqTempDataValidator = errorHandling((tempData: string): void => {
  //위에서 만든 cross concern 함수는 이때 실행이되며, 그에따른 함수의 return값을 정의한다.
  //죽, rfqTempDataValidator는 errorHnadling함수에 wrapping되어있는셈
  const jsonTempData = JSON.parse(tempData);
  console.log(tempData);
});

export const rfqTempDataValidator2 = errorHandling((age: number): void => {
  console.log("age : ", age);
});

export const rfqTempDataValidator3 = errorHandling4(
  (tempData: string, type: string, age: number): void => {
    console.log("tempData : ", tempData);
    console.log("type : ", type);
    console.log("age : ", age); //string 으로 들어옴 (타입체크가 안된)
  }
);

interface JsonConfig {
  //이게 T가 되서 3에서 안되었던 타입문제가 해결이 된다.
  tempData: string;
  type: string;
  age: number;
}
export const rfqTempDataValidator4 = errorHandling(
  ({ tempData, type, age }: JsonConfig): void => {
    console.log("tempData : ", tempData);
    console.log("type : ", type);
    console.log("age : ", age); //string 으로 들어옴 (타입체크가 안된)
  }
);

export const rfqTempDataValidator5 = errorHandling(
  ({
    tempData,
    type,
    age,
  }: {
    tempData: string;
    type: string;
    age: number;
  }): void => {
    console.log("tempData : ", tempData);
    console.log("type : ", foo);
    console.log("age : ", age); //string 으로 들어옴 (타입체크가 안된)
  }
);

rfqTempDataValidator("aaaa");
rfqTempDataValidator2(10);
rfqTempDataValidator3("a", "b", "c");
// rfqTempDataValidator4({ tempData: "aaa", type: "123", age: "dddd" });
rfqTempDataValidator4({ tempData: "aaa", type: "123", age: 123456 });
// cross concern => function, decorator
// @ErrorHandling()
// export const partnerTempDataValidator = (tempData: string): boolean => {
//  try {
//  const jsonTempData = JSON.parse(tempData);
//  console.log(tempData);
//  const validateError = partnerInsertSchema.validate(jsonTempData);
//  if (validateError.length > 0) {
//  throw new Error(validateError.join());
//  }
//  return true;
//  } catch (error) {
//  console.error(error);
//  return false;
//  }
// };
function toPair<T, U>(a: T, b: U): [T, U] {
  return [a, b];
}

console.log(toPair<string, number>("1", 1)); // [ '1', 1 ]
console.log(toPair<number, number>(1, 1)); // [ 1, 1 ]
