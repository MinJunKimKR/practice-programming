n = 6
k = 3
bulbs = 'RBGRGB'


def solution(n, k, bulbs):
    answer = -2
    bulbs = list(bulbs)
    if bulbs.count('R') == len(bulbs):
        pass  # done
    return answer


print(solution(n, k, bulbs))
