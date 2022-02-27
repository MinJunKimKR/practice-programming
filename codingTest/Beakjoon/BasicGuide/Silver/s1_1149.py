# https://www.acmicpc.net/problem/1149
# 1:55-> 2:35
# [Fail (TimeOver)] - dfs가 아니라 dp로 풀었어야함. 2:18
# retry [Success] 2:30
import sys
sys.stdin = open(
    '/Users/minjunkim/Documents/Programming/practice-programming/algorithm/Beakjoon/BasicGuide/Silver1/s1_1149.txt', 'r')

N = int(input())

RGB = []

for _ in range(N):
    RGB.append(list(map(int, input().split())))
# INF = int(1e7)

# dp = [[INF, INF, INF] for _ in range(N)]
# dp[0] = RGB[0]

for i in range(1, N):
    rgbFees = RGB[i]
    RGB[i][0] = min(RGB[i-1][1]+rgbFees[0], RGB[i-1][2]+rgbFees[0])
    RGB[i][1] = min(RGB[i-1][0]+rgbFees[1], RGB[i-1][2]+rgbFees[1])
    RGB[i][2] = min(RGB[i-1][0]+rgbFees[2], RGB[i-1][1]+rgbFees[2])
print(min(RGB[N-1]))

# def dfs(fee, pre, n, RGB):
#     global minFee
#     if fee > minFee:
#         return
#     if n == N:
#         minFee = min(minFee, fee)
#         return
#     for idx, val in enumerate(RGB[n]):
#         if idx == pre:
#             continue
#         if fee+val > minFee:
#             continue
#         dfs(fee+val, idx, n+1, RGB)

# dfs(0, 4, 0, RGB)
# print(minFee)
