# 4:50 -> 5:10
# [FAIL]

# import copy
# import sys
# sys.stdin = open(
#     '/Users/minjunkim/Documents/Programming/practice-programming/algorithm/thisiscodingtest/class6/makingOne.txt', 'r')
# X = int(input())


# def makingOne(val, dp):
#     if val <= 1:
#         return len(dp)
#     resultDP = []
#     if val % 5 == 0:
#         newVal = val/5
#         dp5 = copy.deepcopy(dp)
#         dp5.append(newVal)
#         resultDP.append(makingOne(newVal, dp5))
#     if val % 3 == 0:
#         newVal = val/3
#         dp3 = copy.deepcopy(dp)
#         dp3.append(newVal)
#         resultDP.append(makingOne(newVal, dp3))
#     if val % 2 == 0:
#         newVal = val/2
#         dp2 = copy.deepcopy(dp)
#         dp2.append(newVal)
#         resultDP.append(makingOne(newVal, dp2))
#     val -= 1
#     dp.append(val)
#     resultDP.append(makingOne(val, dp))

#     return min(resultDP)


# print(makingOne(X, []))


# 5:25 -> 5:45 || 5:32
# [success]
import sys
sys.stdin = open(
    '/Users/minjunkim/Documents/Programming/practice-programming/algorithm/thisiscodingtest/class6/makingOne.txt', 'r')
X = int(input())


# dp = [0] * 30000
dp = [0] * 30001

num = 2

while num <= X:
    result = []
    if num % 5 == 0:
        result.append(dp[num//5])
    if num % 3 == 0:
        result.append(dp[num//3])
    if num % 2 == 0:
        result.append(dp[num//2])
    result.append(dp[num-1])
    dp[num] = min(result) + 1
    num += 1
print(dp[X])
