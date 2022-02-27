# 12:50
N = int(input())
# operations = list(input().split(' '))
operations = input().split()

vector = {'L': [-1, 0], 'R': [1, 0], 'U': [0, -1], 'D': [0, 1]}

X, Y = 1, 1


for i in operations:
    nx = X + list(vector[i])[0]
    ny = Y + list(vector[i])[1]
    if nx < 1 or nx > 5 or ny > 5 or ny < 1:
        continue
    # X = nx
    # Y = ny
    X, Y = nx, ny

print(f'x : {X} | y : {Y}')
