# 라이브러리 모음
# heapq : 힙자료구조 제공 -> 우선순위큐 기능 구현을 위해사용 -> 최단경로 알고리즘에서 사용
# bisect : 이진탐색 기능제공
# collections :덱, 카운터등 자료구조 제공
# math : 필수적인 수학적 기능제공 -> 팩토리얼, 제곱근, 최대공약수 등등

import math
from bisect import bisect_left, bisect_right
from collections import Counter
# ===========[해시]===========

print(Counter('hello world'))
print(Counter('hello world').most_common(2))  # 가장 수가 많은 글자 2개

# 배열의 차이만 떼어내기
participant = ["leo", "kiki", "eden"]
completion = ["eden", "kiki"]
answer = Counter(participant) - Counter(completion)
print(answer)
print(list(answer.keys())[0])

# ===========[배열]===========

# 이중배열 선언
n = 4
m = 3

arr2d = [[0] * m for _ in range(n)]  # 변수의 값을 무시하고자 할때 _를 쓴다

# 배열 자르기
S = ['1', '2', '3']
print(S[0:2])

# 배열 총합
N = [1, 2, 3, 4, 5]
print(sum(N))


# 배열 사이의 요소의 개수를 찾을때 사용
a = [1, 2, 4, 4, 5, 5, 6]
x = 4

print(bisect_left(a, x))
print(bisect_right(a, x))
print(bisect_right(a, x) - bisect_left(a, x))

# ===========[반복문]===========
# 배열 2씩증가
for i in range(0, 10, 2):  # 0부터 2까지 증가시키며 10까지 반복
    print(i)

# zip함수 사용법
numbers = [1, 2, 3]
letters = ["A", "B", "C"]
for pair in zip(numbers, letters):
    print(pair)

for num, letter in zip(numbers, letters):
    print(num, letter)
# zip으로 딕처너리로
print(dict(zip(numbers, letters)))
# ===========[수학]===========
# 제곱근 구하기
x = 15
print(int(math.sqrt(x)))
