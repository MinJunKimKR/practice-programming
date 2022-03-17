# 6:33 -> 7:20
# FAIL ->timeout
# 7:40 -> 8:20 [bfs] GG-> 왜 틀렸는줄은 알겠는데 체크방법을 모르곘음
# FIXME: retry
# refer : https://zidarn87.tistory.com/255
# 9:35 [FAIL again]
# TODO:write
# TODO:retry
from collections import deque
puzzle = ''

for _ in range(3):
    puzzle += ''.join(input().split())
visited = {}


vector = [(1, 0), (-1, 0), (0, 1), (0, -1)]

q = deque([])
q.append((puzzle, 0))


def swap(idx, nx, ny, puzzle_n):
    n_idx = nx*3 + ny
    puzzle_n = list(puzzle_n)
    puzzle_n[idx], puzzle_n[n_idx] = puzzle_n[n_idx], puzzle_n[idx]
    return ''.join(puzzle_n)


while q:
    puzzle_c, cnt = q.popleft()
    if puzzle_c == '123456780':
        print(cnt)
        exit(0)
    if visited.get(puzzle_c):
        continue
    visited[puzzle_c] = True
    idx = puzzle_c.find('0')
    x = idx//3
    y = idx % 3
    for vec in vector:
        nx = x+vec[0]
        ny = y+vec[1]
        if 0 <= nx < 3 and 0 <= ny < 3:
            puzzle_n = swap(idx, nx, ny, puzzle_c)
            if visited.get(puzzle_n):
                continue
            q.append((puzzle_n, cnt+1))
print(-1)


# def is_align(map):
#     num = 1
#     for i in range(3):
#         for j in range(3):
#             if i == 2 and j == 2 and map[i][j] == 0:
#                 return True
#             if map[i][j] != num or map[i][j] == 0:
#                 return False
#             num += 1


# vector = [(1, 0), (-1, 0), (0, 1), (0, -1)]

# visited = [[False]*3 for _ in range(3)]
# INF = int(1e9)
# ans = INF


# def dfs(x, y, puzzle, cnt, visited):
#     global ans
#     if x == 2 and y == 2:
#         if is_align(puzzle):
#             ans = min(ans, cnt)
#             return
#     visited[x][y] = True
#     cnt += 1
#     for vec in vector:
#         nx = x + vec[0]
#         ny = y + vec[1]
#         if 0 <= nx < 3 and 0 <= ny < 3:
#             if visited[nx][ny]:
#                 continue
#             new_puzzle = deepcopy(puzzle)
#             new_visited = deepcopy(visited)
#             new_puzzle[nx][ny], new_puzzle[x][y] = new_puzzle[x][y], new_puzzle[nx][ny]
#             dfs(nx, ny, new_puzzle, cnt, new_visited)


# x, y = 0, 0
# for i in range(3):
#     for j in range(3):
#         if puzzle[i][j] == 0:
#             x = i
#             y = j
#             break

# dfs(x, y, puzzle, 0, visited)

# if ans == INF:
#     print(-1)
# else:
#     print(ans)


# 1 2 3
# 4 5 6
# 7 8 0

# 1 2 3
# 4 0 6
# 7 8 5

# 7 1 3
# 0 2 5
# 8 4 6
