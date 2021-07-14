

### 데코레이터

[데코레이터 개념](https://medium.com/google-developers/exploring-es7-decorators-76ecb65fb841)

[데코레이터 개념 2](https://ui.toast.com/weekly-pick/ko_20200102)

데코레이터는 함수를 명시적으로 수정하지 않고도 확장하거나 기능확장을 시킬수 있는 방법이다.

함수를 일급 시민으로서의 기능을 지원하는 모든 언어는 데코레이터를 구현할 수 있다(예를 들어, 자바스크립트는 함수를 변수에 할당하거나 다른 함수에 인자로 전달할 수 있다).

```javascript
//자바스크립트의 객체는 속성이 있고, 각 속성은 값을 가지고 있다.

const oatmeal = {
  viscosity: 20,
  flavor: 'Brown Sugar Cinnamon',
};
//그러나 각 속성은 값 외에도 화면 밖에 숨겨진 정보들이 있는데, 이런 정보들이 각 속성이 //어떻게 작동할지를 정의한다. 이것을 속성 설명자라고 한다.

console.log(Object.getOwnPropertyDescriptor(oatmeal, 'viscosity'));

/*
{
  configurable: true,
  enumerable: true,
  value: 20,
  writable: true
}
*/
```

- `구성 가능(configurable)`은 속성 유형을 변경하거나, 객체에서 속성을 삭제할 수 있는지를 결정한다.
- `열거 가능(enumerable)`은 `Object.keys(oatmeal)`를 호출하거나 `for` 루프에서 사용할 때처럼 객체의 속성을 열거할 때 속성을 표시할지 여부를 제어한다.
- `쓰기 가능(writable)`은 할당 연산자 `=`를 통해 속성값을 변경할 수 있는지를 제어한다.
- `값(value)`은 접근할 때 표시되는 속성의 정적 값이다. 속성 설명자 중에 유일하게 쉽게 볼 수 있고, 주로 우리가 관심을 두고 보는 부분이다. 함수를 포함한 모든 자바스크립트의 값이 올 수 있으며, 이 속성은 속성을 자신이 속한 객체의 메소드로 만든다.

@ 문자와 함께 함수위에 사용함으로서 원하는 데코레이터를 적용할수 있다.

데코레이터 작성하는 법

JS 데코레이터 함수에는 세 가지 인자가 전달된다.

1. `target`은 현재 인스턴스 객체의 클래스이다.
2. `key`는 데코레이터를 적용할 속성 이름이다(문자열).
3. `descriptor`는 해당 속성의 설명자 객체이다.

----



### module

App module 은 root module과 같다.

따라서, 어플리케이션을 구현하게 된다면,  provider와 controller를 전부

app module에 import하는것이 아닌, 각각의 모듈을 만들어서 그곳에 import를 한다.

예를 들어서, 인증을 담당하는 어플리케이션이 있다면 user module 이라는것을 만들고,

그곳에 필요한 controller와 provider를 추가하여서 module을 구성해주고, 해당 module을

app module에 import하여서 사용한다.



### controller

URL을 가져오고 함수를 실행합니다 (마치 express의 라우터 처럼)

즉, URL를 매핑하고, 리퀘스트를 받고, Query를 넘기거나 Body등을 넘기는 역할을 합니다.

실직적인 비지니스 로직은 service에서 구현한다.

```javascript
@Controller('movies')
export class MoviesController {
  @Get()
  getAll() {
    return 'movies';
  }
  @Get('/:id')
  getOne(@Param('id') movieId: string) {
    return `one movie id: ${movieId}`;
  }
  @Post()
  create() {
    return 'This will create a movie';
  }
  @Delete('/:id')
  remove(@Param('id') movieId: string) {
    return `this will delete a movie with the id : ${movieId}`;
  }
  @Patch('/:id')
  path(@Param('id') movieId: string) {
    return `this will patch a movie with the id : ${movieId}`;
  }
}

```



@Param('') : controller에서 :/id 와 같이 parameter를 받아서 funciton에서 사용할때 쓰이는 decorator

@Body(): 바디로 넘어온 값을 사용할때 쓰이는 decorator

```
  path(@Param('id') movieId: string, @Body() updateData) {
```

위와같이 Decorator를 중복으로 사용할수도 있다.

@Param() : 쿼리스트링을 사용할수 있다.





### Provider

provider의 주요 개념은 종속성으로 주입할수 있다는 것이 중요하다.

controller는 HTTP 요청을 처리하고 더 복잡한 작업을 provider 위임해야 한다.



즉, Controller에서 HTTP요청을 처리하여 필요한 Service를 호출한다.

이후 호출된 Service에서는 비지니스 로직을 통하여 필요한 연산을 진행하여 값을 return 해준다.

이러한 방법의 장점은,Controller는 라우팅 처리만 신경을 쓰면되고, Provider는 기능구현만 신경을 쓰면 된다는 장점이 있다.



---

## SOLID

[참고 링크](https://doublem.org/SOLID_SRP_OCP/)

[원문링크](https://kurtwanger40.medium.com/)

객체지향 프로그래밍에서 유지보수가 어렵고 코드가 혼란스러워 지는것을 방지하기 위햐어 SOLID라는 다섯가지 원칙을 만들었습니다

- S: Single Responsibility Principle (단일책임원칙)
- O: Open-Closed Principle (열린-닫힌 원칙)
- L: Liskov Substitution Principle (리스코프 치환 원칙)
- I: Interface Segregation Principle (인터페이스 분리 원칙)
- D: Dependency Inversion Principle (의존성 역전 원칙)



SOLID원칙은 모듈화, 캡슐화, 확장용이성, 구성용이한 컴포넌트등을 고려한 소프트웨어의 구축을 위한 설계입니다.



### Single-responsibility principle(SRP : 단일 책임 원칙)

하나의 module, class 혹은 function이 단 하나의 기능을 꼭 책임져야한다는 개념이다.

```javascript
export class Movie {
  id: number;
  title: string;
  year: number;
  genres: string[];
}

```

여기서 interface 나 type이 아닌 class를 사용한 이유는 컴파일을 거치게 되면 어차피 class가 되기 때문에 바로 class로 써서 사용한것이다.

그렇다면 안좋은 예제를 살펴보자

```javascript
class Animal {
    constructor(name: string){ }
    getAnimalName() { }
    saveAnimal(a: Animal) { }
}
```

위의 예제는 SRP를 위반하였다.

아까도 말했지만, 클래스는 하나의 책임을 가져야 한다고 했다.

하지만 위의 class를 보게된다면

1. Animal 데이터 베이스관리
2. Animal property의 관리

두가지 역할을 한번에 다룹니다.

즉, saveAnimal이 DB의 Animal storage를 관리하는동안, 생성자와 getAnimalName은 Animal property를 관리합니다.



이렇게 된다면 나중에 생길수 있는 이슈를 생각해 볼수 있습니다.

추후에 DB관리 기능에 영향을 주도록 변경하게 된다면,

변경사항에 맞춰서 Animal property의 사용을 만드는 클래스는 **반드시 수정하게되며 새로 컴팔일** 해야합니다.

즉, 시스템이 유연하지 않으며 도미노 효과로 보이고, 파급효과를 주는것이 보입니다.



그러면 어떻게 리팩토링을 해야할까요 ? 

```javascript
class Animal {
    constructor(name: string){ }
    getAnimalName() { }
}
class AnimalDB {
    getAnimal(a: Animal) { }
    saveAnimal(a: Animal) { }
}
```

위와 같이 class를 역할에 맞게 분리를 하였습니다.

`Animal` class에는 property만을 다루는 역할을 가지고 있습니다.

그렇기에 생성자와 getter만이 있습니다.

`AnimalDB` class에는 Animal이라는 정보를 DB에 insert하거나 read하는 역할만을 가지고 있습니다.

이렇듯이 각각의 클래스를 역할에 맞게 단일 책임을 부여해 주는것을 SRP라고 합니다.

> 클래스들이 같은 이유로 매번 변화하는 변화경향이 있다면, 클래스를 설계할때 연관된 기능들을 함께 모으는 것을 목표로 해야한다. 우리는 기능을 분리하노록 노력하고, 기능들은 서로 다른 이유로 변경되어야 한다. - Steve Fenton



### Open-Closed Principle (OCP:열림-닫힘 원칙)

> 소프트웨어 엔티티(클래스,모듈,함수)는 확장을 위해 열려있고, 수정되서는 안된다.

위에서 다룬 Animal class를 다시한번 가져와 보겠습니다.

```javascript
class Animal {
    constructor(name: string){ }
    getAnimalName() { }
}
```



우리는 Animal 리스트를 반복하고, 각 Animal의 울음소리를 반복하였습니다. 

```javascript
//...
const animals: Array<Animal> = [
    new Animal('lion'),
    new Animal('mouse')
];
function AnimalSound(a: Array<Animal>) {
    for(int i = 0; i <= a.length; i++) {
        if(a[i].name == 'lion')
            return 'roar';
        if(a[i].name == 'mouse')
            return 'squeak';
    }
}
AnimalSound(animals);
```

함수 `AnimalSound()`는 OCP를 따르지 않고 있습니다. 

**왜냐하면 새로운 종의 Animal에 대해서 닫혀있지 않기 때문이죠 .**

무슨 말이냐면 만일에 Snake라는 동물을 추가한다고 가정한다면 `AnimalSound` 는 다음과 같아 잘것이기 때문입니다.

```javascript
function AnimalSound(a: Array<Animal>) {
    for(int i = 0; i <= a.length; i++) {
        if(a[i].name == 'lion')
            return 'roar';
        if(a[i].name == 'mouse')
            return 'squeak';
        if(a[i].name == 'snake')
            return 'hiss';
    }
}
```

단지 snake라는 동물을 추가하고 싶은것 뿐인데, 로직을 변경해야 하는 상황이 오게 됩니다.

위의 예제는 정말 간단한 경우 지만, 실제로는 if조건문이 계속해서 붙는다면 상당히 복잡해 질것입니다.

그러면 OCP를 준수하도록 리팩토링 해보겠습니다

```javascript
class Animal {
        makeSound();
        //...
}
class Lion extends Animal {
    makeSound() {
        return 'roar';
    }
}
class Squirrel extends Animal {
    makeSound() {
        return 'squeak';
    }
}
class Snake extends Animal {
    makeSound() {
        return 'hiss';
    }
}
function AnimalSound(a: Array<Animal>) {
    for(int i = 0; i <= a.length; i++) {
        a[i].makeSound();
    }
}
AnimalSound(animals);
```

 여기서 가장 큰 특징은 모든 동물 class들이 `class Animal` 이라는 

기본 class에서 각각 상속을 받아서 **Class내에서 각자의 울음소리를 구현**한다는 점입니다

또한 `AnimalSound` 함수에서도, 이전과 같이 if로 조건을 걸어서 매번 추가할때마다 로직을 변경하는것이 아닌, 이미 각각의 동물 class들의 내부에 `makeSound` 함수가 울음소리를 가지고 있기에 출력만 해주면 된다는 점이 다릅니다.

이제, 새로운 동물을 추가할때 if 로직을 변경하는것이아닌 그저, class를 추가하고, animal배열에 추가만 하면 되도록 바뀌었습니다.



다른예제를 한번 살펴보겠습니다.

여러분이 좋아하는 고객에게 20% 할인해주고자 할때, 클래스는 아래와 같을겁니다.

```javascript
class Discount {
    giveDiscount() {
        return this.price * 0.2
    }
}
```

추후에 VIP 고객에게는 20%를 추가로 할인해주기로 결정했을때, 코드는 아래와 같을것입니다.

```javascript
class Discount {
    giveDiscount() {
        if(this.customer == 'fav') {
            return this.price * 0.2;
        }
        if(this.customer == 'vip') {
            return this.price * 0.4;
        }
    }
}
```

위 코드는 OCP 원칙을 지키지 못했습니다. 

만약에 위와 같이 다른이유로 신규 할인률을 다른 고객에게 적용하려고 한다면, 새로운 로직이 추가되는 것을 보게 될 것입니다.

OCP 원칙을 준수하며 만드는 방법은 **Discount를 확장하여 새로운 클래스**를 추가하는 것입니다. 

추가된 신규 클래스에서 우리는 신규 행위를 구현 할 수 있을 것입니다. 

```javascript
class VIPDiscount: Discount {
    getDiscount() {
        return super.getDiscount() * 2;
    }
}
```

만약, 80%의 할인율을 슈퍼 VIP 고객에게 적용하려면 아래와 같습니다.

```javascript
class SuperVIPDiscount: VIPDiscount {
    getDiscount() {
        return super.getDiscount() * 2;
    }
}
```

**이제, 우리는 ‘수정’과는 별개로 ‘확장’ 된 모습을 볼 수 있습니다.**

###  Liskov Substitution Principle (리스코프 치환원칙:LSP)

> 하위 클래스는 반드시 상위클래스와 대체 가능 해야 한다. 

이 원칙이 지향하는 것은 하위클래스가 상위 클래스의 자리를 에러 없이 맡을 수 있는지 확인하는 것 입니다.

**만약, 코드가 스스로 자신의 클래스 타입을 확인한다면, 그건 정말로 원칙을 위반 한 것입니다.** 

우리의 예제를 살펴보도록 합시다.

```javascript
function AnimalLegCount(a: Array<Animal>) {
    for(int i = 0; i <= a.length; i++) {
        if(typeof a[i] == Lion)
            return LionLegCount(a[i]);
        if(typeof a[i] == Mouse)
            return MouseLegCount(a[i]);
        if(typeof a[i] == Snake)
            return SnakeLegCount(a[i]);
    }
}

AnimalLegCount(animals);
```

위와 같은 것이 LSP 원칙을 위한한 모습입니다. (또한 OCP를 위반한 것이기도 합니다.)

위 코드는 모든 Animal 타입을 알아야 하고, leg-counting 기능과 연관된 것을 호출해야합니다.

무슨 말이냐면 

`if(typeof a[i] == Lion)` 이 부분이 먼저 문제가 되는데,

a에 해당하는 타입들을 하위 funtion인 AnimalLegCount에서 다 알아야 합니다.

마치 아래와 같이 말이죠

```javascript
//...
class Pigeon extends Animal { //새로 추가된 class
        
}
const animals[]: Array<Animal> = [
    //...,
    new Pigeon(); //새로 추가된 동물
]
function AnimalLegCount(a: Array<Animal>) {
    for(int i = 0; i <= a.length; i++) {
        if(typeof a[i] == Lion)
            return LionLegCount(a[i]);
        if(typeof a[i] == Mouse)
            return MouseLegCount(a[i]);
         if(typeof a[i] == Snake)
            return SnakeLegCount(a[i]);
        if(typeof a[i] == Pigeon)//새로 추가된 조건문
            return PigeonLegCount(a[i]);//새로운 legCount 함수
    }
}
AnimalLegCount(animals);
```

이 함수가 LSP를 따르게 만드는 것은, 우리가 Steve Fenton가 필수조건으로 말한 LSP의 요구사항을 따르는 것 입니다.



이제 LSP를 따르도록 수정을 해보면 다음과 같습니다.

```javascript
function AnimalLegCount(a: Array<Animal>) {
    for(let i = 0; i <= a.length; i++) {
        a[i].LegCount();
    }
}
AnimalLegCount(animals);
```

`AnimalLegCount()`는 전달된 **Animal의 타입에 대해서는 관심이 없고**, 오직 다리의 숫자를 세는 것에만 관심이 있습니다.

그렇기 때문에 기존의 `if(typeof a[i] == Snake)` 와 같은 조건문이 없어진다.

**파라미터는 Animal 타입**(Animal 클래스나 Animal의 하위 클래스)이어야만 한다는 것이 위 코드에서 알 수 있는 전부입니다.

**Animal 클래스는 이제 `LegCount()` 메소드만 구현/정의 하기만 하면 됩니다.**

```javascript
class Animal {
    //...
    LegCount();
}
```

그리고 하위 클래스들은 LegCount()메소드를 구현해야만 하죠.

```javascript
//...
class Lion extends Animal{
    //...
    LegCount() {
        //...
    }
}
//...
```

Lion 클래스 타입의 argument가 `AnimalLegCount()` 메소드로 전달 될 때, `LegCount()`는 lion이 갖고 있는 다리의 숫자를 반환 할 것입니다.

`MouseLegCount(a[i])` 와 같이 기존의 animal 마다 다리의 수를 세는 function을 추가로 만들어 주지 않아도 됩니다.



### Interface Segregation Principle (인터페이스 분리 원칙 : ISP)

> 클라이언트의 세분화된 내용과 같은 세분화된 인터페이스를 만들자.

> 클라이언트는 사용되지 않는 인터페이스에 의존하도록 강요해서는 안된다.

이 원칙은 커다란 인터페이스의 구현에 관한 단점을 다룹니다. 아래의 Shape 인터페이스를 보세요.

```javascript
interface Shape {
    drawCircle();
    drawSquare();
    drawRectangle();
}
```

이 인터페이스는 Squares와 circles, rectangles를 그립니다. 

Shape 인터페이스를 구현하고 있는 클래스 Circle, Square, Rectangle는 반드시 메소드 `drawCircle()`, `drawSquare()`,`drawRectangle()`를 정의해야 합니다.

```javascript
class Circle implements Shape {
    drawCircle(){
        //...
    }
    drawSquare(){
        //...
    }
    drawRectangle(){
        //...
    }    
}
class Square implements Shape {
    drawCircle(){
        //...
    }
    drawSquare(){
        //...
    }
    drawRectangle(){
        //...
    }    
}
class Rectangle implements Shape {
    drawCircle(){
        //...
    }
    drawSquare(){
        //...
    }
    drawRectangle(){
        //...
    }    
}
```

위의 코드를 보면 꽤 재밌습니다.

 **클래스 Rectangle은 쓰이지 않는 메소드들(`drawCircle()`과 `drawSquare()`)을 구현하고 있습니다.** 

마찬가지로 Square 또한 사용되지않는 `drawCircle()`과 `drawRactangle()`을, 

Circle 클래스는 `drawSquare()`, `drawSquare()`를 구현하고 있습니다.

만약 우리가 drawTriangle()과 같은 다른 메소드를 Shape 인터페이스에 추가 한다면 아래와 같을겁니다.

```
interface Shape {
    drawCircle();
    drawSquare();
    drawRectangle();
    drawTriangle();
}
```

클래스는 반드시 신규 메소드를 구현해야 하며, 그렇지 않으면 오류가 발생합니다.


**클라이언트(여기서는 Rectangle, Circle, Square)는 필요하치 않거나 사용되지 않는 메소드에 의존하도록 강요해선 안됩니다.**

또한, ISP는 다음과 같이 명시하고 있습니다. 

> ‘인터페이스는 꼭 하나의 일을 해야 하며, 추가적인 행위 그룹은 반드시 다른 인터페이스로 분리되어 추상화 되어야 한다.’ 

라고 말이에요.

Shape 인터페이스를 ISP 원칙을 따르도록 만드는 것은 행위(action)를 다른 인터페이스로 분리하는 것을 말합니다.

```javascript
interface Shape {
draw();
}

interface ICircle {
    drawCircle();
}
interface ISquare {
    drawSquare();
}
interface IRectangle {
    drawRectangle();
}
interface ITriangle {
    drawTriangle();
}

class Circle implements ICircle {
    drawCircle() {
        //...
    }
}
class Square implements ISquare {
    drawSquare() {
        //...
    }
}
class Rectangle implements IRectangle {
    drawRectangle() {
        //...
    }    
}
class Triangle implements ITriangle {
    drawTriangle() {
        //...
    }
}
class CustomShape implements Shape {
   draw(){
      //...
   }
}
```

**ICircle 인터페이스는 오직 circle을 그리는 일**만 하고 있으며, 

**Shape는 그외의 도형**들을 그리는 것을 다루고 있습니다. 



### Dependency Inversion Principle (의존성 역전 원칙 : DIP)

의존(종속)은 구**체가 아닌 추상과 이뤄져야 한다.**

> **A. 고수준(High-Level)의 모듈은 저수준(Low-Level)의 모듈에 의존하면 안된다**. 둘다 추상화에 의존해야한다.  
>
> **B. 추상은 세부사항(Details)에 의존해서는 안된다.** 세부사항은 추상에 의존해야 한다.

 시작하기전, **우리는 의존성 주입(Dependency Injection) 과 관련된 일들에 대해서 명확히** 알아야 합니다.

아래의 코드는 **고수준의 구성요소(Component)가 저수준의 구성요소에 따라 행동하는 모습의 예시**입니다.

아래의 코드에서는 **HttpService가 저수준의 컴포넌트이고, Http는 고수준의 컴포넌트** 입니다. 

아래의 설계는 DIP A를 위반하였습니다.

(DIP A - 고수준의 모듈은 저수준의 모듈에 의존해선 안된다. 반드시 추상화에 의존 해야한다.)

```javascript
class XMLHttpService extends XMLHttpRequestService {}

class Http {
    constructor(private xmlhttpService: XMLHttpService) { }
    get(url: string , options: any) {
        this.xmlhttpService.request(url,'GET');
    }
    post() {
        this.xmlhttpService.request(url,'POST');
    }
    //...
}
```

상위 코드의 Http 클래스는 `XMLhttpService` 클래스에 의존하도록 되어있습니다. 

`constructor(private xmlhttpService: XMLHttpService) { }`

간혹, `xmlHttpService` 외에 다른 Http 연결 서비스를 사용 하고 싶을 수도 있습니다.

이럴때, 코드를 편집하기 위해서는 **모든 Http 인스턴스(사용중인)를 고려하여 조심스레 수정**해야합니다. 이는 OCP 원칙 위반이기도 합니다.

따라서 **‘Connection 인터페이스’를 만들어, 사용중인 Http 서비스 타입들에 대해 덜 신경 써야합니다**. 

```javascript
interface Connection {
    request(url: string, opts:any);
}
```

request 메소드를 갖고 있는 Connection 인터페이스를 이용하여 Http를 개선 할 수 있습니다. 

Connection 인터페이스 타입의 **Argument를 Http 클래스로 전송**합니다.

```javascript
class Http {
constructor(private httpConnection: Connection) { }

    get(url: string , options: any) {
        this.httpConnection.request(url,'GET');
    }
    post() {
        this.httpConnection.request(url,'POST');
    }
    //...
}
```

Http에 전달된 서비스 유형에 관계없이 **네트워크 연결 유형을 알지 않고도 쉽게 네트워크에 연결**할 수 있습니다. 



이제 `XMLHttpService` 클래스를 다시 구현하여 **Connection 인터페이스를 구현할 수 있습니다.**

```javascript
class XMLHttpService implements Connection {
    const xhr = new XMLHttpRequest();
    //...
    request(url: string, opts:any) {
        xhr.open();
        xhr.send();
    }
}
```

많은 **Http Connection 타입을 만들고 Http 클래스에 에러**와 같은 야단법석한 일들은 피해서 전송 할 수 있습니다. 

```javascript
class NodeHttpService implements Connection {
    request(url: string, opts:any) {
        //...
    }
}
class MockHttpService implements Connection {
    request(url: string, opts:any) {
        //...
    }    
}
```

우리는 **고수준의 모듈과 저수준의 모듈**이 추상에 의존하고 있음을 볼 수 있습니다. 



Http 클래스(고수준의 모듈)은 **Connection 인터페이스(추상)에 의존**하고 있으며, 

```javascript
class Http {
constructor(private httpConnection: Connection) { }

    get(url: string , options: any) {
        this.httpConnection.request(url,'GET');
    }
```

-> Connection Interface에는 request function이 구성되어 있습니다.

그렇기 때문에 추상화(같은 interface기 때문에 funtion이 있다)로 구현한다.



Http 서비스 타입들(저수준의모듈)또한 **Connection 인터페이스에 의존**하고 있습니다.

```javascript
class XMLHttpService implements Connection {
    const xhr = new XMLHttpRequest();    
		//...
    request(url: string, opts:any) {
        xhr.open();
        xhr.send();
    }
}
```

->  `class Http` 와 같은 interface를 사용하여서 구현함으로, request가 존재하며, 직접적으로 Http에서 의존하지 않고 `connection interface` 통해서 의존하기 때문에 추상화가 이루어진다.

또한, 여기서 DIP는 **Liskov Substitution Principle을 위반하지 않도록 합니다.** 

(Connection 유형 `Node-XML-MockHttpService`는 상위 유형 `Connection`을 대체 할 수 있습니다.)





















----



### Exceptionfilter

[문서링크](https://docs.nestjs.kr/exception-filters)

Nest에는 애플리케이션 전체에서 처리되지 않은 모든 예외를 처리하는 **예외 레이어**가 내장되어 있습니다

#### Throwing standard exceptions

Nest는 `@nestjs/common` 패키지에서 노출된 내장 `HttpException` 클래스를 제공합니다

일반적인 HTTP REST/GraphQL API 기반 애플리케이션의 경우 특정 오류 조건이 발생할 때 **표준 HTTP 응답객체를 보내는 것이 가장 좋습니다.**

#### Built-in HTTP exceptions

Nest는 기본 **`HttpException`에서 상속되는 표준 예외 집합을 제공**합니다. 이들은 `@nestjs/common` 패키지에서 노출되며 **가장 일반적인 HTTP 예외중 대부분**을 나타냅니다.

> 자세한 내용은 상단의 nest 문서링크를 참고하여 주세요

### NotFoundException

```javascript
    if (!movie) {
      throw new NotFoundException(`Movie with Id : ${id} not found`);
    }
```

----



### DTO

Data Transfer Object(데이터 전송 객체)

타입등을 부여하기 위해 만들어 줘야한다

하지만 DTO를 만든 다음 타입으로 사용을 해준다고 해서 알아서 곧바로 validation까지 해주지는 않는다.

**그렇다면 DTO는 왜 사용을 하는것일까?**

바로 프로그래머로서 **코드를 더 간결하게 만들수 있게 해주기 때문이다.**

또한. **NestJS가 Validation을 해줄수 있게 만들어 줄수도 있다.**

```javascript
import { IsNumber, IsString } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  readonly title: string;
  @IsNumber()
  readonly year: number;
  @IsString({ each: true })
  readonly genres: string[];
}

```

**Class-validator**를 사용해주면 **DTO에 validation 기능도 추가**해 줄수 있다.

[class-validator 문서링크](https://docs.nestjs.com/pipes#class-validator)

또한  Array의 경우 each를 사용해주면 각 요소가 string인지를 확인을 해줄수 있는 옵션도 제공을 해주고 있다.



### Movie Entity

```javascript
export class Movie {
  id: number;
  title: string;
  year: number;
  genres: string[];
}

```



### Entity와 DTO차이

**Entity와 DTO를 분리해서 관리해야 하는 이유**는 **DB Layer와 View Layer 사이의 역할을 분리 하기 위해서**다.

**Entity 클래스**는 **실제 테이블과 매핑**되어 만일 **변경되게 되면 여러 다른 클래스에 영향**을 끼치고, **DTO 클래스**는 **View와 통신하며 자주 변경**되므로 **분리 해주어야** 한다.

결국 DTO는 Domain Model 객체를 그대로 두고, 복사하여 다양한 Presentation Logic을 추가한 정도로 사용하며 **Domain Model 객체는 Persistent만을 위해서 사용**해야한다.

**즉, Entity는 DB와 1:1매칭이 되는 Class이지만, DTO의 경우 통신간의 Data의 형태를 정의한것임으로 Entity와는 다르게 수시로 변경이 될수 있다. **

**이것을 위해서 비슷해 보이는 Entity와 DTO를 서로 분리한것이다.**

---



`app.useGlobalPipes(new ValidationPipe());`

main.ts에 사용할시에 몇가지 좋은 옵션을 사용할수 있다.

 `whitelist: true, forbidNonWhitelisted: true`

두가지 옵션을 적용해주면 데코레이터가 없다면 문제가 있다는 에러를 알려준다,

`transform: true,` 옵션은 URL등에 ID가 만일에 123일경우 String 123이 되는데, 이것을 자동으로 Number로 바꿔주는 역할을 한다.

 (실제 타입)



이러한 부분이 express로 쓰는것보다 nest와 같은 프레임워크를 썼을때 얻을수 있는 이득이다



```javascript
export class UpdateMovieDto {
  @IsString()
  readonly title?: string;
  @IsNumber()
  readonly year?: number;
  @IsString({ each: true })
  readonly genres?: string[];
}

```

기존에 CreateDto를 기준으로 복사해서 쓰는것 대신에 

Nest의 부분타입을 쓸것이다 (Partial Type)

`npm i @nestjs/mapped-types`

Mapped-types는 탕비을 변환시키고 사용할수 있게하는 패키지 인데, nest에서 제공해주는 패키지이다

https://www.npmjs.com/package/@nestjs/mapped-types

이건 DTO를 변환하는것을 도와줌



```javascript
export class UpdateMovieDto extends PartialType(CreateMovieDto) {}

```

UpdateMoviceDto는 CreateMovieDto와 동일함. 단, 전부 필수사항이 아니라는것이 다름



module들은 controller와 service만을 가지고 있어야함.

그렇기 떄문에 현재 app.module에 있는 controllers와 providers를 

movies.module로 옮겨줄것임

```javascript
import { Module } from '@nestjs/common';
import { MoviesController } from './movies/movies.controller';
import { MoviesService } from './movies/movies.service';
import { MoviesModule } from './movies/movies.module';

@Module({
  imports: [MoviesModule],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class AppModule {}

```

현재는 `nest g mo ` 를 사용해서 movies모듈을 만들어져 있는 상태.

- [ ] ```javascript
  import { Module } from '@nestjs/common';
  import { MoviesModule } from './movies/movies.module';
  
  @Module({
    imports: [MoviesModule],
    controllers: [],
    providers: [],
  })
  export class AppModule {}
  
  ```



```javascript
import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

@Module({
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}

```



이처럼 app.module에 전부다 import하는 것이 아닌 각각의 module에 import한다음에 app.module에는 각각의 module만 import하는

방식으로 개발을 한다. 그렇다면 app.module에는 언제 povider와 controller를 import하는걸까?

App의 기본적인 페이지를 보여주고자 할때(루트위치) 추가해준다.



Dependency injhection 이라는 개념이 있다.

Controller에서는 Service에서 구현한 비지니스 로직은 constructor로 가져온다음에 this.00.00() 의 방식으로 가져와서 쓰는데, 이것은 타입을 지정해준것이다.

즉, import를 안쓰고 쓰고 있다는 것인데, 여기서는 Class만 impoert해서 사용하고 있다.

즉, 차입을 추가하는것만으로도 작동하게 해준다.

이것을 Depenency inject라고 한다.

한마디로, 개발자가 직접 하나씩 import해주는것이 아닌 nest가 

알아서 import해주는것을 의존성 주입이라고 한다 





nest는 express위에서 돌아가기 때문에 원한다면

controller에서 response나 request객체를 사용할수있다.

```javascript
@Get()
  getAll(@Req() req, @Res() res): Movie[] {
    return this.movieService.getAll();
  }
```

이렇게 express로 바로 접근하는건 별로 좋진않다.

하지만 nest에서는 express말고도 fastify위에서 돌아가는데 

그렇기에 fastify 같은 다른 라이브러리와 호환이 된다.

fastify는 express와 비슷하게 존재하는데 2배빠름



또한, Nest에서 쓰이는 방식으로 사용한다면 추후에 express에서 fastify로 전환을 해도 문제가 생기지 않겠지만, 만일에 위에 나와있는것 처럼

express방식을 사용을하게 된다면 나중에 fastify방식으로 전환한다면 에러가 발생할것이다.



Nest에서 제공하는 test

```json
    "test": "jest",
    "test:watch": "jest --watch",
    "test:cov": "jest --coverage",
    "test:debug": "node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand",
    "test:e2e": "jest --config ./test/jest-e2e.json"
```



watch 로 실행하게 되면 새로운 테스트를 만들어 낼때마다

그 테스트가 실행이 된다



Jest



`spec.ts` 가 붙은 파일들이 있다.

이것은 테스트를 포함하고 있다.



nest에서는 jest가 .spec.ts파일들을 찾아볼수 있도록 설정되어있다.



유닛테스팅 : 모든 function을 따로 테스트 하는것

서비스에서 분리된 유닛을 테스트 하는것

-> getAll()과 같은 function을 검사하는것

E2e : 모든 시스템을 검사하는것

-> 어떤페이지로 가면 특정페이지가 나와야 하는 경우 사용한다.

사용자 관점에서 보는 사용자 스토리와 같음

사용자가 취할만한 액션들을 처음부터 검사하는것을 말한다.



```javascript
describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
```

describe : 테스트를 설명해 주는것\

afterEach : 

 beforeEach : 테스트를 실행하기 전에 실행되는것

afterAll : 안에는 데이터베이스를 깨끗하게 정리해주는(모두 지우는) function을 넣을수있다

beforeAll : 

It : 테스트 할 요소를 정의한다.

expect : 테스트해서 나와야할 값을 정의하여 테스트한다.





Nest의 장점 떄문에 movie service 에 접근할수있음



즉, describe에서 테스트할 요소의 큰부분(함수)를 정의하고

해당 함수에 해당하는 하위 항목 테스트를 it로 정의하며,

해당하는 it대하여 예상되는 값들은 expect함수로 예상하여

테스트 케이스를 생성한다



E2E

Spec.ts 파일같은 경우는 모두 해당파일의 유닛 테스트를 위한것이다.

어떨떄는 1개를 테스트 해야하고 가끔은 2개를 테스트 해야하는 비밀번호 생성, 저장 funciton과 같은 경우에는 유닛 테스트가 다소 어려울수 있다

여기서 e2e가 등장함





```javascript
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});

```



`supertest` 라는 라이브러리가 들어가 있다는점이 유닛테스트와는 다소 다르다

/Get으로 요청을 보내고, 응답을 받는다.

따라서 controll, service등을 전부다 아우르는 내용이다.

```javascript
  it('/movies (GET)', () => {
    return request(app.getHttpServer()).get('/movies').expect(200).expect([]);
  });
```

위와 같은 내용으로 /movies의 url에 요청을 받을수가 있는데,

`app.getHttpServer()` 라고 되어있는 부분은 localhost:3000과 같은 부분을 대체하여준다

```javascript
  describe('/movies', () => {
    it('GET', () => {
      return request(app.getHttpServer()).get('/movies').expect(200).expect([]);
    });
  });
```

위와 같은 내용으로 리펙토링을 할수있다

또한 post 와 delete를 넣어서 다음과 같이 하나의 큰 흐름의 e2e테스트를 만들어 볼수 있다.

```javascript
  describe('/movies', () => {
    it('GET', () => {
      return request(app.getHttpServer()).get('/movies').expect(200).expect([]);
    });
    it('POST', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'Test',
          year: 2000,
          genres: ['action'],
        })
        .expect(201);
    });
    it('DELECT', () => {
      return request(app.getHttpServer()).delete('/movies').expect(404);
    });
  });
});
```





```javascript
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });
```

테스트를 할때 매번 새로운 app applicaiton을 만든다.

여기서 만드는 app application은 test를 위한것이다.

즉, 브라우저로 들어갈수있는 실제 application과는 다르다.

```javascript
  describe('/movies/:id', () => {
    it.todo('GET');
    it.todo('POST');
    it.todo('PETCH');
  });
```

또한 jest에서는 todo라는 기능을 제공하는데, 앞으로 작성해야하는 test들을 미리 만들어 놓을수있다.



`beforeAll` 는 `beforeEach` 와는 다르게 모든 각각의 테스트 이전에 실행되는것이 아니다.

무슨말이냐면, 특정 데이터 베이스를 테스트중에 만든다고 한다면,

baforeEach는 각테스트마다 생성하기 떄문에 항상 비어있게되지만, beforeAll같은 경우에는 1번만 실행되므로, 데이터 베이스를 유지한상태 즉, app application을 매번 초기화 하지않도 테스트를 진행할수있다.



하지만, 여기서 문제가 발생을 한다.

테스트에서 Movie객체를 create한다음 get을 해도,  만들어진 객체를 찾을수 없다라고 나온다.



이유는 main.ts 에서

```javascript
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
```

위와 같이 transform을 사용해서 string인 url에 들어가는 id를 number로 변경해주기 때문이다.

하지만 e2e test에서는 어떠한가? 

```javascript
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
```

위에서 보는바와 같이 어떤 pipe도 태우지 않았다.

이점이 test를 할때 가장 주의해야하는 점중에 하나다.

바로, 실제 어플리케이션 환경을 그대로 적용시켜주어야지 제대로된 테스트 결과를 받을수 있다는 것이다.











































