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
