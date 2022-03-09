# 3:55 -> 4:25
# FAIL -> GG
import sys
sys.stdin = open(
    '/Users/minjunkim/Documents/Programming/practice-programming/algorithm/thisiscodingtest/class6/antWorrior.txt', 'r')

N = int(input())
K = list(map(int, input().split()))
# 4:20 -> 4:50
#
d = [0] * N
d[0] = K[0]
if K[0] > K[1]:
    d[1] = K[0]
else:
    d[1] = K[1]

for i in range(2, N):
    d[i] = max(d[i-1], d[i-2] + K[i])
    # if d[i-1] > d[i-2] + K[i]:
    #     d[i] = d[i-1]
    # else:
    #     d[i] = d[i-2] + K[i]

# print(max(d))
print(d[N-1])
