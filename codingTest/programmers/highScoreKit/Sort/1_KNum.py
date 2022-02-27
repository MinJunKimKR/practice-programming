# https://programmers.co.kr/learn/courses/30/lessons/42748?language=python3
# 6:40 -> 7:00 [6:44] success

array = [1, 5, 2, 6, 3, 7, 4]
commands = [[2, 5, 3], [4, 4, 1], [1, 7, 3]]


def solution(array, commands):
    answer = []

    for command in commands:
        arrBlock = array[command[0]-1:command[1]]  # i,j -1 의 배열 slice\
        answer.append(sorted(arrBlock)[command[2]-1])
    return answer


print(solution(array, commands))
