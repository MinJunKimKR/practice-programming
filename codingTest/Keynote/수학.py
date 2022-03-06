import sys
import math
from collections import Counter
# 제곱근 구하기
x = 15
print(int(math.sqrt(x)))  # sqrt는 root다

# 소수구하기 - 에레토스의 채
n = 1000

array = [True for _ in range(n+1)]

for i in range(2, int(math.sqrt(n))+1):
    if array[i] == True:
        j = 2
        while i*j <= n:
            array[i*j] = False
            j += 1

for i in range(n+1):
    if array[i]:
        print(i, end=' |')
print('======================')
# 최대 큰값만들기 int(1e9)와 같이
INF = sys.maxsize
print(INF)
print('======================')
# 2진법
bi = bin(42)
# 8진법
oc = oct(42)
# 16진법
he = hex(42)

# 10진법으로 다시 변화
print(int(bi, 2))
print(int(oc, 8))
print(int(he, 16))

print('======================')

# 가장 많은 수 찾기
arr = [1, 2, 3, 4, 5, 5, 5, 5, 4, 3, 2, 1, 3, 4]
val = Counter(arr).most_common()

print(val)  # [(5, 4), (3, 3), (4, 3), (1, 2), (2, 2)]
