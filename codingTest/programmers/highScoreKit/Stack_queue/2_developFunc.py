from collections import deque
import math
# 1:25 -> 1:55
# [Success]
progresses = [95, 90, 99, 99, 80, 99]
speeds = [1, 1, 1, 1, 1, 1]


progresses = [93, 30, 55]
speeds = [1, 30, 5]
progresses = [99, 98, 97]
speeds = [1, 1, 1]

# def solution(progresses, speeds):
#     print(progresses)
#     print(speeds)
#     answer = []
#     time = 0
#     count = 0
#     while len(progresses) > 0:
#         if (progresses[0] + time*speeds[0]) >= 100:
#             progresses.pop(0)
#             speeds.pop(0)
#             count += 1
#         else:
#             if count > 0:
#                 answer.append(count)
#                 count = 0
#             time += 1
#     answer.append(count)
#     return answer


def solution(progresses, speeds):
    answer = []
    count = 1
    turns = []
    for i in range(len(progresses)):
        turns.append(math.ceil((100-progresses[i])/speeds[i]))
    turns = deque(turns)
    set = turns.popleft()
    while turns:
        now = turns.popleft()
        if now > set:
            answer.append(count)
            set = now
            count = 1
        else:
            count += 1
    answer.append(count)
    return answer


print(solution(progresses, speeds))
