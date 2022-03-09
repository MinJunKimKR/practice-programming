from collections import deque
from bisect import bisect_left, bisect_right
from functools import cmp_to_key
# 이중배열 선언
n = 4
m = 3

arr2d = [[0] * m for _ in range(n)]  # 변수의 값을 무시하고자 할때 _를 쓴다

print('======================')
# 배열 사이의 요소의 개수를 찾을때 사용
a = [1, 2, 4, 4, 5, 5, 6]
x = 4

print(bisect_left(a, x))
print(bisect_right(a, x))
print(bisect_right(a, x) - bisect_left(a, x))  # 요소의 개수


print('======================')
# ===========[배열 정렬 기준]===========

# 2가지 기준으로 정렬
arr = [[1, 2], [1, 4], [3, 4], [2, 4]]
arr.sort(key=lambda x: (x[0], x[1]))
print(arr)


def sortRule(a, b):
    # 앞으로 보내고 싶으면 (양수 리턴)
    # 뒤로 보내고 싶으면 (음수 리턴)
    # 그 자리에 있게하고 싶으면 (0 리턴)
    if a > b:
        return -1
    elif b > a:
        return 1
    else:
        return 0
    # return a-b > b-1


numbers = [1, 2, 3, 4, 3, 2]
numbers = sorted(numbers, key=cmp_to_key(sortRule), reverse=True)
print(numbers)


print('======================')
# zip함수 사용법
numbers = [1, 2, 3]
letters = ["A", "B", "C"]
for pair in zip(numbers, letters):
    print(pair)

for num, letter in zip(numbers, letters):
    print(num, letter)
# zip으로 2개의 배열을 딕처너리로 만들기
print(dict(zip(numbers, letters)))

print('======================')

# 배열 중간값 pop
arr = [1, 2, 3, 4, 5]
print(arr.pop(2))
print(arr)  # [1, 2, 4, 5]
# 중간에 값 입력
arr.insert(2, 100)
print(arr)  # [1, 2, 100, 4, 5]
# index로 삭제
del arr[2]
print(arr)  # [1, 2, 4, 5]
# 값으로 삭제
arr.remove(5)
print(arr)  # [1, 2, 4]

print(7 in arr)  # 배열내의 값 포함

print('======================')
# 중복제거
arr = [1, 1, 2, 3, 4, 5, 5, 6, 7]
print(list(set(arr)))  # [1, 2, 3, 4, 5, 6, 7]
# 이증배열 중복 제거
# [(1, 2, 3, 4), (1, 2), (1, 2, 2, 4)]
arr = [[1, 2], [1, 2], [1, 2, 3, 4], [1, 2, 2, 4]]
print(list(set(map(tuple, arr))))


print('======================')

# 덱 회전
deq = deque([1, 2, 3, 4, 5, 6])
deq.rotate(-1)  # 회전
print(deq)
