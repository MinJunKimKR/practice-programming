# 7:55 -> 8:20
# timeout
# 8:20 -> 틀림?!
# 8:26 [Success]
from collections import deque
import sys
sys_input = sys.stdin.readline

N = int(input())
graph = []
max_high = 0
vector = [(1, 0), (-1, 0), (0, 1), (0, -1)]
for _ in range(N):
    row = list(map(int, sys_input().strip().split()))
    max_row = max(row)
    max_high = max(max_high, max_row)
    graph.append(row)
max_safe = 0


def bfs(i, j):
    q = deque([])
    q.append((i, j))
    while q:
        x, y = q.popleft()
        if visited[x][y]:
            continue
        visited[x][y] = True
        for vec in vector:
            nx = x+vec[0]
            ny = y + vec[1]
            if 0 <= nx < N and 0 <= ny < N and not visited[nx][ny] and graph[nx][ny] > high:
                q.append((nx, ny))


for high in range(101):
    if high > max_high:
        break
    visited = [[False] * N for _ in range(N)]
    cnt_safe = 0
    for i in range(N):
        for j in range(N):
            if graph[i][j] > high and not visited[i][j]:
                bfs(i, j)
                cnt_safe += 1
    max_safe = max(max_safe, cnt_safe)
print(max_safe)

# 2
# 100 1
# 1 100


# 2
# 100 100
# 100 100

# 2
# 1 1
# 1 1
