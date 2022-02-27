import sys
sys.stdin = open(
    '/Users/minjunkim/Documents/Programming/practice-programming/algorithm/Beakjoon/BasicGuide/Silver/s3_2805.txt', 'r')
# 12:50 -> 1:20
N, M = map(int, input().split())
# wood = list(map(int, input().split()))
wood = list(map(int, sys.stdin.readline().strip().split()))
end = max(wood)
start = 0
hightest = 0
while (start <= end):  # 같을때도 돌리는 이유 = 같으면 mid도 같을수 밖에 없기때문에 해당위치도 검사 가능
    mid = (start + end) // 2
    # sumWoodLen = 0
    # sumWoodLen = sum([x-mid if x-mid >= 0 else 0 for x in wood])
    sumWoodLen = sum([i for i in map(lambda x: x-mid, wood) if i > 0])
    # for i in wood:
    #     if i > mid:
    #         sumWoodLen += i-mid
    # if sumWoodLen < 0:
    #     sumWoodLen = 0
    if sumWoodLen >= M:
        hightest = mid
        start = mid+1
    else:
        end = mid-1

print(hightest)
# def cuttingWood(start, end, M, wood):
#     mid = (start + end)//2
#     sumCuttedWood = sum([x-mid if x-mid >= 0 else 0 for x in wood])
#     if sumCuttedWood == M:
#         return mid
#     if sumCuttedWood > M:
#         return cuttingWood(mid, end, M, wood)
#     else:
#         return cuttingWood(start, mid, M, wood)

# high = cuttingWood(1, highest, M, wood)
# print(high)
