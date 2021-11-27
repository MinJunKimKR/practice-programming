import math
from collections import Counter
from itertools import permutations
import sys
a = 5
b = 5

print(a+b)
print(a ** 2)

a = 10
b = 3
print(a % b)
print(a//b)

a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
a[0] = 'a'
print(a)
print(a[0])
print(a[0:3])
print(a[-2])

arr = [i for i in range(10)]
print(arr)

n = 10
a = [0] * n
print(a)

a = {"a": 1, "b": 1, "c": 1}
print(a)
print(a['a'])

for i in a:
    print(a[i])

arr = [i for i in range(20) if i % 2 == 0]
print(arr)

arr = [i * i for i in range(1, 10)]
print(arr)

n = 4
m = 3

arr2d = [[0] * m for _ in range(n)]  # 변수의 값을 무시하고자 할때 _를 쓴다

print(arr2d)

testArr = [i for i in range(5)]
testArr.append(9)
print(testArr)
testArr.reverse()
print(testArr)
testArr.sort()
print(testArr)
testArr.sort(reverse=True)
testArr.remove(1)
print(testArr)

c = [1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 5]
removeSet = {1, 3}

result = [i for i in c if i not in removeSet]
print(result)

# 사전자료형
data = dict()
data['app'] = 'aa'
data['vv'] = 'vv'
print(data)


# 집합자료형 -> 중복을 허용하지않음
data2 = {}
data2['a'] = 10
data2['a'] = 10
data2['a'] = 120
data2['a'] = 10
print(data2)

n = int(input())
data = list(map(int, input().split()))
data = list(map(int, sys.stdin.readline().rstrip().split()))

# print(n)
print(data)

score = int(sys.stdin.readline().rstrip())

print(score)

if score > 90:
    print('90')
elif score > 80:
    print('80')
else:
    print('')

arr = [1, 2, 3, 4]

isIn = 1 in arr

print(isIn)

for i in range(0, 10):
    print(i)


def printWithbar(text):
    return print(str(text) + '-------')


printWithbar('barrr')

studentList = [('aaaa', 50), ('bbb', 11), ('cccc', 77), ('11321321', 3)]


def myKey(x):
    return x[1]


test1 = sorted(studentList, key=lambda x: x[1])
test2 = sorted(studentList, key=myKey)

print(studentList)
print(test1)
print(test2)

teArr1 = [1, 2, 3, 4]
teArr2 = [3, 3, 3, 4]
teArr3 = [4, 2, 4, 4]

print(list(map(lambda a, b, c: a+b+c, teArr1, teArr2, teArr3)))

# itertools : 반복되는 형태의 데이터 처리를 위한 기능 -> 순열과 조합 라이브러리 많이사용 -> 완전탐색에서사용

data = ['A', 'B', 'C']

result = list(permutations(data, 3))
print(result)

strResult = []

for i in result:
    strResult.append(''.join(i))
print(strResult)


strResult2 = list(map(lambda x: ''.join(x), result))
print(strResult2)
# heapq : 힙자료구조 제공 -> 우선순위큐 기능 구현을 위해사용 -> 최단경로 알고리즘에서 사용
# bisect : 이진탐색 기능제공
# collections :덱, 카운터등 자료구조 제공

counter = Counter(['a', 'b', 'c', 'd', 'a', 'b', 'a'])

print(counter)
print(counter['a'])
print(dict(counter))

# math : 필수적인 수학적 기능제공 -> 팩토리얼, 제곱근, 최대공약수 등등


def lcm(a, b):
    return a * b // math.gcd(a, b)


a = 4
b = 20

print(math.gcd(a, b))
print(lcm(10, 20))
