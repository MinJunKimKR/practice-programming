# 10:29 -> 11:09
# [FAIL] - timeout
# [Success] - 11: 30 myself
# from collections import deque
from itertools import permutations
import sys
sys.stdin = open(
    '/Users/minjunkim/Documents/Programming/practice-programming/algorithm/Beakjoon/SamsungZip/s1_14888.txt', 'r')

N = int(input())
nums = list(map(int, input().split()))
opCnts = list(map(int, input().split()))
opSimbols = ['+', '-', '*', '/']
oppers = []
minNum = int(1e9)+1
maxNum = -int(1e9)-1

for i in range(len(opSimbols)):
    for j in range(opCnts[i]):
        oppers.append(opSimbols[i])
oppers = list(set(permutations(oppers, (N-1))))
for op in oppers:
    num = nums[0]
    for i in range(len(nums)-1):
        if op[i] == '+':
            num += nums[i+1]
            continue
        if op[i] == '-':
            num -= nums[i+1]
            continue
        if op[i] == '*':
            num = num*nums[i+1]
            continue
        if op[i] == '/':
            if num < 0:
                num = -int(-num/nums[i+1])
            else:
                num = int(num/nums[i+1])
    minNum = min(minNum, num)
    maxNum = max(maxNum, num)
print(maxNum)
print(minNum)
# def dfs(nums, cals, result):
#     global minNum, maxNum
#     if len(nums) == 0:
#         minNum = min(minNum, result)
#         maxNum = max(maxNum, result)
#         return
#     else:
#         thisNum = nums.popleft()
#         tempCals = cals[:]
#         if cals[0] > 0:
#             tmp = result + thisNum
#             tempCals[0] = tempCals[0] - 1
#             dfs(deque(nums), tempCals, tmp)
#         tempCals = cals[:]
#         if cals[1] > 0:
#             tmp = result - thisNum
#             tempCals[1] = tempCals[1] - 1
#             dfs(deque(nums), tempCals, tmp)
#         tempCals = cals[:]
#         if cals[2] > 0:
#             tmp = result * thisNum
#             tempCals[2] = tempCals[2] - 1
#             dfs(deque(nums), tempCals, tmp)
#         tempCals = cals[:]
#         if cals[3] > 0:
#             if result < 0:
#                 tmp = -int(-result / thisNum)
#             else:
#                 tmp = int(result / thisNum)
#             tempCals[3] = tempCals[3] - 1
#             dfs(deque(nums), tempCals, tmp)

# firstNum = nums.popleft()
# dfs(nums, cals, firstNum)
# print(maxNum)
# print(minNum)
