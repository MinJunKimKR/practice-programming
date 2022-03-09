import heapq

import sys
sys_input = sys.stdin.readline
INF = int(1e9)


n, m = map(int, sys_input().split())
start = int(input())

graph = [[] for i in range(n+1)]
distance = [INF] * (n+1)


for _ in range(m):
    a, b, c = map(int, sys_input().split())
    graph[a].append((b, c))


def di(start):
    q = []
    heapq.heappush(q, (0, start))
    distance[start] = 0
    while q:
        dist, now = heapq.heappop(q)
        if distance[now] < dist:
            continue
        distance[now] = dist
        for i in graph[now]:
            cost = dist+i[1]
            if cost < distance[i[0]]:
                distance[i[0]] = cost
                heapq.heappush(q, (cost, i[0]))


di(start)

for i in range(1, n+1):
    if distance[i] == INF:
        print('infinity')
    else:
        print(distance[i])
