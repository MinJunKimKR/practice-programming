# 10:35-> 11:05
import sys
sys_input = sys.stdin.readline
N, M = map(int, input().split())

graph = [x for x in range(N+1)]


def find_parent(a, graph):
    if a != graph[a]:
        graph[a] = find_parent(graph[a], graph)
    return graph[a]


def union_node(a, b, graph):
    a = find_parent(a, graph)
    b = find_parent(b, graph)
    if a < b:
        graph[b] = a
    else:
        graph[a] = b


for _ in range(M):
    a, b = map(int, sys_input().strip().split())
    union_node(a, b, graph)
for i in range(1, N+1):
    find_parent(i, graph)
keys = set(graph)
print(len(keys)-1)
