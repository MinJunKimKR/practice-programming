# 9:00->9:40
# [FAIL]
# retry 9:41-> [GG]
# 11:38 -> 12:06
import sys
from collections import deque

sys_input = sys.stdin.readline
N, M = map(int, input().split())

graph = []
g_graph = [[0] * M for _ in range(N)]

for _ in range(N):
    graph.append(list(map(int, list(sys_input().strip()))))

vector = [(1, 0), (-1, 0), (0, 1), (0, -1)]
dict = {}
dict_num = 0


def bfs(x, y):
    global dict_num
    global graph
    dict_num += 1
    zero_cnt = 0
    q = deque([(x, y)])
    while q:
        t_x, t_y = q.popleft()
        if graph[t_x][t_y] == 0 and g_graph[t_x][t_y] == 0:
            g_graph[t_x][t_y] = dict_num
            zero_cnt += 1
            for vec in vector:
                nx = t_x+vec[0]
                ny = t_y+vec[1]
                if 0 <= nx < N and 0 <= ny < M:
                    q.append((nx, ny))
    dict[dict_num] = zero_cnt


for x in range(N):
    for y in range(M):
        if graph[x][y] == 0 and g_graph[x][y] == 0:
            bfs(x, y)

for x in range(N):
    for y in range(M):
        if graph[x][y] == 1:
            g_arr = []
            for vec in vector:
                nx = x+vec[0]
                ny = y+vec[1]
                if 0 <= nx < N and 0 <= ny < M:
                    if g_graph[nx][ny] > 0:
                        g_arr.append(g_graph[nx][ny])
            g_arr = set(g_arr)
            g_arr = list(g_arr)
            for key in g_arr:
                graph[x][y] += dict[key]

for row in graph:
    for i in row:
        print(i % 10, end='')
    print()
