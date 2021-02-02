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





