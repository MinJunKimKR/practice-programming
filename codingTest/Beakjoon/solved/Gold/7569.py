# 7:17 -> 7:57
# pause 38 -> left 20min
# retry : [Time Off] 8:26-> 8:45
# 9:18
# TODO : retry
from collections import deque
import sys
sys_input = sys.stdin.readline

M, N, H = map(int, input().split())

graph = []
vector = [(1, 0, 0), (-1, 0, 0), (0, 1, 0), (0, -1, 0), (0, 0, 1), (0, 0, -1)]

day = -1

for _ in range(H):
    arr = []
    for _ in range(N):
        row = list(map(int, sys_input().strip().split()))
        arr.append(row)
    graph.append(arr)

q = deque([])

for z in range(H):
    for x in range(N):
        for y in range(M):
            if graph[z][x][y] == 1:
                q.append((z, x, y))

while q:
    z, x, y = q.popleft()
    for vec in vector:
        nz = z + vec[0]
        nx = x + vec[1]
        ny = y + vec[2]
        if 0 <= nz < H and 0 <= nx < N and 0 <= ny < M:
            if graph[nz][nx][ny] != 0:
                continue
            graph[nz][nx][ny] = graph[z][x][y]+1
            q.append((nz, nx, ny))

result = -1
for z in range(H):
    for x in range(N):
        for y in range(M):
            if graph[z][x][y] == 0:
                print(-1)
                exit(0)
            result = max(result, graph[z][x][y])

print(result-1)

# if zero_cnt == 0:
#     print(0)
#     exit(0)

# def bfs(x, y, z, day):
#     global graph, zero_cnt
#     q = deque([(x, y, z)])

#     while q:
#         x, y, z = q.popleft()
#         if graph[z][x][y] != day:
#             continue
#         graph[z][x][y] = -1
#         for vec in vector:
#             nz = z + vec[0]
#             nx = x + vec[1]
#             ny = y + vec[2]
#             if 0 <= nz < H and 0 <= nx < N and 0 <= ny < M:
#                 if graph[nz][nx][ny] == day:
#                     q.append((nx, ny, nz))
#                 if graph[nz][nx][ny] == 0:
#                     graph[nz][nx][ny] = day+1
#                     zero_cnt -= 1
#                     if zero_cnt == 0:
#                         print(day)
#                         exit(0)

# while True:
#     imposi = True
#     for z in range(H):
#         for x in range(N):
#             for y in range(M):
#                 if graph[z][x][y] == day:
#                     imposi = False
#                     bfs(x, y, z, day)
#     day += 1
#     if imposi:
#         if zero_cnt > 0:
#             print(-1)
#             exit(0)
