# 3:40 -> 4:20 [FAIL] - TIME OUT -> 무한루프 때문에 틀림a
# 큰 탐색범위 (이번의 경우 10억)는 이진탐색을 떠올려야한다
# import sys
# sys.stdin = open(
#     '/Users/minjunkim/Documents/Programming/practice-programming/algorithm/thisiscodingtest/class5/ddukbboki.txt', 'r')

# N, M = map(int, input().split())
# dduk = list(map(int, input().split()))

# cuttingHeight = 0


# def search(min, height, max):
#     leftDduk = sum([i for i in map(lambda x: x-height, dduk) if i > 0])
#     # 종료조건? = 떡이 최솟값 보다 크면서 더이상 찾아지는 값보다 크다면.
#     if leftDduk >= M and ((max-height) == 0 or (height-min) == 0):
#         return height
#     if leftDduk > M:
#         pass
#         return search(height, int(max-height/2), max)
#         # height + max /2
#         # search
#     else:
#         pass
#         return search(min, int(height-min/2), height)
#         # min + hight /2
#         # search


# print(search(0, int(max(dduk)/2), max(dduk)))


# 4:40 -> 5:20 // 4:59
# import sys
# sys.stdin = open(
#     '/Users/minjunkim/Documents/Programming/practice-programming/algorithm/thisiscodingtest/class5/ddukbboki.txt', 'r')

# N, M = map(int, input().split())
# dduk = list(map(int, input().split()))

# heightest = 0


# def search(min, max, height):
#     global heightest
#     leftDduk = sum([i for i in map(lambda x: x-height, dduk) if i > 0])

#     if min == height or max == height:
#         if leftDduk >= M and height > heightest:
#             heightest = height
#         return heightest
#     if leftDduk >= M:
#         heightest = height
#         return search(height+1, max, (height + max) // 2)
#     else:
#         return search(min, height-1, (min + height) // 2)


# print(search(0, max(dduk), max(dduk)//2))
import sys
sys.stdin = open(
    '/Users/minjunkim/Documents/Programming/practice-programming/algorithm/thisiscodingtest/class5/ddukbboki.txt', 'r')

N, M = map(int, input().split())
dduk = list(map(int, input().split()))

start = 0
end = max(dduk)

maximumHeight = 0

while (start <= end):
    height = (start + end) // 2
    total = sum([i for i in map(lambda x: x-height, dduk) if i > 0])
    if total >= M:
        maximumHeight = height
        start = height + 1
    else:
        end = height-1
print(maximumHeight)
