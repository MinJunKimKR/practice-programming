import sys
import heapq
input = sys.stdin.readline
INF = int(1e9)

# 노드개수, 간선 개수
N, M = map(int, input().split())
# 시작노드
start = int(input())
graph = [[] for i in range(N+1)]  # 노드의 개수만큼 graph만들기
# visited = [False] * (N+1)  # 방문체크 -> heap에서는 더 값이 크다면 이미 방문된것으로 인지한다
distance = [INF] * (N+1)  # 최단거리 기록 (DP)

# 간선의 정보 입력받기
for _ in range(M):
    a, b, c = map(int, input().split())  # a번 노드에서 b번 노드로 가는 비용이 c라는 내용
    graph[a].append((b, c))


# 다익스트라 힙은, 최소 간선 노드를 구하는데 힙을 사용하기에 따로 함수를 선언하지 않는다
# def get_smallest_node():
#     minValue = INF
#     index = 0  # 거리가 가장 짧은 노드 인덱스
#     for i in range(1, N+1):
#         if distance[i] < minValue and not visited[i]:
#             minValue = distance[i]
#             index = i
#     return index


def dijkstra(start):
    q = []
    # 시작노드를 힙에 초기화 (자기 자신은 최단임으로)
    heapq.heappush(q, (0, start))
    distance[start] = 0
    # for j in graph[start]:  # 첫번째 노드를 위한 작업
    #     distance[j[0]] = j[1]  # j[0] => b노드 라는뜻, j[1] => b노드까지 가는데 소요되는 비용

    # 시작노드를 제외한 만큼 반복
    # for _ in range(N-1):
    while q:  # 큐가 비어질때까지 반복
        # 현재 최단거리 노드정보 꺼내기
        dist, now = heapq.heappop(q)
        # now = get_smallest_node()
        # visited[now] = True

        # 현재노드가 이미 처리된적이 있는 노드라면 무시
        if distance[now] < dist:
            continue
        # 현재 방문되어 있는 노드(now)와 연결된 다른 노드를 확인
        for j in graph[now]:
            # 여기서 dist는 현재 확인하고 있는 노드까지 오는데 소요된 거리값을 뜻함
            cost = dist + j[1]
            # 현재 자신의 거리(distance[now])와 j ((b,c) 형태로 들어가있는값의 합)
            # cost = distance[now] + j[1]

            # 현재 노드를 거쳐서 다른 노드를 이동하는 거리가 더 짧은경우
            if cost < distance[j[0]]:
                distance[j[0]] = cost
                heapq.heappush(q, (cost, j[0]))


dijkstra(start)

for i in range(1, N+1):
    if distance[i] == INF:
        print('INFINITY')
    else:
        print(distance[i])
