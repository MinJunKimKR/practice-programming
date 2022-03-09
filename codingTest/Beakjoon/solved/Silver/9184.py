# 10:58 ->11:25
# 11:37 [success]


while True:
    a, b, c = map(int, input().split())
    if a == -1 and b == -1 and c == -1:
        break
    if a <= 0 or b <= 0 or c <= 0:
        print(f'w({a}, {b}, {c}) = 1')
        continue
    if a > 20 or b > 20 or c > 20:
        print(f'w({a}, {b}, {c}) = 1048576')
        continue

    g_a = a if a > 0 else 0
    g_b = b if b > 0 else 0
    g_c = c if c > 0 else 0

    dp = [[[0 for _ in range(c+1)]for _ in range(b+1)]
          for _ in range(a+1)]

    def w(a, b, c):
        if dp[a][b][c] != 0:
            return dp[a][b][c]
        if a <= 0 or b <= 0 or c <= 0:
            dp[a][b][c] = 1
            return 1
        if a < b and b < c:
            dp[a][b][c] = w(a, b, c-1) + w(a, b-1, c-1) - w(a, b-1, c)
        else:
            dp[a][b][c] = w(a-1, b, c) + w(a-1, b-1, c) + \
                w(a-1, b, c-1) - w(a-1, b-1, c-1)
        return dp[a][b][c]
    result = w(a, b, c)
    print(f'w({a}, {b}, {c}) = {result}')
