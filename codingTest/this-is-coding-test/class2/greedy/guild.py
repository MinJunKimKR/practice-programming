from collections import deque

N = int(input())
fearArr = list(map(int, input().split(' ')))

fearArr.sort()  # 낮은 순서대로 정렬

# 다른방법 (해법)
partyCount = 0
partyMembers = 0

for i in fearArr:
    partyMembers += 1
    if partyMembers >= i:
        partyCount += 1
        partyMembers = 0


# fearArr = deque(fearArr)  # queue로 변경

# partyCount = 0  # 총 그룹의수 => 정답
# partyMembers = 0  # 현재 그룹의 파티원수
# # 12:10 -> 12:28

# while True:
#     if len(fearArr) == 0:  # 파티원 큐가 다 비어지면 종료
#         break
#     fear = fearArr.popleft()  # 큐를 앞에서 비워가면서
#     partyMembers += 1  # 멤버수 증가
#     if fear <= partyMembers:  # 만일 공포보다 더 인원수가 크다면,
#         partyCount += 1  # 그룹 추가
#         partyMembers = 0  # 초기화


print(f'partyCount : {partyCount}')
