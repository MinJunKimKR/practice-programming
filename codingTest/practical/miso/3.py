# you can write to stdout for debugging purposes, e.g.
# print("this is a debug message")


def solution_with_comment(R):
    # write your code in Python 3.6

    # 청소를 실행할 정보 입력
    field = list(map(list, R))
    # 청소할 범위 구하기 H = 이차원 배열의 높이, W = 가로 길이
    H, W = len(field), len(field[0])
    # 오른쪽, 아래, 왼쪽, 위 순으로 방향 정보 입력
    vector = [(0, 1), (1, 0), (0, -1), (-1, 0)]
    # 방문을 기록할 배열생성. 이때 x,y말고도 4를 더해주는것은, 해당 방을 방문한것뿐만 아니라 방향 또한 고려해야 cycle에 집입하는지를 판별할수 있음
    visited = [[[False]*W for _ in range(H)] for _ in range(4)]
    # 위치값 초기화
    x, y, d = 0, 0, 0
    # 왼쪽위는 무조건 비어있기에, 시작과 함께 방문처리
    visited[d][x][y] = True
    # 계속 청소를 진행할건지를 체크하는 flag
    is_working = True
    # cycle에 진입할때까지 loop
    while is_working:
        # 4번인 이유는 4군데중 1군데는 무조건 갈수있어야하며, 4곳다 갈수 없다면 시작위치에서 갇혀있는 상태로 판단할수있다.
        for cnt in range(4):
            # 다음 예상 좌표 갱신
            # 이때 진행방향으로 계속 감으로 d를 그대로 사용한다.
            nx = x+vector[d][0]
            ny = y+vector[d][1]
            # 갈수 있는 좌표인지 체크
            if 0 > nx or H <= nx or 0 > ny or W <= ny or field[nx][ny] == 'X':
                # 만일에 갈수 없다면, 방향을 회전시킨다.
                # 이때, vector를 시계 방향으로 선언했음으로, 1씩 순환하며 증가시키면 오른쪽으로 도는것과같다.
                d = (d+1) % 4
                continue
            # 갈수있는 좌표를 찾았음으로 현재의 위치를 마킹한다.
            visited[d][x][y] = True
            # 진행방향의 좌표를 방문했는가?
            if visited[d][nx][ny]:
                # 방향을 포함한 좌표에 방문했다면, 다음 좌표부터는 cycle에 들어가는것으로 판단할수있다.
                # 루프를 끝낸다.
                is_working = False
                break
            # 정상적으로 진행이 가능하고 방문도 하지 않았다면,
            # 현재 좌표를 변경하고 다음 방을 수색한다.
            x = nx
            y = ny
            break
        # 만일, 4방향을 다 수색했지만 새로운방으로 이동을 하지 못했다면, 껴있는것으로 간주할수 있다.
        # 그렇다면 break
        if cnt == 3 and (x != nx or y != ny):
            break
    # 해답 선언 및 초기화
    ans = 0
    # 첫번째 방부터 방문했던 방의 개수를 구한다.
    for h in range(H):
        for w in range(W):
            # 막혀있다면 다음 방으로 이동
            if field[h][w] == 'X':
                continue
            for d in range(4):
                # 만일 4방향중, 1방향으로라도 방문했다면,
                # 방문한 방 이므로 1을 증가시키고 다음방으로 이동
                if visited[d][h][w]:
                    ans += 1
                    break
    return ans


def solution(R):
    # write your code in Python 3.6
    field = list(map(list, R))
    H, W = len(field), len(field[0])
    vector = [(0, 1), (1, 0), (0, -1), (-1, 0)]
    visited = [[[False]*W for _ in range(H)] for _ in range(4)]
    x, y, d = 0, 0, 0
    visited[d][x][y] = True
    is_working = True
    while is_working:
        for cnt in range(4):
            nx = x+vector[d][0]
            ny = y+vector[d][1]
            if 0 > nx or H <= nx or 0 > ny or W <= ny or field[nx][ny] == 'X':
                d = (d+1) % 4
                continue
            visited[d][x][y] = True
            if visited[d][nx][ny]:
                is_working = False
                break
            x = nx
            y = ny
            break
        if cnt == 3 and (x != nx or y != ny):
            break
    ans = 0
    for h in range(H):
        for w in range(W):
            if field[h][w] == 'X':
                continue
            for d in range(4):
                if visited[d][h][w]:
                    ans += 1
                    break
    return ans


case0 = ["...X..", "....XX", "..X..."]
case1 = ['....X..', 'X......', '.....X.', '.......']
case2 = ['...X.', '.X..X', 'X...X', '..X..']
case3 = ['.']
case4 = ['.X', 'X.']
case5 = ['.X']
case6 = ['.', 'X']
print(solution(case6))
