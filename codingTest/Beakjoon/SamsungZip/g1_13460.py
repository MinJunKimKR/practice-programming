# https://www.acmicpc.net/problem/13460
# 3:50 -> 4:30
# [FAIL] - timeout
# 6:40 -> 7:20
# [FAIL] -> Hard to implement 7:00
# 7:00 -> 7:40 retry with explaination
# [FAIL]
# read explanation of this problem in https://rebas.kr/724 blog 7:40
# 8:25 -> 9:00
import sys
from collections import deque
sys.stdin = open(
    '/Users/minjunkim/Documents/Programming/practice-programming/algorithm/Beakjoon/SamsungZip/13460.txt', 'r')

N, M = map(int, input().split())
board = []
vector = [[-1, 0, -1, 0], [0, -1, 0, -1], [1, 0, 1, 0], [0, 1, 0, 1]]
visited = [[[[False]*M for _ in range(N)] for _ in range(M)] for _ in range(N)]
# visited = [[visited] * M for _ in range(N)]
q = deque([])
# minMoveCnt = 11


def init():
    rx, ry, bx, by = [0]*4
    for _ in range(N):
        board.append(list(input()))
    for i in range(N):
        for j in range(M):
            if board[i][j] == 'R':
                rx, ry = i, j
                continue
            if board[i][j] == 'B':
                bx, by = i, j
    q.append([rx, ry, bx, by, 1])
    visited[rx][ry][bx][by] = True


def moveBall(x, y, vecX, vecY):
    cnt = 0
    while board[x+vecX][y+vecY] != '#' and board[x][y] != 'O':
        x, y = x+vecX, y+vecY
        cnt += 1
    return x, y, cnt


def bfs():
    while q:
        nrx, nry, nbx, nby, cnt = q.popleft()
        if cnt > 10:
            break
        for vec in vector:
            mrx, mry, mrcnt = moveBall(nrx, nry, vec[0], vec[1])
            mbx, mby, mbcnt = moveBall(nbx, nby, vec[2], vec[3])

            if board[mbx][mby] == 'O':
                continue
            if board[mrx][mry] == 'O':
                # minMoveCnt = min(minMoveCnt, cnt)
                print(cnt)
                return
            if mrx == mbx and mry == mby:
                if mrcnt > mbcnt:
                    mrx = mrx-vec[0]
                    mry = mry-vec[1]
                else:
                    mbx = mbx-vec[2]
                    mby = mby-vec[3]
            # 방문차리 추가
            if not visited[mrx][mry][mbx][mby]:
                visited[mrx][mry][mbx][mby] = True
                q.append([mrx, mry, mbx, mby, cnt+1])
    print(-1)


init()
bfs()
# if minMoveCnt > 10:
#     print(-1)
# else:
#     print(minMoveCnt)
