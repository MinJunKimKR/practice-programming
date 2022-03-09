# 5:15 -> 5:35
# 5:35 [success]
from collections import deque
import sys
sys_input = sys.stdin.readline

N, M = map(int, input().split())

graph = []
vector = [(1, 0), (-1, 0), (0, -1), (0, 1)]

for _ in range(N):
    graph.append(list(map(int, list(sys_input().strip()))))

q = deque([(0, 0, 1)])

while q:
    x, y, cnt = q.popleft()
    if graph[x][y] > 1:
        continue
    graph[x][y] = cnt
    for vec in vector:
        nx = x+vec[0]
        ny = y+vec[1]

        if 0 <= nx < N and 0 <= ny < M and graph[nx][ny] == 1:
            q.append((nx, ny, cnt+1))

print(graph[N-1][M-1])
