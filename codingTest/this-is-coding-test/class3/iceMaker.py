# hello.txt 파일을 읽기 모드(r)로 열기. 파일 객체 반환
# 3:00 -> 3:30
# [FAIL]
# import sys
# sys.stdin = open(
#     '/Users/minjunkim/Documents/Programming/practice-programming/algorithm/thisiscodingtest/class3/iceMaker.txt', 'r')

# temp = list(map(int, input().split()))
# N = temp[0]
# M = temp[1]

# BLOCK = []
# for i in range(0, N):
#     BLOCK.append(list(input()))

# iceCount = 0
# print(BLOCK)


# def findIce(block, x, y):
#     global iceCount
#     if x < 0 or x >= N or y < 0 or y >= M:
#         return
#     thisBlock = block[x][y]
#     if thisBlock == '0':
#         findIce(BLOCK, x+1, y)
#         findIce(BLOCK, x, y+1)
#         findIce(BLOCK, x-1, y)
#         findIce(BLOCK, x, y-1)
#         iceCount += 1
#     # findIce(BLOCK, x+1, y)
#     # findIce(BLOCK, x, y+1)
#     # findIce(BLOCK, x-1, y)
#     # findIce(BLOCK, x, y-1)
#     # return
#     # if thisBlock == '0' and isMake:
#     #     BLOCK[x][y] = '1'
# findIce(BLOCK, 0, 0)


# [Second try]3:55 -> 4:25 [4:05]
# [success]

import sys
sys.stdin = open(
    '/Users/minjunkim/Documents/Programming/practice-programming/algorithm/thisiscodingtest/class3/iceMaker.txt', 'r')


def dfs(x, y):
    if x < 0 or y < 0 or x >= N or y >= M or BLOCK[x][y] == '1':
        return False
    BLOCK[x][y] = '1'
    dfs(x+1, y)
    dfs(x-1, y)
    dfs(x, y+1)
    dfs(x, y-1)

    return True


N, M = map(int, input().split(' '))
BLOCK = []
for i in range(N):
    BLOCK.append(list(input()))
iceCount = 0

for n in range(N):
    for m in range(M):
        if dfs(n, m) == True:
            iceCount += 1

print(iceCount)
