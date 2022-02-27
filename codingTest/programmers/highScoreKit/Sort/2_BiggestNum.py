from functools import cmp_to_key
# https://programmers.co.kr/learn/courses/30/lessons/42746?language=python3
# 7:00 -> 7:30 [FAIL]
# 7:48 [Success]

numbers = [3, 31, 34, 5, 9]
numbers = [6, 10, 2]
numbers = [0, 0, 0]
numbers = [995, 99, 6]


def solution(numbers):
    numbers = map(str, numbers)
    answer = int(
        ''.join(sorted(numbers, key=cmp_to_key(sortRule), reverse=True)))
    return str(answer)


def sortRule(a, b):
    t1 = a+b
    t2 = b+a
    return int(t1)-int(t2) < int(t2) - int(t1)


# def solution(numbers):
#     answer = str(int(
#         ''.join(map(str, sorted(numbers, key=cmp_to_key(sortRule))))))
#     return answer


# def sortRule(a, b):
#     if a == b:
#         return 0
#     a, b = str(a)*4, str(b)*4

#     # print(a[0:4], b[0:4])
#     if int(a[0:4]) > int(b[0:4]):
#         return -1
#     else:
#         return 1


print(solution(numbers))
