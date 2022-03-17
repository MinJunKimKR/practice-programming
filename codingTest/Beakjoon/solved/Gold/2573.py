# 1:09 -> 1:50
# 2:02 [헤멧지만 success]
from collections import deque
import sys
sys_input = sys.stdin.readline
N, M = map(int, input().split())
graph = []
for _ in range(N):
    graph.append(list(map(int, sys_input().strip().split())))

vector = [(1, 0), (-1, 0), (0, 1), (0, -1)]


def bfs(i, j):
    q = deque([])
    q.append((i, j))
    while q:
        x, y = q.popleft()
        if visited[x][y]:
            continue
        visited[x][y] = True
        for vec in vector:
            nx = x + vec[0]
            ny = y + vec[1]
            if 0 <= nx < N and 0 <= ny < M:
                if graph[nx][ny] == 0 and graph[x][y] > 0 and not visited[nx][ny]:
                    graph[x][y] -= 1
                    # melt_arr.append((x, y))
                else:
                    if graph[nx][ny] > 0 and not visited[nx][ny]:
                        q.append((nx, ny))


year = 0
while True:
    visited = [[False]*M for _ in range(N)]
    # melt_arr = []
    cnt_ice = 0
    for i in range(N):
        for j in range(M):
            if graph[i][j] > 0 and not visited[i][j]:
                cnt_ice += 1
                if cnt_ice > 1:
                    print(year)
                    exit(0)
                bfs(i, j)
    if cnt_ice == 0:
        print(0)
        exit(0)
    year += 1
# 2 2
# 0 0
# 0 0

# 4 4
# 0 0 0 0
# 0 10 1 0
# 0 1 1 0
# 0 0 0 0

# 4 4
# 0 0 0 0
# 0 1 10 0
# 0 10 1 0
# 0 0 0 0


# 5 6
# 0 0 0 0 0 0
# 0 8 2 2 0 0
# 0 2 1 2 0 0
# 0 2 2 8 0 0
# 0 0 0 0 0 0

# 5 6
# 0 0 0 0 0 0
# 0 9 3 3 0 0
# 0 3 1 3 0 0
# 0 3 3 9 0 0
# 0 0 0 0 0 0
