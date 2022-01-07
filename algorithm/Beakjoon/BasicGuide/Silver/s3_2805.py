import sys
sys.stdin = open(
    '/Users/minjunkim/Documents/Programming/practice-programming/algorithm/Beakjoon/BasicGuide/Silver/s3_2805.txt', 'r')

N, M = list(map(int, input().split()))
wood = list(map(int, sys.stdin.readline().strip().split()))

start, end = 1, max(wood)
height = 0  # 톱 높이의 최대값
while start <= end:
    mid = (start+end)//2  # 현재 우리가 자를 톱의위치
    sumCuttedTree = sum([x for x in map(lambda x: x-mid, wood) if x > 0])

    if sumCuttedTree >= M:
        height = mid
        start = mid+1
    else:
        end = mid-1
print(height)
