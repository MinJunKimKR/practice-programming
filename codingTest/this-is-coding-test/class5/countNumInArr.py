# 2:25 -> 2:55

# 2:40 -> 3:10
# [FAIL] 없는 경우를 생각안함
import sys
from bisect import bisect_left, bisect_right
sys.stdin = open(
    '/Users/minjunkim/Documents/Programming/practice-programming/algorithm/thisiscodingtest/class5/countNumInArr.txt', 'r')


N, X = map(int, input().split())

ARRAY = list(map(int, input().split()))


count = bisect_right(ARRAY, X)-bisect_left(ARRAY, X)

if count == 0:
    print(-1)
else:
    print(count)
# startX = 0
# endX = 0


# def search(start, end):
#     global startX
#     global endX
#     mid = (start + end) // 2
#     if(start >= end):
#         return
#     if ARRAY[mid] == X and ARRAY[mid-1] != X:
#         startX = mid
#         return
#     elif ARRAY[mid] == X and ARRAY[mid+1] != X:
#         endX = mid
#         return
#     else:
#         search(start, mid-1)
#         search(mid+1, end)


# search(0, len(ARRAY))
# print(startX, endX)

print()
