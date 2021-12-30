# https://programmers.co.kr/learn/courses/30/lessons/42839?language=python3
# 11:35 -> 12:05
# 12:00 [Success]
# 12:10 -> 12:30 retry
# 12:34 [TimeOut.but success]

import itertools
import math
numbers = "011"
numbers = "17"


def solution(numbers):
    numbers = list(numbers)
    mixNum = []
    for i in range(1, len(numbers)+1):
        mixNum.extend([int(''.join(x))
                      for x in list(itertools.permutations(numbers, i))])

    mixNum = set(mixNum)
    answer = len(eratosnes(list(mixNum)))

    return answer


def eratosnes(numbers):
    highNum = max(numbers)
    array = [True] * (highNum+1)
    for i in range(2, int(math.sqrt(highNum))+1):
        if array[i] == True:
            j = 2
            while i*j <= highNum:
                array[i*j] = False
                j += 1
    return [x for x in numbers if array[x] == True and x > 1]

    # def solution(numbers):
    #     numbers = list(numbers)
    #     primeNums = []
    #     for i in range(1, len(numbers)+1):
    #         mixNums = [int(''.join(x))
    #                    for x in list(itertools.permutations(numbers, i))]
    #         for mixNum in mixNums:
    #             if primeNums.count(mixNum) > 0:
    #                 continue
    #             if isPrime(mixNum):
    #                 primeNums.append(mixNum)
    #     print(primeNums)
    #     return len(primeNums)

    # def isPrime(number):
    #     if number < 2:
    #         return False
    #     for i in range(2, int(math.sqrt(number)) + 1):
    #         if number % i == 0:
    #             return False
    #     return True


print(solution(numbers))
