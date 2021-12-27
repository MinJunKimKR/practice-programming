# 5:45 -> 6:05
# p.313
# [FAIL]
import sys
sys.stdin = open(
    '/Users/minjunkim/Documents/Programming/practice-programming/algorithm/thisiscodingtest/previous question/Greedy/reverseString.txt', 'r')

S = input()

count0 = 0
count1 = 0

if S[0] == '0':
    count1 += 1
else:
    count0 += 1

for i in range(1, len(S)-1):
    if S[i] != S[i-1]:
        if S[i] == '0':
            count1 += 1
        else:
            count0 += 1

print(min(count0, count1))

# -------------------------[FAIL]---------------------------------------
# S = list(input())
# count = 0
# key = "1" if S.count("0") > S.count("1") else "0"

# for i in range(0, len(S)):
#     if S[i] != key:
#         continue
#     if S[i-1] != S[i] or i == 0:
#         count += 1

# print(count)
