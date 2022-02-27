# https://www.acmicpc.net/problem/14499
# 2:50 -> 3:30
# [fail]
# 3:40 -> 3:55
# [Succeess] - 면제에 있는 바닥의 숫자를 0으로 바꾸지 않았음
import sys
sys.stdin = open(
    '/Users/minjunkim/Documents/Programming/practice-programming/algorithm/Beakjoon/SamsungZip/g4_14499.txt', 'r')

n, m, x, y, k = map(int, input().split())
field = []

for _ in range(n):
    field.append(list(map(int, input().split())))

commands = list(map(int, input().split()))

dice = [[9]*3 for _ in range(4)]
dice[0][1], dice[1][0], dice[1][1], dice[1][2], dice[2][1], dice[3][1] = [0]*6
vectors = [[], [0, 1], [0, -1], [-1, 0], [1, 0]]

dice_x, dice_y = 1, 1


def moveDice(command, dice):
    if command == 1:
        dice[1][0], dice[1][1], dice[1][2], dice[3][1] = dice[3][1], dice[1][0], dice[1][1], dice[1][2]
    if command == 2:
        dice[1][0], dice[1][1], dice[1][2], dice[3][1] = dice[1][1], dice[1][2], dice[3][1], dice[1][0]
    if command == 3:
        dice[0][1], dice[1][1], dice[2][1], dice[3][1] = dice[1][1], dice[2][1], dice[3][1], dice[0][1]
    if command == 4:
        dice[0][1], dice[1][1], dice[2][1], dice[3][1] = dice[3][1], dice[0][1], dice[1][1], dice[2][1]
    return dice


for command in commands:
    dx, dy = vectors[command]
    nx, ny = x+dx, y+dy
    if nx < 0 or ny < 0 or nx > n-1 or ny > m-1:
        continue
    dice = moveDice(command, dice)
    print(dice[1][1])
    if field[nx][ny] == 0:
        field[nx][ny] = dice[3][1]
    else:
        dice[3][1] = field[nx][ny]
        field[nx][ny] = 0
    x, y = nx, ny
