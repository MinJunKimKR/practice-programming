# https://programmers.co.kr/learn/courses/30/lessons/43162?language=python3
# 5:30 -> 6:10 [5:53]
# Success

n = 3
computers = [[1, 1, 0], [1, 1, 0], [0, 0, 1]]
n = 3
computers = [[1, 1, 0], [1, 1, 1], [0, 1, 1]]


def solution(n, computers):
    answer = 0
    visited = [False] * n

    def dfs(lines):
        for idx, line in enumerate(lines):
            if line == 1 and visited[idx] == False:
                visited[idx] = True
                dfs(computers[idx])
        return

    for idx, lines in enumerate(computers):
        if visited[idx] == True:
            continue
        answer += 1
        visited[idx] = True
        dfs(lines)
    return answer


print(solution(n, computers))
