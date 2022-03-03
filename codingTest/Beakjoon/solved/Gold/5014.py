# 10:14 ->10:54
# 10:44 [success]
from collections import deque
high, now, desti, up, down = map(int, input().split())
# 1<= desti, now <= high <=1000000 , 0<= up, down <= 1000000
if now == desti:
    print(0)
    exit(0)
tower = [0] * (high+1)

q = deque([now])

while q:
    this_f = q.popleft()
    if this_f == desti:
        print(tower[this_f])
        exit(0)

    up_f = this_f + up
    down_f = this_f - down

    if up_f <= high and tower[up_f] == 0 and up_f != now:
        tower[up_f] = tower[this_f]+1
        q.append(up_f)
    if down_f > 0 and tower[down_f] == 0 and down_f != now:
        tower[down_f] = tower[this_f]+1
        q.append(down_f)
print('use the stairs')
# 1 1 1 0 0
# 10 1 2 3 1
# 10 1 2 3 1
# 20 10 7 2 5
