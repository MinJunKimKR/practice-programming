import sys
sys.stdin = open(
    '/Users/minjunkim/Documents/Programming/practice-programming/algorithm/Beakjoon/SamsungZip/g5_14503.txt', 'r')
# 3:10 -> 3:50
# [Fail] - TimeOut
# [Succes] - 4:04
N, M = map(int, input().split())
x, y, d = map(int, input().split())
vector = [[-1, 0], [0, 1], [1, 0], [0, -1]]
mapInfo = []
for _ in range(N):
    mapInfo.append(list(map(int, input().split())))


def isCheckStucked(x, y, vector, mapInfo):
    for i in vector:
        if mapInfo[x+i[0]][y+i[1]] == 0:
            return False
    return True


cnt = 0
while True:
    # x, y = q.popleft()
    if mapInfo[x][y] == 0:
        mapInfo[x][y] = 2
        cnt += 1
    if isCheckStucked(x, y, vector, mapInfo):  # 사방이 막혀있는지
        oppoD = (d+2) % 4
        ox, oy = vector[oppoD]
        if mapInfo[x+ox][y+oy] == 1:
            break
        else:
            x, y = x+ox, y+oy
            continue
    d = ((d-1) % 4)  # 막혀있지않다면, 왼쪽으로 돌면서 찾기
    nx, ny = x+vector[d][0], y+vector[d][1]

    while mapInfo[nx][ny] != 0:
        d = ((d-1) % 4)  # 막혀있지않다면, 왼쪽으로 돌면서 찾기
        nx, ny = x+vector[d][0], y+vector[d][1]
    x, y = nx, ny

print(cnt)
