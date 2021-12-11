# 4:25 -> 4:55 (30min)
# [FAIL - TIMEOUT]
# 5:00 -> 5:19 (total : 50 min)
# [extra time for solve this problem]

# import sys
# sys.stdin = open(
#     '/Users/minjunkim/Documents/Programming/practice-programming/algorithm/thisiscodingtest/class6/effectiveMoney.txt', 'r')

# N, M = map(int, input().split())
# MONEYS = []
# for i in range(0, N):
#     MONEYS.append(int(input()))
# dp = [0]*(M+1)

# minMoney = min(MONEYS)

# for i in range(0, minMoney):
#     dp[i] = -1

# for i in range(minMoney, M+1):
#     result = []
#     if i in MONEYS:
#         dp[i] = 1
#         continue
#     for money in MONEYS:
#         remain = i - money
#         if dp[remain] == -1 or remain < 0:
#             continue
#         result.append(dp[remain] + 1)
#     if len(result) == 0:
#         dp[i] = -1
#         continue
#     dp[i] = min(result)
# print(dp[M])

# 동빈나 버전
# 5:35 -> 5:48 (13min)
import sys
sys.stdin = open(
    '/Users/minjunkim/Documents/Programming/practice-programming/algorithm/thisiscodingtest/class6/effectiveMoney.txt', 'r')

N, M = map(int, input().split())
MONEYS = []
for i in range(0, N):
    MONEYS.append(int(input()))
dp = [10001]*(M+1)  # INF값을 insert
dp[0] = 0
for i in MONEYS:
    index = 0
    while index+i <= M:
        index += i
        if dp[index-i]+1 < dp[index]:
            dp[index] = dp[index-i] + 1
if dp[M] == 10001:
    print(-1)
else:
    print(dp[M])
