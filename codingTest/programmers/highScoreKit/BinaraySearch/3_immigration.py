# https://programmers.co.kr/learn/courses/30/lessons/43238?language=python3
# 6:35 -> 7:15
# [Fail - GG] 6:53
# 5:55 -> 6:35
# [Fail -> TimeOut]
import math
n = 3
n = 10
n = 6
times = [1, 9999]
times = [6, 8, 10]
times = [1, 2, 3]
times = [1, 1, 1]
times = [7, 10]


def solution(n, times):
    answer = 0
    end = max(times) * n
    start = 1
    while start <= end:  # 두개의 값이 같을때도 검사를 해야지 제대로된 중간값을 구할수있다.
        # 왜 최대값의 /2가 되냐면 각각의 스케줄은 모르겠고 결국에 최대한 쳐낼수있는수를 가져야한다.
        mid = (start + end)//2
        people = 0
        for time in times:
            # 몫이 아니라 올림을 해야지된다. 이유는 0.76일경우, 1로 카운트 해야하기 때문이다.
            people += math.floor(mid/time)
            if people > n:  # n이상일 경우 더 볼필요도 없이 break 해줘야 효율이 좋다.
                break
        if people >= n:  # >=인경우에 answer를 하는 이유는, 어찌됬던 더 작아지면서 최적의 값을 구할것이기 때문입니다.
            answer = mid
            end = mid-1
        if people < n:
            start = mid+1
    return answer


print(solution(n, times))
