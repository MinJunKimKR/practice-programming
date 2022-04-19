import heapq
import sys
sys_input = sys.stdin.realine


n, m = map(int, sys_input().split())
start = int(input())
INF = int(1e9)
graph = [[0] * (n+1)]
dist = [[INF] * (n+1)]


for _ in range(m):
    a, b, c = map(int, sys_input().split())
    graph[a].append((b, c))


def di(start):
    hq = []
    heapq.heappush(hq, (0, start))
    dist[start] = 0
    while hq:
        cost, now = heapq.heappop(hq)
        if dist[now] < cost:
            continue
        dist[now] = cost
        for info in graph[now]:
            if cost+info[1] < dist[info[0]]:
                dist[info[0]] = cost+info[1]
                heapq.heappush(hq, (dist[info[0]], info[0]))


di(start)
