# 1:38-> 2:08
# TODO: dfs로 다시 풀어보기
from collections import deque
from itertools import permutations, combinations

N, M = map(int, input().split())
arr = [x for x in range(1, N+1)]

arr1 = list(permutations(arr, M))
arr2 = list(combinations(arr, M))

for nums in arr2:
    for num in nums:
        print(num, end=' ')
    print()

memory = [[] for _ in range(N+1)]
# memory = []

# n, m = list(map(int, input().split()))
# s = []


# def dfs(start):
#     if len(s) == m:
#         print(' '.join(map(str, s)))
#         return

#     for i in range(start, n+1):
#         if i not in s:
#             s.append(i)
#             dfs(i+1)
#             s.pop()


# dfs(1)
