# 2:26 -> 3:06
# 2:46 [FAIL - I can't find solution]
# 가장긴 증가하는 부분수열 (LIS)
import sys
sys.stdin = open(
    '/Users/minjunkim/Documents/Programming/practice-programming/algorithm/thisiscodingtest/class6/soldierSetting.txt', 'r')

N = int(input())
soldiers = list(map(int, input().split()))

soldiers.reverse()
dp = [1]*N

for i in range(1, N):
    for j in range(0, i):
        if soldiers[i] > soldiers[j]:
            dp[i] = max(dp[i], dp[j]+1)
print(N-dp[N-1])
