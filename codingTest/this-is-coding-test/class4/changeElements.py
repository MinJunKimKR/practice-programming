# 12:36 -> 12:50 [12:44]
# [FAIL] -> 최대 K번째인데 이것을 못봄 + B가 더 클때만 이라는 부분을 간과함.
import sys
sys.stdin = open(
    '/Users/minjunkim/Documents/Programming/practice-programming/algorithm/thisiscodingtest/class4/changeElements.txt', 'r')
inputInfo = input().split()
# N = int(inputInfo[0])
# K = int(inputInfo[1])
N, K = map(int, input().split())

A = list(map(int, input().split()))
B = list(map(int, input().split()))

A.sort()
B.sort(reverse=True)


# for i in range(K):
#     A[i], B[i] = B[i], A[i]

for i in range(K):
    if A[i] < B[i]:
        A[i], B[i] = B[i], A[i]
    else:
        break


print(sum(A))
