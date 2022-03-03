# 1:15 -> 1:45
# 1:27 [Success]
import sys
sys_input = sys.stdin.readline
N = int(input())
arr = list(map(int, sys_input().strip().split()))
dp = [0]*(N)

dp[0] = arr[0]

for i in range(1, N):
    dp[i] = max(dp[i-1] + arr[i], arr[i])
print(max(dp))
