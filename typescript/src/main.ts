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

interface User {
  name: string;
  age?: number;
}
//interface는 맨 앞글자를 대문자로 적어야 한다.

const user3: User = {
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
