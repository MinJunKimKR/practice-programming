import heapq

# https: // programmers.co.kr/learn/courses/30/lessons/42626?language = python3
# 5:07 -> 5:37
# [5:33] Success


scoville = [1, 2, 3, 7, 9, 10, 12]
K = 7


def solution(scoville, K):
    answer = 0
    heapq.heapify(scoville)

    while scoville:
        first = heapq.heappop(scoville)
        if first >= K:
            return answer
        if len(scoville) == 0:
            return -1
        second = heapq.heappop(scoville)
        nowScoville = first + (second * 2)
        heapq.heappush(scoville, nowScoville)
        answer += 1
    return answer


# def solution(scoville, K):
#     answer = 0
#     heapq.heapify(scoville)
#     while scoville:
#         if len(scoville) < 2:
#             return -1
#         answer += 1
#         first = heapq.heappop(scoville)
#         second = heapq.heappop(scoville)
#         nowScoville = first + (second * 2)
#         heapq.heappush(scoville, nowScoville)

#         min = heapq.heappop(scoville)
#         if min >= K:
#             return answer
#         heapq.heappush(scoville, min)
#     return answer


print(solution(scoville, K))
