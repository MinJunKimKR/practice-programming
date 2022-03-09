# ===========[우선순위큐]===========
import heapq

scoville = [100, 1, 2, 3, 7, 9, 10, 12]
heapq.heapify(scoville)  # 힙구조로 바뀐다.
heapq.heappush(scoville, 2)
while scoville:
    print(heapq.heappop(scoville))
# 1 2 2 3 7 9 10 12 100

print('=======================')
scoville2 = [100, 1, 3, 7, 9, 10, 12]
# 기존의 배열에 상태에서 heap으로 넣는다. (기존의 배열은 그대로고 그 중간에 넣는다)
heapq.heappush(scoville2, 2)
while scoville2:
    print(heapq.heappop(scoville2))
# 100 1 2 3 7 9 10 12

# heapify() 함수에 리스트를 인자로 넘기면 리스트 내부의 원소들의 위에서 다룬 힙 구조에 맞게 재배치되며 최소값이 0번째 인덱스에 위치됩니다.
# 즉, 비어있는 리스트를 생성한 후 heappush() 함수로 원소를 하나씩 추가한 효과가 납니다.
# heapify() 함수의 성능은 인자로 넘기는 리스트의 원소수에 비례합니다. 즉 O(N)의 시간 복잡도를 가집니다

# 따라서 두번째로 작은 원소를 얻으려면 바로 heap[1]으로 접근하면 안되고,
# 반드시 heappop()을 통해 가장 작은 원소를 삭제 후에 heap[0]를 통해 새로운 최소값에 접근해야 합니다.
