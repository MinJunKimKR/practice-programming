# 1:19->2:00
# 1:38 [success]
import sys
sys_input = sys.stdin.readline

N, S = map(int, input().split())
arr = list(map(int, sys_input().strip().split()))

if S == 0:
    print(0)
    exit(0)
INF = 100001
min_length = INF
end = 0
total = 0
for start in range(N):
    while total < S and end < N:
        total += arr[end]
        end += 1
    if total >= S:
        min_length = min(min_length, end-start)
    total -= arr[start]

if min_length == INF:
    print(0)
else:
    print(min_length)
