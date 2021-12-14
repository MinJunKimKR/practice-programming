# Class4

## 선택정렬

- 남아있는 데이터의 전체를 검색하여 가장 작은 데이터를 맨앞으로 보내면 된다.
- 시간복잡도는 `O(N^2)`이다.

```
ARRAY = [1, 4, 2, 3, 7, 8, 5, 9, 1, 6]


def sort(array):
    for startIndex in range(len(array)):
        minIndex = startIndex
        for i in range(startIndex, len(array)):
            if array[minIndex] > array[i]:
                minIndex = i
        array[minIndex], array[startIndex] = array[startIndex], array[minIndex]
    return array

print(sort(ARRAY))

```

## 삽입정렬

- 처리되지 않는 데이터를 하나씩 골라 적절한 위치에 삽입합니다
- 선택보다 효율이 좋지만 수현이 조금 더 어렵다
- 앞의 데이터들은 '정렬이 되어있다' 라고 판단하고, 두번째 데이터부터 기준이 되는 앞의 데이터들의 앞으로 들어가거나 뒤로 들어가거나 두가지 경우만 존재한다.
- 시간복잡도는 O(N^2)입니다.
  - 다만, 선택정렬과 다른점은 현재의 데이터가 거의 정렬되어 있는 상태라면, 최선의 경우 O(N)을 가집니다.
  - 이유는, 항상 2번째 for문에서 break가 실행될것이기 때문입니다

```
ARRAY = [1, 4, 2, 3, 7, 8, 5, 9, 1, 6]


def sort(array):
    for i in range(len(array)):
        for j in range(i, 0, -1):
            if array[j] < array[j-1]:
                array[j], array[j-1] = array[j-1], array[j]
            else:
                break
    return array


print(sort(ARRAY))

```

- 즉, i를 기점으로 왼쪽이 정렬하는 영역, 오른쪽이 비 정렬 영역으로 다룹니다
- i 한개씩 증가시킵니다.
- j는 i를 시작으로 0이될때까지 반복을 합니다. 이 뜻은, i의 정렬되어 있는 영역을 역순으로 확인하는것이라고 생각하면됩니다.
- j를 기준으로, 자신의 왼쪽에 있는게 자신보다 크다면, 위치를 바꿉니다. 이것은 원래의 위치를 밀어내고 끼워넣는것으로 이미지 하시면 좋습니다.
- 이것을 반복하다 어느순간, 자신이 왼쪽의 값보다 크다면, 바로 그곳이 j의 값이 있을곳이기 때문에 break로 빠져나옵니다.

## 퀵정렬

- 기준 데이터를 설정하고 그 기준보다 큰 데이터와 작은 데이터의 위치를 바꾸는것
- 가장 많이 사용되는 정렬 알고리즘중 하나
- 병합정렬과 더불어 대부분의 프로그래밍 언어의 정렬 라이브러리 근간이 되는 알고리즘
- 시간복잡도는 `O(NlogN)`이다. 최악의 경우는 `O(N^2)`이다

###

- 가장 기본적인 퀵 정렬은 첫 번째 데이터를 기준 데이터로 설정한다
- 왼쪽에서는 피봇 값보다 큰 값이 선택이 되고, 오른쪽에서는 작은 값이 선택이 된다.
- 이때, 큰값의 위치와 작은값의 위치가 바뀌게 되면, 피봇의 수와 작은값과 자리를 바꿔준다
- 이렇게 진행을 하게되면, 피복값을 기준으로 왼쪽은 다 작은값, 오른쪽은 다 큰값이 된다.
- 이런식으로 2부분으로 나눈뒤에 그룹별로 다시한번 정렬을 반복한다

```
def quickSort(array, startIdx, endIdx):
    if startIdx > endIdx:
        return
    pivot = startIdx
    left = startIdx+1
    right = endIdx
    while left <= right:
        while array[left] <= array[pivot] and left < endIdx:
            left += 1
        while array[right] >= array[pivot] and right > startIdx:
            right -= 1
        if right > left:
            array[right], array[left] = array[left],  array[right]
        else:
            array[right], array[pivot] = array[pivot],  array[right]
    quickSort(array, pivot, right-1)
    quickSort(array, right+1, endIdx)


quickSort(array, 0, len(array)-1)
print(array)
```

- 먼저 퀵솔트에서 입력된 시작 인덱스와 끝인덱스가 엇갈려 있는지를 확인하고 맞다면 return을 시킵니다.
- `pivot`을 startIdx로 넣어서 기준위치로 합니다
- `left`, `right`를 지정해서 배열내에서 서치합니다.
- 그리고 while을 엇갈리기 전까지 반복합니다.
  - left에서 pivot보다 큰값을 찾을때까지 반복합니다
  - right에서 pivot보다 작은 값을 찾을때 까지 반복합니다.
  - 이때, 엇갈리지 않았다면 left값과 right값을 바뀝니다
  - 만일, 엇갈렸다면 right와 pivot을 바꿔주고 while을 종료합니다
- pivot을 기준으로 왼쪽배열과 오른쪽배열을 재귀로 반복시켜줍니다.

### 파이썬의 특성을 살린 간결한 방식

위의 코드를 파이썬의 특성을 살려서 더욱더 간결하게 작성이 가능합니다

```
def quickSortShort(array):
    if len(array) <= 1:
        return array
    pivot = array[0]
    tail = array[1:]

    left = [x for x in tail if x <= pivot]
    right = [x for x in tail if x > pivot]

    return quickSortShort(left) + [pivot] + quickSortShort(right)

print(quickSortShort(array))

```

- 퀵정렬의 로직은 기본적으로 배열의 중앙에 기준이 되는 값을 두고, 왼쪽은 작은값 오른쪽은 큰값을
  몰아둡니다.
- 그리고 왼쪽과 오른쪽을 다시 반복해서 기준값을 정하고 위의 로직을 반복하는것이 퀵 정렬의 로직입니다.
- 따라서, 파이썬의 언어의 특징을 살려서 왼쪽값, 오른쪽 값을 각 배열로 만들고, 그 배열을 다시 반복해서
  정렬하는 방식으로 처리할수 있습니다.

## 계수 정렬

- 특정 조건이 부합할떄만 사용할수 있지만 **매우 빠르게 동작하는** 정렬 알고리즘 입니다.
  - 데이터의 크기 범위가 제한되어 정수 형태로 표현할수 있을때 사용가능 합니다.
- 데이터의 개수가 N, 데이터(양수)중 최댓값이 K일때 최악의 경우에도 수행시간 `O(N+K)`를 보장합니다.
- 하지만 때에 따라 심각한 비효율성을 초래할수 있다 (ex : 0, 999,999 이렇게 2개의 값만 가지고 있다면?)
- 계수 정렬은 동일한 값이 여러개 일때 효과적
  - 성적의 경우 100점이 여러명일수도 있기 때문에 계수정렬이 유의미하다

```
array = [1, 2, 8, 0, 4, 3, 2, 5, 7, 9, 8, 1, 6]

countingArray = [0] * (max(array) + 1)

sortArray = []

for i in array:
    countingArray[i] += 1

for i in range(len(countingArray)):
    for _ in range(countingArray[i]):
        sortArray.append(i)

print(sortArray)

```

## 정렬 알고리즘

표준 정렬 라이브러리는 최악의 경우에도 `O(NlogN)`을 보장하도록 설계되어 있다.

# Class 5

## Parametric Search

최적화 문제를 결정문제(예,아니오)로 바꾸어서 해결하는 기법
특정 조건을 가장 알맞은 값을 빠르게 찾는 최적화 문제

일반적은 코딩테스트에서 파라메트릭 서치 문제는 이진탐색을 이용하여 해결할수 있음
-> 떡볶이 썰기 문제

# Class 6

## LIS

가장긴 증가하는 부분수열의 점화식은 다음과 같다
`모든 0<=j<i에 대하여, D[i] = max(D[i], D[j] +1) if array[j] < array [i]`
최악의 경우 시간복잡도는 `0(N^2)`이다
