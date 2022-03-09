# 6:36 -> 7:00
# 6:44[success]

N, M = map(int, input().split())
arr_num = [str(x) for x in range(N+1)]


def dfs(nums):
    if len(nums) == M:
        print(' '.join(nums))
        return
    if len(nums) > 0:
        last_num = int(nums[-1])
    else:
        last_num = 1

    for idx in range(last_num, N+1):
        nums.append(arr_num[idx])
        dfs(nums)
        nums.pop()


dfs([])
