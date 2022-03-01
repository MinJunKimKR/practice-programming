# from itertools import permutations

# N, M = map(int, input().split())

# arr = [x for x in range(1, N+1)]

# per_arr = list(permutations(arr, M))
# per_arr = sorted(per_arr)

# for nums in per_arr:
#     for num in nums:
#         print(num, end=' ')
#     print()

from collections import deque

N, M = map(int, input().split())
arr = deque([str(x) for x in range(1, N+1)])


def dfs(this_arr, left_arr):
    if len(this_arr) == M:
        print(' '.join(this_arr))
        return
    loop = len(left_arr)
    for _ in range(loop):
        this_arr.append(left_arr.popleft())
        dfs(this_arr, deque(sorted(left_arr)))
        left_arr.append(this_arr.pop())


dfs([], arr)
