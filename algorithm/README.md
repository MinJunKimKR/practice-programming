

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

![프링글스 이미지 검색결과](https://lh3.googleusercontent.com/proxy/eRuf6SKoBPc9rmZ90c8LPBDt3G5rnMwYYPv3oA0egM-pGtdpJS8AGgPTWMp1eDUTTBpIV-tS_qWcEmWk7leeP9NtSHpQslthyRURKdmOapl_VMoiyto)

위에는 뚫려있고, 위에서 부터 가져올수 있으며 반대로는 뺄수없는 형태를 **스택구조** 라고합니다

이것을 **FILO**(First In Las Out) 혹은 **LIFO**(Last In First Out) 혹은 **선입선출** 이라고 합니다



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