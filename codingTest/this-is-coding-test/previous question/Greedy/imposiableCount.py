# 6:30 -> 7:00 (6:53)
# [Success / but it's not perfect]
# 이해가 잘안됨;;;;
import sys
sys.stdin = open(
    '/Users/minjunkim/Documents/Programming/practice-programming/algorithm/thisiscodingtest/previous question/Greedy/imposiableCount.txt', 'r')
N = int(input())
coins = list(map(int, input().split()))
coins.sort()
target = 1

for x in coins:
    if target < x:
        break
    target += x

print(target)

# coins.sort(reverse=True)
# targetNum = 0
# minNum = 0

# while targetNum == 0:
#     minNum += 1
#     targetNum = minNum
#     for coin in coins:
#         if targetNum-coin < 0:
#             continue
#         targetNum -= coin
#         if targetNum == 0:
#             break
# print(minNum)
