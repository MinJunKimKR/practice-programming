# 6:15 -> 6:45
# 6:27 [success]
from collections import deque
import sys
sys_input = sys.stdin.readline

N = int(input())

start, to = map(int, input().split())

M = int(input())

graph = [[] for _ in range(N+1)]
visited = [False] * (N+1)

for _ in range(M):
    x, y = map(int, sys_input().strip().split())
    graph[x].append(y)
    graph[y].append(x)

q = deque([(start, 0)])

while q:
    person, chon = q.popleft()
    if visited[person]:
        continue
    if person == to:
        print(chon)
        exit(0)
    visited[person] = True
    chon += 1
    for fam in graph[person]:
        if visited[fam]:
            continue
        q.append((fam, chon))
print(-1)
