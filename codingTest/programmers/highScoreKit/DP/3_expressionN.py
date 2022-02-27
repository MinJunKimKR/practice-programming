# https://programmers.co.kr/learn/courses/30/lessons/42895?language=python3
# 3:30 -> 4:10
# GG -> [Fail]
# 3:55 -> 4:25
# GG -> [Fail]

N = 5
number = 555
N = 2
number = 11
N = 5
number = 12


def solution(N, number):
    if N == number:
        return 1
    numberSet = [[]] + [[int(str(N) * i)] for i in range(1, 9)]
    for i in range(1, 9):
        if numberSet[i][0] == number:
            return i
    for i in range(2, 9):
        for j in range(1, i):
            for a in numberSet[j]:
                for b in numberSet[i-j]:
                    numberSet[i].append(a+b)
                    numberSet[i].append(a*b)
                    numberSet[i].append(a-b)
                    if b != 0:
                        numberSet[i].append(a//b)
        if numberSet[i].count(number) > 0:
            return i
        numberSet[i] = set(numberSet[i])
    return -1


print(solution(N, number))
