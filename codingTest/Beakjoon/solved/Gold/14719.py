# 10:41 -> 11:20
# 11:10 [success]
H, W = map(int, input().split())
blocks = list(map(int, input().split()))
graph = [[False] * H for _ in range(W)]

for i in range(W):
    for j in range(blocks[i]):
        graph[i][j] = True

total = 0
for i in range(H):
    is_block = False
    cnt_water = 0
    for j in range(W):
        if graph[j][i]:
            if not is_block:
                is_block = True
            else:
                total += cnt_water
                cnt_water = 0
        if not graph[j][i] and is_block:
            cnt_water += 1
print(total)
