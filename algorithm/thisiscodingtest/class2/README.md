# 그리디

# 구현

## 방향벡터

시뮬레이션 및 완전탐색문제에서는 2차원 공간에서의 방향 벡터가 자주 활용된다.

```
# 왼쪽부터 시계방향
dx = [-1, 0 ,1, 0]
dy = [0, -1, 0, 1]

x, y = 2, 2

for i in range(4):

    #다음위치
    nx = x+dx[i]
    ny = y+dy[i]
    print(nx, ny)

```