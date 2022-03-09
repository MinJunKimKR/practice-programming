# 11:54 -> 12:24
import heapq
import sys
sys_input = sys.stdin.readline

N, M, C = map(int, sys_input().strip().split())
INF = int(1e9)
graph = [[] for _ in range(N+1)]
distance = [INF] * (N+1)
hq = []

for _ in range(M):
    a, b, c = map(int, sys_input().strip().split())
    graph[a].append((b, c))


def di(start):
    heapq.heappush(hq, (start, 0))

    while hq:
        now, dist = heapq.heappop(hq)
        if distance[now] < dist:
            continue
        distance[now] = dist

        for i in graph[now]:
            cost = distance[now] + i[1]
            if cost < distance[i[0]]:
                heapq.heappush(hq, (i[0], cost))


di(C)

cnt_city = 0
max_time = 0
for i in distance:
    if 0 < i < INF:
        cnt_city += 1
        max_time = max(max_time, i)

print(cnt_city, max_time)
