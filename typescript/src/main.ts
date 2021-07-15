const hello = "hello";
let number = 1;
// number = '1'; 이 코드는 에러가 난다
// 이유는 타입을 지정하지 않은 let 이라고 해도 다른 타입은 적용이 안된다.

let string: string = "1";
//let string = '1' 같은것이라고 해도, 타입을 지정해주는것을 추천한다.

const getNameFully = (name: string, surname: string): string => {
  //매개변수와 return 의 타입을 지정해 주어야 한다
  return `${name} ${surname}`;
};

console.log(getNameFully("Kim", "minjun"));
//----------------------------------------------------------------
const user = {
  name: "MJ",
  age: 28,
};
/*
 마우스를 올려보면 다음과 같이 나온다
const user: {
    name: string;
    age: number;
}
이 뜻은, 기본적으로 타입스크립트는 object에서 만들어 놓은 요소를 이해하고 있다라는 뜻. 
*/

const user2 = {
  name: "MJ2",
};

const InUser: { name: string; age: number } = {
  age: 12,
  name: "",
};

interface UserInter {
  name: string;
  age?: number;
}
//interface는 맨 앞글자를 대문자로 적어야 한다.

const user3: UserInter = {
  age: 123,
  name: "MJ3",
};

interface IUserFunction {
  //userInterface
  name: string;
  age?: number;
  getMessage(): string;
}

const user4: IUserFunction = {
  getMessage: function () {
    return "msg";
  },
  name: "user3",
};

//----------------------UNION---------------------------------
type ID = string;
type PopularTag = string;
type MaybePopularTag = PopularTag | null;

interface UserInterface {
  id: ID;
  // id :string;
  name: string;
  age: number;
}

const popularTags: PopularTag[] = ["123", "bus"];
// const popularTags: string[] = ["123", "bus"];
//string으로 적는것과 type으로 정의하는것과 결론적으로는 같지만,
//게발 구조적으로 무엇을 원하는지 확실히 알수있게되며 한눈에 보기에 명확해진다.

const dragonsTag: MaybePopularTag = "dragon"; // null도 허용됨
// const dragonsTag: MaybePopularTag = ["dragon"]; 에러가 발생한다.

const userUnion: UserInterface = {
  age: 123,
  id: "22",
  name: "abc",
};

//----------------------Any/void/never/unknown---------------------------------

const doSomething = (): void => {
  //void라는 뜻은, null, undefined라는 뜻이다.
  console.log("fff");
};

//any는 타입스크립트의 체크를 없애는거다.
//하지만 개발을 할때는 any는 해결책이 아니라 큰 문제의 시작임으로 쓰지않도록 한다.

const doSomethingNever = (): never => {
  //   console.log("never ");
  throw "never";
  //함수의 리턴 타입으로 never가 사용될 경우, 항상 오류를 출력하거나 리턴 값을 절대로 내보내지 않음을 의미합니다. 이는 무한 루프(loop)에 빠지는 것과 같습니다.
};

let vAny: any = 10;
let vUnknown: unknown = 10;

let s1: string = vAny;
// let s2: string = vUnknown; //unknown형식은 any와는 다르게 바로 다른 타입에 사용될수 없다.
let s3: string = vUnknown as string; //as 를 사용해서 string으로 사용할수 있다.

let pageNumber: string = "1'";
// let numbericPageNumber: number = pageNumber as number; //곧바로 as를 사용해서 변화할수 없다. 먼저 unknown타입으로 바꿔야한다
let numbericPageNumber: number = pageNumber as unknown as number;

//--------------------------------TS with DOM --------------------------------

// const someElement = document.querySelector(".foo"); // const someElement: Element 으로 자동으로 타입이 지정된다.
// //query selector는 querySelector<Element>로 제네릭으로 되기 때문에 element라고 생각하기 떄문입니다.

// console.log("someElement", (someElement as any).value); //value를 쓰게되면 에러가 나는데 대부분 any로 타입변화를 해서 에러를 고치려고하는데,
// //사실 이부분은 위에서 언급한대로 정말 안좋은 해결방법이다.

// const someElement2 = document.querySelector(".foo") as HTMLInputElement;
// //이렇게 기존에 자동으로 지정되는 Element가 아닌, html input element로 지정함으로서 우리가 원하는것을 얻을수 있다.
// console.log(someElement2.value);

//----------------------------classes in typescript------------------------------------

interface UserInterfaceForClass {
  getFullName(): string;
}
class User implements UserInterfaceForClass {
  //Class도 Interface로 구현할수있다.
  protected firstName: string;
  private lastName: string;
  readonly unchangableName: string; //바꿀수 없게 된다.
  static readonly maxAge = 50;
  //   firstName: string;
  //   lastName: string;

  constructor(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.unchangableName = firstName;
  }

  getFullName = (): string => {
    return `${this.firstName}  ${this.lastName}`;
  };
}

const userClass = new User("Min", "jun");
console.log(userClass.getFullName()); //private로 되어있는 firstName등에는 접근이 바로 불가능하다.

class Admin extends User {} //User에 있는 구조가 상속되어서 사용이 가능하다ㄹ

//----------------------Generic ------------------
const addId = <T extends Object>(obj: T) => {
  // 이렇게 함으로서 Object만 적용가능한 제네릭이 만들어 졌다.
  // const addId = <T>(obj: T) => {
  //   <T>가 제네릭 기본임
  const id = Math.random().toString(16);
  return {
    ...obj,
    id,
  };
};

// interface UserInfoInterface {
interface UserInfoInterface<T> {
  name: string;
  data: T; //이것을 interface에 추가함으로서 반드시 제네릭타입을 부여하게 만들수있다.
  //즉, 자동으로 부여되는 제네릭 타입을 못쓰도록 만든다는 뜻이다.
}

// const userInfo: UserInfoInterface = {
const userInfo: UserInfoInterface<{ meta: string }> = {
  name: "MJ",
  data: {
    meta: "meta",
  },
};

const userInfo2: UserInfoInterface<string[]> = {
  data: ["321"],
  name: "123",
};
const result = addId<UserInfoInterface<{ meta: string }>>(userInfo); //<>안에 interface를 넣음으로서 명확하게 만들어 줄수있다.
// const result = addId(user);
//상단의 제네릭 때문에 타입이 더이상 any가 아니라 userInfo가 타입으로 자동 지정된다.
console.log("result : ", result);

//하지만 문제점이 있다
//const result = addId<string>(user); 이와 같이 써도, generic이기 떄문에 오류를 만들어내지 않는다.

//--------------------------Enum---------------------------------

// const statuses = {
//   notStarted: 0,
//   inProgress: 1,
//   done: 2,
// };

// console.log(statuses.inProgress);

enum StatusEnum { //Enum을 뒤에 추가를 해줘야지 interface혹은 class랑 구분이 된다.
  NotStarted = "notStarted",
  InProgress = "inProgress",
  Done = "done",
  // NotStarted,
  // InProgress,
  // Done,
} // 0에서 부터 증가한다.

interface Task {
  id: string;
  status: StatusEnum; //enum을 interface에서 사용하는 방법
}

let notStartedStatus: StatusEnum = StatusEnum.NotStarted;
notStartedStatus = StatusEnum.InProgress;

console.log(StatusEnum.Done);
