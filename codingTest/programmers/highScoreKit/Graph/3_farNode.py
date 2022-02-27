# https://programmers.co.kr/learn/courses/30/lessons/49189?language=python3

# 10:55 -> 11:35
# [FAIL] - TestCase timeOver
# 11:50 -> 12:30
# [Success]
import heapq


n = 6
vertex = [[3, 6], [4, 3], [3, 2], [1, 3], [1, 2], [2, 4], [5, 2]]


def solution(n, vertex):
    answer = 0
    INF = int(1e9)
    graph = [[] for _ in range(n+1)]
    distance = [INF] * (n+1)
    distance[1] = 0
    heap = []
    heapq.heappush(heap, (0, 1))
    highest = 0
    for i in vertex:
        graph[i[0]].append(i[1])
        graph[i[1]].append(i[0])
    while heap:
        dist, now = heapq.heappop(heap)
        if dist > distance[now]:
            continue
        for i in graph[now]:
            cost = dist + 1
            if distance[i] > cost:
                distance[i] = cost
                highest = max(cost, highest)
                heapq.heappush(heap, (cost, i))

    for i in distance:
        if i == highest:
            answer += 1
    return answer
    # return len([x for x in distance if x == highest])


# def solution(n, vertex):
#     answer = 0
#     INF = int(1e9)
#     distance = [INF] * (n+1)
#     distance[1] = 0
#     graph = [[False] * (n+1) for _ in range(n+1)]
#     heap = []  # (node값 + node번호)
#     heapq.heappush(heap, [0, 1])
#     for line in vertex:
#         graph[line[0]][line[1]] = True
#         graph[line[1]][line[0]] = True
#     while heap:
#         dist, nowNode = heapq.heappop(heap)
#         if distance[nowNode] < dist:
#             continue
#         for idx, isConn in enumerate(graph[nowNode]):
#             if isConn and idx > 1:
#                 distance[idx] = min(distance[idx], dist+1)
#                 heapq.heappush(heap, [dist+1, idx])
#     realDistance = [x for x in distance if x != INF]
#     answer = realDistance.count(max(realDistance))
#     # answer = distance.count(max(distance[2:]))

#     return answer

print(solution(n, vertex))
