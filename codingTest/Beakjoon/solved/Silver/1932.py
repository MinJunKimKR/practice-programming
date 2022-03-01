# 12:43 -> 01:25
# 01:12[success]

import sys
sys_input = sys.stdin.readline

N = int(input())

graph = []
for _ in range(N):
    graph.append(list(map(int, sys_input().strip().split())))
graph.reverse()

DP = [[0]*len(graph[0]) for _ in range(N)]
DP[0] = graph[0]
arr_len = N
for i in range(N-1):
    for j in range(arr_len-1):
        DP[i+1][j] = graph[i+1][j] + max(DP[i][j], DP[i][j+1])
    arr_len -= 1
print(DP[N-1][0])
