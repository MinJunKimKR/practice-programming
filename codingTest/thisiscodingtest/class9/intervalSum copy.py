# n = 5
# data = [10, 20, 30, 40, 50]


# prefix_sum = [0]
# total = 0
# for i in range(n):
#     total += data[i]
#     prefix_sum.append(total)

# left = 3
# right = 4

# print(prefix_sum[right] - prefix_sum[left-1])

# import copy
# from collections import deque
# N, K = map(int, input().split())

# arr = [x for x in range(1, N+1)]

# now_q = deque(arr)
# next_q = deque([])
# result = []
# print('<', end='')
# for _ in range(N):
#     for _ in range(K-1):
#         if len(now_q) == 0:
#             now_q = deque(next_q)
#             next_q = deque([])
#         next_q.append(now_q.popleft())
#     if len(now_q) == 0:
#         result.append(str(next_q.popleft()))
#     else:
#         result.append(str(now_q.popleft()))
# print(', '.join(result), end='')

# print('>', end='')


arr = [1, 2, 3, 5, 6]

print(arr.pop(2))

print(arr)
print(arr)
