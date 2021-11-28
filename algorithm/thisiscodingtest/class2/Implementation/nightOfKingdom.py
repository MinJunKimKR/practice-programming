# 2:00 -> 2:20 [2:05]
N = input()

x = ord(N[0]) - 96
y = int(N[1])

vector = [(-2, 1), (-2, -1), (2, 1), (2, -1),
          (1, -2), (-1, -2), (1, 2), (-1, 2)]

# vector = [[-2, 1], [-2, -1], [2, 1], [2, -1],
#           [1, -2], [-1, -2], [1, 2], [-1, 2]]

result = 0

for i in vector:
    nx = x+i[0]
    ny = y+i[1]

    if nx < 1 or nx > 8 or ny < 1 or ny > 8:
        continue
    result += 1

print(result)
