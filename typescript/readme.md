[공부한 typescript 영상 링크](https://www.youtube.com/watch?v=gp5H0Vw39yw&t=4679s)

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



## Any/void/nenver/unknown









## Typescript with DOM







## Classes in Typescript



[싱글턴 패턴](https://yamoo9.gitbook.io/typescript/classes/singleton)



## Generic





















