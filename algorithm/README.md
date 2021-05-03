

# 136. Single Number

https://leetcode.com/problems/single-number/

> Given a **non-empty** array of integers `nums`, every element appears *twice* except for one. Find that single one.
>
> **Follow up:** Could you implement a solution with a linear runtime complexity and without using extra memory?
>
>  
>
> **Example 1:**
>
> ```
> Input: nums = [2,2,1]
> Output: 1
> ```
>
> **Example 2:**
>
> ```
> Input: nums = [4,1,2,1,2]
> Output: 4
> ```
>
> **Example 3:**
>
> ```
> Input: nums = [1]
> Output: 1
> ```
>
>  



사실 이 문제는  169번 문제의 하위호완 이었다. 문제 해설 보러가기 [169번 문제 링크]



배열내의 1개를 제외한 나머지 숫자는 2번씩 나오기에 1개만 나오는 숫자를 찾는 문제인데 나는 역시 같은 방법으로 해결했다.

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
const singleNumber = function (nums) {
  const objNumberCount = {};
  nums.map((num) => {
    objNumberCount[num] = ++objNumberCount[num] || 1; //값을 증가 하던가 혹은 1을 넣던가.
  });
  for (const number in objNumberCount) {
    if (objNumberCount.hasOwnProperty(number)) {
      if (objNumberCount[number] == 1) return number; //값이 1이면 return
    }
  }
};
```



하지만 너무 같은 방법이었기에 다른 방법도 찾아보고 싶다.









# 169. Majority Element

https://leetcode.com/problems/majority-element/

> Given an array `nums` of size `n`, return *the majority element*.
>
> The majority element is the element that appears more than `⌊n / 2⌋` times. You may assume that the majority element always exists in the array.
>
>  
>
> **Example 1:**
>
> ```
> Input: nums = [3,2,3]
> Output: 3
> ```
>
> **Example 2:**
>
> ```
> Input: nums = [2,2,1,1,1,2,2]
> Output: 2
> ```

이 문제는 배열내의 최대다수 를 구하는것이 문제이다.

여기서 중요한점은 `The majority element is the element that appears more than `⌊n / 2⌋` times.` 인데,

즉 우리가 구해야 하는 **숫자의 갯수는 전체 배열 크기 /2 보다 커야 한다**는 뜻이다



```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
const majorityElement = function (nums) {
  let maxCount = 0;
  let arrElement = [];

  nums.map((num) => {
    if (arrElement[num]) {
      arrElement[num]++;
    } else {
      arrElement[num] = 1;
    }
    if (arrElement[num] > maxCount) {
      maxCount = arrElement[num];
    }
  });
  const majorityNum = arrElement.indexOf(maxCount); //time over
  return majorityNum;
};
```



처음에 짠 코드는 위와 같았다.

test case는 통과 했으니 time over되어서 fail처리 되었다.

문제점은 num이 만일에 10000000 이라면 해당 배열크기 까지 검색을 해야하기에 시간이 많이 걸린것이다.

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
const majorityElement = function (nums) {
  const objNum = {};
  nums.map((num) => {
    objNum[num] = ++objNum[num] || 1; //key(숫자)에 coount가 없으면 1, 있으면 ++
  });
  for (const num in objNum) { //object 기준으로 loop를 실행한다.
    if (objNum.hasOwnProperty(num)) { //관용적으로 objetc를 loop할때에 해당하는 property가 있는지 확인
      if (objNum[num] > nums.length / 2) { //`majorityElement`인지
        return num; //맞다면 즉시 return
      }
    }
  }
};
```



간과 하고 있었던 부분이, 굳이 배열이 아닌 object를 쓰는방법을 생각을 못하고 있었고 또한. 처음에 중요하다고 말했던

`majorityElement` 는 전체 배열의 크기/2보다 크다는것을 생각 못했다.



따라서 먼저  숫자를 key로 하고 count가 value인 object를 사용하였더니 속도가 빨라져서 success하였다.



# 프로그래머스[lv.1] - 이상한문자 만들기

스킬 레벨체크 1에서 나온문제다. 



## 문제설명 

문자열 s는 한 개 이상의 단어로 구성되어 있습니다. 각 단어는 하나 이상의 공백문자로 구분되어 있습니다. 각 단어의 짝수번째 알파벳은 대문자로, 홀수번째 알파벳은 소문자로 바꾼 문자열을 리턴하는 함수, solution을 완성하세요.

##### 제한 사항

- 문자열 전체의 짝/홀수 인덱스가 아니라, 단어(공백을 기준)별로 짝/홀수 인덱스를 판단해야합니다.
- 첫 번째 글자는 0번째 인덱스로 보아 짝수번째 알파벳으로 처리해야 합니다.

##### 입출력 예

| s               | return          |
| --------------- | --------------- |
| try hello world | TrY HeLlO WoRlD |

##### 입출력 예 설명

try hello world는 세 단어 try, hello, world로 구성되어 있습니다. 각 단어의 짝수번째 문자를 대문자로, 홀수번째 문자를 소문자로 바꾸면 TrY, HeLlO, WoRlD입니다. 따라서 TrY HeLlO WoRlD 를 리턴합니다.

----

## 해결법

```javascript
function solution(s) {
  const answer = s
    .split(" ")
    .map((word) => {
      return word
        .split("")
        .map((letter, index) => {
          if (index % 2 === 0) {
            return letter.toUpperCase();
          }
          return letter.toLowerCase(); //이부분에서 실수함
        })
        .join("");
    })
    .join(" ");
  return answer;
}
const problem = "try hello world";

console.log(solution(problem));
	
```

위와 같이 해결하였다.

우선 주어진 문자열을 `공백` 단위로 쪼갠뒤 그다음엔 글자 단위로 쪼갠뒤 홀짝으로 대소문자로 변경하였다

여기서 실수를 한가지 하였는데 홀수일때 lowcase가 아닌 그냥 return 을 해버리는 바람에 시간을 조금 소모했다.

## 후기

개인적으로는 굉장히 쉬운문제였다.

# 프로그래머스[lv.1] - 탐욕법 (greedy) 체육복

스킬 레벨체크 1에서 순간 멍해서 떨어진 문제였다.

## 문제설명

점심시간에 도둑이 들어, 일부 학생이 체육복을 도난당했습니다. 다행히 여벌 체육복이 있는 학생이 이들에게 체육복을 빌려주려 합니다. 학생들의 번호는 체격 순으로 매겨져 있어, 바로 앞번호의 학생이나 바로 뒷번호의 학생에게만 체육복을 빌려줄 수 있습니다. 예를 들어, 4번 학생은 3번 학생이나 5번 학생에게만 체육복을 빌려줄 수 있습니다. 체육복이 없으면 수업을 들을 수 없기 때문에 체육복을 적절히 빌려 최대한 많은 학생이 체육수업을 들어야 합니다.

전체 학생의 수 n, 체육복을 도난당한 학생들의 번호가 담긴 배열 lost, 여벌의 체육복을 가져온 학생들의 번호가 담긴 배열 reserve가 매개변수로 주어질 때, 체육수업을 들을 수 있는 학생의 최댓값을 return 하도록 solution 함수를 작성해주세요.

##### 제한사항

- 전체 학생의 수는 2명 이상 30명 이하입니다.
- 체육복을 도난당한 학생의 수는 1명 이상 n명 이하이고 중복되는 번호는 없습니다.
- 여벌의 체육복을 가져온 학생의 수는 1명 이상 n명 이하이고 중복되는 번호는 없습니다.
- 여벌 체육복이 있는 학생만 다른 학생에게 체육복을 빌려줄 수 있습니다.
- 여벌 체육복을 가져온 학생이 체육복을 도난당했을 수 있습니다. 이때 이 학생은 체육복을 하나만 도난당했다고 가정하며, 남은 체육복이 하나이기에 다른 학생에게는 체육복을 빌려줄 수 없습니다.

##### 입출력 예

| n    | lost   | reserve   | return |
| ---- | ------ | --------- | ------ |
| 5    | [2, 4] | [1, 3, 5] | 5      |
| 5    | [2, 4] | [3]       | 4      |
| 3    | [3]    | [1]       | 2      |

##### 입출력 예 설명

예제 #1
1번 학생이 2번 학생에게 체육복을 빌려주고, 3번 학생이나 5번 학생이 4번 학생에게 체육복을 빌려주면 학생 5명이 체육수업을 들을 수 있습니다.

예제 #2
3번 학생이 2번 학생이나 4번 학생에게 체육복을 빌려주면 학생 4명이 체육수업을 들을 수 있습니다.

----

### Greedy란?

카테고리가 탐욕법이라고 되어있는데, 이 탐욕법에 대해서 먼저 알아보자.

탐욕법이란 DP(Dynamic Programming)과 상호보완하며 사용되는데, 이번에는 탐욕법에 대해서만 알아보자.



탐욕법이란 기본적으로 **현재의 최선을 반복해서 선택하는 해결방법**이다.

아래의 이미지를 한번 살펴보자

![img](https://media.vlpt.us/post-images/cyranocoding/c8b8eff0-b228-11e9-89af-8fc0a61dbc3e/1CeFxqV8wFf2NaQm1hqYGMQ.png)

위의 트리에서 **실제 가장큰수는 99**이다. ,하지만 탐욕법으로 하면 **가장큰수는 12** 이다.

왜냐하면 탐욕법은 **첫번째 분기에서 1과 9중에 큰 9를 고르고, 그다음에는 3과 12중에 12를 고르기 때문이다**. 

이렇듯이 탐욕법은 최선의 해결법이 되지는 않지만, 빠른 결과를 산출해 낼수있는 장점이 있다.



### 탐욕법의 적절한 예

탐욕법의 적절한 사용순간은 언제일까? 

**탐욕스러운 선택 조건(Greedy choice property)** - 해답이 다음 해답에게 **영향을 주지 않는 독립적 연산**
**최적 부분 구조 조건(Optimal Substructure)** - 문제의 최종해결 방법이 **각각의 부분 문제의 최적해결방법 일때**

즉, **각각의 하위 해답이 다음 문제풀이에 영향을 주지 않으면서도 하위의 최선의 해답의 집합이 전체의 최선해답일때** 사용가능하다.



예시를 들자면 여러분이 77,000원을 지폐로 받으려한다 가정해보자.

가장 큰 5만원으로 1장 -> 5만원 + 27,000원

만원으로 2장 -> 5만원 + 1만원 *2 + 7,000원

5천원으로 1장 -> 5만원 + 1만원 *2 + 5천원 + 2,000원

천원으로 2장 -> 5만원 + 1만원 *2 + 5천원 + 천원 *2

위의 예시와 같이 순간의 최선으로 해결해도 다음풀이(5만원 이후 만원)에 영향을 주지 않으며,

이렇게 나온 해답이 전체의 최선의 해답이기 때문에 가능하다.

----

## 해결법

```javascript
function solution(n, lost, reserve) {
  const setReserve = new Set(reserve.filter((num) => !new Set(lost).has(num)));
  const setLost = new Set(lost.filter((num) => !new Set(reserve).has(num)));
  let emptyNum = 0;
  [...setLost].map((lostNum) => {
    if (setReserve.has(lostNum - 1)) {
      setReserve.delete(lostNum - 1);
      return;
    }
    if (setReserve.has(lostNum + 1)) {
      setReserve.delete(lostNum + 1);
      return;
    }
    emptyNum++;
  });
  return n - emptyNum;
}


```

먼저 문제에서 주목할 부분이 있다.

>  **여벌 체육복을 가져온 학생이 체육복을 도난당했을 수 있습니다.  **
>
> **이때 이 학생은 체육복을 하나만 도난당했다고 가정하며, 남은 체육복이 하나이기에 다른 학생에게는 체육복을 빌려줄 수 없습니다.**

바로 이부분인데 무슨말이냐면 **1개의번호가 여별의 체육복과 도난 모두 당했을수 있다는 말이다.** 

그렇다면 서로 상쇄되기 때문에 잃어버린 번호와 여분의 번호 양쪽에 있는번호는 사실상 **없는 번호**이다.

```javascript
  const setReserve = new Set(reserve.filter((num) => !new Set(lost).has(num)));
  const setLost = new Set(lost.filter((num) => !new Set(reserve).has(num)));
```

그렇기에 위와 같은 방법을 통해서 차집합 set을 만들어 주었다.

위의 과정으로 중복되는 번호는 전부 없어졌다.

```javascript
  [...setLost].map((lostNum) => {
    if (setReserve.has(lostNum - 1)) {
      setReserve.delete(lostNum - 1);
      return;
    }
    if (setReserve.has(lostNum + 1)) {
      setReserve.delete(lostNum + 1);
      return;
    }
    emptyNum++;
  });
```

이제 중복이 없는 도난당한 번호 set을 spead하여 array를 만들어서 map으로 loop 해준다.

**같은번호는 set으로 만들면서 제거했기에 여기서는 무시한다**

-1 혹은 +1 에 해당하는 번호가 있다면 reserve에서 제거하고 else를 쓰지 않기위해 **early return** 해준다.



**여기서 포인트는 -1 부터 처리한다는것이다.**

만일, 잃어버린 번호가 [3, 5] 이고 여분이 [2, 4]라고 해보자.

+1 부터 처리를 하게되면 **잃어버린 번호가 3일때 4를 delete하기 때문에 5번이 되었을때 정상적으로 처리가 되지않는다.**



## 후기

알고나니 쉬운문제였지만 set에 대한 개념과 탐욕법을 배울수 있는 아주 좋은 문제였다. 





----

# 스택(Stack)이란?



스택이란 자료구조중에서 **선형구조**에 해당하는 자료구조입니다.

쉽게 생각할수 있는것을 **프링글스**를 연상하시면 편합니다



위에는 뚫려있고, 위에서 부터 가져올수 있으며 반대로는 뺄수없는 형태를 **스택구조** 라고합니다

이것을 **FILO**(First In Last Out) 혹은 **LIFO**(Last In First Out) 혹은 **후입선출** 이라고 합니다



스택에는 몇가지 대표적인 행동(함수)가 있습니다

- **pop** : 스택에서 맨위의 data를 꺼낸다 (감자칩을 꺼낸다)
- **push** : 스택의 맨위에 data를 넣는다 (감자칩을 넣는다)
- **peek** : 스택의 맨위의 data 를 조회한다 (맨위의 감자칩을 살펴본다)

이해를 돕기 위해 아래의 이미지를 보시면 좋습니다!

![stack gif 이미지 검색결과](https://prmoreira23.github.io/assets/stack-data-structure.gif)



이러한 스택 개념을 코드로 옮겨서 구현을 할수가 있습니다

```javascript
class Stack {
  constructor() {
    this._arr = [];
  }
  push(item) {
    this._arr.push(item);
  }
  pop() {
    return this._arr.pop();
  }
  peek() {
    return this._arr[this._arr.length - 1];
  }
  clear() {
    this._arr = [];
  }
  length() {
    return this._arr.length;
  }
}

const stack = new Stack();
```

위와 같이 Stack을 Class로 만들어서 사용할수 있습니다.



혹시 Stack자체를 직접 한들어서 쓰고 싶다라고 하신다면 아래의 코드를 참고하시면 됩니다.

```javascript
const Stack = () => {
  this.dataStore = [];
  this.top = 0;
  this.push = push;
  this.pop = pop;
  this.peek = peek;
  this.clear = clear;
  this.length = length;
};

const push = (element) => {
  this.dataStore[this.top++] = element;
};

const pop = () => {
  return this.dataStore[--this.top];
};

const peek = () => {
  return this.dataStore[this.top - 1];
};

const clear = () => {
  this.top = 0;
};
const length = () => {
  return this.top;
};
```











----

# 프로그래머스[lv.1] - 크레인 인형뽑기 (19년도 카카오 겨울 인턴십)



## 문제설명

게임개발자인 죠르디는 크레인 인형뽑기 기계를 모바일 게임으로 만들려고 합니다.
죠르디는 게임의 재미를 높이기 위해 화면 구성과 규칙을 다음과 같이 게임 로직에 반영하려고 합니다.

![crane_game_101.png](https://grepp-programmers.s3.ap-northeast-2.amazonaws.com/files/production/69f1cd36-09f4-4435-8363-b71a650f7448/crane_game_101.png)

게임 화면은 **1 x 1** 크기의 칸들로 이루어진 **N x N** 크기의 정사각 격자이며 위쪽에는 크레인이 있고 오른쪽에는 바구니가 있습니다. (위 그림은 5 x 5 크기의 예시입니다). 각 격자 칸에는 다양한 인형이 들어 있으며 인형이 없는 칸은 빈칸입니다. 모든 인형은 1 x 1 크기의 격자 한 칸을 차지하며 **격자의 가장 아래 칸부터 차곡차곡 쌓여 있습니다.** 게임 사용자는 크레인을 좌우로 움직여서 멈춘 위치에서 가장 위에 있는 인형을 집어 올릴 수 있습니다. 집어 올린 인형은 바구니에 쌓이게 되는 데, 이때 바구니의 가장 아래 칸부터 인형이 순서대로 쌓이게 됩니다. 다음 그림은 [1번, 5번, 3번] 위치에서 순서대로 인형을 집어 올려 바구니에 담은 모습입니다.

![crane_game_102.png](https://grepp-programmers.s3.ap-northeast-2.amazonaws.com/files/production/638e2162-b1e4-4bbb-b0d7-62d31e97d75c/crane_game_102.png)

만약 같은 모양의 인형 두 개가 바구니에 연속해서 쌓이게 되면 두 인형은 터뜨려지면서 바구니에서 사라지게 됩니다. 위 상태에서 이어서 [5번] 위치에서 인형을 집어 바구니에 쌓으면 같은 모양 인형 **두 개**가 없어집니다.

![crane_game_103.gif](https://grepp-programmers.s3.ap-northeast-2.amazonaws.com/files/production/8569d736-091e-4771-b2d3-7a6e95a20c22/crane_game_103.gif)

크레인 작동 시 인형이 집어지지 않는 경우는 없으나 만약 인형이 없는 곳에서 크레인을 작동시키는 경우에는 아무런 일도 일어나지 않습니다. 또한 바구니는 모든 인형이 들어갈 수 있을 만큼 충분히 크다고 가정합니다. (그림에서는 화면표시 제약으로 5칸만으로 표현하였음)

게임 화면의 격자의 상태가 담긴 2차원 배열 board와 인형을 집기 위해 크레인을 작동시킨 위치가 담긴 배열 moves가 매개변수로 주어질 때, 크레인을 모두 작동시킨 후 터트려져 사라진 인형의 개수를 return 하도록 solution 함수를 완성해주세요.

##### **[제한사항]**

- board 배열은 2차원 배열로 크기는 5 x 5 이상 30 x 30 이하입니다.
- board의 각 칸에는 0 이상 100 이하인 정수가 담겨있습니다.
  - 0은 빈 칸을 나타냅니다.
  - 1 ~ 100의 각 숫자는 각기 다른 인형의 모양을 의미하며 같은 숫자는 같은 모양의 인형을 나타냅니다.
- moves 배열의 크기는 1 이상 1,000 이하입니다.
- moves 배열 각 원소들의 값은 1 이상이며 board 배열의 가로 크기 이하인 자연수입니다.

##### **입출력 예**

| board                                                        | moves             | result |
| ------------------------------------------------------------ | ----------------- | ------ |
| [[0,0,0,0,0],[0,0,1,0,3],[0,2,5,0,1],[4,2,4,4,2],[3,5,1,3,1]] | [1,5,3,5,1,2,1,4] | 4      |

##### **입출력 예에 대한 설명**

**입출력 예 #1**

인형의 처음 상태는 문제에 주어진 예시와 같습니다. 크레인이 [1, 5, 3, 5, 1, 2, 1, 4] 번 위치에서 차례대로 인형을 집어서 바구니에 옮겨 담은 후, 상태는 아래 그림과 같으며 바구니에 담는 과정에서 터트려져 사라진 인형은 4개 입니다.

![crane_game_104.jpg](https://grepp-programmers.s3.ap-northeast-2.amazonaws.com/files/production/bb0f59c7-6b72-485a-8302-217fe53ea88f/crane_game_104.jpg)



----

## 해결법

```javascript
class Stack {
  constructor() {
    this._arr = [];
  }
  push(item) {
    this._arr.push(item);
  }
  pop() {
    return this._arr.pop();
  }
  peek() {
    return this._arr[this._arr.length - 1];
  }
  clear() {
    this._arr = [];
  }
  length() {
    return this._arr.length;
  }
}


const isSamePuppetInStack = (stack,puppetType) => {
  return stack.peek() === puppetType;
};

function solution(board, moves) {
  const stack = new Stack();
  let disapearPuppetCount = 0;
  moves.map((pullingSpot) => {
    for (let i = 0; i < board.length; i++) {
      const pulledPuppet = board[i][pullingSpot - 1];
      if (pulledPuppet) {
        board[i][pullingSpot - 1] = 0;
        if (isSamePuppetInStack(stack,pulledPuppet)) {
          stack.pop();
          disapearPuppetCount += 2;
          return;
        }
        stack.push(pulledPuppet);
        return;
      }
    }
  });
  return disapearPuppetCount;
}
	
```



항상 느끼지만 문제를 잘읽으면 거기에 해답이 있는거 같다.

이번에도 주목했던 문장이 있는데,

> 만약 같은 모양의 인형 두 개가 바구니에 연속해서 쌓이게 되면 두 인형은 터뜨려지면서 바구니에서 사라지게 됩니다.  
>
> 위 상태에서 이어서 [5번] 위치에서 인형을 집어 바구니에 쌓으면 같은 모양 인형 **두 개**가 없어집니다.

여기에서 눈여겨 봐야하는 문장은 `바구니에 쌓으면` 인데 이는 stack구조를 의미한다.



따라서 인형을 담을 바구니를  Stack으로 만들어준다

```javascript
class Stack {
  constructor() {
    this._arr = [];
  }
  push(item) {
    this._arr.push(item);
  }
  pop() {
    return this._arr.pop();
  }
  peek() {
    return this._arr[this._arr.length - 1];
  }
  clear() {
    this._arr = [];
  }
  length() {
    return this._arr.length;
  }
}
```



이제, 크레인 집게를 집는 동작을 추가해줘야한다.

크레인을 집는 위치가 만일에 2라고 한다면, `board[0][1], board[1][1], board[2][1], board[3][1] ...`

으로 순차적으로 검색을 해줘야한다.

이렇게 검색을 하던중에 `0` 은 비어있는 칸을 의미함으로 무시하고 내려가야 하며 0이 아닐때 집고 stack에 넣는 동작을 추가해줘야 한다.

```javascript
const isSamePuppetInStack = (stack,puppetType) => {
  return stack.peek() === puppetType;
};

function solution(board, moves) {
  const stack = new Stack();
  let disapearPuppetCount = 0;
  moves.map((pullingSpot) => {
    for (let i = 0; i < board.length; i++) {
      const pulledPuppet = board[i][pullingSpot - 1];
      if (pulledPuppet) {
        board[i][pullingSpot - 1] = 0;
        if (isSamePuppetInStack(stack,pulledPuppet)) {
          stack.pop();
          disapearPuppetCount += 2;
          return;
        }
        stack.push(pulledPuppet);
        return;
      }
    }
  });
  return disapearPuppetCount;
}
```

먼저 눈여겨 봐야하는 요소를 몇가지 짚어보자

`stack` : 만들어둔 스택을 이용해 만든 인형을 담을 바구니

`disapearPuppetCount`는 stack에 중복이 되어 사라진 인형의갯수 즉, 이 문제의 해답을 의미한다.

`pullingSpot` : 크레인이 집어 올리는 위치

`isSamePuppetInStack` : stack 최상단의 인형의 타입과 새로 넣는 인형의 타입이 같은지를 찾는 function

여기서 간단한 로직을 굳이 왜 function으로 만들었냐면, 가독성을 위해서이다.



먼저 크레인의 움직임이 기준임으로, `moves` 을 map으로 loop하도록 합니다.

그 후 board의 length만큼 for를 실행하여서 크레인을 내립니다.

이때, 만나는 숫자가 0인경우 넘어가고 0이 아닌경우에 크레인에 의해 뽑혔으므로 0으로 만들어줍니다

```javascript
moves.map((pullingSpot) => {
    for (let i = 0; i < board.length; i++) {
      const pulledPuppet = board[i][pullingSpot - 1];
      if (pulledPuppet) {
        board[i][pullingSpot - 1] = 0;
        .
        .
      }
    }
  });
```



이후, stack의 맨위의 인형과 같은 타입인지 검사를 합니다.

이때, 같은 타입이라면 stack을 pop하여서 맨위의 인형을 꺼내고, 인형이 2개가 사라졌으므로 `disapearPuppetCount` 를 2 증가 시킵니다.



만일 다르다면, stack의 맨위에 새 인형을 추가합니다.

그후 해당 동작을 반복하면 총 사라진 인형을 구할수있습니다!

```javascript
function solution(board, moves) {
  const stack = new Stack();
  let disapearPuppetCount = 0;
  moves.map((pullingSpot) => {
    for (let i = 0; i < board.length; i++) {
      const pulledPuppet = board[i][pullingSpot - 1];
      if (pulledPuppet) {
        board[i][pullingSpot - 1] = 0;
        if (isSamePuppetInStack(stack,pulledPuppet)) {
          stack.pop();
          disapearPuppetCount += 2;
          return;
        }
        stack.push(pulledPuppet);
        return;
      }
    }
  });
  return disapearPuppetCount;
}
```



----



## 후기

만일에 Stack에 대한 개념과 Stack을 구현할줄 안다면 쉽게 풀수있는 문제였습니다!









----

# 프로그래머스[lv.2] - 스킬트리(Summer/Winter Coding(~2018))

## 문제 설명

선행 스킬이란 어떤 스킬을 배우기 전에 먼저 배워야 하는 스킬을 뜻합니다.

예를 들어 선행 스킬 순서가 `스파크 → 라이트닝 볼트 → 썬더`일때, 썬더를 배우려면 먼저 라이트닝 볼트를 배워야 하고, 라이트닝 볼트를 배우려면 먼저 스파크를 배워야 합니다.

위 순서에 없는 다른 스킬(힐링 등)은 순서에 상관없이 배울 수 있습니다. 따라서 `스파크 → 힐링 → 라이트닝 볼트 → 썬더`와 같은 스킬트리는 가능하지만, `썬더 → 스파크`나 `라이트닝 볼트 → 스파크 → 힐링 → 썬더`와 같은 스킬트리는 불가능합니다.

선행 스킬 순서 skill과 유저들이 만든 스킬트리[1](https://programmers.co.kr/learn/courses/30/lessons/49993#fn1)를 담은 배열 skill_trees가 매개변수로 주어질 때, 가능한 스킬트리 개수를 return 하는 solution 함수를 작성해주세요.

##### 제한 조건

- 스킬은 알파벳 대문자로 표기하며, 모든 문자열은 알파벳 대문자로만 이루어져 있습니다.
- 스킬 순서와 스킬트리는 문자열로 표기합니다.
  - 예를 들어, `C → B → D` 라면 "CBD"로 표기합니다
- 선행 스킬 순서 skill의 길이는 1 이상 26 이하이며, 스킬은 중복해 주어지지 않습니다.
- skill_trees는 길이 1 이상 20 이하인 배열입니다.
- skill_trees의 원소는 스킬을 나타내는 문자열입니다.
  - skill_trees의 원소는 길이가 2 이상 26 이하인 문자열이며, 스킬이 중복해 주어지지 않습니다.

##### 입출력 예

| skill   | skill_trees                         | return |
| ------- | ----------------------------------- | ------ |
| `"CBD"` | `["BACDE", "CBADF", "AECB", "BDA"]` | 2      |

##### 입출력 예 설명

- "BACDE": B 스킬을 배우기 전에 C 스킬을 먼저 배워야 합니다. 불가능한 스킬트립니다.
- "CBADF": 가능한 스킬트리입니다.
- "AECB": 가능한 스킬트리입니다.
- "BDA": B 스킬을 배우기 전에 C 스킬을 먼저 배워야 합니다. 불가능한 스킬트리입니다.

----

## 해결법

```javascript
const skillTree = ["BACDE", "CBADF", "AECB", "BDA", "AEF", "ZJW"];
const skill = "CBD";
class Stack {
    constructor(items){
        this._arr = []
        const arrItems = items.split('')
        for (let i = arrItems.length - 1; i > -1; i--) {
            this._arr.push(arrItems[i]);
        }
 }
 getLength(){
     return this._arr.length
 }
 push(item){
    this._arr.push(item);
 }
 pop(){
    return this._arr.pop()
 }
 peek(){
    return this._arr[this._arr.length-1]
 }
}
const isInSkillStep = (skill,skillPeek) =>{
    return skill.split('').indexOf(skillPeek) > -1
}
const isNextSkillStep = (skillStepStack, skillPeek) =>{
    return skillStepStack.pop() === skillPeek
}

function solution(skill, skill_trees) {
    const results  = skill_trees.map(skillTree =>{
        const skillStepStack = new Stack(skill);
        const skillPeeks = skillTree.split('');

        for (const index in skillPeeks) {
            if (Object.hasOwnProperty.call(skillPeeks, index)) { 
                const skillPeek = skillPeeks[index];
                if (!isInSkillStep(skill,skillPeek)){
                    if (index == skillPeeks.length - 1) {
                        return true
                    }
                    continue 
                }
                if (!isNextSkillStep(skillStepStack, skillPeek)) {
                    return false
                }
                if (skillStepStack.getLength() === 0){
                    return true
                }
                if (index == skillPeeks.length - 1) {
                    return true
                }
                
            }
        }
    })
    return results.filter( result => result == true).length;//정상적인 스킬트리의 숫자
}
```



이전에 크레인 문제를 풀었을때 스택을 이용해서 문제를 풀이했었습니다.

스택을 구현하기 위해 아래와 같이 class를 만들어 줍니다

```javascript
class Stack {
    constructor(items){
        this._arr = []
        const arrItems = items.split('')
        for (let i = arrItems.length - 1; i > -1; i--) {
            this._arr.push(arrItems[i]);
        }
 }
 getLength(){
     return this._arr.length
 }
 push(item){
    this._arr.push(item);
 }
 pop(){
    return this._arr.pop()
 }
 peek(){
    return this._arr[this._arr.length-1]
 }
}
```

이번 문제에서, 제가 눈여겨 본 부분은 다음과 같습니다

> 위 순서에 없는 다른 스킬(힐링 등)은 순서에 상관없이 배울 수 있습니다

즉, skill 로 주어지는 문자를 제외한 다른 문자는 무시해도 된다는 결론이 나옵니다.

우선 skill을 역순으로 stack arr에 넣어줘야 했기에 생성자를 사용해서 문자열을 역순으로 stack 에 넣었습니다. 

```javascript
    constructor(items){
        this._arr = []
        const arrItems = items.split('')
        for (let i = arrItems.length - 1; i > -1; i--) {
            this._arr.push(arrItems[i]);
        }
 }
```

위의 과정을 거치면 ABC문자열은 ["C","B","A"]의 형태로 Stack에 들어가게 됩니다.

이제 주어진 스킬트리를 기준으로 loop를 돌려서 각각의 스킬트리를 검증하기 시작합니다

```javascript
    const results  = skill_trees.map(skillTree =>{
        const skillStepStack = new Stack(skill);
        const skillPeeks = skillTree.split('');

        for (const index in skillPeeks) {
            if (Object.hasOwnProperty.call(skillPeeks, index)) { 
                const skillPeek = skillPeeks[index];
                if (!isInSkillStep(skill,skillPeek)){
                    if (index == skillPeeks.length - 1) {
                        return true //스탭안에 존재하지 않는 시점에서 스킬트리가 끝난다면
                    }
                    continue 
                }
                if (!isNextSkillStep(skillStepStack, skillPeek)) {
                    return false
                }
                if (skillStepStack.getLength() === 0){
                    return true
                }
                if (index == skillPeeks.length - 1) {
                    return true
                }
                
            }
        }
    })
```

각각의 스킬트리를 ` const skillPeeks = skillTree.split('');`을 사용해서 배열로 만들어줍니다.

그후 각 스킬트리의 스킬이 제시된 Skill 이라는 문자열 안에 있는지 검증하는 `isInSkillStep` 라는 함수를 만들어서 사용하였습니다

```
const isInSkillStep = (skill,skillPeek) =>{
    return skill.split('').indexOf(skillPeek) > -1
}
```

그후 만일, 스탭안에 존재하지 않는 다면 패스하고, 

만일 그 시점에서 스킬트리가 끝난다면 return true를 해서 true를 return 해줍니다.

`fail case : ZJW`

```
                if (!isInSkillStep(skill,skillPeek)){
                    if (index == skillPeeks.length - 1) {
                        return true //스탭안에 존재하지 않는 시점에서 스킬트리가 끝난다면
                    }
                    continue 
                }
```

그후 다음 스킬스탭과 동일한지 확인을 해봅니다.

이것도 `isNextSkillStep` 이라는 function을 만들어서 사용했습니다.

```
const isNextSkillStep = (skillStepStack, skillPeek) =>{
    return skillStepStack.pop() === skillPeek
}

```

```
                if (!isNextSkillStep(skillStepStack, skillPeek)) {
                    return false
                }
```

이제, 만일 모든 스킬트리를 다 소모했다면 true를 리턴해서 이 스킬트리는 옳다는것을 return 해줍니다

```
                if (skillStepStack.getLength() === 0){
                    return true
                }
                if (index == skillPeeks.length - 1) {
                    return true
                }
```

그후 마지막으로 result 의 true의 개수를 return 해줍니다

```
return results.filter( result => result == true).length;//정상적인 스킬트리의 숫자
```



-----

##  후기

이번거는 예외 사항을 체크하는데 너무 오래걸렸습니다.

특히 ZWS와 같이 어느것 하나도 skill이 없는상황에서 fail이 나는경우를 못잡은 것이 가장 컸습니다.

또한, Stack이 아니라 Queue를 썼으면 좀더 편하지 않았을까란 생각이 들었고

여전히 가독성이 떨어져서 다소 아쉽다는 생각을 했습니다.

만일에 다시 한다면, 먼저 해당되지 않는 스킬을 전무 소멸시키고 큐를 사용하거나

정규식을 사용해서 풀어보고 싶습니다.



----

# 큐(Queue)란?



자료구조에서 **스택과 함께 가장 많이 볼수있는 선형구조** 입니다.

**스택이 한쪽이 막혀있는 프링글스**를 생각하신다면, **큐는 놀이동산에서 기다리는 줄**을 생각하시면 이해하기가 수월합니다.

![](https://img.hankyung.com/photo/201411/AA.9241943.1.jpg)

> 혹시 스택에 관하여 개념이 헷갈리시는분은 전에 써놓은 스택에 대한 글을 읽어보시는걸 추천드립니다
>
> https://burning-camp.tistory.com/66



큐는 **FIFO(First In First Out)** 혹은 **LILO(Last In Last Out)** 혹은 **선입선출**이라고 합니다

즉, 스택이랑 다르게 **먼저 들어간게 먼저 나오는 구조**입니다



큐에는 몇가지 대표적인 행동(함수)가 있습니다

- **Enqueue** : 큐의 맨뒤에 data를 넣는다 (대기줄 맨끝에서 기다린다)
- **Dequeue** : 큐의 맨앞에 data를 뺴낸다  (대기줄 맨 앞에서 입장한다)
- **peek** : 큐의 맨위의 data 를 조회한다 (대기줄 맨 앞을 살펴본다)

이해를 돕기 위해 아래의 이미지를 보시면 좋습니다!



![](https://blackpudding.netlify.app/queue_animation-1093184755f30dff7b81fd507208c14b.gif)



이제 큐를 실제로 구현해 보도록 하겠습니다

큐는 2개의 스택을 이용해서 구현할수 있는데 먼저 아래의 코드를 보겠습니다.

```javascript

class Queue {
  constructor(items) {
    if (items) {
      this.inbox = new Stack(items);
    } else {
      this.inbox = new Stack();
    }
    this.outbox = new Stack();
  }

  enqueue(item) {
    this.inbox.push(item);
    return true;
  }
  dequeue() {
    const inboxSize = this.inbox.size();
    for (let i = 0; i < inboxSize; i++) {
      this.outbox.push(this.inbox.pop());
    }
    const firstItem = this.outbox.pop();
    for (let i = 0; i < inboxSize - 1; i++) {
      this.inbox.push(this.outbox.pop());
    }
    return firstItem;
  }
  peek() {
    return this.inbox.peek();
  }
 }	
```



Queue는 2개의 스택으로 만들어진다고 말씀드렸는데 아래와 같은 용도로 쓰여집니다.

- Inbox(오리지널) - 실제 데이터가 들어가 있는 스택

- Outbox(임시) - Dequeue에서 쓰일 임시 스택



큐는 선입선출, 즉 Inbox 스택의 맨앞(프링글스통 맨아래의 감자칩)의 데이터를 뽑아내야하는데(Dequeue) 이것을 구현하기 위해서 입니다.

1. Indox = [1,2,3,4]의 스택이 들어있습니다. -> Inbox = [1,2,3,4] | Outbox = []

2. Inbox의 데이터 수만큼 pop해서 Outbox에 넣습니다. -> Inbox = [] | Outbox = [4,3,2,1]

   이때 **Outbox는 Inbox의 데이터가 역순으로 들어가게 됩니다**.

3. Outbox에서 pop을 합니다. **이 pop을 한 데이터가 큐의 가장 맨앞의 데이터 입니다** -> Inbox = [] | Outbox = [4,3,2] | data : 1

4. 그리고 Outbox의 데이터 수만큼 pop해서 Inbox에 넣습니다. ->  Inbox = [2,3,4] | Outbox = [] | data : 1

   이때 **원래의 데이터에서 맨앞의 데이터만 없는 형태가 됩니다.**

5. **Dequeue 성공!**



상상을 해보면 좀더 이해가 쉽습니다.

**꽉차있는 프링글스 통의 맨 밑의 감자칩**이 먹고 싶다면 비어있는 **프링글스통을** 하나 더 준비합니다.

이후 꽉차있는 프링글스 통에 있는 감자칩을 **꺼꾸로 비어있는 통에다 전부다 붓습니다.**

이후 **부어진 감자칩의 맨위에걸 하나 집어먹고** 다시 반대로 **원래 있던 통에 쏟아 넣으면 맨앞의 감자칩만 없게됩니다**



한번 직접 구현해 보신다면 이해가 훨씬 쉬울테니 겁먹지 마세요 ㅎㅎ























---



# 프로그래머스[lv.2] - 기능개발

## 문제 설명

프로그래머스 팀에서는 기능 개선 작업을 수행 중입니다. 각 기능은 진도가 100%일 때 서비스에 반영할 수 있습니다.

또, 각 기능의 개발속도는 모두 다르기 때문에 뒤에 있는 기능이 앞에 있는 기능보다 먼저 개발될 수 있고, 이때 뒤에 있는 기능은 앞에 있는 기능이 배포될 때 함께 배포됩니다.

먼저 배포되어야 하는 순서대로 작업의 진도가 적힌 정수 배열 progresses와 각 작업의 개발 속도가 적힌 정수 배열 speeds가 주어질 때 각 배포마다 몇 개의 기능이 배포되는지를 return 하도록 solution 함수를 완성하세요.

##### 제한 사항

- 작업의 개수(progresses, speeds배열의 길이)는 100개 이하입니다.
- 작업 진도는 100 미만의 자연수입니다.
- 작업 속도는 100 이하의 자연수입니다.
- 배포는 하루에 한 번만 할 수 있으며, 하루의 끝에 이루어진다고 가정합니다. 예를 들어 진도율이 95%인 작업의 개발 속도가 하루에 4%라면 배포는 2일 뒤에 이루어집니다.

##### 입출력 예

| progresses               | speeds             | return    |
| ------------------------ | ------------------ | --------- |
| [93, 30, 55]             | [1, 30, 5]         | [2, 1]    |
| [95, 90, 99, 99, 80, 99] | [1, 1, 1, 1, 1, 1] | [1, 3, 2] |

##### 입출력 예 설명

입출력 예 #1
첫 번째 기능은 93% 완료되어 있고 하루에 1%씩 작업이 가능하므로 7일간 작업 후 배포가 가능합니다.
두 번째 기능은 30%가 완료되어 있고 하루에 30%씩 작업이 가능하므로 3일간 작업 후 배포가 가능합니다. 하지만 이전 첫 번째 기능이 아직 완성된 상태가 아니기 때문에 첫 번째 기능이 배포되는 7일째 배포됩니다.
세 번째 기능은 55%가 완료되어 있고 하루에 5%씩 작업이 가능하므로 9일간 작업 후 배포가 가능합니다.

따라서 7일째에 2개의 기능, 9일째에 1개의 기능이 배포됩니다.

입출력 예 #2
모든 기능이 하루에 1%씩 작업이 가능하므로, 작업이 끝나기까지 남은 일수는 각각 5일, 10일, 1일, 1일, 20일, 1일입니다. 어떤 기능이 먼저 완성되었더라도 앞에 있는 모든 기능이 완성되지 않으면 배포가 불가능합니다.

따라서 5일째에 1개의 기능, 10일째에 3개의 기능, 20일째에 2개의 기능이 배포됩니다.

-----

## 해결법

### 🚧 notice

이 문제는 스택을 이용하여 큐를 만들어서 해결하는 문제입니다.

그렇기 때문에 아직 스택과 큐 자료구조 개념이 없으시다면, 먼저 선행공부가 필요한 문제라고 생각됩니다.

```javascript
class Stack {
  constructor(items) {
    if (items) {
      this._arr = items;
      this.top = items.length;
    } else {
      this._arr = [];
      this.top = 0;
    }
  }
  pop() {
    if (this.top > 0) {
      const lastItem = this._arr[this.top - 1];
      this.top -= 1;
      this._arr.splice(this.top, 1);
      return lastItem;
    }
    return false;
  }
  push(item) {
    this._arr.push(item);
    this.top += 1;
  }
  top() {
    return this.top;
  }
  peek() {
    if (this._arr.length > 0) {
      return this._arr[this.top - 1];
    }
    return false;
  }
  size() {
    return this._arr.length;
  }
}

class Queue {
  constructor(items) {
    if (items) {
      this.inbox = new Stack(items);
    } else {
      this.inbox = new Stack();
    }
    this.outbox = new Stack();
  }

  queue(item) {
    this.inbox.push(item);
    return true;
  }
  deqeue() {
    const inboxSize = this.inbox.size();
    for (let i = 0; i < inboxSize; i++) {
      this.outbox.push(this.inbox.pop());
    }
    const firstItem = this.outbox.pop();
    for (let i = 0; i < inboxSize - 1; i++) {
      this.inbox.push(this.outbox.pop());
    }
    return firstItem;
  }
  top() {
    return this.inbox.top;
  }
  size() {
    return this.inbox.size();
  }
  peek() {
    return this.inbox.peek();
  }
  getter() {
    return this.inbox._arr;
  }
  setter(array) {
    this.inbox = new Stack(array);
  }
}

const calReaminTerm = (termCount, queue) => {
  const queueItems = queue.getter();
  return queueItems.map((item) => item - termCount);
};

const solution = (progresses, speeds) => {
  const answer = [];
  const remainTerm = [];
  for (const key in progresses) {
    if (progresses.hasOwnProperty(key)) {
      const process = progresses[key];
      remainTerm.push(Math.ceil((100 - process) / speeds[key]));
    }
  }
  const remainQueue = new Queue(remainTerm);
  let answerTop = -1;
  while (remainQueue.top()) {
    const firstItem = remainQueue.deqeue();
    if (firstItem < 1) {
      answer[answerTop] += 1;
      continue;
    } else {
      answerTop += 1;
      answer[answerTop] = 1;
      remainQueue.setter(calReaminTerm(firstItem, remainQueue));
    }
  }
  return answer;
};
```

항상 해설글에서 말하지만 문제를 잘 읽는것이 포인트인것 같습니다.

이번 문제에서 주목한 부분은 바로 이 부분입니다.

> 입출력 예 #1
> 첫 번째 기능은 93% 완료되어 있고 하루에 1%씩 작업이 가능하므로 7일간 작업 후 배포가 가능합니다.
> 두 번째 기능은 30%가 완료되어 있고 하루에 30%씩 작업이 가능하므로 3일간 작업 후 배포가 가능합니다. 하지만 이전 첫 번째 기능이 아직 완성된 상태가 아니기 때문에 첫 번째 기능이 배포되는 7일째 배포됩니다.
> 세 번째 기능은 55%가 완료되어 있고 하루에 5%씩 작업이 가능하므로 9일간 작업 후 배포가 가능합니다.
>
> 따라서 7일째에 2개의 기능, 9일째에 1개의 기능이 배포됩니다.

즉, process 배열의 앞에 있는 순서부터 작업이 되며, 가장 앞에 있는 process가 100이상이 되었을때 뒤에있는 배열에 100이상이 아니게 될때까지 갯수를 세어내는 문제입니다.

하지만, 여기서 주목을 한것이 결국엔 speeds라는 배열이 있기에 같은 속도로 줄어드는것이 아니었습니다.

따라서, 현재 진행률이 아닌 `남은 진행률에서 진행시간을 나눠서 남은 사이클 횟수` 로 한번 정제해서 알고리즘을 풀어 나갔습니다.



그전에 먼저 Queue를 만들기 위한 Stack을 만들어 주겠습니다

```javascript
class Stack {
  constructor(items) {
    if (items) {
      this._arr = items;
      this.top = items.length;
    } else {
      this._arr = [];
      this.top = 0;
    }
  }
  pop() {
    if (this.top > 0) {
      const lastItem = this._arr[this.top - 1];
      this.top -= 1;
      this._arr.splice(this.top, 1);
      return lastItem;
    }
    return false;
  }
  push(item) {
    this._arr.push(item);
    this.top += 1;
  }
  top() {
    return this.top;
  }
  peek() {
    if (this._arr.length > 0) {
      return this._arr[this.top - 1];
    }
    return false;
  }
  size() {
    return this._arr.length;
  }
}
```

> stack에 관한 설명은 다른글을 참고해주세요!
>
> https://burning-camp.tistory.com/66
>
> https://burning-camp.tistory.com/67

저는 이번에 다른방식으로 Stack을 만들었습니다.



이제 2개의 스택을 이용해서 큐를 구현 해보도록 하겠습니다.

```javascript
class Queue {
  constructor(items) {
    if (items) {
      this.inbox = new Stack(items);
    } else {
      this.inbox = new Stack();
    }
    this.outbox = new Stack();
  }

  enqueue(item) {
    this.inbox.push(item);
    return true;
  }
  dequeue() {
    const inboxSize = this.inbox.size();
    for (let i = 0; i < inboxSize; i++) {
      this.outbox.push(this.inbox.pop());
    }
    const firstItem = this.outbox.pop();
    for (let i = 0; i < inboxSize - 1; i++) {
      this.inbox.push(this.outbox.pop());
    }
    return firstItem;
  }
  peek() {
    return this.inbox.peek();
  }
  top() {
    return this.inbox.top;
  }
  size() {
    return this.inbox.size();
  }
  getter() {
    return this.inbox._arr;
  }
  setter(array) {
    this.inbox = new Stack(array);
  }
}
```

> 스택 2개로 큐를 구현하는 개념은 이전에 쓴 게시물을 참고해 주시면 좋습니다!
>
> https://burning-camp.tistory.com/72



기본적인 enqueue, dequeue 외에도 필요한 function 몇개를 더 선언해서 사용하였습니다



이제 만들어 놓은 큐를 사용해서 문제를 풀어보도록 하겠습니다.

```javascript
const solution = (progresses, speeds) => {
  const answer = [];
  const remainTerm = [];
  for (const key in progresses) {
    if (progresses.hasOwnProperty(key)) {
      const process = progresses[key];
      remainTerm.push(Math.ceil((100 - process) / speeds[key]));
    }
  }
  
  .
  .
  .
}
```



여기서 눈여겨 봐야하는 소스는 `remainTerm.push(Math.ceil((100 - process) / speeds[key]));` 입니다.

remainTerm 배열에 각 Process의 남은 (100-현재 진행률) 에서 해당하는  speed로 나눠서 몇번의 term뒤에 100이 초과 되는지를 구합니다.

여기서 주의할점은 3. 33333 인 경우 4번째에 100을 초과함으로 올림처리를 해줘야 합니다.

위의 소스가 돌아가면 remainTerm 배열에는 [2,3,4] 와 같이 각 프로세스에서 몇번의 사이클 이후에 100이 넘어가는지를 알수있게됩니다.

```javascript
 .
 .
 .
  const remainQueue = new Queue(remainTerm);
  let answerTop = -1;
  while (remainQueue.top()) {
    const firstItem = remainQueue.deqeue();
    if (firstItem < 1) {
      answer[answerTop] += 1;
      continue;
    } else {
      answerTop += 1;
      answer[answerTop] = 1;
      remainQueue.setter(calReaminTerm(firstItem, remainQueue));
    }
  }
```

`const remainQueue = new Queue(remainTerm);` 여기서 

큐에 만들어놓은 남은 term이 들어있는 array를 넣어줍니다.



그리고 맨앞의 텀수를 꺼내서 0이하인지(종료되었는지) 확인합니다.

`const firstItem = remainQueue.deqeue();
    if (firstItem < 1) {`

만일 0이하 ( 종료 ) 라면 answer의 [answerTop]칸에 1을 더해줍니다.

여기서 answerTop의 위치는 종료가된 프로세스가 있을때, 최초로 1개가 카운트 되서 들어가 집니다.



만일 종료가 되지 않았다면 (큐의 맨 앞의 진행 텀이 1번 이상이라면)

answerTop => 큐의 맨앞의 term이 0이 되었을때 한번에 몇개가 끝나는지.

 answer[answerTop] = 1; -> 현재 빠져있는 `firstItem` 의 남은 term 만큼 뒤의 모든 프로새스 term을 뺄꺼기 때문에

현재 있는 firstItem을 카운트 해줍니다

` remainQueue.setter(calReaminTerm(firstItem, remainQueue));` 이 부분을 통해서 현재 queue에 들어있는 

모든 요소를 현재 firstItem에 들어있는 proccess term을 진행시킵니다.



즉, [2,1,3,4] 일경우

-> first item : 2   queue: [1,2,3]

-> 2만큼 진행 queue: [-1,0,1]

-> 다시 while로 반복하면서 0 이하인 요소들을 없애가면서 +1

-> answer[0] = 3 || queue : [1]



위와 같은 과정을 거쳐서 횟수를 구합니다.

-----



## 후기

이번 문제는 큐라는 자료구조를 제대로 이해하고 있는지를 물어보는 문제 같았습니다.

위에서는 stack 부터 queue까지 전부다 구현했지만

사실 array.shift(), array.pop(), array.push() 이 3개로 queue와 stack을 쓸수가 있습니다.

따라서 큐와 스택을 반드시 구현해야하는 상황이 아니라면 위의 3개의 함수를 사용해서 구현하는것도 방법이라고 생각했습니다 ㅎㅎ

-----

# 프로그래머스[lv.3] [DFS/BFS] - 여행경로



## 문제설명

주어진 항공권을 모두 이용하여 여행경로를 짜려고 합니다. 항상 "ICN" 공항에서 출발합니다.

항공권 정보가 담긴 2차원 배열 tickets가 매개변수로 주어질 때, 방문하는 공항 경로를 배열에 담아 return 하도록 solution 함수를 작성해주세요.

##### 제한사항

- 모든 공항은 알파벳 대문자 3글자로 이루어집니다.
- 주어진 공항 수는 3개 이상 10,000개 이하입니다.
- tickets의 각 행 [a, b]는 a 공항에서 b 공항으로 가는 항공권이 있다는 의미입니다.
- 주어진 항공권은 모두 사용해야 합니다.
- 만일 가능한 경로가 2개 이상일 경우 알파벳 순서가 앞서는 경로를 return 합니다.
- 모든 도시를 방문할 수 없는 경우는 주어지지 않습니다.

##### 입출력 예

| tickets                                                      | return                                     |
| ------------------------------------------------------------ | ------------------------------------------ |
| [["ICN", "JFK"], ["HND", "IAD"], ["JFK", "HND"]]             | ["ICN", "JFK", "HND", "IAD"]               |
| [["ICN", "SFO"], ["ICN", "ATL"], ["SFO", "ATL"], ["ATL", "ICN"], ["ATL","SFO"]] | ["ICN", "ATL", "ICN", "SFO", "ATL", "SFO"] |

##### 입출력 예 설명

예제 #1

["ICN", "JFK", "HND", "IAD"] 순으로 방문할 수 있습니다.

예제 #2

["ICN", "SFO", "ATL", "ICN", "ATL", "SFO"] 순으로 방문할 수도 있지만 ["ICN", "ATL", "ICN", "SFO", "ATL", "SFO"] 가 알파벳 순으로 앞섭니다.

----

## 해결법

### 🚧 notice

이 문제는 재귀함수를 이용해서 푸는 문제입니다.

만일 재귀함수에 대한 개념이 아직 안잡히셨다면, 재귀함수 문제를 먼저 풀고 오시기를 바랍니다.

```javascript
const test = {
  1: {
    input: [
      ['ICN', 'JFK'],
      ['HND', 'IAD'],
      ['JFK', 'HND'],
    ],
    output: ['ICN', 'JFK', 'HND', 'IAD'],
  },
  2: {
    input: [
      ['ICN', 'SFO'],
      ['ICN', 'ATL'],
      ['SFO', 'ATL'],
      ['ATL', 'ICN'],
      ['ATL', 'SFO'],
    ],
    output: ['ICN', 'ATL', 'ICN', 'SFO', 'ATL', 'SFO'],
  },
  3: {
    input: [
      ['ICN', 'ABC'],
      ['ICN', 'BBC'],
      ['BBC', 'ICN'],
    ],

    output: ['ICN', 'BBC', 'ICN', 'ABC'],
  },
};

//TestCase -----------------------------------

function solution(tickets) {
  var answer = [];
  function findRoute(remainTickets, destination, route) {
    const copyRoute = route.slice();
    copyRoute.push(destination);
    if (remainTickets.length === 0) {
      answer.push(copyRoute);
      return;
    }

    const nextTicket = remainTickets
      .filter((ticket) => destination === ticket[0])
      .sort((a, b) => {
        return a[1] > b[1] ? 1 : -1;
      });
    if (nextTicket.length < 1) {
      return 0;
    }
    for (let i = 0; i < nextTicket.length; i++) {
      const nextRemainTickets = remainTickets.filter(
        (remainTicket) => remainTicket != nextTicket[i]
      ); //다음 목적지를 가지고 있는 티켓가져오기(목적지에 해당하는 티켓을 제외)

      findRoute(nextRemainTickets, nextTicket[i][1], copyRoute);
    }
  }
  findRoute(tickets, 'ICN', []);
  return answer[0];
}
```



알고리즘의 단골문제 DFS/BFS입니다.

먼저 제한사항을 살펴 보겠습니다

> - 주어진 항공권은 모두 사용해야 합니다.
> - 만일 가능한 경로가 2개 이상일 경우 알파벳 순서가 앞서는 경로를 return 합니다.
> - 모든 도시를 방문할 수 없는 경우는 주어지지 않습니다.

즉, 항공권을 모두 사용한 시점이 '종료' 시점이 되며

가능한경로가 2개이상 구해질수도 있다는것을 의미합니다.



````javascript
  function findRoute(remainTickets, destination, route) {
    const copyRoute = route.slice();
    copyRoute.push(destination);
    if (remainTickets.length === 0) {
      answer.push(copyRoute);
      return;
    }

````

먼저 findRoute를 만듭니다.

- reaminTicket: 남은티켓

- destination: 도착지

- route : 나아가는 경로

이 3가지를 매개변수로 받을겁니다. 그리고 재귀 함수이기 때문에 종료조건을 반드시 상단애 위치시켜줘야합니다.

**여기서 종료조건은 reaminTicket 즉, 더이상 남은 티켓이 없을때 함수를 종료 시킵니다.**

`const copyRoute = route.slice();` 는 배열을 깊은복사를 시키기위해 사용합니다.

그리고, destination(티켓의 도착지 이자 다음 티켓의 출발지)를 route에 push해줍니다(경로추가)



```javascript
    const nextTicket = remainTickets
      .filter((ticket) => destination === ticket[0])
      .sort((a, b) => {
        return a[1] > b[1] ? 1 : -1;
      });
    if (nextTicket.length < 1) {
      return 0;
    }
```

남은 티켓이 있다면, 현재까지 남은 티켓중에, 출발지가 destination(전 티켓의 도착지) 인것을 filter로 뽑아낸다음에

sort로 알파벳순으로 정렬을 해줍니다.

그후 이 배열을 nextTicket에 넣습니다.



즉, 도착지(destication)가 ICN고 남은 티켓이 ["ICN", "BBB"], ["ICN", "AAA"], ["CCC", "BBB"]하면

filter를 거친 시점에서 ["ICN", "BBB"], ["ICN", "AAA"] 이남고,

sort로 ["ICN", "AAA"] ,["ICN", "BBB"]의 순으로 nextTicket에 들어갑니다.



이때, nextTicket이 없다면 역시 함수를 종료시킵니다.

**이 종료가 뜻하는 바는 남은 티켓이 있지만 갈수있는 티켓이 없다는 의미로 경로가 잘못됨을 의미합니다.**



```javascript
    for (let i = 0; i < nextTicket.length; i++) {
      const nextRemainTickets = remainTickets.filter(
        (remainTicket) => remainTicket != nextTicket[i]
      ); //다음 목적지를 가지고 있는 티켓가져오기(목적지에 해당하는 티켓을 제외)

      findRoute(nextRemainTickets, nextTicket[i][1], copyRoute);
    }
```



이제 nextTicket을 가지고 반복을 합니다.

그리고 다음 회차를 위한 남은 Tickets을 정리해야하는데,

받은 remainTickets에서 다음에 해당하는 티켓( nextTicket )을 제외하고 담습니다.



**이렇게 되면 remainTickets에서 다음목적지에 해당하는 티켓을 (제외) 하고 다음 함수를 실행하게 됩니다**



이 과정을 반복하면, 과정마다 **다음에 해당하는 티켓을 제외하고 실행**을 하게되며,

이것을 통해 점점 **티켓의 수가 줄어들게 되는것 입니다.**



이제, 다음티켓을 제외한 다음 티켓인 nextRemainTickets을 매개변수로 넣고,

`nextTicket[i][1]` 을 도착지로 삼고, 현재 위치를 새로 푸시한 copyRoute를 전달해줍니다.



이 과정을 재귀로 넘어갈때마다

1. 남은티켓이 있는지?
2. 다음에 갈 티켓이 있는지?
3. 남은 티켓중에 다음에갈 티켓을 빼고 나머지 티켓으로 반복 -> 티켓이 1장 없어짐



의 과정을 거칩니다.



```javascript
  findRoute(tickets, "ICN", []);
  return answer[0];
}
```

재귀함수가 다 만들어 졌으니 초기값인 ticket 들과 출발지인 ICN 그리고 루트를 저장할 빈배열을 초기 매개변수로 주고 실행합니다.



재귀함수가 동작하면서 구해진 값들은 answer에 push가 되고, 알파벳순으로 가장앞의 결과만을 return 하면 되므로 

answer의 0번째 배열을 return 함으로서 끝이 납니다.



----

## 후기

처음해보는 DFS, BFS인데 아직도 시간복잡도애 관한 개념이 강하게 잡히지 않아서 다소 어렵다 생각했습니다.

특히나 재귀함수는 익숙해질때 까지는 매번 할때마다 어려울것 같습니다 ㅎㅎ



----







"hot" -> "dot" -> "dog" -> "cog

그렇기 때문에 아직 스택과 큐 자료구조 개념이 없으시다면, 먼저 선행공부가 필요한 문제라고 생각됩니다.



-----



# 프로그래머스[lv.2] [해시] - 위장

###### 문제 설명

스파이들은 매일 다른 옷을 조합하여 입어 자신을 위장합니다.

예를 들어 스파이가 가진 옷이 아래와 같고 오늘 스파이가 동그란 안경, 긴 코트, 파란색 티셔츠를 입었다면 다음날은 청바지를 추가로 입거나 동그란 안경 대신 검정 선글라스를 착용하거나 해야 합니다.

| 종류 | 이름                       |
| ---- | -------------------------- |
| 얼굴 | 동그란 안경, 검정 선글라스 |
| 상의 | 파란색 티셔츠              |
| 하의 | 청바지                     |
| 겉옷 | 긴 코트                    |

스파이가 가진 의상들이 담긴 2차원 배열 clothes가 주어질 때 서로 다른 옷의 조합의 수를 return 하도록 solution 함수를 작성해주세요.

##### 제한사항

- clothes의 각 행은 [의상의 이름, 의상의 종류]로 이루어져 있습니다.
- 스파이가 가진 의상의 수는 1개 이상 30개 이하입니다.
- 같은 이름을 가진 의상은 존재하지 않습니다.
- clothes의 모든 원소는 문자열로 이루어져 있습니다.
- 모든 문자열의 길이는 1 이상 20 이하인 자연수이고 알파벳 소문자 또는 '_' 로만 이루어져 있습니다.
- 스파이는 하루에 최소 한 개의 의상은 입습니다.

##### 입출력 예

| clothes                                                      | return |
| ------------------------------------------------------------ | ------ |
| [["yellowhat", "headgear"], ["bluesunglasses", "eyewear"], ["green_turban", "headgear"]] | 5      |
| [["crowmask", "face"], ["bluesunglasses", "face"], ["smoky_makeup", "face"]] | 3      |

##### 입출력 예 설명

예제 #1
headgear에 해당하는 의상이 yellow_hat, green_turban이고 eyewear에 해당하는 의상이 blue_sunglasses이므로 아래와 같이 5개의 조합이 가능합니다.

```
1. yellow_hat
2. blue_sunglasses
3. green_turban
4. yellow_hat + blue_sunglasses
5. green_turban + blue_sunglasses
```

예제 #2
face에 해당하는 의상이 crow_mask, blue_sunglasses, smoky_makeup이므로 아래와 같이 3개의 조합이 가능합니다.

```
1. crow_mask
2. blue_sunglasses
3. smoky_makeup
```

-----

## 해결법

```javascript
function solution(clothes) {
  let answer = 1;
  const clotheList = {};
  for (let i = 0; i < clothes.length; i++) {
    const clotheInfo = clothes[i];
    if (!clotheList[clotheInfo[1]]) {
      clotheList[clotheInfo[1]] = [];
    }
    clotheList[clotheInfo[1]].push(clotheInfo[0]);
  }
  for (const type in clotheList) {
    if (clotheList.hasOwnProperty(type)) {
      const items = clotheList[type];
      answer = answer * (items.length + 1);
    }
  }
  return answer - 1;
}		
```



먼저 문제에서 포인트를 한번 찾아봅니다.

제가 주의깊게 본 문구는 아래와 같습니다.

> 스파이는 하루에 최소 한 개의 의상은 입습니다.

그리고 경우의 수를 확인을 해보면 각종류당 1개만 입는 선택지 부터 전부다 입는 선택지 까지 있는것을 확일 할수있습니다.

> 1. yellow_hat
> 2. blue_sunglasses
> 3. green_turban
> 4. yellow_hat + blue_sunglasses
> 5. green_turban + blue_sunglasses

여기서 모든 경우의 수를 구하는 방법은 각 옷의 개수를 전부 곱하는것입니다. 

즉, `hat : 3개, shirt: 4개 라면 12개`가 두개를 조합해서 입는 총 개수 입니다.



하지만 고민을 했던 부분은 바로 **옷을 안입는 경우도 있다는것입니다.**

그래서 따로 처리를 해줘야 하나 고민을 하던중에 좋은방법을 찾았습니다.



바로, **옷을 안입는 경우도 추가해주는 것입니다.**

무슨말이냐면 **모자가 4종류라면 모자를 안쓰는 경우까지 총 5개**로 생각해주는것입니다.

그리고 모든 경우에 수에서 모두 다 안쓰는 경우만 빼주면(-1) 되는겁니다.



```javascript
function solution(clothes) {
  let answer = 1;
  const clotheList = {};
  for (let i = 0; i < clothes.length; i++) {
    const clotheInfo = clothes[i];
    if (!clotheList[clotheInfo[1]]) {
      clotheList[clotheInfo[1]] = [];
    }
    clotheList[clotheInfo[1]].push(clotheInfo[0]);
  }
```

먼저 clothes를 입력을 받고, 정리된 clothes를 저장할 clotheList를 만듭니다.

이후 입력받은 `clothes.length` 를 기준으로 반복을 해줍니다.



이때, 각 clothe의 정보를 `clotheInfo`에 저장하고, `clotheList` 에 clothes type key값으로 배열에 push합니다.

만일 key값이 없다면 빈배열을 할당해줍니다.



이 과정을 거치게 되면 다음과 같은 object가 생성됩니다

```json
{
  headgear: [ 'yellowhat', 'green_turban' ],
  eyewear: [ 'bluesunglasses' ],
  face: [ 'crow_mask', 'blue_sunglasses', 'smoky_makeup' ]
}
```



이제 만들어진 object를 사용해서 답을 구해봅시다,.

```javascript
 for (const type in clotheList) {
    if (clotheList.hasOwnProperty(type)) {
      const items = clotheList[type];
      answer = answer * (items.length + 1);
    }
  }
  return answer - 1;
}
```

object의 key를 기준으로 loop를 해주면서 answer에 값을 곱해줍니다.

이때, **안입는것을 포함한 수를 곱해주는게 포인트 입니다.**



`answer = answer * (items.length + 1);`  이 부분이 옷의 종류의 개수 + 안입는 경우 를 해준다음에 기존의 경우의 수와 곱해서 

총 경우의 수를 구하는 부분입니다.

`return answer - 1;` 이후에 모두 안입는 경우를 제외시켜서 답을 구합니다.



----

## 후기

옷을 안입는것을 추가 한다는 발상의 전환이 필요했던 문제였습니다.

사실 이 발상만 할수 있다면 쉽게 풀수 있는 문제 같습니다.



----

# 프로그래머스[lv.3] [힙] - 디스크 컨트롤러

###### 문제 설명

하드디스크는 한 번에 하나의 작업만 수행할 수 있습니다. 디스크 컨트롤러를 구현하는 방법은 여러 가지가 있습니다. 가장 일반적인 방법은 요청이 들어온 순서대로 처리하는 것입니다.

예를들어

```
- 0ms 시점에 3ms가 소요되는 A작업 요청
- 1ms 시점에 9ms가 소요되는 B작업 요청
- 2ms 시점에 6ms가 소요되는 C작업 요청
```

와 같은 요청이 들어왔습니다. 이를 그림으로 표현하면 아래와 같습니다.
![Screen Shot 2018-09-13 at 6.34.58 PM.png](https://grepp-programmers.s3.amazonaws.com/files/production/b68eb5cec6/38dc6a53-2d21-4c72-90ac-f059729c51d5.png)

한 번에 하나의 요청만을 수행할 수 있기 때문에 각각의 작업을 요청받은 순서대로 처리하면 다음과 같이 처리 됩니다.
![Screen Shot 2018-09-13 at 6.38.52 PM.png](https://grepp-programmers.s3.amazonaws.com/files/production/5e677b4646/90b91fde-cac4-42c1-98b8-8f8431c52dcf.png)

```
- A: 3ms 시점에 작업 완료 (요청에서 종료까지 : 3ms)
- B: 1ms부터 대기하다가, 3ms 시점에 작업을 시작해서 12ms 시점에 작업 완료(요청에서 종료까지 : 11ms)
- C: 2ms부터 대기하다가, 12ms 시점에 작업을 시작해서 18ms 시점에 작업 완료(요청에서 종료까지 : 16ms)
```

이 때 각 작업의 요청부터 종료까지 걸린 시간의 평균은 10ms(= (3 + 11 + 16) / 3)가 됩니다.

하지만 A → C → B 순서대로 처리하면
![Screen Shot 2018-09-13 at 6.41.42 PM.png](https://grepp-programmers.s3.amazonaws.com/files/production/9eb7c5a6f1/a6cff04d-86bb-4b5b-98bf-6359158940ac.png)

```
- A: 3ms 시점에 작업 완료(요청에서 종료까지 : 3ms)
- C: 2ms부터 대기하다가, 3ms 시점에 작업을 시작해서 9ms 시점에 작업 완료(요청에서 종료까지 : 7ms)
- B: 1ms부터 대기하다가, 9ms 시점에 작업을 시작해서 18ms 시점에 작업 완료(요청에서 종료까지 : 17ms)
```

이렇게 A → C → B의 순서로 처리하면 각 작업의 요청부터 종료까지 걸린 시간의 평균은 9ms(= (3 + 7 + 17) / 3)가 됩니다.

각 작업에 대해 [작업이 요청되는 시점, 작업의 소요시간]을 담은 2차원 배열 jobs가 매개변수로 주어질 때, 작업의 요청부터 종료까지 걸린 시간의 평균을 가장 줄이는 방법으로 처리하면 평균이 얼마가 되는지 return 하도록 solution 함수를 작성해주세요. (단, 소수점 이하의 수는 버립니다)

##### 제한 사항

- jobs의 길이는 1 이상 500 이하입니다.
- jobs의 각 행은 하나의 작업에 대한 [작업이 요청되는 시점, 작업의 소요시간] 입니다.
- 각 작업에 대해 작업이 요청되는 시간은 0 이상 1,000 이하입니다.
- 각 작업에 대해 작업의 소요시간은 1 이상 1,000 이하입니다.
- 하드디스크가 작업을 수행하고 있지 않을 때에는 먼저 요청이 들어온 작업부터 처리합니다.

##### 입출력 예

| jobs                     | return |
| ------------------------ | ------ |
| [[0, 3], [1, 9], [2, 6]] | 9      |

##### 입출력 예 설명

문제에 주어진 예와 같습니다.

- 0ms 시점에 3ms 걸리는 작업 요청이 들어옵니다.
- 1ms 시점에 9ms 걸리는 작업 요청이 들어옵니다.
- 2ms 시점에 6ms 걸리는 작업 요청이 들어옵니다.

----

## 해결법

```javascript
function solution(jobs) {
  let processTime = 0;
  let totalReqTime = 0;
  const jobCount = jobs.length;
  while (jobs.length > 0) {
    jobs.sort((a, b) => {
      if(a[0] > processTime ) return 1
      if(b[0] > processTime ) return -1
      return a[1] - b[1];
    });
    if (jobs[0][0] > processTime) {
      processTime += 1;
      continue;
    }
    const thisJob = jobs.shift();
    processTime += thisJob[1]; 
    totalReqTime += processTime - thisJob[0];
  }
  return parseInt(totalReqTime / jobCount);
}	
```

이번에도 포인트 되는 문항을 먼저 한번 확인해 보겠습니다

> 하드디스크가 작업을 수행하고 있지 않을 때에는 먼저 요청이 들어온 작업부터 처리합니다.

이말은 만일에 작업의량이 많다 하더라도, 작업이 없는 상태라면 들어온것을 먼저 처리한다는 뜻입니다.



이제, 그러면 어떻게 하면 평균시간이 적게 걸릴지를 생각을 해봐야하는데, 위에 문제를 참고해보면

평균시간이 가장 적게 나올수 있는 방법은 `현재 시점에서 처리할수 있는 작업중에 작업소요시간이 가장 적은것을 먼저 처리` 하면 됩니다.

즉, **항상 정렬을해서 현재 시점에서 가장 작업시간이 적은것을 우선 처리하면 된다는 뜻입니다.**



그럼 이제 소스를 하나씩 분석하겠습니다.



```javascript
function solution(jobs) {
  let processTime = 0;
  let totalReqTime = 0;
  const jobCount = jobs.length;
  while (jobs.length > 0) {
```

먼저 processTime이라는 현재 진행시간을 나타낼 변수를 하나 선언합니다.

그리고 totalReqTime이라는 요청시간 (요청 도착시간부터 요청이 완료될때 까지 걸린시간의합) 을 저장할 변수도 선업합니다.

마지막으로 평균을 구할때 사용할 job의 갯수도 정의해줍니다.

그리고 while문을 사용해서, job이 전부 없어질때 까지 반복시켜 줍니다



```javascript
    jobs.sort((a, b) => {
      if(a[0] > processTime ) return 1
      if(b[0] > processTime ) return -1
      return a[1] - b[1];
    }); //정렬 알고리즘
```

여기에서 로직의 핵심적인 부분인 sort가 나옵니다.

먼저, a와 b를 비교하기 앞서서 현재 진행시간 보다 작업이 들어오는것이 나중이면,

무조건 뒤로 가도록 sort합니다.

그리고 현재 진행할수 있는 작업중에 소요시간이 **짧은 작업을 먼저 앞에 오도록 sort합니다**

위의 작업이 끝나게 된다면, 현재 진행할수 있는 작업이 있다면 배열의 앞순서로 오게되고,

그안에서 또다시 작업시간이 짧은 순대로 정렬하게됩니다.

```javascript
    if (jobs[0][0] > processTime) {
      processTime += 1;
      continue;
    }
    const thisJob = jobs.shift();
    processTime += thisJob[1]; //시간 흐름
    totalReqTime += processTime - thisJob[0];
  }
```

하지만 위와같이 항상 작업을 할수있는게 아닐수도 있기 때문에

가장 맨앞에 있는 작업이 지금 실행시킬수 없다면 시간을 1 증가시키고 다시 loop를 실행합니다.



아니라면, 작업의 맨앞의 배열을 shift해서 `thisJob`에 넣습니다.

이후 작업의 소요시간 만큼 시간이 지날것이기 때문에` processTime`에 더해주고

그리고 작업이 처음 입력받은 시간을 뺴서 작업이 처리될때 까지 걸린시간을 더해줍니다.

```javascript
  return parseInt(totalReqTime / jobCount);
}
```

이후 모든 loop가 끝나게 된다면, 작업의 총수를 나눈뒤, 소수점을 버립니다.

이로서 작업의 총 평균 소요시간을 구할수 있게됩니다



----

## 후기

힙문제지만, 힙을 사용하지 않고 sort로 풀었기에 이게 맞나 싶긴합니다;;

다음 힙 문제도 풀어보면서 다른 답은없는지 찾아봐야 겠습니다.