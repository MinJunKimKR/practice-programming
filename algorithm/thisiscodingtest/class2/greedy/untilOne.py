number = list(map(int, input().split(' ')))

N = number[0]
K = number[1]

# N, K = map(int, input().split())

count = 0

while N != 1:
    if N % K == 0:
        N = N//K
        count += 1
    else:
        N -= 1
        count += 1

print(count)
