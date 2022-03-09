# 1:53 -> 2:20
# TODO: 모르겠는데? -> 와까따!
# 7:06 -> 7:30
# 7:29 [Fail - Time out]
# 4:25 -> 4:55
# 4:46 [success]
from collections import deque
import sys
sys_input = sys.stdin.readline
T = int(input())


def is_reach(x, y, nx, ny):
    dist = abs(x-nx) + abs(y-ny)
    return True if dist <= 1000 else False


def bfs():
    q = deque([])
    q.append((sx, sy))
    while q:
        x, y = q.popleft()
        if is_reach(x, y, gx, gy):
            print("happy")
            return True
        for idx in range(N):
            if visited[idx]:
                continue
            nx, ny = convi[idx]
            if is_reach(x, y, nx, ny):
                visited[idx] = True
                q.append((nx, ny))
    return False


for _ in range(T):
    N = int(input())
    sx, sy = map(int, input().split())
    convi = []
    for _ in range(N):
        x, y = map(int, sys_input().strip().split())
        convi.append((x, y))
    gx, gy = map(int, input().split())
    if is_reach(sx, sy, gx, gy):
        print('happy')
        continue
    visited = [False] * (N)
    if not bfs():
        print('sad')
