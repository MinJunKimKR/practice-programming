# 6:50 -> 7:50 [7:39]
# Success
import sys
import heapq

sys.stdin = open(
    '/Users/minjunkim/Documents/Programming/practice-programming/algorithm/thisiscodingtest/class7/telegram.txt', 'r')

N, M, C = map(int, input().split())
INF = int(1e9)

distance = [INF] * (N+1)
graph = [[] for _ in range(N+1)]

for _ in range(M):
    X, Y, Z = map(int, input().split())
    graph[X].append((Y, Z))


def dijkstraHeap(start):
    queue = []
    heapq.heappush(queue, (0, start))
    distance[start] = 0
    while queue:
        dist, now = heapq.heappop(queue)
        if dist > distance[now]:
            continue
        for i in graph[now]:
            cost = i[1] + dist
            distance[i[0]] = min(distance[i[0]], cost)
            if distance[i[0]] == cost:
                heapq.heappush(queue, (cost, i[0]))


dijkstraHeap(C)

maxTime, cities = 0, 0

for i in range(1, len(distance)):
    if distance[i] is not INF:
        cities += 1
        maxTime = max(maxTime, distance[i])
print(cities-1, maxTime)
pass


# graph = [INF] * (N+1)
# visited = [False] * (N+1)  # 다익스트라 큐 알고리즘에서는 visited가 필요없다.
# line = [[] for _ in range(N+1)]
# queue = []

# visitedCities, totalTime = 0, 0

# for _ in range(M):
#     X, Y, Z = map(int, input().split())
#     line[X].append((Y, Z))
# graph[C] = 0
# heapq.heappush(queue, (C, 0))

# while queue:
#     # queue에서 하나를 뽑아낸다.
#     city, cost = heapq.heappop(queue)
#     if visited[city]:
#         continue
#     for i in line[city]:
#         # total cost로 뽑는게 나앗을꺼같다
#         if cost+i[1] < graph[i[0]]:
#             graph[i[0]] = cost+i[1]
#             heapq.heappush(queue, (i[0], cost+i[1]))

# for i in range(1, len(graph)):
#     if graph[i] != INF and i is not C:
#         visitedCities += 1
#         if totalTime < graph[i]:  # max함수를 써서 간단하게 표현이 가능하다
#             totalTime = graph[i]
# print(f'{visitedCities} {totalTime}')
