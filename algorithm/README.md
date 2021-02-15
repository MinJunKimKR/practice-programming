

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









