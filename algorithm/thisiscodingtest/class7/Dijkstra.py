import sys
input = sys.stdin.readline
INF = int(1e9)

# 노드개수, 간선 개수
N, M = map(int, input().split())
# 시작노드
start = int(input())
graph = [[] for i in range(N+1)]  # 노드의 개수만큼 graph만들기
visited = [False] * (N+1)  # 방문체크
distance = [INF] * (N+1)  # 최단거리 기록 (DP)

# 간선의 정보 입력받기
for _ in range(M):
    a, b, c = map(int, input().split())  # a번 노드에서 b번 노드로 가는 비용이 c라는 내용
    graph[a].append((b, c))


def get_smallest_node():
    minValue = INF
    index = 0  # 거리가 가장 짧은 노드 인덱스
    for i in range(1, N+1):
        if distance[i] < minValue and not visited[i]:
            minValue = distance[i]
            index = i
    return index


def dijkstra(start):
    # 시작노드 초기화
    distance[start] = 0
    visited[start] = True
    for j in graph[start]:  # 첫번째 노드를 위한 작업
        distance[j[0]] = j[1]  # j[0] => b노드 라는뜻, j[1] => b노드까지 가는데 소요되는 비용
    # 시작노드를 제외한 만큼 반복
    for _ in range(N-1):
        now = get_smallest_node()
        visited[now] = True
        # 현재 방문되어 있는 노드(now)와 연결된 다른 노드를 확인
        for j in graph[now]:
            # 현재 자신의 거리(distance[now])와 j ((b,c) 형태로 들어가있는값의 합)
            cost = distance[now] + j[1]
            # 현재 노드를 거쳐서 다른 노드를 이동하는 거리가 더 짧은경우
            if cost < distance[j[0]]:
                distance[j[0]] = cost


dijkstra(start)

for i in range(1, N+1):
    if distance[i] == INF:
        print('INFINITY')
    else:
        print(distance[i])
