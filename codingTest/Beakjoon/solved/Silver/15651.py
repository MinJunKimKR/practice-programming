# 6:30 ->7:00
# 6:35 [success]
N, M = map(int, input().split())

nums = [x for x in range(1, N+1)]


def dfs(arr_num):
    global nums
    if len(arr_num) == M:
        print(' '.join(arr_num))
        return
    for num in nums:
        arr_num.append(str(num))
        dfs(arr_num)
        arr_num.pop()


dfs([])
