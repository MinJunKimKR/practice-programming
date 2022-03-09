N = int(input())

dp = [[0]*3 for _ in range(N+1)]

MOD = 9901

dp[1][0], dp[1][1], dp[1][2] = 1, 1, 1

for i in range(2, N+1):
    dp[i][0] = (dp[i-1][0] + dp[i-1][1] + dp[i-1][2]) % MOD
    dp[i][1] = (dp[i-1][0] + dp[i-1][2]) % MOD
    dp[i][2] = (dp[i-1][0] + dp[i-1][1]) % MOD
print(sum(dp[N]) % MOD)
