# 9:14 -> 9:54
# [FAIL]
#TODO: Retry
N = int(input())

field = [0]*N
cnt_posi = 0
visited = [False] * N


def logic(n):
    if n == N:
        global cnt_posi
        cnt_posi += 1
        return
    for i in range(N):
        if visited[i]:
            continue
        field[n] = i

        if check(n):
            visited[i] = True
            logic(n+1)
            visited[i] = False


def check(n):
    for i in range(n):
        if (field[n] == field[i]) or (n-i == abs(field[n]-field[i])):
            return False
    return True


logic(0)

print(cnt_posi)
