# https://programmers.co.kr/learn/courses/30/lessons/42576?language=python3
# 11:20 -> 11:40
# 11:45 (효울성 테스트)
participant = ["leo", "kiki", "eden"]
completion = ["eden", "kiki"]

# participant = ["mislav", "stanko", "mislav", "ana"]
# completion = ["stanko", "ana", "mislav"]


# def solution(participant, completion):
#     answer = ''
#     list = {}
#     for i in completion:
#         if i in list:
#             list[i] += 1
#         else:
#             list[i] = 1

#     for i in participant:
#         if i in list:
#             if list[i] == 0:
#                 answer = i
#                 break
#             list[i] -= 1
#         else:
#             answer = i
#             break
#     if answer == '':
#         answer = list.get(1)
#     return answer


def solution(participant, completion):
    participant.sort()
    completion.sort()
    for i in range(len(completion)):
        if participant[i] != completion[i]:
            return participant[i]

    return participant[len(participant)-1]


# 매번 서치를 진행해야해서 속도가 느림
# def solution(participant, completion):
#     answer = ''
#     for i in participant:
#         if completion.count(i) > 0:
#             del completion[completion.index(i)]
#         else:
#             answer = i
#             break
#     return answer


# def solution(participant, completion):
#     answer = ''
#     participant.sort()
#     completion.sort()
#     for i in range(len(completion)):
#         if participant[i] != completion[i]:
#             answer = participant[i]
#     if answer == '':
#         answer = ''.join(participant[len(participant)-1:])
#     return answer
print(solution(participant, completion))
