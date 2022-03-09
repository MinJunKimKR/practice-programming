# 9:11 -> 9:51 [9:49]
# [FAIL] - 전부 INF만 있을경우
import sys
sys.stdin = open(
    '/Users/minjunkim/Documents/Programming/practice-programming/algorithm/thisiscodingtest/class7/futureCity.txt', 'r')

N, M = map(int, input().split())
INF = int(1e9)

graph = [[0 for _ in range(N+1)] for _ in range(N+1)]

for _ in range(M):
    a, b = map(int, input().split())
    graph[a][b] = 1
    graph[b][a] = 1

X, K = map(int, input().split())


def floyd():
    # distance를 따로 만들 필요없이 graph에 변화를 주면된다.
    distance = [[INF for _ in range(N+1)] for _ in range(N+1)]
    for i in range(1, N+1):
        distance[i][i] = 0

    for i in range(1, N+1):
        for j in range(1, N+1):
            if graph[i][j] is not 0:
                distance[i][j] = 1

    for k in range(1, N+1):
        for i in range(1, N+1):
            for j in range(1, N+1):
                distance[i][j] = min(
                    distance[i][j], distance[i][k] + distance[k][j])
    return distance


distance = floyd()

minTime = distance[1][K] + distance[K][X]
if minTime >= INF:
    print(-1)
else:
    print(minTime)
