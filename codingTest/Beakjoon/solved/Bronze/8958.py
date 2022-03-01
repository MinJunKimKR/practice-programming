# 12:12 -> 12:30
T = int(input())

for _ in range(T):
    case = list(input())
    cnt_o = 0
    point = 0
    for ox in case:
        if ox == 'O':
            cnt_o += 1
            point += cnt_o
            pass
        else:
            cnt_o = 0
            pass
    print(point)
