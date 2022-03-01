# 05:52 -> 06:22
# 6:11[Success]
N = int(input())
DP = [0]*(N+1)
if N < 4:
    print(N)
    exit(0)

DP[1], DP[2], DP[3] = 1, 2, 3


for i in range(4, N+1):
    DP[i] = (DP[i-1]+DP[i-2]) % 15746
print(DP[N])
