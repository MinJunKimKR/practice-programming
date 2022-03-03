# 5:53 -> 6:23
# 6:03[success]
from collections import deque

A = int(input())
N = int(input())

graph = [[] for _ in range(A+1)]
visited = [False] * (A+1)

q = deque([1])

for _ in range(N):
    a, b = map(int, input().split())
    graph[a].append(b)
    graph[b].append(a)

cnt_vi = 0
while q:
    node = q.popleft()
    if visited[node]:
        continue
    visited[node] = True
    cnt_vi += 1

    for conn in graph[node]:
        if visited[conn]:
            continue
        q.append(conn)
print(cnt_vi-1)
