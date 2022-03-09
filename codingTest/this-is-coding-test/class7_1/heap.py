import heapq


def heapsort(iterable):
    h = []
    result = []

    for v in iterable:
        heapq.heappush(h, v)
    for _ in range(len(h)):
        result.append(heapq.heappop(h))
    return result


result = heapsort([1, 2, 3, 5, 3, 4, 2, 2, 45, 6])
print(result)
