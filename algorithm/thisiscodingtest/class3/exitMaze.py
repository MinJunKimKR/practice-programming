# 4:41 -> 5:11 [5:08]

import sys
from collections import deque
sys.stdin = open(
    '/Users/minjunkim/Documents/Programming/practice-programming/algorithm/thisiscodingtest/class3/exitMaze.txt', 'r')

N, M = map(int, input().split(' '))

MAZE = []

for i in range(N):
    MAZE.append(list(map(int, input())))
    # MAZE.append(list(map(int, list(input()))))


vector = [(0, 1), (0, -1), (1, 0), (-1, 0)]
# bfs = deque([(0, 0, 0)])
# cost = 0

# while len(bfs) > 0:
#     x, y, cost = bfs.popleft()
#     cost += 1
#     if x == N-1 and y == M-1:
#         break
#     MAZE[x][y] = cost
#     for i in range(len(vector)):
#         nx = x + vector[i][0]
#         ny = y + vector[i][1]
#         if nx < 0 or nx >= N or ny < 0 or ny >= M or (nx == 0 and ny == 0):
#             continue
#         if MAZE[nx][ny] == 1:
#             bfs.append((nx, ny, cost))

# print(cost)


def bfs(x, y):
    queue = deque()
    queue.append([x, y])
    while queue:
        x, y = queue.popleft()
        if x == N-1 and y == M-1:
            break
        for i in vector:
            nx = x + i[0]
            ny = y + i[1]
            if nx < 0 or nx >= N or ny < 0 or ny >= M or (nx == 0 and ny == 0):
                continue
            if MAZE[nx][ny] == 0:
                continue
            MAZE[nx][ny] = MAZE[x][y] + 1
            queue.append([nx, ny])
    return MAZE[N-1][M-1]


print(bfs(0, 0))
