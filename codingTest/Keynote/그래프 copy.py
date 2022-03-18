import heapq
import sys
sys_input = sys.stdin.readline

n, m = map(int, sys_input().split())
start = int(input())
INF = int(1e9)
graph = [[] for _ in range(m+1)]
dist = [[INF] * (n+1)]

for _ in range(m):
    a, b, c = map(int, sys_input().strip().split())
    graph[a].append((b, c))


def di(start):
    q = []

    heapq.heappush(q, (0, start))

    while q:
        cost, node = heapq.heappop(q)
        if cost > dist[node]:
            continue
        dist[node] = cost
        for info in graph[node]:
            n_node, n_dist = info[0], info[1]
            if dist[n_node] > n_dist+cost:
                dist[n_node] = n_dist+cost
                heapq.heappush(q, (n_dist, n_node))


di(start)

for t_dist in range(1, n+1):
    if t_dist == INF:
        print('INF')
    else:
        print(t_dist)
