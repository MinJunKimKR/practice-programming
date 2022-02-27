# 라이브러리 모음
# heapq : 힙자료구조 제공 -> 우선순위큐 기능 구현을 위해사용 -> 최단경로 알고리즘에서 사용
# bisect : 이진탐색 기능제공
# collections :덱, 카운터등 자료구조 제공
# math : 필수적인 수학적 기능제공 -> 팩토리얼, 제곱근, 최대공약수 등등

from functools import cmp_to_key
import math
from bisect import bisect_left, bisect_right
from collections import Counter
from itertools import cycle

# ===========[우선순위큐]===========
import heapq

scoville = [1, 2, 3, 7, 9, 10, 12]
heapq.heapify(scoville)
heapq.heappush(scoville, 2)
heapq.heappop(scoville)
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


def sortRule(a, b):
    # 크다 (양수 리턴)
    # 작다 (음수 리턴)
    # 같다 (0 리턴)
    return a-b > b-1


numbers = [1, 2, 3, 4, 3, 2]
numbers = sorted(numbers, key=cmp_to_key(sortRule), reverse=True)


# zip함수 사용법
numbers = [1, 2, 3]
letters = ["A", "B", "C"]
for pair in zip(numbers, letters):
    print(pair)

for num, letter in zip(numbers, letters):
    print(num, letter)
# zip으로 딕처너리로
print(dict(zip(numbers, letters)))
# ===========[반복문]===========
# 배열 2씩증가
for i in range(0, 10, 2):  # 0부터 2까지 증가시키며 10까지 반복
    print(i)

for i in enumerate(['A', 'B', 'C']):
    print(i)

for i, letter in enumerate(['A', 'B', 'C']):
    print(i, letter)

for i, letter in enumerate(['A', 'B', 'C'], start=1):
    print(i, letter)

# Cycle로 리스트 무한하게 늘리기
arr = [1, 2, 3, 4, 5]
infinityArr = cycle(arr)
print(len(arr))
for i in range(10):
    print(next(infinityArr), end='')


# ===========[수학]===========
# 제곱근 구하기
x = 15
print(int(math.sqrt(x)))

# 소수구하기 - 에레토스의 채
n = 1000

array = [True for _ in range(n+1)]

for i in range(2, int(math.sqrt(n))+1):
    if array[i] == True:
        j = 2
        while i*j <= n:
            array[i*j] = False
            j += 1

# ===========[문자열]===========

# 아스키 코드로 변환
n = ord('A')
print(n)

# 공백제거
ex_str = "                   hello         "
print(ex_str.strip())
# === [linked list]====


class Node:
    def __init__(self, data):
        self.data = data
        self.next = None


class SingleLinkedList:
    def __init__(self):
        dummy = Node('dummy')
        self.head = dummy
        self.tail = dummy

        self.current = None
        self.before = None
        self.size = 0

    def append(self, data):
        new_node = Node(data)
        if self.size == 0:
            self.head.next = new_node
        self.tail.next, self.tail = new_node, new_node
        self.size += 1

    def getAll(self):
        num = 0
        datas = []
        node = self.head
        while num < self.size:
            node = node.next
            datas.append(node.data)
            num += 1
        return datas

    def getByIndex(self, idx):
        if idx > self.size:
            return -1
        num = 0
        node = self.head
        while num < idx:
            node = node.next
            num += 1
        return node.data

    def insertByIdx(self, idx, data):
        new_node = Node(data)
        if idx > self.size or idx < 1:
            return -1
        num = 0
        node = self.head
        while num < idx-1:
            node = node.next
            num += 1
        next_node = node.next
        node.next = new_node
        new_node.next = next_node
        self.size += 1
        return 1

    def deleteByIdx(self, idx):
        if idx > self.size or idx < 1:
            return -1
        num = 0
        pre_node = self.head
        while num < idx-1:
            pre_node = pre_node.next
            num += 1
        next_node = pre_node.next
        next_node = next_node.next
        pre_node.next = next_node
        self.size -= 1
        return 1


# ll = SingleLinkedList()
# ll.append(1)
# ll.append(2)
# ll.append(3)

# print(ll.getAll())
# print(ll.getByIndex(2))
# print(ll.size)
# print(ll.insertByIdx(2, 10))
# print(ll.getByIndex(2))
# print(ll.getAll())
# print(ll.deleteByIdx(1))
# print(ll.getAll())
# print(ll.deleteByIdx(3))
# print(ll.getAll())
# print(ll.size)
