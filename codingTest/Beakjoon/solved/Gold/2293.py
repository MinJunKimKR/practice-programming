import sys
sys_input = sys.stdin.readline

N, K = map(int, input().split())

coins = []

for _ in range(N):
    coin = int(sys_input().strip())
    if coin > K:
        continue
    coins.append(coin)

coins = sorted(coins)

if len(coins) == 0:
    print(0)
    exit(0)
if coins[0] > K:
    print(0)
    exit(0)

dp = [0]*(K+1)

for coin in coins:
    dp[coin] += 1
    for j in range(coin, K+1):
        dp[j] += dp[j-coin]
print(dp[K])
