[공부한 typescript 영상 링크](https://www.youtube.com/watch?v=gp5H0Vw39yw&t=4679s)

[typescript 가이드북 링크](https://yamoo9.gitbook.io/typescript/)

## 왜 우린 타입스크립트를 배우나

1. 에러는 런타임 전에 알수가 있다.

2. 자바스크립트에 비해서 데이터 타입혹은 entity, property등을 사용해서 더 나은 확장성을 제공한다

   

# 시작

`npm i -g typescript`

위의 타입스크립트 cli툴을 설치한 하면 `tsc` 명령어로 ts파일을 js로 트랜스파일 할수있다.

이때 typescript는 기본적으로 ES3버전으로 트랜스파일된다.

`tsc -w main.ts` 와 같은 watch 옵션도 제공한다.

## config file

TypeScript는 매번 cli로 옵션들을 포함한 트랜스 파일을 할수없으니 config file을 제공한다

```javascript
{
    "compilerOptions": {
        "rootDir": "./src",
        "outDir": "./dist"
    }
}
```

위와 같은 옵션을 사용해서 configfile을 만들어서 적용할수있다. 



## 타입 추가 및 함수

```javascript
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
 
```



## 인터페이스(Interface)

먼저 user라는 object를 만들어보자

```javascript
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
```

위와 같이 name 과 age를 가지고 있는 user라는 object가 만들어졌다.

이때 비슷한 user2라는 object를 만든다고 했을때, 타입을 지정을 해줘야한다.

```javascript
const user2 = {
  name: "MJ2",
};

const InUser: { name: string; age: number } = {
  age: 12,
  name: "",
};
```

`InUser` 처럼 type을 지정해 줄수 있지만, 비슷한 형태를 쓴다고 하면 매번 반복하면서 쓸수는없다.

```javascript

interface User {
  name: string;
  age?: number;
}
//interface는 맨 앞글자를 대문자로 적어야 한다.

const user3: User = {
  age: 123,
  name: "MJ3",
};
```

그럴떄는 위와 같은 형태로 Interface를 만들어서 적용할수있다.

이떄, age와 같이 `age?:number` 와 같이 :앞에 ? 를 붙여주게 되면 필수가 아니라는 뜻이된다.

즉, User Interface를 사용하는 object를 선언할떄 age를 생략하고도 사용할수 있게된다. 

```javascript
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

```

이떄 Class와 Interface와 Naming을 구분하는 방법에는 I를 앞에 붙이거나 뒤에 Interface를 붙여주는 방법이 있는데,

동영상의 강사는 후자를 좀 더 직관적이라서 좋아한다고 한다. ( 필자도 마찬가지이다 )

또한 function도 interface에 지정해 놓을수가 있다.



## 타입과 유니온

타입은 아래와 같이 선언과 사용할수 있다.

```javascript
type ID = string;

interface UserInterface {
  id: ID;
  // id :string;
  name: string;
  age: number;
}


const userUnion: UserInterface = {
  age: 123,
  id: "22",
  name: "abc",
};


```

그렇다면 interface에서 그냥 string으로도 같은 역할을 할수있는데 왜 굳이 string을 ID라는 type으로 바꿔서 사용하는 것일까?



이유는 좀더 명확하고, ID라는 타입을 지정함으로서 공통적으로 쓰는 ID는 모두 같은 자료형을 사용된다는것을

확신할수 있게된다.

또한, Union이라는 것과도 함께쓸수 있는데, 다음 소스를 봐보자



```javascript
type PopularTag = string;
type MaybePopularTag = PopularTag | null;

const popularTags: PopularTag[] = ["123", "bus"];
// const popularTags: string[] = ["123", "bus"];
//string으로 적는것과 type으로 정의하는것과 결론적으로는 같지만,
//게발 구조적으로 무엇을 원하는지 확실히 알수있게되며 한눈에 보기에 명확해진다.

const dragonsTag: MaybePopularTag = "dragon"; // null도 허용됨
// const dragonsTag: MaybePopularTag = ["dragon"]; 에러가 발생한다.

```

위와 같이 union을 사용해서 `type MaybePopularTag = PopularTag | null;` 이런 방식으로 타입을 사용할수 있고,

변수 선언등에서 사용할수있다.

그냥 string과 같은 기본 타입을 사용해도 되지만, 커스텀 타입을 지정후 사용함으로서 좀더 안정성을 높일수 있는것이다.



## Any/void/never/unknown

### void 

void라는 뜻은, null, undefined라는 뜻이다.

```javascript
const doSomething = (): void => {
  console.log("void");
};
```

아무것도 return하지않는 function의 return type은 void가된다.



### any

any는 타입스크립트의 체크를 무시하는 타입이다.

하지만 개발을 할때는 any는 해결책이 아니라 큰 문제의 시작임으로 쓰지않도록 한다.



### unknown

```javascript
let vAny: any = 10;
let vUnknown: unknown = 10;

let s1: string = vAny;
// let s2: string = vUnknown; 
let s3: string = vUnknown as string;

let pageNumber: string = "1'";
// let numbericPageNumber: number = pageNumber as number; 
let numbericPageNumber: number = pageNumber as unknown as number;
```

unknown형식은 any와는 다르게 unknown으로 선언이 되었다면 string과 같은 타입에 바로

바로용될수 없다.

 그렇기에 unknown으로 선언이된 변수를 string타입을 가진 변수에 사용하고 싶다면 any와는 다르게as 를 사용해서 string으로 변환을 한다음에 사용할수 있다.

또한 number에서 string과 같은 다른 타입으로 사용을 하고 싶다면, 바로 as를 사용해서 변화할수 없다. 먼저 unknown타입으로 바꿔야한다

### never

```javascript
const doSomethingNever = (): never => {
  //console.log("never");
  throw "never";

};
```

  함수의 리턴 타입으로 never가 사용될 경우, 항상 오류를 출력하거나 리턴 값을 절대로 내보내지 않음을 의미합니다. 이는 무한 루프(loop)에 빠지는 것과 같습니다.



## Typescript with DOM

```javascript
const someElement = document.querySelector(".foo"); 



console.log("someElement", (someElement as any).value);

const someElement2 = document.querySelector(".foo") as HTMLInputElement;
console.log(someElement2.value);

```

`const someElement: Element `으로 자동으로 타입이 지정된다.

query selector는 querySelector<Element>로 제네릭으로 되기 때문에 element라고 생각하기 떄문입니다.

value를 쓰게되면 에러가 나는데 대부분 any로 타입변화를 해서 에러를 고치려고하는데,
사실 이부분은 위에서 언급한대로 정말 안좋은 해결방법이다.

이렇게 기존에 자동으로 지정되는 Element가 아닌, html input element로 지정함으로서 우리가 원하는것을 얻을수 있다.

## Classes in Typescript

[싱글턴 패턴](https://yamoo9.gitbook.io/typescript/classes/singleton)

```javascript

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
console.log(userClass.getFullName());

class Admin extends User {} //User에 있는 구조가 상속되어서 사용이 가능하다
```

`readonly unchangableName: string; ` 와 같이 readonly를 쓰게된다면 추후에 값을 바꾸거나 할수 없게된다

 `private lastName: string;` private로 되어있는 firstName등에는 접근이 바로 불가능하다.

`class Admin extends User {}` extends를 이용해서 class상속을 받을수있다

`class User implements UserInterfaceForClass` implements 를 이용해서 interface를 사용하여 class를 만들수 있다.

## Generic

```javascript
const addId = <T extends Object>(obj: T) => {
  //이렇게 함으로서 Object만 적용가능한 제네릭이 만들어졌다.
  const id = Math.random().toString(16);
  return {
    ...obj,
    id,
  };
};

// interface UserInfoInterface {
interface UserInfoInterface<T> {
  name: string;
  data: T; 
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


```


 `const addId = <T>(obj: T) => {`  <T>가 제네릭 기본형태 입니다.

하지만 이와 같은 형태에는 문제점이 있다

만일에 `const result = addId<string>(user); `이와 같이 써도, generic이기 떄문에 오류를 만들어내지 않는다.

하지만 실제 function의 기능은 object형태여야만 동작이됨으로 에러가 발생하게된다.

이럴때는 아래와 같은 방법으로 해결할수있다.



`const addId = <T extends Object>(obj: T) => {` 

이와 같은형태로 Object를 extends시키면, 객체만 사용할수있는 제네릭이 만들어지게됩니다.



인터페이스에도 제네릭을 적용할수 있습니다. 

`interface UserInfoInterface<T> {` 이와 같이 제네릭을 적용한다면 

`data : T` 이와같이 선언되어있는 T를  interface에 추가함으로서 반드시 제네릭타입을 부여하게 만들수있다.

즉, 자동으로 정의에따라서 제네릭 타입을 부여되지 않도록 만든다는 뜻이다.



## Enum

```javascript

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

```

Enum은 상수와 같은 개념으로 쓰인다.

```javascript
 const statuses = {
   notStarted: 0,
   inProgress: 1,
   done: 2,
 };

 console.log(statuses.inProgress);
```

 위와 같은 방법으로 상태에 해당하는 상태코드를 사용할수있다.

이와같은 방법을 사용하게된다면 개발자는 0,1,2 와 같은 인식하기 어려운 코드대신에 훨씬 명확하게 이해가는 `notStarted` 와 같은 문자로 표현이된다.

하지만 위의 코드를 enum으로도 표현을할수 있다.

```javascript
enum Status {
   NotStarted,
   InProgress,
   Done,
}
```

위와같이 enum을 선언해준다면 0부터 1,2 와 같이 1씩증가하게 된다.

하지만 기왕이면 문자로 하는게 좀더 명확할수있다.

```javascript
enum StatusEnum { 
  NotStarted = "notStarted",
  InProgress = "inProgress",
  Done = "done",
} 
```

그리고 위의 `Status` 라는 네이밍은 Class와 겹친다. 그렇기에, Enum의 네이밍규칙을 추가할 필요가 있습니다.

`StatusEnum` 과 같이 뒤에 붙여서 명확하게 이해시키는 것이 중요하다.

또한 아래와 같이 Interface에 적용해서 사용할수있다.

```javascript
interface Task {
  id: string;
  status: StatusEnum; //enum을 interface에서 사용하는 방법
}

let notStartedStatus: StatusEnum = StatusEnum.NotStarted;
notStartedStatus = StatusEnum.InProgress;

console.log(StatusEnum.Done);
```





















