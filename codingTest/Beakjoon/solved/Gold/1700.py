# 9:57 -> 10:35
# 10:35 -> [FAIL]
# retry 10:52-> GG
# retry 12:30-> GG [최초 접근 자체가 잘못됬다. 다음 사용 순서가 먼 순서대로 제거하고, 앞으로 사용되지 않는다면 우선 제거 되도록 했어야헀다.]
# 1:12 [success]
# TODO: retry
# TODO: write
N, K = map(int, input().split())
items = list(map(int, input().split()))

tap = []
cnt_change = 0

for i in range(K):
    item = items[i]
    if item in tap:
        continue
    if len(tap) < N:
        tap.append(item)
        continue
    next_idx = []
    for j in range(N):
        try:
            idx = items[i:].index(tap[j])
        except:
            idx = 101
        next_idx.append(idx)
    out_idx = next_idx.index(max(next_idx))
    del tap[out_idx]
    tap.append(item)
    cnt_change += 1
print(cnt_change)
# gready = Counter(items)
# for item in items:
#     if in_tap[item]:
#         gready[item] -= 1
#         for i in range(N):
#             if tap[i][1] == item:
#                 greedy_num, item = tap.pop(i)
#                 heapq.heappush(tap, (gready[item], item))
#                 break
#         continue
#     if len(tap) >= N:
#         cnt, pop_item = heapq.heappop(tap)
#         in_tap[pop_item] = False
#         cnt_change += 1
#     gready[item] -= 1
#     heapq.heappush(tap, (gready[item], item))
#     in_tap[item] = True
# print(cnt_change)


# from collections import Counter
# N, K = map(int, input().split())
# items = list(map(int, input().split()))

# gready = Counter(items)
# in_tap = [False]*(K+1)
# dist_items = [0]*(K+1)
# tap = []
# cnt_change = 0

# for i in range(K):
#     dist_items[items[i]] += i

# for i in range(K):
#     item = items[i]
#     if len(tap) >= N and not in_tap[item]:
#         cnt, dist, pop_item = tap.pop()
#         in_tap[pop_item] = False
#         cnt_change += 1
#     if in_tap[item]:
#         continue
#     dist_items[item] -= i
#     in_tap[item] = True
#     tap.append((gready[item], dist_items[item], item))
#     tap.sort(key=lambda x: (-x[0], x[1]))
#     # if len(tap) >= N and not in_tap[item]:
#     #     cnt, item = heapq.heappop(tap)
#     #     in_tap[item] = False
#     #     cnt_change += 1

#     # heapq.heappush(tap, (gready[item], item))
#     # in_tap[item] = True
# print(cnt_change)


# 5 5
# 5 5 5 5 5

# 1 5
# 5 5 5 5 5

# 1 5
# 5 1 5 1 5

# 2 5
# 3 2 2 3 1 3 2

# 2 5
# 3 2 2 3 1 2 3

# 3 9
# 2 8 7 6 6 8 7 2 2

# 3 14
# 1 4 3 2 5 4 3 2 5 3 4 2 3 4
