A, B = map(list, input().split())

len_A = len(A)
len_B = len(B)

longest = 0

dp = [[0] * (len_B) for _ in range(len_A)]


for i in range(len_A):
    for j in range(len_B):
        if A[i-1] == B[j-1]:
            dp[i][j] = dp[i-1][j-1] + 1
            longest = max(longest, dp[i][j])

print(longest)
