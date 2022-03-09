import heapq

# 오름차순 힙 정렬
# 파이썬은 min heap으로 되어있음


def heapSort(iterable):
    h = []
    result = []

    for val in iterable:
        heapq.heappush(h, val)
    for _ in range(len(h)):
        result.append(heapq.heappop(h))
    return result


def heapSortDown(iterable):
    h = []
    result = []

    for val in iterable:
        heapq.heappush(h, -val)
    for _ in range(len(h)):
        result.append(-heapq.heappop(h))
    return result


result = heapSort([1, 3, 5, 7, 9, 2, 4, 6, 8, 0])
print(result)

result = heapSortDown([1, 3, 5, 7, 9, 2, 4, 6, 8, 0])
print(result)
