# 6:10 -> 6:40
# [TIMEOUT]
# 6:41 -> 6:59 (50 min)
import sys
from collections import deque
sys.stdin = open(
    '/Users/minjunkim/Documents/Programming/practice-programming/algorithm/thisiscodingtest/class6/goldMine.txt', 'r')

# T = int(input())
# vector = [[-1, -1], [0, -1], [1, -1]]
# for i in range(0, T):
#     N, M = map(int, input().split())
#     mine = deque(map(int, input().split()))
#     dp = [[0 for i in range(0, M)] for j in range(0, N)]
#     result = 0
#     goldmine = []
#     for n in range(0, N):
#         goldmine.append([])
#         for m in range(0, M):
#             goldmine[n].append(mine.popleft())

#     for m in range(0, M):
#         for n in range(0, N):
#             if m == 0:
#                 dp[n][m] = goldmine[n][m]
#                 continue
#             for i in vector:
#                 pn = n+i[0]
#                 pm = m+i[1]
#                 if pn < 0 or pm < 0 or pn >= N or pm >= M:
#                     continue
#                 dp[n][m] = max(dp[n][m], dp[pn][pm] + goldmine[n][m])
#                 result = max(result, dp[n][m])
#     print(result)

# 동빈나 버전 7:40
for tc in range(0, int(input())):
    N, M = map(int, input().split())
    mine = list(map(int, input().split()))
    mineIdx = 0
    goldmine = []
    for n in range(0, N):
        goldmine.append([])
        for m in range(0, M):
            goldmine[n].append(mine[mineIdx])
            mineIdx += 1

    for m in range(1, M):
        for n in range(0, N):
            if n == 0:
                leftUp = 0
            else:
                leftUp = goldmine[n-1][m-1] + goldmine[n][m]

            if n == N-1:
                leftDown = 0
            else:
                leftDown = goldmine[n+1][m-1] + goldmine[n][m]

            left = goldmine[n][m-1] + goldmine[n][m]
            goldmine[n][m] = max(leftUp, leftDown, left)
    result = 0
    for i in range(0, N):
        result = max(result, goldmine[i][M-1])
    print(result)
